import { describe, expect, it } from "vitest";
import { groupSchema } from "@/lib/validations/group";

const validInput = {
  name: "Cubo de la Verdad Lima",
  description: "Activismo callejero semanal en el centro de Lima, todos los sábados.",
  city: "Lima",
  country: "Perú",
  countryCode: "pe",
  activityTypes: ["CUBE_OF_TRUTH"],
  meetingFrequency: "Semanal",
  socialMediaUrl: "https://instagram.com/cubolima",
  whatsapp: "",
  website: "",
  email: "",
};

describe("groupSchema", () => {
  it("acepta datos válidos y pone countryCode en mayúsculas", () => {
    const result = groupSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.countryCode).toBe("PE");
    }
  });

  it("rechaza un nombre muy corto", () => {
    const result = groupSchema.safeParse({ ...validInput, name: "AB" });
    expect(result.success).toBe(false);
  });

  it("rechaza una descripción muy corta", () => {
    const result = groupSchema.safeParse({ ...validInput, description: "Muy corta" });
    expect(result.success).toBe(false);
  });

  it("rechaza cuando no se elige ningún tipo de actividad", () => {
    const result = groupSchema.safeParse({ ...validInput, activityTypes: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Elegí al menos una actividad");
    }
  });

  it("rechaza un código de país que no tenga 2 letras", () => {
    const result = groupSchema.safeParse({ ...validInput, countryCode: "per" });
    expect(result.success).toBe(false);
  });

  it("permite campos opcionales vacíos (whatsapp, website, email)", () => {
    const result = groupSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rechaza si falta la red social (ahora es obligatoria)", () => {
    const result = groupSchema.safeParse({ ...validInput, socialMediaUrl: "" });
    expect(result.success).toBe(false);
  });

  it("rechaza una URL inválida en la red social", () => {
    const result = groupSchema.safeParse({
      ...validInput,
      socialMediaUrl: "no-es-una-url",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza un email inválido cuando se proporciona", () => {
    const result = groupSchema.safeParse({ ...validInput, email: "no-es-un-email" });
    expect(result.success).toBe(false);
  });

  it("rechaza un tipo de actividad que no existe en el catálogo", () => {
    const result = groupSchema.safeParse({
      ...validInput,
      activityTypes: ["BAILE_VEGANO"],
    });
    expect(result.success).toBe(false);
  });

  it("acepta un próximo evento completo (título, dirección y fecha)", () => {
    const result = groupSchema.safeParse({
      ...validInput,
      nextEventTitle: "Cubo de la verdad",
      nextEventAddress: "Parque Kennedy, Miraflores",
      nextEventDateTime: "2026-08-01T18:30",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza un próximo evento incompleto (falta la dirección)", () => {
    const result = groupSchema.safeParse({
      ...validInput,
      nextEventTitle: "Cubo de la verdad",
      nextEventDateTime: "2026-08-01T18:30",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["nextEventTitle"]);
    }
  });
});
