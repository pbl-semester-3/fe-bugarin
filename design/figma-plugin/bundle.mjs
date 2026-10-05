// Bundler: Figma sandbox tidak mendukung `require`, jadi ikon harus di-inline.
// Menggabungkan icons.generated.js (objek literal) + plugin.source.js -> code.js.
//
// Jalankan: node design/figma-plugin/bundle.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const iconsRaw = fs.readFileSync(path.join(__dirname, "icons.generated.js"), "utf8").trim();
const obj = iconsRaw.replace(/^module\.exports\s*=\s*/, "").replace(/;\s*$/, "");
const source = fs.readFileSync(path.join(__dirname, "plugin.source.js"), "utf8");

const out = "const ICONS = " + obj + ";\n\n" + source;
fs.writeFileSync(path.join(__dirname, "code.js"), out, "utf8");
console.log("Bundled code.js:", out.length, "bytes");
