import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

global.prisma ||= new PrismaClient();

export const db = global.prisma;
