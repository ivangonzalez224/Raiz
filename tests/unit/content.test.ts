import { describe, expect, it } from "vitest";
import { nutritionFaqs } from "@/content/nutrition";
import { generalFaqs } from "@/content/faq";
import type { FaqItem } from "@/content/types";

function expectValidFaqList(list: FaqItem[]) {
  const ids = list.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length); // sin ids duplicados

  for (const item of list) {
    expect(item.question.trim().length).toBeGreaterThan(0);
    expect(item.answer.trim().length).toBeGreaterThan(10);
  }
}

describe("contenido de nutritionFaqs", () => {
  it("tiene al menos una pregunta", () => {
    expect(nutritionFaqs.length).toBeGreaterThan(0);
  });

  it("no tiene ids duplicados y todas las preguntas/respuestas tienen texto", () => {
    expectValidFaqList(nutritionFaqs);
  });
});

describe("contenido de generalFaqs", () => {
  it("tiene al menos una pregunta", () => {
    expect(generalFaqs.length).toBeGreaterThan(0);
  });

  it("no tiene ids duplicados y todas las preguntas/respuestas tienen texto", () => {
    expectValidFaqList(generalFaqs);
  });
});
