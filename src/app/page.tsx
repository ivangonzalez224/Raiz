import Link from "next/link";

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
    </main>
  );
}
