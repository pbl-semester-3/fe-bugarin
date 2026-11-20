// Bundler: Figma sandbox tidak mendukung `require`, jadi ikon & aset harus di-inline.
// Menggabungkan ikon + aset + seluruh modul source -> code.js.
//
// Jalankan: node design/figma-plugin/bundle.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readMap(file) {
  const raw = fs.readFileSync(path.join(__dirname, file), "utf8").trim();
  return raw.replace(/^module\.exports\s*=\s*/, "").replace(/;\s*$/, "");
}

const icons = readMap("icons.generated.js");
const assets = readMap("assets.generated.js");

// Urutan penting: helper & main dulu, layar menyusul.
// Semua function declaration di-hoist, dan main() dipanggil paling akhir
// sehingga seluruh `const` di modul lain sudah terinisialisasi.
const MODULES = ["plugin.source.js", "screens.landing.js", "screens.admin.js"];

const parts = ["const ICONS = " + icons + ";", "const ASSETS = " + assets + ";"];
for (const file of MODULES) {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) {
    console.log("[skip] modul tidak ditemukan:", file);
    continue;
  }
  parts.push("// ---- " + file + " ----\n" + fs.readFileSync(p, "utf8"));
}

const runner = `
main().catch((err) => {
  figma.closePlugin("Gagal: " + (err && err.message ? err.message : String(err)));
});
`;

const out = parts.join("\n\n") + runner;
fs.writeFileSync(path.join(__dirname, "code.js"), out, "utf8");
console.log("Bundled code.js:", out.length, "bytes");
