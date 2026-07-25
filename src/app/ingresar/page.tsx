"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-display text-2xl italic">Ingresar</h1>
      <p className="mt-2 text-sm text-ink-soft">Para editar la ficha de tu agrupación.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          disabled={loading}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-black/15 px-4 py-3 text-sm disabled:opacity-60"
        />
        <input
          type="password"
          required
          disabled={loading}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-black/15 px-4 py-3 text-sm disabled:opacity-60"
        />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-forest px-4 py-3 font-semibold text-canvas disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-ink-soft">
        ¿No tienes cuenta?{" "}
        <Link href="/crear-cuenta" className="font-semibold text-forest underline">
          Crear cuenta
        </Link>
      </p>
    </main>
  );
}
