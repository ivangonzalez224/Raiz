import { describe, expect, it } from "vitest";
import { computeGroupChanges } from "@/lib/group-changes";

const baseGroup = {
  name: "Cubo de la Verdad Lima",
  description: "Descripción original de la agrupación.",
  city: "Lima",
  country: "Perú",
  countryCode: "PE",
  meetingFrequency: "Semanal",
  instagram: "https://instagram.com/cubolima",
  whatsapp: "",
  website: "",
  email: "",
  activityTypes: ["CUBE_OF_TRUTH"],
};

describe("computeGroupChanges", () => {
  it("no detecta cambios cuando los datos son idénticos", () => {
    const changes = computeGroupChanges(baseGroup, { ...baseGroup });
    expect(changes).toEqual({});
  });

  it("detecta un cambio en un campo simple", () => {
    const changes = computeGroupChanges(baseGroup, {
      ...baseGroup,
      description: "Nueva descripción actualizada.",
    });
    expect(changes).toEqual({
      description: {
        antes: "Descripción original de la agrupación.",
        despues: "Nueva descripción actualizada.",
      },
    });
  });

  it("detecta varios cambios a la vez", () => {
    const changes = computeGroupChanges(baseGroup, {
      ...baseGroup,
      city: "Callao",
      meetingFrequency: "Mensual",
    });
    expect(Object.keys(changes).sort()).toEqual(["city", "meetingFrequency"]);
    expect(changes.city).toEqual({ antes: "Lima", despues: "Callao" });
  });

  it("detecta cambios cuando se agregan tipos de actividad", () => {
    const changes = computeGroupChanges(baseGroup, {
      ...baseGroup,
      activityTypes: ["CUBE_OF_TRUTH", "LEAFLETING"],
    });
    expect(changes.activityTypes).toEqual({
      antes: ["CUBE_OF_TRUTH"],
      despues: ["CUBE_OF_TRUTH", "LEAFLETING"],
    });
  });

  it("no marca activityTypes como cambiado si la lista es igual", () => {
    const changes = computeGroupChanges(baseGroup, {
      ...baseGroup,
      activityTypes: ["CUBE_OF_TRUTH"],
    });
    expect(changes.activityTypes).toBeUndefined();
  });

  it("trata null y string vacío como equivalentes (no marca cambio falso)", () => {
    const changes = computeGroupChanges(
      { ...baseGroup, instagram: null },
      { ...baseGroup, instagram: "" },
    );
    expect(changes.instagram).toBeUndefined();
  });
});
