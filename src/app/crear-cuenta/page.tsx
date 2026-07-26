import { Suspense } from "react";
import { SignUpForm } from "./SignUpForm";

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-display text-2xl italic">Crear cuenta</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Para registrar o editar la ficha de tu agrupación.
      </p>
      <Suspense fallback={<p className="mt-6 text-sm text-ink-soft">Cargando...</p>}>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
