import { createHash } from "node:crypto";
import { execFile, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "obras");
const outputDir = join(root, "assets", "obras", "catalog");
const generatedModule = join(root, "src", "js", "data", "generated-artworks.js");
const metadataPath = join(root, "assets", "obras", "metadata.json");
const reportPath = join(root, "assets", "obras", "catalog-report.json");
const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const processingVersion = "fidelity-v3";

mkdirSync(outputDir, { recursive: true });
mkdirSync(dirname(generatedModule), { recursive: true });
if (!existsSync(metadataPath)) writeFileSync(metadataPath, "{}\n");

const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
const sourceFiles = (await import("node:fs/promises")).readdir(sourceDir, { withFileTypes: true })
  .then((entries) => entries.filter((entry) => entry.isFile() && validExtensions.has(extname(entry.name).toLowerCase())).map((entry) => entry.name).sort((a, b) => a.localeCompare(b, "es")));

const discoveredFiles = await sourceFiles;
const excludedFiles = discoveredFiles.filter((filename) => metadata[filename]?.exclude === true);
const files = discoveredFiles.filter((filename) => metadata[filename]?.exclude !== true);
const invalidFiles = [];
const records = [];
const contentHashes = new Map();
const conversionTasks = [];

const dimensionsFor = (path) => {
  const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", path], { encoding: "utf8" });
  const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1]);
  if (!width || !height) throw new Error("No se pudieron leer las dimensiones");
  return { width, height };
};

for (const filename of files) {
  const sourcePath = join(sourceDir, filename);
  try {
    const { width, height } = dimensionsFor(sourcePath);
    const bytes = readFileSync(sourcePath);
    const contentHash = createHash("sha256").update(bytes).digest("hex");
    const filenameHash = createHash("sha1").update(filename).digest("hex").slice(0, 9);
    const stem = basename(filename, extname(filename)).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "obra";
    const key = `${stem}-${filenameHash}-${processingVersion}`;
    const sourceMtime = statSync(sourcePath).mtimeMs;
    const variants = {};

    const variantSpecs = [["small", Math.min(480, width)], ["medium", Math.min(1000, width)], ["full", width]];
    for (const [label, variantWidth] of variantSpecs) {
      const outputName = `${key}-${label}-${variantWidth}w.webp`;
      const outputPath = join(outputDir, outputName);
      variants[label] = { outputName, outputPath, width: variantWidth, height: Math.round(height * variantWidth / width) };
      if (!existsSync(outputPath) || statSync(outputPath).mtimeMs < sourceMtime) {
        conversionTasks.push({ sourcePath, outputPath, width: variantWidth, filename });
      }
    }

    records.push({ filename, contentHash, width, height, key, variants, meta: metadata[filename] || {} });
    const hashGroup = contentHashes.get(contentHash) || [];
    hashGroup.push(filename);
    contentHashes.set(contentHash, hashGroup);
  } catch (error) {
    invalidFiles.push({ filename, reason: error.message });
  }
}

let nextTask = 0;
const conversionErrors = [];
async function worker() {
  while (nextTask < conversionTasks.length) {
    const task = conversionTasks[nextTask++];
    try {
      await execFileAsync("cwebp", ["-quiet", "-q", task.width >= 1400 ? "92" : "89", "-m", "6", "-sharp_yuv", "-metadata", "icc", "-resize", String(task.width), "0", task.sourcePath, "-o", task.outputPath]);
    } catch (error) {
      conversionErrors.push({ filename: task.filename, reason: error.stderr || error.message });
    }
  }
}
await Promise.all(Array.from({ length: 5 }, worker));
invalidFiles.push(...conversionErrors);

const validRecords = records.filter((record) => !invalidFiles.some((item) => item.filename === record.filename));
const imports = [];
const items = [];
validRecords.forEach((record, index) => {
  const names = { small: `image${index}Small`, medium: `image${index}Medium`, full: `image${index}Full` };
  for (const label of ["small", "medium", "full"]) {
    const path = relative(join(root, "src", "js", "data"), record.variants[label].outputPath).replaceAll("\\", "/");
    imports.push(`import ${names[label]} from ${JSON.stringify(path)};`);
  }
  const meta = record.meta;
  items.push(`  {
    id: ${JSON.stringify(`obra-${record.key}`)},
    filename: ${JSON.stringify(record.filename)},
    title: ${JSON.stringify(meta.title || record.filename)},
    titleNote: ${JSON.stringify(meta.title ? "" : "Nombre original del archivo")},
    category: ${JSON.stringify(meta.category || "sin-categoria")},
    technique: ${JSON.stringify(meta.technique || "Por documentar")},
    dimensions: ${JSON.stringify(meta.dimensions || `${record.width} × ${record.height} px`)},
    story: ${JSON.stringify(meta.description || "La historia de esta obra está pendiente de la voz de la artista.")},
    status: ${JSON.stringify(meta.status || "Estado por confirmar")},
    alt: ${JSON.stringify(meta.alt || "Pintura en miniatura de Euniverse")},
    width: ${record.width}, height: ${record.height}, aspect: ${(record.width / record.height).toFixed(6)},
    smallWidth: ${record.variants.small.width}, mediumWidth: ${record.variants.medium.width}, fullWidth: ${record.variants.full.width},
    small: ${names.small}, medium: ${names.medium}, full: ${names.full}
  }`);
});

const categoryValues = [...new Set(validRecords.map((record) => record.meta.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
const categoryPairs = [["all", "Todas"], ...categoryValues.map((value) => [value, metadata.__categoryLabels?.[value] || value])];
writeFileSync(generatedModule, `${imports.join("\n")}\n\nexport const artworks = [\n${items.join(",\n")}\n];\n\nexport const categories = ${JSON.stringify(categoryPairs, null, 2)};\nexport const artworkCount = artworks.length;\n`);

const duplicateSourceContent = [...contentHashes.values()].filter((group) => group.length > 1);
const outputPaths = validRecords.flatMap((record) => Object.values(record.variants).map((variant) => variant.outputName));
const expectedOutputs = new Set(outputPaths);
for (const generatedFile of readdirSync(outputDir)) {
  if (generatedFile.endsWith(".webp") && !expectedOutputs.has(generatedFile)) unlinkSync(join(outputDir, generatedFile));
}
const report = {
  generatedAt: new Date().toISOString(), sourceDirectory: "obras/", sourceCount: files.length, discoveredImageCount: discoveredFiles.length,
  excludedFiles,
  catalogCount: validRecords.length, generatedVariantCount: outputPaths.length,
  imageTreatment: "Codificación WebP de alta calidad con conservación del perfil ICC original y sharp YUV; originales intactos.",
  uniqueCatalogPaths: new Set(outputPaths).size, invalidFiles, duplicateSourceContent,
  checks: {
    everySourceIncluded: files.length === validRecords.length,
    noGeneratedPathDuplicates: outputPaths.length === new Set(outputPaths).size,
    everyVariantExists: validRecords.every((record) => Object.values(record.variants).every((variant) => existsSync(variant.outputPath))),
    noVariantUpscaled: validRecords.every((record) => Object.values(record.variants).every((variant) => variant.width <= record.width && variant.height <= record.height))
  }
};
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Catálogo Euniverse: ${report.catalogCount}/${report.sourceCount} obras, ${report.generatedVariantCount} variantes WebP.`);
if (duplicateSourceContent.length) console.warn(`Aviso: ${duplicateSourceContent.length} grupo(s) de archivos fuente tienen contenido idéntico. Revisa ${relative(root, reportPath)}.`);
if (invalidFiles.length || !Object.values(report.checks).every(Boolean)) {
  console.error(`La validación falló. Revisa ${relative(root, reportPath)}.`);
  process.exitCode = 1;
}
