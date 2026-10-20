import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { HomeHeroProps } from "@/src/components/organisms/HomeHero";
import type { PracticeIntroductionProps } from "@/src/components/organisms/PracticeIntroduction";
import type { ExpertiseOverviewProps } from "@/src/components/organisms/ExpertiseOverview";
import type { ProjectGalleryProps } from "@/src/components/organisms/ProjectGallery";
import type { ArchitecturalApproachProps } from "@/src/components/organisms/ArchitecturalApproach";
import type { ProjectInvitationProps } from "@/src/components/organisms/ProjectInvitation";

export const demoImageSources = [
  "https://unsplash.com/photos/p2TQ-3Bh3Oo",
  "https://unsplash.com/photos/2d4lAQAlbDA",
  "https://unsplash.com/photos/XJnP4L958ds",
  "https://unsplash.com/photos/561igiTyvSk",
  "https://unsplash.com/photos/mQiZnKwGXW0",
  "https://unsplash.com/photos/tleCJiDOri0",
] as const;

const action = (title: string, url: string, intent: "primary" | "secondary" = "primary") => ({
  intent,
  destinationType: "external" as const,
  link: { title, url, target: "_self" as const },
});

const heading = (
  content: string,
  as: HeadingData["as"] = "h2",
  level: HeadingData["level"] = "t2",
): HeadingData => ({ content, as, level, justify: "start" });

const text = (
  content: string,
  level: TextData["level"] = "p2",
  muted = false,
): TextData => ({ content, as: "p", level, justify: "start", muted });

export const homeHeroDemo: HomeHeroProps = {
  kicker: text("Cabinet d'architecture à Rabat", "c1"),
  headline: heading("Des lieux précis, dessinés pour durer.", "h1", "t1"),
  description: text("BWS Architecture conçoit des villas, résidences et espaces professionnels à partir du contexte, des usages et de la matière.", "p1", true),
  actions: [action("Présenter un projet", "#projet", "primary"), action("Voir les expertises", "#expertises", "secondary")],
  image: {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88",
    alt: "Maison contemporaine aux lignes géométriques, image temporaire de démonstration",
  },
  imageCaption: text("Étude fictive 01 — volumes, ombre portée et continuité du jardin.", "c2"),
};

export const practiceIntroductionDemo: PracticeIntroductionProps = {
  indexLabel: text("01 — Le cabinet", "c2"),
  headline: heading("Observer avant de dessiner.", "h2", "t2"),
  image: {
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=86",
    alt: "Atelier d'architecture lumineux, image fictive de démonstration",
  },
  imageCaption: text("Le dessin comme outil de dialogue, de mesure et de décision.", "c2"),
  paragraphs: [
    { text: text("Chaque mission commence par une lecture attentive du site, du programme et des usages.", "p1") },
    { text: text("Le dessin organise les volumes, la lumière naturelle et les circulations pour produire des espaces sobres, fonctionnels et durables.", "p2", true) },
    { text: text("Cette approche relie l'intention architecturale aux réalités techniques, de la première esquisse jusqu'à la réalisation.", "p2", true) },
  ],
  agencyAction: action("Découvrir le cabinet", "/cabinet-architecture-rabat/"),
};

const expertiseImages = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=84",
];

export const expertiseOverviewDemo: ExpertiseOverviewProps = {
  kicker: text("02 — Expertises", "c2"),
  headline: heading("Des programmes différents. Une même précision.", "h2", "t2"),
  introduction: text("Le cabinet intervient à plusieurs échelles avec une attention constante portée à la qualité d'usage et à la cohérence constructive.", "p2", true),
  items: [
    { title: heading("Villas", "h3", "t4"), description: text("Volumes, intimité, lumière et paysage composent un cadre de vie cohérent.", "p2", true), image: { url: expertiseImages[0], alt: "Villa contemporaine" }, destination: { destinationType: "external", externalLink: { title: "Architecte villa Rabat", url: "/architecte-villa-rabat/", target: "_self" } } },
    { title: heading("Résidences", "h3", "t4"), description: text("Des ensembles pensés pour la qualité des parcours, des orientations et des espaces partagés.", "p2", true), image: { url: expertiseImages[1], alt: "Résidence contemporaine" } },
    { title: heading("Bureaux", "h3", "t4"), description: text("Des environnements professionnels lisibles, flexibles et représentatifs.", "p2", true), image: { url: expertiseImages[2], alt: "Bureaux contemporains" } },
    { title: heading("Restaurants", "h3", "t4"), description: text("L'expérience, la circulation et l'atmosphère servent le concept culinaire.", "p2", true), image: { url: expertiseImages[3], alt: "Restaurant contemporain" } },
    { title: heading("Bâtiments publics", "h3", "t4"), description: text("Des équipements accessibles, durables et ancrés dans leur contexte.", "p2", true), image: { url: expertiseImages[4], alt: "Architecture publique contemporaine" } },
  ],
};

export const projectGalleryDemo: ProjectGalleryProps = {
  kicker: text("03 — Sélection", "c2"),
  headline: heading("Quelques manières d'habiter le contexte.", "h2", "t2"),
  introduction: text("Une sélection fictive qui montre la diversité des échelles, des matières et des relations au paysage.", "p2", true),
  projects: [
    { title: heading("Maison Sillage", "h3", "t4"), category: text("Villa · Rabat", "c1"), description: text("Une séquence d'espaces cadrée par la lumière et le jardin.", "p2", true), image: { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86", alt: "Intérieur contemporain lumineux" } },
    { title: heading("Patio Nord", "h3", "t5"), category: text("Résidence · Casablanca", "c1"), description: text("Des logements distribués autour d'un vide partagé.", "p3", true), image: { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=86", alt: "Architecture résidentielle contemporaine" } },
    { title: heading("Atelier 17", "h3", "t5"), category: text("Bureaux · Rabat", "c1"), description: text("Une trame rationnelle rend les espaces évolutifs et lisibles.", "p3", true), image: { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=86", alt: "Bureau contemporain" } },
    { title: heading("Cour Minérale", "h3", "t5"), category: text("Restaurant · Marrakech", "c1"), description: text("Une atmosphère fraîche construite par l'ombre et la matière.", "p3", true), image: { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86", alt: "Espace architectural minéral" } },
    { title: heading("Maison Ligne", "h3", "t5"), category: text("Villa · Kénitra", "c1"), description: text("Une toiture horizontale prolonge la maison vers le jardin.", "p3", true), image: { url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=86", alt: "Maison moderne blanche" } },
    { title: heading("Forum Clair", "h3", "t5"), category: text("Équipement public · Maroc", "c1"), description: text("Un volume collectif articulé autour d'un cœur lumineux.", "p3", true), image: { url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=86", alt: "Façade architecturale géométrique" } },
  ],
};

export const architecturalApproachDemo: ArchitecturalApproachProps = {
  kicker: text("04 — Approche", "c2"),
  headline: heading("Un projet se construit par décisions successives.", "h2", "t2"),
  introduction: text("Le site, le programme et les usages deviennent une structure claire qui guide les volumes, les matières et la mise en œuvre.", "p2", true),
  principles: [
    { icon: "Compass", image: { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=86", alt: "Maison contemporaine inscrite dans son site" }, label: text("01 / Site", "c2"), title: heading("Lire le contexte", "h3", "t4"), description: text("Orientation, climat, voisinage et topographie déterminent les premières lignes.", "p2", true) },
    { icon: "Route", image: { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86", alt: "Parcours et seuils dans une architecture contemporaine" }, label: text("02 / Usage", "c2"), title: heading("Organiser les parcours", "h3", "t4"), description: text("Séquences, seuils et circulations rendent chaque espace évident à pratiquer.", "p2", true) },
    { icon: "Sun", image: { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86", alt: "LumiÃ¨re naturelle dans un espace rÃ©sidentiel" }, label: text("03 / Lumière", "c2"), title: heading("Cadrer le naturel", "h3", "t4"), description: text("Ouvertures et protections solaires modulent la lumière au fil du jour.", "p2", true) },
    { icon: "Move3d", image: { url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=86", alt: "Volumes gÃ©omÃ©triques dâ€™une maison moderne" }, label: text("04 / Volume", "c2"), title: heading("Hiérarchiser les formes", "h3", "t4"), description: text("Les proportions donnent une présence juste, sans effets gratuits.", "p2", true) },
    { icon: "Layers3", image: { url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=86", alt: "MatiÃ¨re et trame dâ€™une faÃ§ade architecturale" }, label: text("05 / Matière", "c2"), title: heading("Construire avec justesse", "h3", "t4"), description: text("Les matériaux sont choisis pour leur expression et leur vieillissement.", "p2", true) },
    { icon: "TimerReset", image: { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86", alt: "Architecture conÃ§ue pour Ã©voluer dans le temps" }, label: text("06 / Durée", "c2"), title: heading("Anticiper l'évolution", "h3", "t4"), description: text("Une structure claire accueille le temps et les nouveaux usages.", "p2", true) },
  ],
};

export const projectInvitationDemo: ProjectInvitationProps = {
  kicker: text("05 — Échange", "c1"),
  headline: heading("Prêt à transformer votre espace ?", "h2", "t3"),
  description: text("Parlez-nous du lieu, du programme et des ambitions de votre projet.", "p1", true),
  image: {
    url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=88",
    alt: "Façade architecturale contemporaine aux motifs géométriques",
  },
  imageCaption: text("BWS Architecture · Rabat", "c2"),
  contactItems: [
    { icon: "MapPin", title: heading("Adresse", "h3", "t5"), details: text("12 Place Sefrou\nRabat 10000, Maroc", "p3", true) },
    { icon: "Phone", title: heading("Téléphone", "h3", "t5"), details: text("+212 5 37 70 52 20", "p3", true), destination: { destinationType: "external", externalLink: { title: "Appeler", url: "tel:+212537705220", target: "_self" } } },
    { icon: "Mail", title: heading("Email", "h3", "t5"), details: text("contact@bws-architecture.ma", "p3", true), destination: { destinationType: "external", externalLink: { title: "Écrire", url: "mailto:contact@bws-architecture.ma", target: "_self" } } },
    { icon: "Clock", title: heading("Horaires", "h3", "t5"), details: text("Lundi – vendredi · 9h00 – 18h00\nSamedi · sur rendez-vous", "p3", true) },
  ],
  submitLabel: "Envoyer",
  privacyNote: text("Vos informations servent uniquement à répondre à votre demande.", "c2", true),
};
