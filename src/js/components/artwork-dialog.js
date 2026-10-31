import { artworks } from "../data/artworks.js";

export function createArtworkDialog() {
  const dialog = document.querySelector("[data-artwork-dialog]");
  const closeButton = dialog.querySelector(".dialog-close");
  let activeIndex = 0;
  let trigger = null;
  const setArtwork = (index) => {
    activeIndex = (index + artworks.length) % artworks.length;
    const artwork = artworks[activeIndex];
    const image = dialog.querySelector("[data-dialog-image]");
    image.src = artwork.full; image.width = artwork.width; image.height = artwork.height; image.alt = "Pintura en miniatura de Euniverse";
    dialog.querySelector("[data-dialog-position]").textContent = `${activeIndex + 1} / ${artworks.length}`;
  };
  const open = (id) => {
    trigger = document.activeElement;
    const index = artworks.findIndex((artwork) => artwork.id === id);
    setArtwork(index < 0 ? 0 : index); dialog.showModal(); document.body.style.overflow = "hidden";
  };
  const close = () => dialog.close();
  closeButton.addEventListener("click", close);
  dialog.querySelector("[data-dialog-prev]").addEventListener("click", () => setArtwork(activeIndex - 1));
  dialog.querySelector("[data-dialog-next]").addEventListener("click", () => setArtwork(activeIndex + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") setArtwork(activeIndex - 1);
    if (event.key === "ArrowRight") setArtwork(activeIndex + 1);
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener("close", () => { document.body.style.overflow = ""; trigger?.focus(); });
  return { open };
}
