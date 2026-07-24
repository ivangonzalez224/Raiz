"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groupSchema } from "@/lib/validations/group";

export type UpdateGroupState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

const trackedFields = [
  "name",
  "description",
  "city",
  "country",
  "countryCode",
  "meetingFrequency",
  "instagram",
  "whatsapp",
  "website",
  "email",
] as const;

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

  const changes: Record<string, { antes: unknown; despues: unknown }> = {};
  for (const field of trackedFields) {
    const before = (existing as Record<string, unknown>)[field] ?? "";
    const after = (data as Record<string, unknown>)[field] ?? "";
    if (before !== after) {
      changes[field] = { antes: before, despues: after };
    }
  }
  if (JSON.stringify(existing.activityTypes) !== JSON.stringify(data.activityTypes)) {
    changes.activityTypes = {
      antes: existing.activityTypes,
      despues: data.activityTypes,
    };
  }

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
        changes,
      },
    });
  }

  revalidatePath(`/mi-agrupacion/${existing.slug}`);
  revalidatePath("/directorio");

  return { success: true };
}
