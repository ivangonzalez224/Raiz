"use client";

import { useState } from "react";

type Props = {
  title: string;
  dateTime: Date;
  address: string | null;
  description: string | null;
  instructions: string | null;
  requirements: string | null;
};

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("es-PE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function NextEventDisclosure({
  title,
  dateTime,
  address,
  description,
  instructions,
  requirements,
}: Props) {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(description || instructions || requirements);

  return (
    <div className="mt-3 rounded-lg bg-sprout-pale p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-forest-deep">
            Próximo evento
          </p>
          <p className="mt-1 text-sm font-semibold text-forest-deep">{title}</p>
          <p className="text-xs text-ink-soft" suppressHydrationWarning>
            {formatEventDate(dateTime)}
            {address && ` · ${address}`}
          </p>
        </div>
        {hasDetails && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="whitespace-nowrap font-mono text-xs font-medium text-forest-deep underline"
          >
            {open ? "Ocultar ▲" : "Ver detalles ▼"}
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 space-y-2 border-t border-forest-deep/15 pt-3 text-sm text-ink-soft">
          {description && (
            <p>
              <span className="font-semibold text-ink">De qué se trata: </span>
              {description}
            </p>
          )}
          {instructions && (
            <p>
              <span className="font-semibold text-ink">Indicaciones: </span>
              {instructions}
            </p>
          )}
          {requirements && (
            <p>
              <span className="font-semibold text-ink">Requerimientos/sugerencias: </span>
              {requirements}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
