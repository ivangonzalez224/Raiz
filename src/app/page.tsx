import Link from "next/link";

const sections = [
  {
    href: "/etica",
    eyebrow: "Por qué veganismo",
    title: "Ética: dejar de ver a los animales como recursos",
    description: "El rechazo al especismo — la base de por qué existe el veganismo.",
  },
  {
    href: "/nutricion",
    eyebrow: "La pregunta más frecuente",
    title: "Nutrición: qué comer y cómo empezar",
    description: "Proteína, B12, calcio, hierro y un primer paso simple.",
  },
  {
    href: "/dudas",
    eyebrow: "Otras dudas",
    title: "Cosmética, ropa y más",
    description: "Las preguntas que siguen después de la comida.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Por qué veganismo
      </p>
      <h1 className="mt-4 font-display text-4xl italic leading-tight md:text-6xl">
        No es una dieta. Es dejar de tratar a alguien como un objeto.
      </h1>
      <p className="mt-6 max-w-xl text-ink-soft">
        Ética, nutrición y respuestas prácticas — más un directorio de activismo vegano de
        calle en LatAm.
      </p>
      <Link
        href="/directorio"
        className="mt-8 inline-block rounded-md bg-sprout px-5 py-3 font-semibold text-forest-deep"
      >
        Ver el directorio →
      </Link>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-black/10 p-5 transition hover:border-forest"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-forest">
              {section.eyebrow}
            </p>
            <h2 className="mt-2 font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{section.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-forest">
              Leer más →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
