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
    socialMediaUrl: formData.get("socialMediaUrl") || "",
    whatsapp: formData.get("whatsapp") || "",
    website: formData.get("website") || "",
    email: formData.get("email") || "",
    nextEventTitle: formData.get("nextEventTitle") || "",
    nextEventDescription: formData.get("nextEventDescription") || "",
    nextEventAddress: formData.get("nextEventAddress") || "",
    nextEventDateTime: formData.get("nextEventDateTime") || "",
    nextEventInstructions: formData.get("nextEventInstructions") || "",
    nextEventRequirements: formData.get("nextEventRequirements") || "",
  };

  const parsed = groupSchema.safeParse(raw);
  if (!parsed.success) {
    console.error(
      "❌ updateGroup validation failed:",
      JSON.stringify(parsed.error.flatten(), null, 2),
    );
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { fieldErrors };
  }

  const data = parsed.data;
  const parsedNextEventDateTime = data.nextEventDateTime
    ? new Date(data.nextEventDateTime)
    : null;

  // Para el diff de auditoría, comparamos fechas como strings ISO (o "" si no hay).
  const comparableExisting = {
    ...existing,
    nextEventDateTime: existing.nextEventDateTime
      ? existing.nextEventDateTime.toISOString()
      : "",
  };
  const comparableUpdated = {
    ...data,
    nextEventDateTime: parsedNextEventDateTime
      ? parsedNextEventDateTime.toISOString()
      : "",
  };

  const changes = computeGroupChanges(comparableExisting, comparableUpdated);

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
      socialMediaUrl: data.socialMediaUrl,
      whatsapp: data.whatsapp || null,
      website: data.website || null,
      email: data.email || null,
      nextEventTitle: data.nextEventTitle || null,
      nextEventDescription: data.nextEventDescription || null,
      nextEventAddress: data.nextEventAddress || null,
      nextEventDateTime: parsedNextEventDateTime,
      nextEventInstructions: data.nextEventInstructions || null,
      nextEventRequirements: data.nextEventRequirements || null,
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
