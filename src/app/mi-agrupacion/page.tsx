import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function statusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Pendiente de aprobación";
    case "APPROVED":
      return "Activa";
    case "REJECTED":
      return "Rechazada";
    case "ARCHIVED":
      return "Archivada";
    default:
      return status;
  }
}

export default async function MyGroupsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">Primero, ingresa</h1>
        <p className="mt-3 text-ink-soft">
          Necesitas iniciar sesión para ver tus agrupaciones.
        </p>
        <Link
          href="/ingresar?callbackUrl=/mi-agrupacion"
          className="mt-6 inline-block rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Ingresar
        </Link>
      </main>
    );
  }

  const editorLinks = await prisma.groupEditor.findMany({
    where: { userId: session.user.id },
    include: { group: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Directorio de activismo
      </p>
      <h1 className="mt-3 font-display text-3xl italic">Mis agrupaciones</h1>

      {editorLinks.length === 0 ? (
        <div className="mt-8">
          <p className="text-ink-soft">
            Todavía no tienes ninguna agrupación registrada.
          </p>
          <Link
            href="/registrar-agrupacion"
            className="mt-4 inline-block rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
          >
            Registrar una agrupación
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {editorLinks.map(({ group, role }) => (
            <li key={group.id} className="rounded-xl border border-black/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{group.name}</h2>
                  <p className="text-sm text-ink-soft">
                    {group.city}, {group.country} · {statusLabel(group.status)} ·{" "}
                    {role === "OWNER" ? "Dueño/a" : "Editor/a"}
                  </p>
                </div>
                <Link
                  href={`/mi-agrupacion/${group.slug}`}
                  className="whitespace-nowrap rounded-md border border-black/15 px-4 py-2 text-sm font-semibold"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
