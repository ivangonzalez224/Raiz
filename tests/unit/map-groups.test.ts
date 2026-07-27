import { describe, expect, it } from "vitest";
import { groupsWithLocation, hasUpcomingEvent } from "@/lib/map-groups";

describe("groupsWithLocation", () => {
  it("solo deja pasar agrupaciones con latitude y longitude", () => {
    const groups = [
      { id: "con-ubicacion", latitude: -12.05, longitude: -77.04 },
      { id: "sin-ubicacion", latitude: null, longitude: null },
      { id: "solo-latitude", latitude: -12.05, longitude: null },
    ];

    const result = groupsWithLocation(groups);

    expect(result.map((g) => g.id)).toEqual(["con-ubicacion"]);
  });

  it("devuelve un array vacío si ninguna tiene ubicación", () => {
    const groups = [{ id: "a", latitude: null, longitude: null }];
    expect(groupsWithLocation(groups)).toEqual([]);
  });
});

describe("hasUpcomingEvent", () => {
  const now = new Date("2026-07-25T12:00:00Z");

  it("es true cuando hay título y la fecha es futura", () => {
    const future = new Date(now.getTime() + 60 * 60 * 1000);
    expect(hasUpcomingEvent("Cubo de la verdad", future, now)).toBe(true);
  });

  it("es false cuando la fecha ya pasó", () => {
    const past = new Date(now.getTime() - 60 * 60 * 1000);
    expect(hasUpcomingEvent("Cubo de la verdad", past, now)).toBe(false);
  });

  it("es false cuando no hay título", () => {
    const future = new Date(now.getTime() + 60 * 60 * 1000);
    expect(hasUpcomingEvent(null, future, now)).toBe(false);
  });

  it("es false cuando no hay fecha", () => {
    expect(hasUpcomingEvent("Cubo de la verdad", null, now)).toBe(false);
  });

  it("acepta la fecha como string ISO además de como Date", () => {
    const futureIso = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
    expect(hasUpcomingEvent("Cubo de la verdad", futureIso, now)).toBe(true);
  });
});
