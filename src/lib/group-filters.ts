import type { Prisma, ActivityType } from "@prisma/client";
import { activityTypeValues } from "./validations/group";

export type DirectorySearchParams = {
  country?: string;
  city?: string;
  activity?: string;
  q?: string;
};

export function buildGroupWhere(
  searchParams: DirectorySearchParams,
): Prisma.GroupWhereInput {
  const where: Prisma.GroupWhereInput = { status: "APPROVED" };

  if (searchParams.country) {
    where.country = searchParams.country;
  }

  if (searchParams.city) {
    where.city = searchParams.city;
  }

  if (
    searchParams.activity &&
    (activityTypeValues as readonly string[]).includes(searchParams.activity)
  ) {
    where.activityTypes = { has: searchParams.activity as ActivityType };
  }

  if (searchParams.q) {
    where.name = { contains: searchParams.q, mode: "insensitive" };
  }

  return where;
}
