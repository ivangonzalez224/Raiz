"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp, type SignUpState } from "./actions";

const initialState: SignUpState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-forest px-4 py-3 font-semibold text-canvas disabled:opacity-60"
    >
      {pending ? "Creando cuenta..." : "Crear cuenta"}
    </button>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction] = useFormState(signUp, initialState);

  useEffect(() => {
    if (!state.success) return;

    signIn("credentials", { email, password, redirect: false }).then(() => {
      router.push(callbackUrl);
      router.refresh();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form action={formAction} className="mt-6 space-y-3">
      <input
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="w-full rounded-md border border-black/15 px-4 py-3 text-sm"
      />
      {state.fieldErrors?.email && (
        <p className="text-xs text-red-700">{state.fieldErrors.email}</p>
      )}

      <input
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña (mínimo 8 caracteres)"
        className="w-full rounded-md border border-black/15 px-4 py-3 text-sm"
      />
      {state.fieldErrors?.password && (
        <p className="text-xs text-red-700">{state.fieldErrors.password}</p>
      )}

      <input
        name="confirmPassword"
        type="password"
        required
        placeholder="Repetir contraseña"
        className="w-full rounded-md border border-black/15 px-4 py-3 text-sm"
      />
      {state.fieldErrors?.confirmPassword && (
        <p className="text-xs text-red-700">{state.fieldErrors.confirmPassword}</p>
      )}

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-forest">Cuenta creada. Ingresando...</p>
      )}

      <SubmitButton />
    </form>
  );
}
