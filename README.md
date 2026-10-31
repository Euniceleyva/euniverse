# Euniverse

Galería digital cálida y editorial construida con Vite y JavaScript. Las fotografías reales de `obras/` son las protagonistas; los originales no se modifican.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre la dirección que imprime Vite, normalmente `http://localhost:5173`.

Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

## Cómo agregar una obra

Coloca la fotografía original dentro de `obras/`. Eso es todo. Al ejecutar `npm run dev` o `npm run build`, el paso previo `npm run catalog`:

1. Lee todas las imágenes JPG, JPEG, PNG, WebP y AVIF de `obras/`.
2. Valida que puedan abrirse y obtiene sus dimensiones reales.
3. Normaliza el perfil DCI-P3 a sRGB para conservar el color entre navegadores.
4. Genera WebP pequeños, medianos y de resolución completa con alta calidad y sin ampliar el original.
5. Actualiza el módulo de catálogo que consume la galería.
6. Comprueba cantidades, rutas generadas y duplicados.

El resultado de cada validación queda en `assets/obras/catalog-report.json`. Si una imagen está dañada o no puede convertirse, el proceso termina con error y el reporte indica el nombre exacto; no se omite silenciosamente.

## Metadatos opcionales

Edita `assets/obras/metadata.json`. La llave debe ser exactamente el nombre original, incluyendo espacios o paréntesis:

```json
{
  "__categoryLabels": {
    "paisajes": "Paisajes"
  },
  "20260504_145511(1).jpg": {
    "title": "Título definitivo",
    "category": "paisajes",
    "technique": "Acrílico sobre lienzo",
    "dimensions": "10 × 10 cm",
    "description": "Historia o inspiración de la obra.",
    "status": "Disponible",
    "alt": "Descripción visual breve de la pintura"
  }
}
```

Si una obra no tiene metadatos, la interfaz conserva su nombre original y muestra los demás campos como pendientes.

## Estructura de la experiencia

- Bienvenida inspirada en la tarjeta de presentación y el logo oficial.
- Carrusel único con las 94 obras, flechas, teclado, gesto táctil, ruta deslizante y lightbox.
- Tres momentos verticales para reducir el scroll: bienvenida, viaje de obras e historia/cierre.
- Filtros automáticos cuando existen categorías en `metadata.json`.
- Secciones de presentación y contacto preparadas para los recursos reales.

## Accesibilidad y movimiento

El menú permite saltar a Inicio, Galería, Sobre mí y Contacto. El carrusel funciona con teclado y gesto táctil, el lightbox restaura el foco al cerrarse y la experiencia respeta `prefers-reduced-motion`.

## Antes de publicar

- Añadir un canal real para encargos cuando esté disponible.
- Completar técnica, dimensiones, disponibilidad e historias en `assets/obras/metadata.json`.
- Añadir una fotografía real de la artista.
- Añadir enlaces sociales solo cuando se confirmen sus URLs oficiales.
