import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { activityTypeLabels } from "@/lib/validations/group";
import { approveGroup, rejectGroup } from "./actions";
import { ModerationSubmitButton } from "./ModerationSubmitButton";

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("es-PE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

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
                    {group.city}, {group.country} ·{" "}
                    {group.activityTypes
                      .map((type) => activityTypeLabels[type])
                      .join(", ")}
                    {group.meetingFrequency && ` · ${group.meetingFrequency}`}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-sprout-pale px-3 py-1 text-xs font-medium text-forest-deep">
                  Pendiente
                </span>
              </div>

              <p className="mt-3 text-sm text-ink-soft">{group.description}</p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <a
                  href={group.socialMediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-forest underline"
                >
                  Red social ↗
                </a>
                {group.website && (
                  <a
                    href={group.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-forest underline"
                  >
                    Sitio web ↗
                  </a>
                )}
                {group.whatsapp && (
                  <span className="text-ink-soft">WhatsApp: {group.whatsapp}</span>
                )}
                {group.email && (
                  <span className="text-ink-soft">Email: {group.email}</span>
                )}
              </div>

              {group.nextEventTitle && group.nextEventDateTime && (
                <div className="mt-3 rounded-lg bg-canvas-dim p-3 text-xs text-ink-soft">
                  <p className="font-mono uppercase tracking-wide text-forest">
                    Próximo evento
                  </p>
                  <p className="mt-1 font-semibold text-ink">{group.nextEventTitle}</p>
                  <p>
                    {formatEventDate(group.nextEventDateTime)}
                    {group.nextEventAddress && ` · ${group.nextEventAddress}`}
                  </p>
                  {group.nextEventDescription && (
                    <p className="mt-1">{group.nextEventDescription}</p>
                  )}
                  {group.nextEventInstructions && (
                    <p className="mt-1">
                      <span className="font-semibold text-ink">Indicaciones: </span>
                      {group.nextEventInstructions}
                    </p>
                  )}
                  {group.nextEventRequirements && (
                    <p className="mt-1">
                      <span className="font-semibold text-ink">Requerimientos: </span>
                      {group.nextEventRequirements}
                    </p>
                  )}
                </div>
              )}

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
