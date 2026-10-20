import { describe, expect, it } from "vitest";
import { buildMenuTree } from "./menus";

describe("buildMenuTree", () => {
  it("orders menu entries and nests children under their WordPress parent", () => {
    const tree = buildMenuTree([
      { id: 3, parent: 2, title: "Villas", url: "/villas/", order: 3 },
      { id: 1, parent: 0, title: "Accueil", url: "/", order: 1 },
      { id: 2, parent: 0, title: "Expertises", url: "#", order: 2 },
    ]);

    expect(tree.map((item) => item.title)).toEqual(["Accueil", "Expertises"]);
    expect(tree[1]?.children.map((item) => item.title)).toEqual(["Villas"]);
  });

  it("keeps an orphaned entry visible at the root", () => {
    const tree = buildMenuTree([
      { id: 1, parent: 99, title: "Contact", url: "/contact/", order: 1 },
    ]);

    expect(tree[0]?.title).toBe("Contact");
  });
});
