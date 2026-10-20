import { fetchWordPressData } from "./data";

export type MenuLocation = "main-menu" | "footer";

interface WordPressMenuItem {
  id: number;
  parent: number;
  title: string;
  url: string;
  order: number;
}

export interface MenuItem extends WordPressMenuItem {
  children: MenuItem[];
}

const menuCache = new Map<MenuLocation, Promise<MenuItem[]>>();

export function buildMenuTree(items: WordPressMenuItem[]): MenuItem[] {
  const nodes = new Map<number, MenuItem>();

  for (const item of [...items].sort((a, b) => a.order - b.order)) {
    nodes.set(item.id, { ...item, children: [] });
  }

  const roots: MenuItem[] = [];
  for (const node of nodes.values()) {
    const parent = nodes.get(node.parent);
    if (node.parent > 0 && parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export function getMenuByLocation(location: MenuLocation): Promise<MenuItem[]> {
  const cached = menuCache.get(location);
  if (cached) return cached;

  const request = fetchWordPressData<WordPressMenuItem[]>(
    `/atelier/v1/menu/location/${location}`,
  ).then(({ data }) => buildMenuTree(data));

  menuCache.set(location, request);
  return request;
}

export const fallbackMainMenu: MenuItem[] = buildMenuTree([
  { id: 1, parent: 0, title: "Accueil", url: "/", order: 1 },
  { id: 2, parent: 0, title: "Le cabinet", url: "/cabinet-architecture-rabat/", order: 2 },
  { id: 3, parent: 0, title: "Expertises", url: "#", order: 3 },
  { id: 4, parent: 3, title: "Équipements publics", url: "/architecte-equipements-publics-maroc/", order: 4 },
  { id: 5, parent: 3, title: "Résidences", url: "/architecte-residence-rabat/", order: 5 },
  { id: 6, parent: 3, title: "Villas", url: "/architecte-villa-rabat/", order: 6 },
  { id: 7, parent: 3, title: "Bureaux", url: "/architecte-bureau-rabat/", order: 7 },
  { id: 8, parent: 3, title: "Hospitality", url: "/architecte-hotel-rabat/", order: 8 },
  { id: 9, parent: 0, title: "Contact", url: "/contact-architecte-rabat/", order: 9 },
]);

export const fallbackFooterMenu: MenuItem[] = buildMenuTree([
  { id: 10, parent: 0, title: "Navigation", url: "#", order: 1 },
  { id: 11, parent: 10, title: "Accueil", url: "/", order: 2 },
  { id: 12, parent: 10, title: "Le cabinet", url: "/cabinet-architecture-rabat/", order: 3 },
  { id: 13, parent: 10, title: "Contact", url: "/contact-architecte-rabat/", order: 4 },
  { id: 14, parent: 0, title: "Expertises", url: "#", order: 5 },
  { id: 15, parent: 14, title: "Équipements publics", url: "/architecte-equipements-publics-maroc/", order: 6 },
  { id: 16, parent: 14, title: "Résidences", url: "/architecte-residence-rabat/", order: 7 },
  { id: 17, parent: 14, title: "Villas", url: "/architecte-villa-rabat/", order: 8 },
  { id: 18, parent: 14, title: "Bureaux", url: "/architecte-bureau-rabat/", order: 9 },
  { id: 19, parent: 14, title: "Hospitality", url: "/architecte-hotel-rabat/", order: 10 },
]);
