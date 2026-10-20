export function initHeaderDropdowns(): () => void {
  const dropdowns = Array.from(document.querySelectorAll<HTMLElement>("[data-dropdown]"));

  const closeAll = (except?: HTMLElement) => {
    for (const dropdown of dropdowns) {
      if (dropdown === except) continue;
      dropdown.dataset.open = "false";
      dropdown.querySelector<HTMLElement>("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
    }
  };

  const triggerCleanups = dropdowns.map((dropdown) => {
    const trigger = dropdown.querySelector<HTMLButtonElement>("[data-dropdown-trigger]");
    if (!trigger) return () => undefined;

    const toggle = (event: MouseEvent) => {
      event.stopPropagation();
      const shouldOpen = dropdown.dataset.open !== "true";
      closeAll();
      dropdown.dataset.open = String(shouldOpen);
      trigger.setAttribute("aria-expanded", String(shouldOpen));
    };

    trigger.addEventListener("click", toggle);
    return () => trigger.removeEventListener("click", toggle);
  });

  const closeOnOutsideClick = () => closeAll();
  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    closeAll();
  };

  document.addEventListener("click", closeOnOutsideClick);
  document.addEventListener("keydown", closeOnEscape);

  return () => {
    triggerCleanups.forEach((cleanup) => cleanup());
    document.removeEventListener("click", closeOnOutsideClick);
    document.removeEventListener("keydown", closeOnEscape);
  };
}
