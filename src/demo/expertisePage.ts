import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { ExpertiseHeroProps } from "@/src/components/organisms/ExpertiseHero";
import type { ExpertiseIntroductionProps } from "@/src/components/organisms/ExpertiseIntroduction";
import type { ExpertiseFocusProps } from "@/src/components/organisms/ExpertiseFocus";
import type { ProjectGalleryProps } from "@/src/components/organisms/ProjectGallery";
import type { ExpertiseBenefitsProps } from "@/src/components/organisms/ExpertiseBenefits";
import type { ProjectCallToActionProps } from "@/src/components/organisms/ProjectCallToAction";

const action = (title: string, url: string, intent: "primary" | "secondary" = "primary") => ({
  intent,
  destinationType: "external" as const,
  link: { title, url, target: "_self" as const },
});

const heading = (content: string, as: HeadingData["as"] = "h2", level: HeadingData["level"] = "t2"): HeadingData => ({ content, as, level, justify: "start" });
const text = (content: string, level: TextData["level"] = "p2", muted = false): TextData => ({ content, as: "p", level, justify: "start", muted });

export const expertisePageDemoImageSources = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
] as const;

export const villasHeroDemo: ExpertiseHeroProps = {
  kicker: text("Expertise / Villas", "c2"),
  headline: heading("Architecte villa à Rabat pour projets résidentiels haut standing", "h1", "t1"),
  description: text("BWS Architecture conçoit des villas contemporaines à partir du terrain, du mode de vie et des ambitions propres à chaque projet.", "p1", true),
  actions: [action("Soumettre un projet de villa", "#projet", "primary"), action("Découvrir l’approche BWS", "#approche-expertise", "secondary")],
  image: { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=88", alt: "Architecte villa Rabat BWS Architecture — image temporaire de démonstration" },
  imageCaption: text("Contenu et photographie fictifs pour validation du gabarit.", "c2"),
};

export const villasIntroductionDemo: ExpertiseIntroductionProps = {
  kicker: text("01 — Concevoir", "c2"),
  headline: heading("Concevoir une villa à Rabat avec un cabinet d’architecture premium", "h2", "t2"),
  lead: text("Une villa commence par une lecture précise du site avant de devenir une composition de volumes, de lumière et d’usages.", "p1"),
  paragraphs: [
    { text: text("L’orientation, les accès, le voisinage et les contraintes réglementaires structurent les premières décisions du projet.", "p2", true) },
    { text: text("Le programme traduit ensuite le quotidien des habitants : recevoir, se retirer, circuler et profiter des espaces extérieurs.", "p2", true) },
    { text: text("Cette cohérence permet de viser une architecture confortable et durable sans séparer l’expression architecturale de la réalité constructive.", "p2", true) },
  ],
  image: { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86", alt: "Intérieur de villa contemporaine, image fictive" },
  imageCaption: text("Étude fictive — matière, lumière et continuité des espaces.", "c2"),
};

export const villasFocusDemo: ExpertiseFocusProps = {
  kicker: text("02 — Priorités", "c2"),
  headline: heading("Une approche centrée sur le terrain, la lumière et le mode de vie", "h2", "t2"),
  introduction: text("Quatre axes organisent la conception sans imposer une réponse formelle identique à chaque projet.", "p2", true),
  items: [
    { label: text("Terrain", "c2"), title: heading("Lire avant d’implanter", "h3", "t3"), description: text("Topographie, orientations, vues et voisinage déterminent une implantation juste et les premières relations au jardin.", "p2", true), image: { url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1500&q=86", alt: "Villa implantée dans un paysage arboré" } },
    { label: text("Lumière naturelle", "c2"), title: heading("Éclairer sans exposer", "h3", "t3"), description: text("Les ouvertures, patios et protections solaires accompagnent la journée tout en maîtrisant le confort thermique.", "p2", true), image: { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=86", alt: "Lumière naturelle dans une villa contemporaine" } },
    { label: text("Intimité", "c2"), title: heading("Composer des degrés de retrait", "h3", "t3"), description: text("Seuils, cadrages et distributions protègent les espaces privés sans refermer la maison sur elle-même.", "p2", true), image: { url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1500&q=86", alt: "Patio privé d’une maison contemporaine" } },
    { label: text("Mode de vie", "c2"), title: heading("Faire du plan un usage quotidien", "h3", "t3"), description: text("Les séquences intérieures et extérieures se construisent autour des habitudes réelles, des réceptions et des temps familiaux.", "p2", true), image: { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=86", alt: "Espace de vie ouvert sur l’extérieur" } },
  ],
};

export const villasProjectsDemo: ProjectGalleryProps = {
  kicker: text("03 — Sélection", "c2"),
  headline: heading("Aperçu de projets de villas", "h2", "t2"),
  introduction: text("Galerie fictive de développement. Les noms, descriptions et photographies devront être remplacés par les contenus autorisés du cabinet.", "p2", true),
  projects: [
    { title: heading("Villa AC", "h3", "t4"), category: text("Villa · Rabat", "c1"), description: text("Une maison organisée autour d’un patio protégé et d’une séquence d’ombres.", "p2", true), image: { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=86", alt: "Villa AC, visuel temporaire" } },
    { title: heading("Villa BA", "h3", "t5"), category: text("Villa · Démonstration", "c1"), description: text("Deux volumes articulent les espaces de réception et la vie familiale.", "p3", true), image: { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1500&q=86", alt: "Villa BA, visuel temporaire" } },
    { title: heading("Villa HRB", "h3", "t5"), category: text("Villa · Démonstration", "c1"), description: text("Une façade filtrante règle les vues et la lumière de l’après-midi.", "p3", true), image: { url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=86", alt: "Villa HRB, visuel temporaire" } },
    { title: heading("Villa SOB", "h3", "t5"), category: text("Villa · Démonstration", "c1"), description: text("Le jardin prolonge les espaces communs sous une toiture horizontale.", "p3", true), image: { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86", alt: "Villa SOB, visuel temporaire" } },
    { title: heading("Villa SOH", "h3", "t5"), category: text("Villa · Démonstration", "c1"), description: text("Une composition minérale accompagne la pente et cadre le paysage.", "p3", true), image: { url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=86", alt: "Villa SOH, visuel temporaire" } },
  ],
};

export const villasBenefitsDemo: ExpertiseBenefitsProps = {
  kicker: text("04 — BWS", "c2"),
  headline: heading("Pourquoi confier votre villa à BWS Architecture ?", "h2", "t2"),
  introduction: text("Des engagements de conception exprimés ici avec du contenu provisoire de démonstration.", "p2", true),
  items: [
    { label: text("Sur mesure", "c2"), title: heading("Une conception propre à votre projet", "h3", "t4"), description: text("Le programme et l’identité de la maison se construisent autour du site et de vos usages, sans reproduire une formule prédéfinie.", "p2", true) },
    { label: text("Contexte", "c2"), title: heading("Une lecture attentive du terrain", "h3", "t4"), description: text("Les décisions d’implantation, d’orientation et d’ouverture répondent aux qualités comme aux contraintes réelles de la parcelle.", "p2", true) },
    { label: text("Cohérence", "c2"), title: heading("Une architecture élégante et fonctionnelle", "h3", "t4"), description: text("L’expression des volumes reste liée aux circulations, au confort et à la manière dont les espaces seront vécus.", "p2", true) },
    { label: text("Accompagnement", "c2"), title: heading("Un projet structuré par étapes", "h3", "t4"), description: text("Les choix sont organisés et expliqués afin de maintenir une direction claire de la première intention à la mise en œuvre.", "p2", true) },
  ],
};

export const villasCallToActionDemo: ProjectCallToActionProps = {
  kicker: text("05 — Votre projet", "c2"),
  headline: heading("Vous avez un projet de villa à Rabat ?", "h2", "t2"),
  description: text("Présentez-nous le terrain, le programme envisagé et vos premières priorités pour initier un échange avec le cabinet.", "p1", true),
  actions: [action("Soumettre un projet de villa", "/contact-architecte-rabat/", "primary"), action("Appeler le cabinet", "tel:+212537705220", "secondary")],
  image: { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=86", alt: "Projet de villa contemporaine, photographie temporaire" },
  imageCaption: text("BWS Architecture · Démonstration", "c2"),
};