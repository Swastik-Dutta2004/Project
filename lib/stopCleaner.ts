import { SPELLING } from "./spelling";
import { ALIASES } from "./aliases";

export function stripNotes(stop: string) {
  return stop
    .replace(/^\(.*?\)\s*/g, "")
    .replace(/\(.*?\)/g, "")
    .trim();
}

export function normalize(stop: string) {
  return stop
    .toLowerCase()
    .replace(/[.,/&()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function fixSpelling(stop: string) {
  return SPELLING[stop] ?? stop;
}

export function applyAliases(stop: string) {
  return ALIASES[stop] ?? stop;
}

export function canon(stop: string) {
  let value = stripNotes(stop);

  value = normalize(value);

  value = fixSpelling(value);

  value = applyAliases(value);

  return value;
}