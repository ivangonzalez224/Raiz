import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { RegisterGroupForm } from "./RegisterGroupForm";

export default async function RegisterGroupPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">Primero, ingresa</h1>
        <p className="mt-3 text-ink-soft">
          Necesitas iniciar sesión para registrar tu agrupación.
        </p>
        <Link
          href="/ingresar?callbackUrl=/registrar-agrupacion"
          className="mt-6 inline-block rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Ingresar
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Directorio de activismo
      </p>
      <h1 className="mt-3 font-display text-3xl italic">Registra tu agrupación</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Quedará pendiente de aprobación. Una vez aprobada, tú y quien agregues como editor
        van a poder mantenerla actualizada.
      </p>
      <RegisterGroupForm />
    </main>
  );
}
