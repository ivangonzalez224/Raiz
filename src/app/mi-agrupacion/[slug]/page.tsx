import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EditGroupForm } from "./EditGroupForm";

export default async function EditGroupPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">Primero, ingresa</h1>
        <p className="mt-3 text-ink-soft">
          Necesitas iniciar sesión para editar esta ficha.
        </p>
        <Link
          href={`/ingresar?callbackUrl=/mi-agrupacion/${params.slug}`}
          className="mt-6 inline-block rounded-md bg-forest px-5 py-3 font-semibold text-canvas"
        >
          Ingresar
        </Link>
      </main>
    );
  }

  const group = await prisma.group.findUnique({
    where: { slug: params.slug },
  });

  if (!group) {
    notFound();
  }

  const editor = await prisma.groupEditor.findUnique({
    where: { userId_groupId: { userId: session.user.id, groupId: group.id } },
  });

  if (!editor) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl italic">No autorizado</h1>
        <p className="mt-3 text-ink-soft">Esta ficha no está asignada a tu cuenta.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-forest">
        Editar ficha
      </p>
      <h1 className="mt-3 font-display text-3xl italic">{group.name}</h1>
      <EditGroupForm group={group} />
    </main>
  );
}
