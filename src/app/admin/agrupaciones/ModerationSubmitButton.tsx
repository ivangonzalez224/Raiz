"use client";

import { useFormStatus } from "react-dom";

export function ModerationSubmitButton({
  label,
  variant,
}: {
  label: string;
  variant: "approve" | "reject";
}) {
  const { pending } = useFormStatus();
  const base = "rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-60";
  const style =
    variant === "approve" ? "bg-forest text-canvas" : "border border-black/15 text-ink";

  return (
    <button type="submit" disabled={pending} className={`${base} ${style}`}>
      {pending ? "Procesando..." : label}
    </button>
  );
}
