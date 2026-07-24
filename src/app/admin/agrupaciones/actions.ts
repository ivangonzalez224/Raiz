"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }
  return session;
}

export async function approveGroup(groupId: string) {
  await requireAdmin();
  await prisma.group.update({
    where: { id: groupId },
    data: { status: "APPROVED" },
  });
  revalidatePath("/admin/agrupaciones");
  revalidatePath("/directorio");
}

export async function rejectGroup(groupId: string) {
  await requireAdmin();
  await prisma.group.update({
    where: { id: groupId },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin/agrupaciones");
}
