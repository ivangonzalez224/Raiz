import { z } from "zod";

export const activityTypeValues = [
  "CUBE_OF_TRUTH",
  "LEAFLETING",
  "TALKS",
  "PROTEST",
  "OUTREACH_STALL",
  "OTHER",
] as const;

export const activityTypeLabels: Record<(typeof activityTypeValues)[number], string> = {
  CUBE_OF_TRUTH: "Cubo de la verdad",
  LEAFLETING: "Leafleting",
  TALKS: "Charlas",
  PROTEST: "Protesta",
  OUTREACH_STALL: "Stand informativo",
  OTHER: "Otro",
};

export const groupSchema = z.object({
  name: z.string().min(3, "Muy corto").max(80, "Muy largo"),
  description: z.string().min(20, "Contanos un poco más (mínimo 20 caracteres)").max(600),
  city: z.string().min(2, "Requerido"),
  country: z.string().min(2, "Requerido"),
  countryCode: z
    .string()
    .length(2, "Usa el código ISO2, ej. PE, MX, AR")
    .transform((v) => v.toUpperCase()),
  activityTypes: z
    .array(z.enum(activityTypeValues))
    .min(1, "Elegí al menos una actividad"),
  meetingFrequency: z.string().max(60).optional(),
  instagram: z.string().url("URL inválida").optional().or(z.literal("")),
  whatsapp: z.string().max(30).optional().or(z.literal("")),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

export type GroupFormValues = z.infer<typeof groupSchema>;
