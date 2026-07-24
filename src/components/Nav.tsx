"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export function Nav() {
  const { data: session, status } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-black/10 bg-canvas px-6 py-4">
      <Link href="/" className="font-poster text-lg">
        Raíz
      </Link>

      <div className="flex items-center gap-5 text-sm font-medium">
        <Link href="/directorio" className="opacity-75 hover:opacity-100">
          Directorio
        </Link>
        <Link href="/registrar-agrupacion" className="opacity-75 hover:opacity-100">
          Registrar agrupación
        </Link>

        {status === "authenticated" && (
          <Link href="/mi-agrupacion" className="opacity-75 hover:opacity-100">
            Mi agrupación
          </Link>
        )}

        {status === "authenticated" && session?.user?.role === "ADMIN" && (
          <Link href="/admin/agrupaciones" className="opacity-75 hover:opacity-100">
            Admin
          </Link>
        )}

        {status === "loading" && (
          <span className="text-xs text-ink-soft">Cargando sesión...</span>
        )}

        {status === "unauthenticated" && (
          <Link
            href="/ingresar"
            className="rounded-md bg-forest px-4 py-2 font-semibold text-canvas"
          >
            Ingresar
          </Link>
        )}

        {status === "authenticated" && session?.user?.email && (
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-ink-soft sm:inline">
              {session.user.email}
            </span>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="rounded-md border border-black/15 px-4 py-2 font-semibold disabled:opacity-60"
            >
              {signingOut ? "Saliendo..." : "Salir"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
