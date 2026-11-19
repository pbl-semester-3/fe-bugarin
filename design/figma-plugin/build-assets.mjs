// Pipeline aset: konversi gambar web (webp/png) menjadi base64 terkompresi.
// Figma plugin `figma.createImage` hanya menerima PNG/JPEG/GIF (maks 4096px),
// jadi WebP harus dikonversi lebih dulu.
//
// Jalankan: node design/figma-plugin/build-assets.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");

// key -> sumber + target lebar + format output
const ASSETS = [
  { key: "logo", src: "public/bugarin-logo.png", w: 256, type: "png" },
  { key: "hero", src: "public/landing/beranda1.webp", w: 1728, type: "jpeg", q: 68 },
  { key: "about", src: "public/landing/tentang-bugarin.webp", w: 760, type: "jpeg", q: 70 },
  { key: "problem", src: "public/landing/ilustrasi-masalah.webp", w: 760, type: "jpeg", q: 66 },
  { key: "solution", src: "public/landing/ilustrasi-solusi.webp", w: 760, type: "jpeg", q: 66 },
  { key: "faq", src: "public/landing/faq.webp", w: 560, type: "jpeg", q: 70 },
  { key: "login", src: "public/landing/login-bugarin.webp", w: 900, type: "jpeg", q: 72 },
  { key: "m_dashboard", src: "public/landing/dashboardmobile.webp", w: 320, type: "jpeg", q: 74 },
  { key: "m_pt", src: "public/landing/PTkumobile.webp", w: 320, type: "jpeg", q: 74 },
  { key: "m_progress", src: "public/landing/Progressmobile.webp", w: 320, type: "jpeg", q: 74 },
  { key: "m_history", src: "public/landing/Riwayatmobile.webp", w: 320, type: "jpeg", q: 74 },
  { key: "m_feedback", src: "public/landing/Feedbackmobile.webp", w: 320, type: "jpeg", q: 74 },
];

const out = {};
let total = 0;

for (const a of ASSETS) {
  const srcPath = path.join(root, a.src);
  if (!fs.existsSync(srcPath)) {
    console.log("[skip] tidak ditemukan:", a.src);
    continue;
  }
  let pipeline = sharp(srcPath).resize({ width: a.w, withoutEnlargement: true });
  if (a.type === "png") pipeline = pipeline.png({ compressionLevel: 9 });
  else pipeline = pipeline.jpeg({ quality: a.q || 70, mozjpeg: true });
  const buf = await pipeline.toBuffer();
  out[a.key] = buf.toString("base64");
  total += buf.length;
  console.log(`  ${a.key.padEnd(12)} ${String(buf.length).padStart(8)} bytes  <- ${a.src}`);
}

const dest = path.join(__dirname, "assets.generated.js");
fs.writeFileSync(dest, "module.exports = " + JSON.stringify(out) + ";\n", "utf8");
console.log("assets.generated.js:", Object.keys(out).length, "aset, total", total, "bytes (biner)");

// Bundle ulang code.js memakai aset baru.
execFileSync(process.execPath, [path.join(__dirname, "bundle.mjs")], { stdio: "inherit" });
