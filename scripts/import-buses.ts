import { prisma } from "../lib/prisma";
import { routes1 } from "../data/raw_busrepo_routes1";
import { canon } from "../lib/stopCleaner";
import "dotenv/config";

function parseRoute(route: string) {
  const parts = route.split(" : ");
  const routeInfo = parts[0];

  const viaMatch = routeInfo.match(/\[[\s]*via[\s]*:([^\]]*)\]/i);
  if (!viaMatch) return null;

  const stopsPart = viaMatch[1].trim();
  const beforeStops = routeInfo.slice(0, viaMatch.index).trim();

  const toMatch = beforeStops.match(/\bto\b/i);
  if (!toMatch) return null;

  const destination = beforeStops.slice(toMatch.index! + 2).trim();
  const originAndCode = beforeStops.slice(0, toMatch.index).trim();

  const busNameColon = originAndCode.lastIndexOf(":");
  const busName = busNameColon >= 0
    ? originAndCode.slice(0, busNameColon).trim()
    : originAndCode;

  const origin = busNameColon >= 0
    ? originAndCode.slice(busNameColon + 1).trim()
    : originAndCode;

  const stops = [
    ...new Set(
      stopsPart
        .split(",")
        .map(canon)
        .filter(Boolean)
    ),
  ];

  return {
    busName,
    fromCity: canon(origin),
    toCity: canon(destination),
    stops
  }
}

async function main() {
  const buses = [];
  for (const route of routes1) {
    try {
      const parsed = parseRoute(route);
      if (!parsed) {
        console.error("Failed to parse:", route.slice(0, 80));
        continue;
      }

      buses.push({
        busName: parsed.busName,
        fromCity: parsed.fromCity,
        toCity: parsed.toCity,
        stops: parsed.stops,
        departureTime: "",
        arrivalTime: "",
        price: 0,
        totalSeats: 40,
      });

      if (buses.length % 100 === 0) {
        console.log(`Parsed ${buses.length} routes...`);
      }
    } catch (err) {
      console.error("Failed:", route.slice(0, 80));
      if (err instanceof Error) console.error(err.message);
    }
  }

  console.log(`Importing ${buses.length} buses into database...`);
  for (let i = 0; i < buses.length; i += 50) {
    await prisma.bus.createMany({
      data: buses.slice(i, i + 50),
    });
  }

  console.log(`Imported ${buses.length} buses`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });