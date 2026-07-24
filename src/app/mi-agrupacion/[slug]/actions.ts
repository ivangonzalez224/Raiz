"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groupSchema } from "@/lib/validations/group";
import { computeGroupChanges } from "@/lib/group-changes";

export type UpdateGroupState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

export async function updateGroup(
  groupId: string,
  _prevState: UpdateGroupState,
  formData: FormData,
): Promise<UpdateGroupState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/ingresar");
  }

  const editor = await prisma.groupEditor.findUnique({
    where: { userId_groupId: { userId: session.user.id, groupId } },
  });
  if (!editor) {
    return { error: "No tienes permisos para editar esta agrupación." };
  }

  const existing = await prisma.group.findUnique({ where: { id: groupId } });
  if (!existing) {
    return { error: "La agrupación ya no existe." };
  }

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    city: formData.get("city"),
    country: formData.get("country"),
    countryCode: formData.get("countryCode"),
    activityTypes: formData.getAll("activityTypes"),
    meetingFrequency: formData.get("meetingFrequency") || undefined,
    instagram: formData.get("instagram") || "",
    whatsapp: formData.get("whatsapp") || "",
    website: formData.get("website") || "",
    email: formData.get("email") || "",
  };

  const parsed = groupSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { fieldErrors };
  }

  const data = parsed.data;

  // Calcula qué campos cambiaron, para dejar un historial de auditoría.
  const changes = computeGroupChanges(existing, data);

  await prisma.group.update({
    where: { id: groupId },
    data: {
      name: data.name,
      description: data.description,
      city: data.city,
      country: data.country,
      countryCode: data.countryCode,
      activityTypes: data.activityTypes,
      meetingFrequency: data.meetingFrequency ?? null,
      instagram: data.instagram || null,
      whatsapp: data.whatsapp || null,
      website: data.website || null,
      email: data.email || null,
    },
  });

  if (Object.keys(changes).length > 0) {
    await prisma.groupChangeLog.create({
      data: {
        groupId,
        editedByUserId: session.user.id,
        changes: changes as Prisma.InputJsonValue,
      },
    });
  }

  revalidatePath(`/mi-agrupacion/${existing.slug}`);
  revalidatePath("/directorio");

  return { success: true };
}
