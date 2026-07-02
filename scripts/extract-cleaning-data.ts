import fs from "fs";
import path from "path";

const PYTHON_FILE = path.join(process.cwd(), "data1", "build.py");

const python = fs.readFileSync(PYTHON_FILE, "utf8");

function extractDict(name: string) {
  const regex = new RegExp(`${name}\\s*=\\s*\\{([\\s\\S]*?)^\\}`, "m");

  const match = python.match(regex);

  if (!match) {
    throw new Error(`${name} dictionary not found.`);
  }

  let body = match[1];

  // Remove Python comments
  body = body.replace(/#.*$/gm, "");

  // Remove blank lines
  body = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

  // Convert into a JS object
  const object = Function(`return ({${body}})`)();

  return object;
}

function saveTS(
  fileName: string,
  variableName: string,
  data: Record<string, string>
) {
  const sorted = Object.keys(data)
    .sort()
    .reduce((obj: Record<string, string>, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  const output = `export const ${variableName}: Record<string, string> = ${JSON.stringify(
    sorted,
    null,
    2
  )} as const;
`;

  fs.writeFileSync(
    path.join(process.cwd(), "lib", fileName),
    output
  );
}

console.log("Extracting...");

const spelling = extractDict("SPELLING");
const aliases = extractDict("ALIASES");

saveTS("spelling.ts", "SPELLING", spelling);
saveTS("aliases.ts", "ALIASES", aliases);

console.log("Done!");
console.log(`SPELLING: ${Object.keys(spelling).length}`);
console.log(`ALIASES : ${Object.keys(aliases).length}`);