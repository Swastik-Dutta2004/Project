import { routes1 } from "../data/raw_busrepo_routes1";
import fs from "fs";

const uniqueStops = new Set<string>();

for (const route of routes1) {
  const parts = route.split(" : ");
  const routeInfo = parts[0];

  const viaIndex = routeInfo.indexOf("[via:");

  if (viaIndex === -1) continue;

  const stopsPart = routeInfo
    .slice(viaIndex + 5)
    .replace("]", "");

  const stops = stopsPart
    .split(",")
    .map(stop => stop.trim())
    .filter(Boolean);

  stops.forEach(stop => uniqueStops.add(stop));
}

const sortedStops = [...uniqueStops].sort();

fs.writeFileSync(
  "all-stops.json",
  JSON.stringify(sortedStops, null, 2)
);

console.log(`Found ${sortedStops.length} unique stops`);