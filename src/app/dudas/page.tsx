import Link from "next/link";
import type { Metadata } from "next";
import { generalFaqs } from "@/content/faq";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Otras dudas sobre veganismo — Raíz",
  description: "Cosmética, ropa, alcohol, miel y mascotas: las dudas que siguen.",
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Otras dudas frecuentes
      </p>
      <h1 className="mt-3 font-display text-4xl italic leading-tight">
        Cosmética, ropa y más
      </h1>
      <p className="mt-6 max-w-2xl text-ink-soft">
        Después de la ética y la comida, estas son las preguntas que más aparecen.
      </p>

      <FaqAccordion items={generalFaqs} />

      <div className="mt-14">
        <Link
          href="/directorio"
          className="inline-block rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Ver el directorio de activismo →
        </Link>
      </div>
    </main>
  );
}
