import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.signup.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}
