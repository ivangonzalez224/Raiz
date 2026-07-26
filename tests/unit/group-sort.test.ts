import { describe, expect, it } from "vitest";
import { sortGroupsByUpcomingEvent } from "@/lib/group-sort";

const now = new Date("2026-07-25T12:00:00Z");

function daysFromNow(days: number): Date {
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

describe("sortGroupsByUpcomingEvent", () => {
  it("ordena los eventos futuros del más cercano al más lejano", () => {
    const groups = [
      { id: "lejano", nextEventDateTime: daysFromNow(10) },
      { id: "cercano", nextEventDateTime: daysFromNow(1) },
      { id: "medio", nextEventDateTime: daysFromNow(3) },
    ];

    const sorted = sortGroupsByUpcomingEvent(groups, now);

    expect(sorted.map((g) => g.id)).toEqual(["cercano", "medio", "lejano"]);
  });

  it("pone al final las agrupaciones sin evento", () => {
    const groups = [
      { id: "sin-evento", nextEventDateTime: null },
      { id: "con-evento", nextEventDateTime: daysFromNow(2) },
    ];

    const sorted = sortGroupsByUpcomingEvent(groups, now);

    expect(sorted.map((g) => g.id)).toEqual(["con-evento", "sin-evento"]);
  });

  it("trata un evento con fecha pasada igual que si no tuviera evento", () => {
    const groups = [
      { id: "evento-pasado", nextEventDateTime: daysFromNow(-5) },
      { id: "evento-futuro", nextEventDateTime: daysFromNow(2) },
    ];

    const sorted = sortGroupsByUpcomingEvent(groups, now);

    expect(sorted.map((g) => g.id)).toEqual(["evento-futuro", "evento-pasado"]);
  });

  it("conserva el orden original entre agrupaciones sin evento próximo (orden estable)", () => {
    const groups = [
      { id: "b-sin-evento", nextEventDateTime: null },
      { id: "a-evento-pasado", nextEventDateTime: daysFromNow(-1) },
      { id: "c-sin-evento", nextEventDateTime: null },
    ];

    const sorted = sortGroupsByUpcomingEvent(groups, now);

    expect(sorted.map((g) => g.id)).toEqual([
      "b-sin-evento",
      "a-evento-pasado",
      "c-sin-evento",
    ]);
  });

  it("no modifica el array original", () => {
    const groups = [
      { id: "b", nextEventDateTime: daysFromNow(5) },
      { id: "a", nextEventDateTime: daysFromNow(1) },
    ];
    const original = [...groups];

    sortGroupsByUpcomingEvent(groups, now);

    expect(groups).toEqual(original);
  });

  it("combina eventos futuros, pasados y ausentes correctamente", () => {
    const groups = [
      { id: "sin-evento", nextEventDateTime: null },
      { id: "futuro-lejano", nextEventDateTime: daysFromNow(20) },
      { id: "pasado", nextEventDateTime: daysFromNow(-3) },
      { id: "futuro-cercano", nextEventDateTime: daysFromNow(1) },
    ];

    const sorted = sortGroupsByUpcomingEvent(groups, now);

    expect(sorted.map((g) => g.id)).toEqual([
      "futuro-cercano",
      "futuro-lejano",
      "sin-evento",
      "pasado",
    ]);
  });
});
