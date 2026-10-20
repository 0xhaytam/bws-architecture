(() => {
  const config = window.AtelierIconPicker;
  if (!config || !config.manifestUrl) return;

  let manifestPromise;
  const manifest = () => {
    manifestPromise ||= fetch(config.manifestUrl, {
      credentials: "same-origin",
    }).then((response) => {
      if (!response.ok) throw new Error("Could not load Atelier icon manifest");
      return response.json();
    });
    return manifestPromise;
  };

  const iconUrl = (entry) =>
    new URL(entry.file, config.manifestUrl).toString();

  async function update(field) {
    const select = field.querySelector("select");
    if (!select) return;
    let preview = field.querySelector(".atelier-icon-picker__preview");
    if (!preview) {
      preview = document.createElement("span");
      preview.className = "atelier-icon-picker__preview";
      preview.setAttribute("aria-hidden", "true");
      field.querySelector(".acf-input")?.append(preview);
    }

    try {
      const icons = await manifest();
      const entry = icons[select.value];
      preview.replaceChildren();
      if (!entry) return;
      const image = document.createElement("img");
      image.src = iconUrl(entry);
      image.alt = "";
      image.loading = "lazy";
      preview.append(image);
      preview.title = entry.label;
    } catch (error) {
      if (window.console) console.warn(error);
    }
  }

  function initialize(scope = document) {
    scope
      .querySelectorAll(".acf-field.atelier-icon-picker")
      .forEach((field) => update(field));
  }

  document.addEventListener("change", (event) => {
    const field = event.target?.closest?.(".acf-field.atelier-icon-picker");
    if (field) update(field);
  });

  if (window.acf?.addAction) {
    window.acf.addAction("ready", ($el) => initialize($el?.[0] || document));
    window.acf.addAction("append", ($el) => initialize($el?.[0] || document));
  }

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof Element) initialize(node);
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

  initialize();
})();
