type RevealDirection = "up" | "down";
type RevealState = "hidden" | "revealing" | "visible";

const REVEAL_SELECTOR = "[data-reveal]";
const ACTIVATION_MARGIN = "-10% 0px -24% 0px";

function setRevealState(element: HTMLElement, state: RevealState) {
  element.dataset.revealState = state;
}

export function initRevealController() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (!elements.length) return () => undefined;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    elements.forEach((element) => setRevealState(element, "visible"));
    return () => undefined;
  }

  let direction: RevealDirection = "down";
  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY + 1) direction = "down";
    if (currentScrollY < lastScrollY - 1) direction = "up";
    lastScrollY = currentScrollY;
  };


  elements.forEach((element) => {
    const delay = Number(element.dataset.revealDelay || 0);
    element.style.setProperty("--reveal-delay", `${Math.max(0, delay)}ms`);
    setRevealState(element, element.getBoundingClientRect().top >= window.innerHeight ? "hidden" : "visible");
  });

  document.documentElement.dataset.revealReady = "true";
  window.addEventListener("scroll", onScroll, { passive: true });

  const activationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (direction === "down" && element.dataset.revealState === "hidden") {
            setRevealState(element, "revealing");
          } else if (direction === "up") {
            setRevealState(element, "visible");
          }
          return;
        }

        if (entry.rootBounds && entry.boundingClientRect.bottom <= entry.rootBounds.top) {
          setRevealState(element, "visible");
        }
      });
    },
    { rootMargin: ACTIVATION_MARGIN, threshold: 0 },
  );

  const viewportObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) return;

      const element = entry.target as HTMLElement;
      if (entry.boundingClientRect.top >= window.innerHeight) {
        setRevealState(element, "hidden");
      } else if (entry.boundingClientRect.bottom <= 0) {
        setRevealState(element, "visible");
      }
    });
  });

  elements.forEach((element) => {
    activationObserver.observe(element);
    viewportObserver.observe(element);
  });

  return () => {
    activationObserver.disconnect();
    viewportObserver.disconnect();
    window.removeEventListener("scroll", onScroll);
    delete document.documentElement.dataset.revealReady;
  };
}
