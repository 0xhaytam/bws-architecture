const VISIBLE_HYDRATION_LAYOUTS = new Set([
  "architectural_approach",
  "expertise_overview",
  "project_gallery",
  "project_invitation",
  "project_submission",
]);

export function sectionNeedsVisibleHydration(layout: string) {
  return VISIBLE_HYDRATION_LAYOUTS.has(layout);
}
