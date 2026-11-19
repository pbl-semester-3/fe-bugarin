// Generator ikon: membaca definisi ikon lucide-react dari node_modules,
// lalu menulis design/figma-plugin/icons.generated.js (map nama -> string SVG).
//
// Jalankan: node design/figma-plugin/build-icons.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
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
  "arrow-left",
  "arrow-down",
  "arrow-up",
  "sparkles",
  "user-round",
  "camera",
  "upload",
  "plus",
  "sun",
  "key-round",
  "rotate-cw",
  "save",
  "map-pin",
  "user",
  "bold",
  "italic",
  "list",
  "list-ordered",
  "code",
  "smile",
  "dumbbell",
  "salad",
  "chart-line",
  // Landing
  "menu",
  "chevron-up",
  "target",
  "heart-handshake",
  "instagram",
  "youtube",
  "music-2",
  // Admin
  "bar-chart-3",
  "pie-chart",
  "phone",
  "shield-check",
  "id-card",
  "user-plus",
  "trash-2",
  "bell-off",
  "circle-help",
  "trending-up",
  "settings",
  "check-circle",
  "alert-triangle",
  "shield-alert",
  "lock-keyhole",
  "file-text",
  "log-in",
  "send",
  "external-link",
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

function extractArray(src, start) {
  let depth = 0;
  let inStr = false;
  let quote = "";
  let esc = false;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (esc) {
        esc = false;
      } else if (ch === "\\") {
        esc = true;
      } else if (ch === quote) {
        inStr = false;
      }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = true;
      quote = ch;
    } else if (ch === "[") {
      depth++;
    } else if (ch === "]") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

const out = {};
for (const name of ICONS) {
  const file = path.join(iconDir, `${name}.js`);
  if (!fs.existsSync(file)) {
    console.warn(`[skip] ikon tidak ditemukan: ${name}`);
    continue;
  }
  let src = fs.readFileSync(file, "utf8");
  let callIdx = src.indexOf("createLucideIcon(");
  // Beberapa ikon hanya re-export alias (mis. bar-chart-3 -> chart-column).
  let guard = 0;
  while (callIdx === -1 && guard++ < 4) {
    const m = src.match(/export\s*\{\s*default\s*\}\s*from\s*['"]\.\/(.+?)['"]/);
    if (!m) break;
    const next = path.join(iconDir, m[1]);
    if (!fs.existsSync(next)) break;
    src = fs.readFileSync(next, "utf8");
    callIdx = src.indexOf("createLucideIcon(");
  }
  if (callIdx === -1) {
    console.warn(`[skip] format tidak dikenal: ${name}`);
    continue;
  }
  const commaIdx = src.indexOf(",", callIdx);
  const arrStart = src.indexOf("[", commaIdx);
  const arrText = arrStart === -1 ? null : extractArray(src, arrStart);
  if (!arrText) {
    console.warn(`[skip] gagal parse: ${name}`);
    continue;
  }
  try {
    // Array literal hanya berisi data (tag + atribut string) — aman dievaluasi.
    const nodes = new Function(`return (${arrText})`)();
    out[name] = toSvg(nodes);
  } catch (e) {
    console.warn(`[skip] gagal evaluasi: ${name} (${e.message})`);
  }
}

const target = path.join(__dirname, "icons.generated.js");
fs.writeFileSync(target, `module.exports = ${JSON.stringify(out)};\n`, "utf8");
console.log(`Wrote ${Object.keys(out).length} icons -> ${target}`);

// Figma tidak mendukung `require`, jadi bundle ulang lewat bundler bersama.
execFileSync(process.execPath, [path.join(__dirname, "bundle.mjs")], { stdio: "inherit" });
