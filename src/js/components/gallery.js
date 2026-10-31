import { artworks, categories, artworkCount } from "../data/artworks.js";

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

const picture = (item, sizes, priority = "lazy") => {
  const sources = new Map([[item.smallWidth, item.small], [item.mediumWidth, item.medium], [item.fullWidth, item.full]]);
  const srcset = [...sources.entries()].map(([width, source]) => `${source} ${width}w`).join(", ");
  const loading = priority === "high" ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  return `<img src="${item.medium}" srcset="${srcset}" sizes="${sizes}" alt="Pintura en miniatura de Euniverse" width="${item.width}" height="${item.height}" ${loading} />`;
};

export function createGallery({ onOpen }) {
  const heroArtwork = artworks[Math.min(23, artworks.length - 1)];
  const heroImage = document.querySelector("[data-hero-art-image]");
  heroImage.src = heroArtwork.medium;
  heroImage.srcset = `${heroArtwork.small} ${heroArtwork.smallWidth}w, ${heroArtwork.medium} ${heroArtwork.mediumWidth}w`;
  heroImage.sizes = "(max-width: 650px) 12rem, 29vw";
  heroImage.alt = heroArtwork.alt;
  heroImage.width = heroArtwork.width;
  heroImage.height = heroArtwork.height;
  [
    ["[data-hero-art-left]", artworks[Math.min(9, artworks.length - 1)]],
    ["[data-hero-art-right]", artworks[Math.min(57, artworks.length - 1)]]
  ].forEach(([selector, artwork]) => {
    const image = document.querySelector(selector);
    image.src = artwork.medium;
    image.srcset = `${artwork.small} ${artwork.smallWidth}w, ${artwork.medium} ${artwork.mediumWidth}w`;
    image.sizes = "(max-width: 650px) 8rem, 16vw";
    image.width = artwork.width;
    image.height = artwork.height;
    image.loading = "eager";
    image.decoding = "async";
  });
  document.querySelector("[data-hero-art-open]").addEventListener("click", () => openArtwork(heroArtwork.id));

  const carousel = document.querySelector("[data-carousel]");
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = carousel.querySelector("[data-carousel-track]");
  const dotsHost = carousel.querySelector("[data-carousel-dots]");
  const autoplayButton = carousel.querySelector("[data-carousel-toggle]");
  const filters = document.querySelector("[data-filters]");
  document.querySelector("[data-artwork-count]").textContent = String(artworkCount);

  let visibleArtworks = artworks;
  let slides = [];
  let activeIndex = 0;
  let activeCategory = "all";
  let dragStart = 0;
  let dragDelta = 0;
  let dragged = false;
  let dotTargets = [];
  let autoplayTimer = 0;
  let userPaused = false;
  let focusPaused = false;
  let lightboxOpen = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const autoplayCanRun = () => !reducedMotion.matches && !userPaused && !focusPaused && !lightboxOpen && !document.hidden && visibleArtworks.length > 1;
  const updateAutoplayControl = () => {
    autoplayButton.hidden = reducedMotion.matches;
    autoplayButton.setAttribute("aria-pressed", String(userPaused));
    autoplayButton.setAttribute("aria-label", userPaused ? "Reanudar carrusel automático" : "Pausar carrusel automático");
    autoplayButton.classList.toggle("is-paused", userPaused);
    carousel.setAttribute("aria-label", `Colección completa de obras. Obra ${activeIndex + 1} de ${visibleArtworks.length}`);
  };
  const scheduleAutoplay = () => {
    window.clearTimeout(autoplayTimer);
    updateAutoplayControl();
    if (!autoplayCanRun()) return;
    autoplayTimer = window.setTimeout(() => moveTo((activeIndex + 1) % visibleArtworks.length), 5200);
  };
  const openArtwork = (id) => {
    lightboxOpen = true;
    scheduleAutoplay();
    onOpen(id);
  };
  document.querySelector("[data-artwork-dialog]").addEventListener("close", () => {
    lightboxOpen = false;
    scheduleAutoplay();
  });

  const buildDots = () => {
    const count = Math.min(9, visibleArtworks.length);
    dotTargets = Array.from({ length: count }, (_, index) => count === 1
      ? 0
      : Math.round(index * (visibleArtworks.length - 1) / (count - 1)));
    dotsHost.innerHTML = dotTargets.map((target, index) => `<button class="carousel__dot" type="button" data-dot-index="${index}" aria-label="Ir a la obra ${target + 1} de ${visibleArtworks.length}"></button>`).join("");
  };
  const updateDots = () => {
    let nearestDot = 0;
    dotTargets.forEach((target, index) => {
      if (Math.abs(target - activeIndex) < Math.abs(dotTargets[nearestDot] - activeIndex)) nearestDot = index;
    });
    dotsHost.querySelectorAll("[data-dot-index]").forEach((dot, index) => {
      if (index === nearestDot) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const moveTo = (index, animate = true) => {
    const previousIndex = activeIndex;
    activeIndex = Math.max(0, Math.min(index, visibleArtworks.length - 1));
    const slide = slides[activeIndex];
    if (!slide) return;
    const x = viewport.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2);
    track.style.transitionDuration = animate ? "" : "0ms";
    track.style.transform = `translate3d(${x}px,0,0)`;
    const previousSlide = slides[previousIndex];
    if (previousSlide && previousSlide !== slide) {
      previousSlide.classList.remove("is-active");
      previousSlide.setAttribute("aria-current", "false");
      previousSlide.tabIndex = -1;
    }
    slide.classList.add("is-active");
    slide.setAttribute("aria-current", "true");
    slide.tabIndex = 0;
    [activeIndex - 1, activeIndex, activeIndex + 1].forEach((nearbyIndex) => {
      const image = slides[nearbyIndex]?.querySelector("img");
      if (!image) return;
      image.loading = "eager";
      image.decode?.().catch(() => {});
    });
    const activeImage = slide.querySelector("img");
    if (activeImage && !activeImage.complete) {
      slide.classList.add("is-loading");
      activeImage.decode?.().catch(() => {}).finally(() => slide.classList.remove("is-loading"));
    } else {
      slide.classList.remove("is-loading");
    }
    updateDots();
    scheduleAutoplay();
  };

  const renderCarousel = () => {
    track.innerHTML = visibleArtworks.map((item, index) => `<button class="carousel__slide" type="button" tabindex="-1" data-slide-index="${index}" aria-label="Ampliar pintura ${index + 1} de ${visibleArtworks.length}">${picture(item, "(max-width: 650px) 82vw, (max-width: 900px) 56vw, 42vw", index === 0 ? "high" : "lazy")}</button>`).join("");
    slides = [...track.children];
    slides.forEach((slide, index) => slide.addEventListener("click", () => {
      if (dragged) { dragged = false; return; }
      index === activeIndex ? openArtwork(visibleArtworks[index].id) : moveTo(index);
    }));
    activeIndex = 0;
    buildDots();
    requestAnimationFrame(() => moveTo(0, false));
  };

  if (categories.length <= 1) {
    filters.hidden = true;
  } else {
    filters.innerHTML = categories.map(([value, label]) => `<button type="button" data-filter="${escapeHtml(value)}" aria-pressed="${value === activeCategory}">${escapeHtml(label)}</button>`).join("");
    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button || button.dataset.filter === activeCategory) return;
      activeCategory = button.dataset.filter;
      visibleArtworks = activeCategory === "all" ? artworks : artworks.filter((item) => item.category === activeCategory);
      filters.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      renderCarousel();
    });
  }

  dotsHost.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-dot-index]");
    if (!dot) return;
    moveTo(dotTargets[Number(dot.dataset.dotIndex)]);
  });
  autoplayButton.addEventListener("click", () => {
    userPaused = !userPaused;
    scheduleAutoplay();
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.target !== carousel && !event.target.matches(".carousel__slide, .carousel__dot")) return;
    const focusSlide = event.target.matches(".carousel__slide");
    if (event.key === "ArrowLeft") { event.preventDefault(); moveTo(activeIndex - 1); if (focusSlide) slides[activeIndex].focus(); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveTo(activeIndex + 1); if (focusSlide) slides[activeIndex].focus(); }
    if (event.key === "Home") { event.preventDefault(); moveTo(0); if (focusSlide) slides[0].focus(); }
    if (event.key === "End") { event.preventDefault(); moveTo(visibleArtworks.length - 1); if (focusSlide) slides.at(-1).focus(); }
    if (event.key === "Enter" && event.target === carousel) openArtwork(visibleArtworks[activeIndex].id);
  });

  viewport.addEventListener("pointerdown", (event) => {
    dragStart = event.clientX; dragDelta = 0; dragged = false;
    viewport.setPointerCapture(event.pointerId); viewport.classList.add("is-dragging"); track.style.transitionDuration = "0ms";
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!viewport.hasPointerCapture(event.pointerId)) return;
    dragDelta = event.clientX - dragStart; dragged = Math.abs(dragDelta) > 8;
    const slide = slides[activeIndex];
    const base = viewport.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2);
    track.style.transform = `translate3d(${base + dragDelta}px,0,0)`;
  });
  const finishDrag = (event) => {
    if (!viewport.hasPointerCapture(event.pointerId)) return;
    viewport.releasePointerCapture(event.pointerId); viewport.classList.remove("is-dragging");
    if (Math.abs(dragDelta) > 45) moveTo(activeIndex + (dragDelta < 0 ? 1 : -1)); else moveTo(activeIndex);
  };
  viewport.addEventListener("pointerup", finishDrag);
  viewport.addEventListener("pointercancel", finishDrag);
  carousel.addEventListener("focusin", () => { focusPaused = true; scheduleAutoplay(); });
  carousel.addEventListener("focusout", (event) => {
    if (carousel.contains(event.relatedTarget)) return;
    focusPaused = false;
    scheduleAutoplay();
  });
  document.addEventListener("visibilitychange", scheduleAutoplay);
  reducedMotion.addEventListener("change", scheduleAutoplay);
  window.addEventListener("resize", () => moveTo(activeIndex, false), { passive: true });
  renderCarousel();
}
