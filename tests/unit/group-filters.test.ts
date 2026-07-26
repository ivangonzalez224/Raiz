import { describe, expect, it } from "vitest";
import { buildGroupWhere } from "@/lib/group-filters";

describe("buildGroupWhere", () => {
  it("siempre filtra por status APPROVED, sin filtros adicionales", () => {
    const where = buildGroupWhere({});
    expect(where).toEqual({ status: "APPROVED" });
  });

  it("agrega el filtro de país cuando se proporciona", () => {
    const where = buildGroupWhere({ country: "Perú" });
    expect(where).toEqual({ status: "APPROVED", country: "Perú" });
  });

  it("agrega el filtro de ciudad cuando se proporciona", () => {
    const where = buildGroupWhere({ city: "Lima" });
    expect(where).toEqual({ status: "APPROVED", city: "Lima" });
  });

  it("agrega el filtro de tipo de actividad cuando es válido", () => {
    const where = buildGroupWhere({ activity: "CUBE_OF_TRUTH" });
    expect(where).toEqual({
      status: "APPROVED",
      activityTypes: { has: "CUBE_OF_TRUTH" },
    });
  });

  it("ignora un tipo de actividad que no existe en el catálogo", () => {
    const where = buildGroupWhere({ activity: "BAILE_VEGANO" });
    expect(where).toEqual({ status: "APPROVED" });
  });

  it("agrega búsqueda por nombre insensible a mayúsculas", () => {
    const where = buildGroupWhere({ q: "cubo" });
    expect(where).toEqual({
      status: "APPROVED",
      name: { contains: "cubo", mode: "insensitive" },
    });
  });

  it("combina todos los filtros a la vez", () => {
    const where = buildGroupWhere({
      country: "Perú",
      city: "Lima",
      activity: "OUTREACH_STREET",
      q: "vegan",
    });
    expect(where).toEqual({
      status: "APPROVED",
      country: "Perú",
      city: "Lima",
      activityTypes: { has: "OUTREACH_STREET" },
      name: { contains: "vegan", mode: "insensitive" },
    });
  });
});
