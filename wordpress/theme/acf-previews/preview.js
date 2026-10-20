(() => {
  if (window.__atelierPreviewFocusInstalled) return;
  window.__atelierPreviewFocusInstalled = true;

  const FIELD_SELECTOR = "[data-preview-field]";
  const LAYOUT_SELECTOR = ".layout";
  const FOCUSABLE_SELECTOR = [
    "input:not([type='hidden']):not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "button:not([disabled])",
    "a.acf-button",
    "[role='button']",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");
  const MAX_ATTEMPTS = 40;
  const RETRY_DELAY = 50;

  function escapeSelector(value, contextWindow) {
    const css = contextWindow.CSS;
    if (css && typeof css.escape === "function") {
      return css.escape(value);
    }

    return value.replace(/["\\]/g, "\\$&");
  }

  function previewContext(target) {
    const localLayout = target.closest(LAYOUT_SELECTOR);
    if (localLayout) {
      return {
        document: target.ownerDocument,
        layout: localLayout,
        window: target.ownerDocument.defaultView || window,
      };
    }

    try {
      const defaultView = target.ownerDocument.defaultView;
      const frame = defaultView ? defaultView.frameElement : null;
      const parentLayout = frame ? frame.closest(LAYOUT_SELECTOR) : null;
      if (parentLayout) {
        return {
          document: parentLayout.ownerDocument,
          layout: parentLayout,
          window: parentLayout.ownerDocument.defaultView || window.parent,
        };
      }
    } catch {
      // Cross-origin iframes cannot expose their parent editor DOM.
    }

    return null;
  }

  function isVisible(element) {
    const view = element.ownerDocument.defaultView;
    if (!view) return true;
    const style = view.getComputedStyle(element);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      !element.closest("[hidden], [aria-hidden='true']")
    );
  }

  function focusField(context, fieldName, attempt = 0) {
    if (!context.layout.isConnected) return;

    const escaped = escapeSelector(fieldName, context.window);
    const field = context.layout.querySelector(
      `.acf-field[data-name="${escaped}"]`,
    );

    if (!field || !isVisible(field)) {
      if (attempt < MAX_ATTEMPTS) {
        context.window.setTimeout(
          () => focusField(context, fieldName, attempt + 1),
          RETRY_DELAY,
        );
      }
      return;
    }

    const mediaQuery = context.window.matchMedia
      ? context.window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    const reduceMotion = mediaQuery ? mediaQuery.matches : false;
    field.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
    field.classList.add("atelier-preview-target");

    const focusable = field.querySelector(FOCUSABLE_SELECTOR);
    if (focusable instanceof context.window.HTMLElement) {
      focusable.focus({ preventScroll: true });
    } else if (field instanceof context.window.HTMLElement) {
      field.tabIndex = -1;
      field.focus({ preventScroll: true });
    }

    context.window.setTimeout(
      () => field.classList.remove("atelier-preview-target"),
      1400,
    );
  }

  function rememberFieldIntent(target) {
    const fieldName = target.getAttribute("data-preview-field");
    const context = previewContext(target);
    if (!fieldName || !context) return;

    // ACFE handles the same click after this capture listener and opens the
    // native layout editor. Poll briefly until its field becomes visible.
    context.window.setTimeout(() => focusField(context, fieldName), 0);
  }

  document.addEventListener(
    "click",
    (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest(FIELD_SELECTOR)
          : null;
      if (target) rememberFieldIntent(target);
    },
    true,
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target =
        event.target instanceof Element
          ? event.target.closest(FIELD_SELECTOR)
          : null;
      if (!target) return;

      event.preventDefault();
      target.click();
    },
    true,
  );
})();
