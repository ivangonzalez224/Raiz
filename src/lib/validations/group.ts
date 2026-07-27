import { z } from "zod";

export const activityTypeValues = [
  "CUBE_OF_TRUTH",
  "OUTREACH_STREET",
  "TALKS",
  "PROTEST",
  "OUTREACH_STALL",
  "OTHER",
] as const;

export const activityTypeLabels: Record<(typeof activityTypeValues)[number], string> = {
  CUBE_OF_TRUTH: "Cubo de la verdad",
  OUTREACH_STREET: "Outreach de calle",
  TALKS: "Charlas",
  PROTEST: "Protesta",
  OUTREACH_STALL: "Stand informativo",
  OTHER: "Otro",
};

export const groupSchema = z
  .object({
    name: z.string().min(3, "Muy corto").max(80, "Muy largo"),
    description: z
      .string()
      .min(20, "Contanos un poco más (mínimo 20 caracteres)")
      .max(600),
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
    latitude: z.string().optional().or(z.literal("")),
    longitude: z.string().optional().or(z.literal("")),

    socialMediaUrl: z
      .string()
      .url(
        "Ingresa el link completo de una red social (ej. https://instagram.com/tu_cuenta)",
      ),
    whatsapp: z.string().max(30).optional().or(z.literal("")),
    website: z.string().url("URL inválida").optional().or(z.literal("")),
    email: z.string().email("Email inválido").optional().or(z.literal("")),

    nextEventTitle: z.string().max(100).optional().or(z.literal("")),
    nextEventDescription: z.string().max(1000).optional().or(z.literal("")),
    nextEventAddress: z.string().max(200).optional().or(z.literal("")),
    nextEventDateTime: z.string().optional().or(z.literal("")),
    nextEventInstructions: z.string().max(1000).optional().or(z.literal("")),
    nextEventRequirements: z.string().max(1000).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      const hasAnyEventField = Boolean(
        data.nextEventTitle ||
        data.nextEventDescription ||
        data.nextEventAddress ||
        data.nextEventDateTime ||
        data.nextEventInstructions ||
        data.nextEventRequirements,
      );
      if (!hasAnyEventField) return true;
      return Boolean(
        data.nextEventTitle && data.nextEventAddress && data.nextEventDateTime,
      );
    },
    {
      message:
        "Si agregas un próximo evento, completa al menos título, dirección y fecha/hora",
      path: ["nextEventTitle"],
    },
  );

export type GroupFormValues = z.infer<typeof groupSchema>;
