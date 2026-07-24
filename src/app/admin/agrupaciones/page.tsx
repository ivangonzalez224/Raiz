import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { approveGroup, rejectGroup } from "./actions";
import { ModerationSubmitButton } from "./ModerationSubmitButton";

export default async function AdminGroupsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">Primero, ingresa</h1>
        <p className="mt-3 text-ink-soft">Esta sección es solo para administradores.</p>
        <Link
          href="/ingresar?callbackUrl=/admin/agrupaciones"
          className="mt-6 inline-block rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Ingresar
        </Link>
      </main>
    );
  }

  if (session.user.role !== "ADMIN") {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">No autorizado</h1>
        <p className="mt-3 text-ink-soft">
          Tu cuenta no tiene permisos de administrador.
        </p>
      </main>
    );
  }

  const pendingGroups = await prisma.group.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">Admin</p>
      <h1 className="mt-3 font-display text-3xl italic">Agrupaciones pendientes</h1>

      {pendingGroups.length === 0 ? (
        <p className="mt-8 text-ink-soft">No hay agrupaciones pendientes de revisión.</p>
      ) : (
        <ul className="mt-8 space-y-5">
          {pendingGroups.map((group) => (
            <li key={group.id} className="rounded-xl border border-black/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{group.name}</h2>
                  <p className="text-sm text-ink-soft">
                    {group.city}, {group.country} · {group.activityTypes.join(", ")}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-sprout-pale px-3 py-1 text-xs font-medium text-forest-deep">
                  Pendiente
                </span>
              </div>

              <p className="mt-3 text-sm text-ink-soft">{group.description}</p>

              <div className="mt-4 flex gap-3">
                <form action={approveGroup.bind(null, group.id)}>
                  <ModerationSubmitButton label="Aprobar" variant="approve" />
                </form>
                <form action={rejectGroup.bind(null, group.id)}>
                  <ModerationSubmitButton label="Rechazar" variant="reject" />
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
