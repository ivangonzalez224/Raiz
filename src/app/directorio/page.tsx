import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { activityTypeValues, activityTypeLabels } from "@/lib/validations/group";
import { buildGroupWhere, type DirectorySearchParams } from "@/lib/group-filters";
import { sortGroupsByUpcomingEvent } from "@/lib/group-sort";
import { FilterBar } from "./FilterBar";
import { GroupCard } from "./GroupCard";
import { DirectoryMapLoader } from "./DirectoryMapLoader";
import type { MapGroup } from "./DirectoryMap";

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: DirectorySearchParams;
}) {
  const session = await getServerSession(authOptions);

  const where = buildGroupWhere(searchParams);

  const [rawGroups, allApproved] = await Promise.all([
    prisma.group.findMany({ where, orderBy: [{ country: "asc" }, { city: "asc" }] }),
    prisma.group.findMany({
      where: { status: "APPROVED" },
      select: { country: true, city: true },
    }),
  ]);

  const groups = sortGroupsByUpcomingEvent(rawGroups);

  const countries = Array.from(new Set(allApproved.map((g) => g.country))).sort();
  const cities = Array.from(new Set(allApproved.map((g) => g.city))).sort();

  let myGroupIds = new Set<string>();
  if (session?.user?.id) {
    const editorRows = await prisma.groupEditor.findMany({
      where: { userId: session.user.id },
      select: { groupId: true },
    });
    myGroupIds = new Set(editorRows.map((row) => row.groupId));
  }

  const mapGroups: MapGroup[] = groups.map((group) => ({
    id: group.id,
    name: group.name,
    slug: group.slug,
    city: group.city,
    country: group.country,
    latitude: group.latitude,
    longitude: group.longitude,
    nextEventTitle: group.nextEventTitle,
    nextEventDateTime: group.nextEventDateTime
      ? group.nextEventDateTime.toISOString()
      : null,
    nextEventAddress: group.nextEventAddress,
    socialMediaUrl: group.socialMediaUrl,
  }));

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Directorio de activismo
      </p>
      <h1 className="mt-3 font-display text-4xl italic leading-tight">
        Grassroots vegano, ciudad por ciudad.
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Empezando por LatAm. Encuentra agrupaciones y súmate mientras viajas.
      </p>

      <div className="mt-8">
        <DirectoryMapLoader groups={mapGroups} />
      </div>

      <FilterBar
        countries={countries}
        cities={cities}
        activityTypes={activityTypeValues}
        activityTypeLabels={activityTypeLabels}
        defaultValues={{
          country: searchParams.country ?? "",
          city: searchParams.city ?? "",
          activity: searchParams.activity ?? "",
          q: searchParams.q ?? "",
        }}
      />

      {groups.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          No hay agrupaciones que coincidan con estos filtros.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} canEdit={myGroupIds.has(group.id)} />
          ))}
        </ul>
      )}

      <div className="mt-14 rounded-xl bg-sprout-pale p-6 text-center">
        <p className="text-sm text-ink-soft">¿Tu agrupación no está?</p>
        <Link
          href="/registrar-agrupacion"
          className="mt-2 inline-block font-semibold text-forest-deep underline"
        >
          Súmala al directorio →
        </Link>
      </div>
    </main>
  );
}
