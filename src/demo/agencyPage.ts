import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { AgencyHeroProps } from "@/src/components/organisms/AgencyHero";
import type { AgencyProfileProps } from "@/src/components/organisms/AgencyProfile";
import type { ArchitecturalVisionProps } from "@/src/components/organisms/ArchitecturalVision";
import type { ExpertiseOverviewProps } from "@/src/components/organisms/ExpertiseOverview";
import type { ArchitecturalApproachProps } from "@/src/components/organisms/ArchitecturalApproach";
import type { ProjectCallToActionProps } from "@/src/components/organisms/ProjectCallToAction";

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

export const agencyPageDemoImageSources = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
] as const;

export const agencyHeroDemo: AgencyHeroProps = {
  kicker: text("Agence / BWS", "c2"),
  headline: heading("Cabinet d’architecture à Rabat", "h1", "t1"),
  description: text("BWS Architecture accompagne des projets résidentiels, professionnels et publics avec une méthode attentive au site, aux usages et à la qualité constructive.", "p1", true),
  actions: [action("Soumettre un projet", "/contact-architecte-rabat/", "primary"), action("Découvrir les expertises", "#expertises", "secondary")],
  primaryImage: {
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1900&q=88",
    alt: "Cabinet d’architecture à Rabat, image fictive de démonstration",
  },
  detailImage: {
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=86",
    alt: "Détail d’une façade contemporaine, image temporaire",
  },
  imageCaption: text("Contenu et photographies fictifs pour validation du gabarit Agence.", "c2"),
};

export const agencyProfileDemo: AgencyProfileProps = {
  kicker: text("01 — Le cabinet", "c2"),
  headline: heading("BWS Architecture, cabinet d’architecture à Rabat", "h2", "t2"),
  lead: text("Chaque projet est abordé comme une réponse particulière à un lieu, un programme et une manière d’habiter ou de travailler.", "p1"),
  paragraphs: [
    { text: text("Basé à Rabat, le cabinet développe des villas, résidences, bureaux, restaurants et bâtiments publics à partir d’une lecture précise du contexte.", "p2", true) },
    { text: text("Le site, les usages, les circulations et la lumière naturelle structurent les premières décisions avant toute recherche formelle.", "p2", true) },
    { text: text("L’objectif est de construire une cohérence durable entre expression architecturale, confort quotidien et réalité de mise en œuvre.", "p2", true) },
  ],
  image: {
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1900&q=86",
    alt: "Espace de travail d’un cabinet d’architecture, image fictive",
  },
  imageCaption: text("Atelier fictif — étude, dialogue et précision constructive.", "c2"),
};

export const architecturalVisionDemo: ArchitecturalVisionProps = {
  kicker: text("02 — Vision", "c2"),
  headline: heading("Une architecture sobre, fonctionnelle et durable", "h2", "t2"),
  introduction: text("La forme n’est pas isolée de l’usage : elle traduit le contexte, les proportions, la matière et le temps.", "p2", true),
  image: {
    url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=86",
    alt: "Trame et matière d’une façade architecturale contemporaine",
  },
  imageCaption: text("Étude fictive — rythme, matière et profondeur.", "c2"),
  principles: [
    { label: text("Sobriété", "c2"), title: heading("Donner une présence juste", "h3", "t4"), description: text("Les volumes et les détails sont hiérarchisés sans effets gratuits afin de laisser l’architecture parler avec mesure.", "p2", true) },
    { label: text("Fonction", "c2"), title: heading("Organiser le quotidien", "h3", "t4"), description: text("Les parcours, les seuils et les relations entre espaces rendent chaque lieu lisible et agréable à pratiquer.", "p2", true) },
    { label: text("Contexte", "c2"), title: heading("Répondre au lieu", "h3", "t4"), description: text("Orientation, climat, voisinage et paysage deviennent des données actives du projet architectural.", "p2", true) },
    { label: text("Durée", "c2"), title: heading("Construire pour évoluer", "h3", "t4"), description: text("Les matériaux et les structures sont pensés pour leur usage, leur vieillissement et leur capacité d’adaptation.", "p2", true) },
  ],
};

const projectTypeImages = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=84",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=84",
];

export const agencyProjectTypesDemo: ExpertiseOverviewProps = {
  kicker: text("03 — Programmes", "c2"),
  headline: heading("Des projets résidentiels, professionnels et publics", "h2", "t2"),
  introduction: text("Cinq familles de projets permettent d’aborder des échelles, des usages et des niveaux de complexité différents.", "p2", true),
  items: [
    { title: heading("Villas", "h3", "t4"), description: text("Des cadres de vie composés autour de l’intimité, de la lumière et du paysage.", "p2", true), image: { url: projectTypeImages[0], alt: "Villa contemporaine" }, destination: { destinationType: "external", externalLink: { title: "Architecte villa Rabat", url: "/architecte-villa-rabat/", target: "_self" } } },
    { title: heading("Résidences", "h3", "t4"), description: text("Des ensembles où orientations, accès et espaces partagés construisent la qualité d’usage.", "p2", true), image: { url: projectTypeImages[1], alt: "Résidence contemporaine" } },
    { title: heading("Bureaux", "h3", "t4"), description: text("Des environnements professionnels lisibles, flexibles et représentatifs.", "p2", true), image: { url: projectTypeImages[2], alt: "Bureaux contemporains" } },
    { title: heading("Restaurants", "h3", "t4"), description: text("Des lieux où parcours, atmosphère et fonctionnement soutiennent l’expérience.", "p2", true), image: { url: projectTypeImages[3], alt: "Restaurant contemporain" } },
    { title: heading("Bâtiments publics", "h3", "t4"), description: text("Des équipements accessibles, durables et clairement ancrés dans leur contexte.", "p2", true), image: { url: projectTypeImages[4], alt: "Architecture publique contemporaine" } },
  ],
};

export const agencyApproachDemo: ArchitecturalApproachProps = {
  kicker: text("04 — Accompagnement", "c2"),
  headline: heading("Un accompagnement architectural structuré", "h2", "t2"),
  introduction: text("Le projet progresse par décisions successives afin de conserver une direction claire, du premier échange à la définition architecturale.", "p2", true),
  principles: [
    { icon: "Compass", image: { url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=86", alt: "Carnet d’étude et première écoute du projet" }, label: text("01 / Échange", "c2"), title: heading("Comprendre la demande", "h3", "t4"), description: text("Le programme, les priorités et les contraintes sont clarifiés avant de dessiner.", "p2", true) },
    { icon: "Route", image: { url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=86", alt: "Analyse architecturale d’un site urbain" }, label: text("02 / Analyse", "c2"), title: heading("Lire le site et le programme", "h3", "t4"), description: text("Accès, orientation, réglementation et usages donnent une structure au projet.", "p2", true) },
    { icon: "Move3d", image: { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=86", alt: "Maquette et organisation spatiale fictives" }, label: text("03 / Espace", "c2"), title: heading("Organiser les volumes", "h3", "t4"), description: text("Les circulations, les proportions et la lumière composent un ensemble cohérent.", "p2", true) },
    { icon: "Layers3", image: { url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=86", alt: "Détail de matière architecturale" }, label: text("04 / Matière", "c2"), title: heading("Définir l’atmosphère", "h3", "t4"), description: text("Matières, ouvertures et détails traduisent l’intention architecturale.", "p2", true) },
    { icon: "TimerReset", image: { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86", alt: "Espace architectural finalisé, image fictive" }, label: text("05 / Clarté", "c2"), title: heading("Maintenir une direction", "h3", "t4"), description: text("Chaque choix est replacé dans une vision d’ensemble pour faire avancer le projet avec précision.", "p2", true) },
  ],
};

export const agencyCallToActionDemo: ProjectCallToActionProps = {
  kicker: text("05 — Votre projet", "c2"),
  headline: heading("Confier votre projet à un cabinet d’architecture à Rabat", "h2", "t2"),
  description: text("Présentez le lieu, le programme et vos premières priorités pour initier un échange avec BWS Architecture.", "p1", true),
  actions: [action("Présenter un projet", "/contact-architecte-rabat/", "primary"), action("Appeler le cabinet", "tel:+212537705220", "secondary")],
  image: {
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1700&q=86",
    alt: "Intérieur architectural contemporain, photographie temporaire",
  },
  imageCaption: text("BWS Architecture · Démonstration", "c2"),
};
