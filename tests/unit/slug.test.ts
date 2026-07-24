import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("convierte a minúsculas y reemplaza espacios por guiones", () => {
    expect(slugify("Cubo de la Verdad Lima")).toBe("cubo-de-la-verdad-lima");
  });

  it("elimina acentos (á, é, í, ó, ú, ñ)", () => {
    expect(slugify("Acción Vegana Perú")).toBe("accion-vegana-peru");
  });

  it("elimina caracteres especiales y símbolos", () => {
    expect(slugify("¡Activistas & Amigos!")).toBe("activistas-amigos");
  });

  it("recorta guiones al inicio y al final", () => {
    expect(slugify("  -Grupo Vegano-  ")).toBe("grupo-vegano");
  });
});
