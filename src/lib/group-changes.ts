const trackedFields = [
  "name",
  "description",
  "city",
  "country",
  "countryCode",
  "meetingFrequency",
  "socialMediaUrl",
  "whatsapp",
  "website",
  "email",
  "nextEventTitle",
  "nextEventDescription",
  "nextEventAddress",
  "nextEventDateTime",
  "nextEventInstructions",
  "nextEventRequirements",
] as const;

export type ChangeEntry = { antes: unknown; despues: unknown };

/**
 * Compara los campos "simples" (texto) y activityTypes entre el estado
 * existente de una agrupación y los datos nuevos ya validados, y devuelve
 * solo los campos que efectivamente cambiaron.
 *
 * null, undefined y "" se tratan como equivalentes (todos representan
 * "campo vacío"), para no registrar cambios falsos por diferencias de tipo.
 */
export function computeGroupChanges(
  existing: Record<string, unknown>,
  updated: Record<string, unknown>,
): Record<string, ChangeEntry> {
  const changes: Record<string, ChangeEntry> = {};

  for (const field of trackedFields) {
    const before = existing[field] ?? "";
    const after = updated[field] ?? "";
    if (before !== after) {
      changes[field] = { antes: before, despues: after };
    }
  }

  const beforeActivityTypes = JSON.stringify(existing.activityTypes ?? []);
  const afterActivityTypes = JSON.stringify(updated.activityTypes ?? []);
  if (beforeActivityTypes !== afterActivityTypes) {
    changes.activityTypes = {
      antes: existing.activityTypes ?? [],
      despues: updated.activityTypes ?? [],
    };
  }

  return changes;
}
