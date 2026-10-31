import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let context;
let galleryContext;

const motionIsReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("motion-reduced");

export function initMotion() {
  context?.revert();
  context = gsap.context(() => {
    if (motionIsReduced()) {
      gsap.set(".portal__copy > *, .portal__ghosts, .scroll-cue, .reveal-copy > *, .mystery__scene--sea, .mystery__copy--second", { clearProps: "all" });
      return;
    }

    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".portal__painting", { scale: 1.22, filter: "saturate(.7) brightness(.58)", duration: 2.1 })
      .from(".portal__sky", { autoAlpha: 0, duration: 1.4 }, .25)
      .from(".portal__copy > *", { y: 45, autoAlpha: 0, stagger: .12, duration: 1.15 }, .45)
      .from(".portal__ghosts", { xPercent: 18, yPercent: 8, rotation: 4, autoAlpha: 0, duration: 1.5 }, .75)
      .from(".scroll-cue", { y: 18, autoAlpha: 0, duration: 1 }, 1.25);

    gsap.timeline({ scrollTrigger: { trigger: ".portal", start: "top top", end: "bottom top", scrub: 1.1 } })
      .to(".portal__painting", { scale: 1.18, yPercent: 6, ease: "none" }, 0)
      .to(".portal__field", { scale: 1.22, yPercent: -8, ease: "none" }, 0)
      .to(".portal__ghosts", { yPercent: -22, xPercent: -4, rotation: -2, ease: "none" }, 0)
      .to(".portal__copy", { yPercent: -30, autoAlpha: 0, ease: "none" }, 0);

    gsap.to("[data-butterfly]", {
      x: "52vw", y: -100, rotation: 16, ease: "none",
      scrollTrigger: { trigger: ".meadow-bridge", start: "top bottom", end: "bottom top", scrub: 1.2 }
    });

    gsap.from(".soul__landscape", {
      clipPath: "inset(18% 13% 18% 13%)", rotation: -8, scale: .9, duration: 1.5, ease: "expo.out",
      scrollTrigger: { trigger: ".soul", start: "top 72%", toggleActions: "play none none reverse" }
    });

    gsap.utils.toArray(".reveal-copy").forEach((block) => {
      gsap.from(block.children, {
        y: 36, autoAlpha: 0, stagger: .1, duration: 1.05, ease: "expo.out",
        scrollTrigger: { trigger: block, start: "top 78%", toggleActions: "play none none reverse" }
      });
    });

    gsap.to(".tenderness__painting", { scale: 1.14, yPercent: 4, ease: "none", scrollTrigger: { trigger: ".tenderness", start: "top bottom", end: "bottom top", scrub: 1.2 } });
    gsap.to(".tenderness__ghosts", { yPercent: -11, rotation: -1.5, ease: "none", scrollTrigger: { trigger: ".tenderness", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.to(".tenderness__butterfly", { xPercent: -65, yPercent: 55, rotation: -12, ease: "none", scrollTrigger: { trigger: ".tenderness", start: "top bottom", end: "bottom top", scrub: 1.4 } });

    gsap.timeline({ scrollTrigger: { trigger: ".mystery", start: "top top", end: "bottom bottom", scrub: 1.1 } })
      .to(".mystery__scene--forest", { scale: 1.08, filter: "brightness(.42) saturate(.45)", duration: 1.4 }, 0)
      .to(".mystery__copy--first", { y: -70, autoAlpha: 0, duration: .8 }, .5)
      .to(".mystery__scene--sea", { autoAlpha: 1, duration: 1.2 }, .75)
      .fromTo(".mystery__scene--sea img", { scale: 1.17 }, { scale: 1.04, duration: 1.5 }, .75)
      .to(".mystery__copy--second", { autoAlpha: 1, y: -18, duration: .8 }, 1.2)
      .to(".mystery__progress i", { scaleY: 1, duration: 2 }, 0);

    gsap.to(".farewell__painting", { scale: 1.13, yPercent: 3, ease: "none", scrollTrigger: { trigger: ".farewell", start: "top bottom", end: "bottom top", scrub: 1.2 } });
    gsap.to(".farewell__constellation i", { y: () => gsap.utils.random(-28, 28), autoAlpha: () => gsap.utils.random(.4, 1), stagger: .13, repeat: -1, yoyo: true, duration: 2.8, ease: "sine.inOut" });
  });
  rebuildGalleryMotion();
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export function rebuildGalleryMotion() {
  galleryContext?.revert();
  const items = gsap.utils.toArray(".artwork");
  if (motionIsReduced()) {
    gsap.set(items, { clearProps: "all" });
    return;
  }
  galleryContext = gsap.context(() => {
    ScrollTrigger.batch(items, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => gsap.fromTo(batch, { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .07, duration: .95, ease: "expo.out", overwrite: true })
    });
  }, document.querySelector(".gallery"));
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
