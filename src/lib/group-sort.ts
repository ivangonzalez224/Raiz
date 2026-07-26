type GroupWithEventDate = { nextEventDateTime: Date | null };

/**
 * Ordena agrupaciones así:
 * 1. Las que tienen un evento futuro, de la fecha más cercana a la más lejana.
 * 2. Las que no tienen evento, o cuyo evento ya pasó, al final (mantienen el
 *    orden en el que llegaron — normalmente alfabético por país/ciudad).
 */
export function sortGroupsByUpcomingEvent<T extends GroupWithEventDate>(
  groups: T[],
  now: Date = new Date(),
): T[] {
  const nowMs = now.getTime();

  const isUpcoming = (group: T) =>
    group.nextEventDateTime !== null && group.nextEventDateTime.getTime() > nowMs;

  return [...groups].sort((a, b) => {
    const aUpcoming = isUpcoming(a);
    const bUpcoming = isUpcoming(b);

    if (aUpcoming && bUpcoming) {
      return a.nextEventDateTime!.getTime() - b.nextEventDateTime!.getTime();
    }
    if (aUpcoming) return -1;
    if (bUpcoming) return 1;
    return 0;
  });
}
