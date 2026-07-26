import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ética del veganismo — Raíz",
  description:
    "Por qué el veganismo parte del rechazo al especismo, no de una preferencia alimentaria.",
};

const principles = [
  {
    id: "especismo",
    title: "¿Qué es el especismo?",
    body: "Asignar menos valor moral a un ser solo por pertenecer a otra especie — la misma lógica estructural que el racismo o el sexismo, aplicada a la línea entre especies.",
  },
  {
    id: "recurso-vs-sujeto",
    title: '"Recurso" vs. "sujeto"',
    body: "Un recurso existe para nuestro uso. Un sujeto de una vida tiene intereses propios — evitar el dolor, seguir viviendo — que no dependen de su utilidad para nosotros.",
  },
  {
    id: "necesidad",
    title: '¿Y si es "necesario"?',
    body: "Gran parte del uso animal hoy no responde a necesidad de supervivencia, sino a preferencia, costumbre o conveniencia — ahí está el punto de partida ético.",
  },
];

export default function EthicsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Por qué veganismo
      </p>
      <h1 className="mt-3 font-display text-4xl italic leading-tight">
        El rechazo al especismo
      </h1>

      <p className="mt-6 max-w-2xl text-ink-soft">
        El veganismo no nace de una preferencia alimentaria. Nace de una postura ética:
        los animales no humanos tienen intereses propios — sentir, no sufrir, seguir
        viviendo — y esos intereses merecen ser considerados, no descartados porque nos
        resulte conveniente ignorarlos.
      </p>

      <div className="mt-8 border-l-4 border-forest pl-6">
        <p className="font-display text-2xl italic leading-snug">
          {
            '"Un animal no es una materia prima a la espera de un uso. Tratarlo como tal — por su especie — es especismo."'
          }
        </p>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          Principio central
        </span>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {principles.map((p) => (
          <div key={p.id} className="rounded-xl border border-black/10 p-5">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl italic">En la práctica</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Vivir sin explotar animales significa, en la medida de lo posible y práctico,
          dejar de participar en su uso para:
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          <li className="rounded-md bg-canvas-dim px-4 py-3">
            Alimentación — carne, lácteos, huevos, miel
          </li>
          <li className="rounded-md bg-canvas-dim px-4 py-3">
            Vestimenta — cuero, lana, seda, pieles
          </li>
          <li className="rounded-md bg-canvas-dim px-4 py-3">
            Cosmética y productos testeados en animales
          </li>
          <li className="rounded-md bg-canvas-dim px-4 py-3">
            Entretenimiento — circos, zoológicos, acuarios, rodeos
          </li>
        </ul>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/nutricion"
          className="rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Siguiente: nutrición →
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
