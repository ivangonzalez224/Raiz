import Link from "next/link";
import type { Group } from "@prisma/client";
import { activityTypeLabels } from "@/lib/validations/group";
import { hasUpcomingEvent } from "@/lib/map-groups";
import { NextEventDisclosure } from "./NextEventDisclosure";

function cityInitials(city: string, length = 3) {
  return city
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, length)
    .toUpperCase();
}

export function GroupCard({ group, canEdit }: { group: Group; canEdit: boolean }) {
  const hasUpcoming = hasUpcomingEvent(group.nextEventTitle, group.nextEventDateTime);

  return (
    <li className="flex gap-4 rounded-xl border border-black/10 bg-white p-5">
      <div className="flex h-16 w-16 flex-none -rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed border-forest text-forest">
        <span className="font-poster text-xs leading-none">
          {cityInitials(group.city)}
        </span>
        <span className="mt-0.5 font-mono text-[8px] tracking-wider">
          {group.countryCode}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold">{group.name}</h2>
            <p className="font-mono text-xs text-ink-soft">
              {group.city}, {group.country}
            </p>
          </div>
          {canEdit && (
            <Link
              href={`/mi-agrupacion/${group.slug}`}
              className="whitespace-nowrap font-mono text-xs font-medium text-forest underline"
            >
              Editar ↗
            </Link>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {group.activityTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-black/15 px-3 py-1 text-xs text-ink-soft"
            >
              {activityTypeLabels[type]}
            </span>
          ))}
          {group.meetingFrequency && (
            <span className="rounded-full border border-black/15 px-3 py-1 text-xs text-ink-soft">
              {group.meetingFrequency}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{group.description}</p>

        {hasUpcoming && group.nextEventTitle && group.nextEventDateTime && (
          <NextEventDisclosure
            title={group.nextEventTitle}
            dateTime={group.nextEventDateTime}
            address={group.nextEventAddress}
            description={group.nextEventDescription}
            instructions={group.nextEventInstructions}
            requirements={group.nextEventRequirements}
          />
        )}

        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <a
            href={group.socialMediaUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-forest underline"
          >
            Red social
          </a>
          {group.website && (
            <a
              href={group.website}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-forest underline"
            >
              Sitio web
            </a>
          )}
          {group.whatsapp && (
            <span className="text-ink-soft">WhatsApp: {group.whatsapp}</span>
          )}
          {group.email && <span className="text-ink-soft">{group.email}</span>}
        </div>
      </div>
    </li>
  );
}
