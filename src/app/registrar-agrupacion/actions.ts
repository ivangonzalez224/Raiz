"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groupSchema } from "@/lib/validations/group";
import { slugify } from "@/lib/slug";

export type RegisterGroupState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function registerGroup(
  _prevState: RegisterGroupState,
  formData: FormData,
): Promise<RegisterGroupState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/ingresar?callbackUrl=/registrar-agrupacion");
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
  const baseSlug = slugify(`${data.name}-${data.city}`);

  let slug = baseSlug;
  let attempt = 1;
  while (await prisma.group.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${attempt}`;
    attempt += 1;
  }

  const group = await prisma.group.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      city: data.city,
      country: data.country,
      countryCode: data.countryCode,
      activityTypes: data.activityTypes,
      meetingFrequency: data.meetingFrequency,
      instagram: data.instagram || undefined,
      whatsapp: data.whatsapp || undefined,
      website: data.website || undefined,
      email: data.email || undefined,
      status: "PENDING",
      editors: {
        create: {
          userId: session.user.id,
          role: "OWNER",
        },
      },
    },
  });

  redirect(`/registrar-agrupacion/gracias?slug=${group.slug}`);
}
