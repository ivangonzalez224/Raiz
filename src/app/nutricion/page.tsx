import Link from "next/link";
import type { Metadata } from "next";
import { nutritionFaqs } from "@/content/nutrition";

export const metadata: Metadata = {
  title: "Nutrición vegana — Raíz",
  description: "Qué comer y cómo empezar: proteína, B12, calcio, hierro y omega-3.",
};

export default function NutritionPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">Nutrición</p>
      <h1 className="mt-3 font-display text-4xl italic leading-tight">
        La pregunta que más te van a hacer
      </h1>
      <p className="mt-6 max-w-2xl text-ink-soft">
        Es una pregunta razonable y merece una respuesta seria: comer sin productos
        animales cubre tus necesidades nutricionales sin problema, siempre que prestes
        atención a un puñado de nutrientes concretos.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {nutritionFaqs.map((faq, index) => (
          <div key={faq.id} className="rounded-xl border border-black/10 p-5">
            <p className="font-mono text-[11px] text-sprout">
              N/{String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-semibold">{faq.question}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/dudas"
          className="rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Siguiente: otras dudas →
        </Link>
        <Link
          href="/directorio"
          className="rounded-md border border-black/15 px-5 py-3 font-semibold"
        >
          Ver el directorio de activismo
        </Link>
      </div>
    </main>
  );
}
