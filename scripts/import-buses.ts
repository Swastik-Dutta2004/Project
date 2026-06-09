import { prisma } from "../lib/prisma";
import { routes1 } from "../data/buses";

async function main() {
  for (const route of routes1) {
    try {
      const parts = route.split(" : ");

      const routeInfo = parts[0];

      const firstColonIndex = routeInfo.indexOf(":");

      const busName = routeInfo.slice(0, firstColonIndex);
      const routeText = routeInfo.slice(firstColonIndex + 1);

      const viaIndex = routeText.indexOf("[via:");

      const citiesPart = routeText.slice(0, viaIndex).trim();
      const stopsPart = routeText
        .slice(viaIndex + 5)
        .replace("]", "")
        .trim();

      const [fromCity, toCity] = citiesPart
        .trim()
        .split(" to ")
        .map((v) => v.trim());

      const stops = stopsPart
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);


      await prisma.bus.create({
        data: {
          busName: busName.trim(),
          fromCity,
          toCity,
          stops,
          departureTime: "",
          arrivalTime: "",
          price: 0,
          totalSeats: 40,
        },
      });

      console.log(`Imported ${busName}`);

      console.log(`Imported ${busName}`);
    } catch (err) {
      console.error("Failed:", route);

      if (err instanceof Error) {
        console.error(err.message);
      }

      console.error(err);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });