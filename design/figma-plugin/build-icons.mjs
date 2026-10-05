// Generator ikon: membaca definisi ikon lucide-react dari node_modules,
// lalu menulis design/figma-plugin/icons.generated.js (map nama -> string SVG).
//
// Jalankan: node design/figma-plugin/build-icons.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconDir = path.resolve(
  __dirname,
  "../../node_modules/lucide-react/dist/esm/icons"
);

// Nama ikon yang dipakai web app fe-bugarin.
const ICONS = [
  "eye",
  "eye-off",
  "lock",
  "mail",
  "bell",
  "clipboard-check",
  "history",
  "layout-dashboard",
  "log-out",
  "message-square",
  "moon",
  "user-cog",
  "users",
  "chevron-left",
  "chevron-right",
  "hourglass",
  "zap",
  "check",
  "ellipsis-vertical",
  "clock",
  "ban",
  "info",
  "x",
  "search",
  "sliders-horizontal",
  "arrow-right",
  "calendar-days",
  "message-circle",
  "chevron-down",
];

function attrsToString(attrs) {
  return Object.entries(attrs)
    .filter(([k]) => k !== "key")
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
}

function toSvg(nodes) {
  const body = nodes
    .map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)}/>`)
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ` +
    `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
  );
}

const out = {};
for (const name of ICONS) {
  const file = path.join(iconDir, `${name}.js`);
  if (!fs.existsSync(file)) {
    console.warn(`[skip] ikon tidak ditemukan: ${name}`);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  const callIdx = src.indexOf("createLucideIcon(");
  const arrStart = src.indexOf("[", src.indexOf(",", callIdx));
  const arrEnd = src.lastIndexOf("]");
  const arrText = src.slice(arrStart, arrEnd + 1);
  // Array literal hanya berisi data (tag + atribut string) — aman dievaluasi.
  const nodes = new Function(`return (${arrText})`)();
  out[name] = toSvg(nodes);
}

const target = path.join(__dirname, "icons.generated.js");
fs.writeFileSync(target, `module.exports = ${JSON.stringify(out)};\n`, "utf8");
console.log(`Wrote ${Object.keys(out).length} icons -> ${target}`);
