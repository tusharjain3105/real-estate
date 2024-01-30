"use server";

import { cookies } from "next/headers";
import { db } from "./prisma/prisma";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getProjectsSubtabs = async () => {
  const projects = await db.project.findMany({
    where: {
      active: true,
    },
    select: {
      title: true,
      slug: true,
    },
  });

  return projects.map(({ title, slug }) => ({
    title,
    href: `/projects/${slug}`,
    className: "",
  }));
};

export const saveCookie = async (
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) => cookies().set(key, value, options);
