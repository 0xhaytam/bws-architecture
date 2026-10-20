import * as z from "zod";

const phoneRegex = /^\+?[\d\s\-\(\)\.]+$/;

export const subjectValues = ["rendez-vous", "information", "tarifs", "autre"] as const;

export type SubjectValue = (typeof subjectValues)[number];

export const contactSchema = z.object({
  name: z.string().check(
    z.minLength(1, { message: "Le nom est requis" }),
    z.maxLength(100, {
      message: "Le nom ne peut pas dépasser 100 caractères",
    }),
  ),
  phone: z
    .string()
    .check(
      z.minLength(10, { message: "Le numéro de téléphone n'est pas valide" }),
      z.maxLength(20, {
        message: "Le téléphone ne peut pas dépasser 20 caractères",
      }),
    )
    .refine((val) => !val || phoneRegex.test(val), {
      message: "Format de téléphone invalide",
    })
    .optional(),
  email: z.string().check(
    z.minLength(1, { message: "L'adresse email est requise" }),
    z.maxLength(254, {
      message: "L'email ne peut pas dépasser 254 caractères",
    }),
    z.email({ message: "Email invalide" }),
  ),
  // subject: z.string().check(
  //   z.minLength(1, { message: "Le sujet est requis" }),
  // ).refine((val) => subjectValues.includes(val as SubjectValue), {
  //   message: "Veuillez sélectionner un sujet valide",
  // }),
  // message: z.string().check(
  //   z.minLength(1, { message: "Le message est requis" }),
  //   z.maxLength(2000, {
  //     message: "Le message ne peut pas dépasser 2000 caractères",
  //   }),
  // ),
  turnstile_token: z.string().check(
    z.minLength(1, {
      message: "Veuillez vérifier que vous n'êtes pas un robot",
    }),
  ),
});

export type ContactSchema = z.infer<typeof contactSchema>;
