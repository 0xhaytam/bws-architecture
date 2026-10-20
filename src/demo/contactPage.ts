import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { ContactHeroProps } from "@/src/components/organisms/ContactHero";
import type { ProjectSubmissionProps } from "@/src/components/organisms/ProjectSubmission";
import type { ContactDetailsProps } from "@/src/components/organisms/ContactDetails";
import type { ExpertiseOverviewProps } from "@/src/components/organisms/ExpertiseOverview";
import type { ContactLocationProps } from "@/src/components/organisms/ContactLocation";
import type { ContactReassuranceProps } from "@/src/components/organisms/ContactReassurance";
import { agencyProjectTypesDemo } from "@/src/demo/agencyPage";

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

export const contactPageDemoImageSources = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
] as const;

export const contactHeroDemo: ContactHeroProps = {
  kicker: text("Contact / Rabat", "c2"),
  headline: heading("Contact architecte Rabat — présenter votre projet à BWS Architecture", "h1", "t1"),
  description: text("Vous préparez une villa, une résidence, un espace professionnel ou un équipement public ? Présentez le lieu, le programme et vos premières priorités.", "p1", true),
  actions: [action("Soumettre un projet", "#soumettre-projet", "primary"), action("Appeler le cabinet", "tel:+212537705220", "secondary")],
  image: {
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1900&q=88",
    alt: "Contact architecte Rabat BWS Architecture, image temporaire de démonstration",
  },
  imageCaption: text("Contenu et photographie fictifs pour validation du gabarit Contact.", "c2"),
};

export const projectSubmissionDemo: ProjectSubmissionProps = {
  kicker: text("01 — Votre demande", "c2"),
  headline: heading("Soumettre un projet architectural", "h2", "t2"),
  introduction: text("Partagez les données déjà disponibles. Les informations facultatives peuvent rester à définir à ce stade.", "p2", true),
  guidance: text("Le formulaire rassemble le type de projet, sa localisation, son échelle et les premières contraintes sans demander de document à téléverser.", "p2", true),
  submitLabel: "Envoyer ma demande",
  privacyNote: text("Vos informations servent uniquement à examiner votre demande et à reprendre contact avec vous.", "c2", true),
};

export const contactDetailsDemo: ContactDetailsProps = {
  kicker: text("02 — Coordonnées", "c2"),
  headline: heading("Coordonnées BWS Architecture", "h2", "t2"),
  introduction: text("Le téléphone reste le moyen de contact prioritaire. L’email et les horaires affichés sont provisoires dans cette démonstration.", "p2", true),
  items: [
    { icon: "Phone", title: heading("Téléphone", "h3", "t5"), details: text("+212 5 37 70 52 20", "p2"), destination: { destinationType: "external", externalLink: { title: "Appeler le cabinet", url: "tel:+212537705220", target: "_self" } } },
    { icon: "Mail", title: heading("Email", "h3", "t5"), details: text("contact@bws-architecture.ma\nAdresse provisoire", "p2", true), destination: { destinationType: "external", externalLink: { title: "Écrire au cabinet", url: "mailto:contact@bws-architecture.ma", target: "_self" } } },
    { icon: "MapPin", title: heading("Adresse", "h3", "t5"), details: text("12 Pl. Sefrou\nRabat 10000, Maroc", "p2", true), destination: { destinationType: "external", externalLink: { title: "Ouvrir l’itinéraire", url: "https://maps.app.goo.gl/aBW5YZ27Uo99ENNo8", target: "_blank" } } },
    { icon: "Clock", title: heading("Horaires", "h3", "t5"), details: text("Lundi – vendredi · horaires provisoires\nSamedi · sur rendez-vous", "p2", true) },
  ],
};

export const contactProjectTypesDemo: ExpertiseOverviewProps = {
  ...agencyProjectTypesDemo,
  kicker: text("03 — Types de projets", "c2"),
  headline: heading("Présenter un projet de villa, résidence ou espace professionnel", "h2", "t2"),
  introduction: text("Le formulaire accepte plusieurs familles de programmes. Seule la page Villas dispose actuellement d’un contenu détaillé publié.", "p2", true),
};

export const contactLocationDemo: ContactLocationProps = {
  kicker: text("04 — Implantation", "c2"),
  headline: heading("Architecte à Rabat et au Maroc", "h2", "t2"),
  introduction: text("Le cabinet est implanté à Rabat et étudie des projets ailleurs au Maroc selon leur nature et leur contexte.", "p2", true),
  mapEmbedUrl: "https://www.google.com/maps?q=12%20Place%20Sefrou%2C%20Rabat%2010000%2C%20Morocco&output=embed",
  address: text("12 Place Sefrou\nRabat 10000, Maroc", "p1"),
  serviceNote: text("Base principale à Rabat. Les demandes situées dans d’autres villes du Maroc sont examinées selon le programme, le site et les conditions de mission.", "p2", true),
  directionsAction: {
    destinationType: "external",
    link: { title: "Obtenir l’itinéraire", url: "https://maps.app.goo.gl/aBW5YZ27Uo99ENNo8", target: "_blank" },
  },
};

export const contactReassuranceDemo: ContactReassuranceProps = {
  kicker: text("05 — Premier échange", "c2"),
  headline: heading("Un premier échange pour cadrer votre projet", "h2", "t2"),
  description: text("La demande permet de réunir les informations essentielles avant de définir les prochaines étapes avec le cabinet.", "p2", true),
  points: [
    { title: heading("Situer", "h3", "t4"), description: text("Type de projet, localisation et état d’avancement donnent le premier cadre de lecture.", "p2", true) },
    { title: heading("Comprendre", "h3", "t4"), description: text("Usages, objectifs, contraintes et budget estimatif précisent les priorités.", "p2", true) },
    { title: heading("Orienter", "h3", "t4"), description: text("Les informations réunies servent à préparer un échange clair sur la suite envisageable.", "p2", true) },
  ],
  action: action("Envoyer ma demande", "#soumettre-projet"),
};
