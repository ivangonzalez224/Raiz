import { prisma } from "@/lib/prisma";

export default async function DirectoryPage() {
  const groups = await prisma.group.findMany({
    where: { status: "APPROVED" },
    orderBy: { country: "asc" },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-poster text-3xl">Grassroots vegano, ciudad por ciudad.</h1>

      {groups.length === 0 ? (
        <p className="mt-8 text-ink-soft">
          Todavía no hay agrupaciones aprobadas. Sé la primera en sumarte.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {groups.map((group) => (
            <li key={group.id} className="rounded-xl border border-black/10 p-5">
              <h2 className="font-semibold">{group.name}</h2>
              <p className="text-sm text-ink-soft">
                {group.city}, {group.country}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
