// app/api/cities/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const buses = await prisma.bus.findMany({
    select: { fromCity: true, toCity: true, stops: true },
  });

  // Aggregate every unique stop name across fromCity, toCity, and the
  // stops[] array.  We also count how many distinct bus routes each stop
  // appears on so the frontend can show a "X routes" badge.
  const routeCountMap = new Map<string, number>();

  for (const bus of buses) {
    const allStops = new Set<string>([bus.fromCity, bus.toCity, ...bus.stops]);
    for (const stop of allStops) {
      routeCountMap.set(stop, (routeCountMap.get(stop) ?? 0) + 1);
    }
  }

  const cities = Array.from(routeCountMap.entries())
    .map(([name, routeCount]) => ({ name, routeCount }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({ cities });
}