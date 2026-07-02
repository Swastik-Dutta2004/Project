import { canon } from "../lib/stopCleaner";

const stops = [
  "(Mini)BBD Bag",
  "(Blue Board) Ahiritola",
  "Airport 1no.",
  "Dharmatala",
  "Dalhousie",
  "Khiderpur",
  "Dum Dum"
];

for (const stop of stops) {
  console.log(`${stop}  -->  ${canon(stop)}`);
}