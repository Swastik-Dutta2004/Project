// app/api/cities/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const buses = await prisma.bus.findMany({
    select: { fromCity: true, toCity: true },
  });

  const cities = Array.from(
    new Set(buses.flatMap((b) => [b.fromCity, b.toCity]))
  ).sort();

  return NextResponse.json({ cities });
}