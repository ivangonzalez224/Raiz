export type LocatableGroup = {
  latitude: number | null;
  longitude: number | null;
};

/**
 * Filtra agrupaciones que tienen coordenadas cargadas, y estrecha el tipo
 * para que latitude/longitude dejen de ser nullable en el resultado.
 */
export function groupsWithLocation<T extends LocatableGroup>(
  groups: T[],
): (T & { latitude: number; longitude: number })[] {
  return groups.filter(
    (g): g is T & { latitude: number; longitude: number } =>
      g.latitude !== null && g.longitude !== null,
  );
}

/**
 * Un evento cuenta como "próximo" solo si tiene título, fecha, y esa fecha
 * todavía no pasó.
 */
export function hasUpcomingEvent(
  nextEventTitle: string | null,
  nextEventDateTime: Date | string | null,
  now: Date = new Date(),
): boolean {
  if (!nextEventTitle || !nextEventDateTime) return false;

  const eventDate =
    typeof nextEventDateTime === "string"
      ? new Date(nextEventDateTime)
      : nextEventDateTime;

  return eventDate.getTime() > now.getTime();
}
