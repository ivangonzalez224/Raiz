"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await signIn("email", { email, redirect: false });
    setSent(true);
  }

  if (sent) {
    return (
      <main className="mx-auto max-w-sm px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">Revisa tu correo</h1>
        <p className="mt-3 text-ink-soft">
          Te enviamos un enlace para entrar a <strong>{email}</strong>.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-display text-2xl italic">Ingresar</h1>
      <p className="mt-2 text-sm text-ink-soft">Para editar la ficha de tu agrupación.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-black/15 px-4 py-3 text-sm"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-forest px-4 py-3 font-semibold text-canvas"
        >
          Enviarme el enlace
        </button>
      </form>
    </main>
  );
}
