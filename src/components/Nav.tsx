"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/etica", label: "Ética" },
  { href: "/nutricion", label: "Nutrición" },
  { href: "/dudas", label: "Dudas" },
  { href: "/directorio", label: "Directorio" },
  { href: "/registrar-agrupacion", label: "Registrar agrupación" },
];

export function Nav() {
  const { data: session, status } = useSession();
  const [signingOut, setSigningOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut({ callbackUrl: "/" });
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-canvas">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-poster text-lg" onClick={closeMobile}>
          Raíz
        </Link>

        {/* Nav de escritorio */}
        <div className="hidden items-center gap-5 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="opacity-75 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}

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
            <>
              <Link href="/crear-cuenta" className="opacity-75 hover:opacity-100">
                Crear cuenta
              </Link>
              <Link
                href="/ingresar"
                className="rounded-md bg-forest px-4 py-2 font-semibold text-canvas"
              >
                Ingresar
              </Link>
            </>
          )}

          {status === "authenticated" && session?.user?.email && (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-ink-soft lg:inline">
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

        {/* Botón hamburguesa, solo en mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md p-2 text-ink md:hidden"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Panel de navegación mobile */}
      {mobileOpen && (
        <div className="border-t border-black/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="rounded-md px-3 py-2.5 hover:bg-canvas-dim"
              >
                {link.label}
              </Link>
            ))}

            {status === "authenticated" && (
              <Link
                href="/mi-agrupacion"
                onClick={closeMobile}
                className="rounded-md px-3 py-2.5 hover:bg-canvas-dim"
              >
                Mi agrupación
              </Link>
            )}

            {status === "authenticated" && session?.user?.role === "ADMIN" && (
              <Link
                href="/admin/agrupaciones"
                onClick={closeMobile}
                className="rounded-md px-3 py-2.5 hover:bg-canvas-dim"
              >
                Admin
              </Link>
            )}
          </div>

          <div className="mt-4 border-t border-black/10 pt-4">
            {status === "unauthenticated" && (
              <div className="flex flex-col gap-2">
                <Link
                  href="/crear-cuenta"
                  onClick={closeMobile}
                  className="rounded-md border border-black/15 px-4 py-2.5 text-center text-sm font-semibold"
                >
                  Crear cuenta
                </Link>
                <Link
                  href="/ingresar"
                  onClick={closeMobile}
                  className="rounded-md bg-forest px-4 py-2.5 text-center text-sm font-semibold text-canvas"
                >
                  Ingresar
                </Link>
              </div>
            )}

            {status === "authenticated" && session?.user?.email && (
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-xs text-ink-soft">
                  {session.user.email}
                </span>
                <button
                  onClick={() => {
                    closeMobile();
                    handleSignOut();
                  }}
                  disabled={signingOut}
                  className="whitespace-nowrap rounded-md border border-black/15 px-4 py-2 text-sm font-semibold disabled:opacity-60"
                >
                  {signingOut ? "Saliendo..." : "Salir"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
