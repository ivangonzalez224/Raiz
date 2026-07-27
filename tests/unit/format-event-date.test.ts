import { describe, expect, it } from "vitest";
import { formatEventDate } from "@/lib/format-event-date";

describe("formatEventDate", () => {
  it("incluye día del mes, mes abreviado y hora", () => {
    const date = new Date("2026-08-01T18:30:00Z");
    const result = formatEventDate(date);

    expect(result).toMatch(/ago|aug/i);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });

  it("acepta un locale distinto", () => {
    const date = new Date("2026-08-01T18:30:00Z");
    const result = formatEventDate(date, "en-US");

    expect(result).toMatch(/aug/i);
  });
});
