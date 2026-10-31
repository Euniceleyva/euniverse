import "../styles/site.css";
import { createGallery } from "./components/gallery.js";
import { createArtworkDialog } from "./components/artwork-dialog.js";
import { createNavigation } from "./components/navigation.js";

createNavigation();
const dialog = createArtworkDialog();
createGallery({ onOpen: dialog.open });
document.querySelector("[data-year]").textContent = new Date().getFullYear();

const bird = document.querySelector("[data-flight-bird]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (bird && !reducedMotion.matches) {
  let frame = 0;
  const birdWidth = () => bird.getBoundingClientRect().width;
  const collidesWithContent = (centerX, centerY) => {
    const half = birdWidth() / 2 + 18;
    const birdRect = { left: centerX - half, right: centerX + half, top: centerY - half, bottom: centerY + half };
    return [...document.querySelectorAll("h1, h2, h3, p, a, button, input, .carousel__slide, .journey__count, .closing__portrait")]
      .some((element) => {
        if (element === bird || element.closest("[data-flight-bird]")) return false;
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > window.innerHeight) return false;
        return birdRect.left < rect.right && birdRect.right > rect.left && birdRect.top < rect.bottom && birdRect.bottom > rect.top;
      });
  };
  const updateBird = () => {
    frame = 0;
    const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.max(0, Math.min(window.scrollY / scrollRange, 1));
    const wave = Math.sin(progress * Math.PI * 3.2);
    const desired = { x: window.innerWidth * (.12 + progress * .76), y: window.innerHeight * (.13 + (wave + 1) * .035) };
    const waypoints = [
      desired,
      { x: window.innerWidth * .91, y: window.innerHeight * .16 },
      { x: window.innerWidth * .5, y: window.innerHeight * .12 },
      { x: window.innerWidth * .08, y: window.innerHeight * .16 },
      { x: window.innerWidth * .92, y: window.innerHeight * .87 },
      { x: window.innerWidth * .08, y: window.innerHeight * .87 },
      { x: window.innerWidth * .5, y: window.innerHeight * .9 },
      { x: window.innerWidth * .94, y: window.innerHeight * .5 },
      { x: window.innerWidth * .06, y: window.innerHeight * .5 }
    ].sort((a, b) => Math.hypot(a.x - desired.x, a.y - desired.y) - Math.hypot(b.x - desired.x, b.y - desired.y));
    const destination = waypoints.find(({ x, y }) => !collidesWithContent(x, y)) || desired;
    bird.style.left = `${destination.x}px`;
    bird.style.top = `${destination.y}px`;
    bird.style.setProperty("--flight-tilt", `${Math.cos(progress * Math.PI * 3.2) * 12}deg`);
  };
  const requestBirdUpdate = () => {
    if (!frame) frame = requestAnimationFrame(updateBird);
  };
  window.addEventListener("scroll", requestBirdUpdate, { passive: true });
  window.addEventListener("resize", requestBirdUpdate, { passive: true });
  updateBird();
} else if (bird) {
  bird.hidden = true;
}
