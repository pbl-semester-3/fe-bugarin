
const C = {
  primary: "#7DC04E",
  brand: "#F69665",
  sidebar: "#2C303A",
  white: "#FFFFFF",
  ink: "#181B25",
  inkSoft: "#464555",
  muted: "#777587",
  outline: "#C7C4D8",
  tint: "#F1F3FF",
  alt: "#F9F9FF",
  s2: "#EBEDFB",
  s3: "#E5E8F5",
  s4: "#DFE2EF",
  success: "#006C47",
  successContainer: "#82F9BE",
  successDeep: "#002113",
  danger: "#FF6C6C",
  dangerStrong: "#BA1A1A",
  dangerContainer: "#FFDAD6",
  secondaryStrong: "#C34E31",
  accentIndigo: "#493EE5",
  warning: "#F59E0B",
};

const SCREEN_W = 1728;
const SIDEBAR_W = 256;
const HEADER_H = 64;
const BIO =
  "Saya percaya progres terbaik lahir dari kebiasaan kecil yang konsisten. Fokus coaching: teknik angkat yang aman, periodisasi bertahap, dan nutrisi yang realistis untuk gaya hidup klien.";

let FAMILY = "Plus Jakarta Sans";
const PJS = { 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold" };
const INTER = { 400: "Regular", 500: "Medium", 600: "Semi Bold", 700: "Bold", 800: "Extra Bold" };
let STYLES = PJS;
let USED_FALLBACK = false;

async function loadFonts() {
  try {
    for (const w of [400, 500, 600, 700, 800]) await figma.loadFontAsync({ family: FAMILY, style: PJS[w] });
  } catch (e) {
    FAMILY = "Inter";
    STYLES = INTER;
    USED_FALLBACK = true;
    for (const w of [400, 500, 600, 700, 800]) await figma.loadFontAsync({ family: FAMILY, style: INTER[w] });
  }
}

function rgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  };
}
function solid(hex, opacity) {
  const p = { type: "SOLID", color: rgb(hex) };
  if (opacity != null) p.opacity = opacity;
  return p;
}
function gradient(hexes) {
  return {
    type: "GRADIENT_LINEAR",
    gradientTransform: [[0, 1, 0], [1, 0, 0]],
    gradientStops: hexes.map((hex, i) => ({ position: hexes.length === 1 ? 0 : i / (hexes.length - 1), color: rgb(hex) })),
  };
}

function box(name, w, h, o) {
  o = o || {};
  const f = figma.createFrame();
  f.name = name;
  f.clipsContent = true;
  if (o.fill) f.fills = [solid(o.fill, o.opacity)];
  else if (o.gradient) f.fills = [gradient(o.gradient)];
  else f.fills = [];
  if (o.radius != null) f.cornerRadius = o.radius;
  if (o.dir) {
    f.layoutMode = o.dir;
    f.itemSpacing = o.gap || 0;
    f.paddingTop = o.padT != null ? o.padT : o.pad != null ? o.pad : 0;
    f.paddingRight = o.padR != null ? o.padR : o.pad != null ? o.pad : 0;
    f.paddingBottom = o.padB != null ? o.padB : o.pad != null ? o.pad : 0;
    f.paddingLeft = o.padL != null ? o.padL : o.pad != null ? o.pad : 0;
    f.counterAxisAlignItems = o.align || "MIN";
    if (o.justify) f.primaryAxisAlignItems = o.justify;
  }
  if (w != null || h != null) f.resize(w != null ? w : f.width, h != null ? h : f.height);
  if (o.dir) {
    const horizontal = o.dir === "HORIZONTAL";
    if (horizontal) {
      f.primaryAxisSizingMode = w != null ? "FIXED" : "AUTO";
      f.counterAxisSizingMode = h != null ? "FIXED" : "AUTO";
    } else {
      f.counterAxisSizingMode = w != null ? "FIXED" : "AUTO";
      f.primaryAxisSizingMode = h != null ? "FIXED" : "AUTO";
    }
  }
  if (o.stroke) {
    f.strokes = [solid(o.stroke, o.strokeOpacity)];
    f.strokeWeight = o.strokeWeight || 1;
    f.strokeAlign = "INSIDE";
    if (o.strokeSides === "bottom") {
      f.strokeTopWeight = 0;
      f.strokeLeftWeight = 0;
      f.strokeRightWeight = 0;
      f.strokeBottomWeight = o.strokeWeight || 1;
    }
  }
  return f;
}

function txt(chars, o) {
  o = o || {};
  const t = figma.createText();
  t.fontName = { family: FAMILY, style: STYLES[o.weight || 400] };
  t.characters = chars;
  t.fontSize = o.size || 14;
  t.fills = [solid(o.color || C.ink, o.opacity)];
  if (o.lh != null) t.lineHeight = { unit: "PIXELS", value: o.lh };
  if (o.ls != null) t.letterSpacing = { unit: "PIXELS", value: o.ls };
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.upper) t.textCase = "UPPER";
  if (o.width != null) {
    t.textAutoResize = "HEIGHT";
    t.resize(o.width, t.height);
  }
  return t;
}

function icon(name, size, color) {
  const svg = (ICONS[name] || "")
    .replace(/currentColor/g, color)
    .replace('width="24" height="24"', 'width="' + size + '" height="' + size + '"');
  const n = figma.createNodeFromSvg(svg);
  n.name = "icon/" + name;
  n.fills = [];
  return n;
}

const PENDING = new WeakMap();
function mark(child, key) {
  const p = PENDING.get(child) || {};
  p[key] = true;
  PENDING.set(child, p);
  return child;
}
function add(parent, child) {
  parent.appendChild(child);
  const p = PENDING.get(child);
  if (p) {
    if (p.fillW) {
      try { child.layoutSizingHorizontal = "FILL"; } catch (e) {}
    }
    if (p.fillH) {
      try { child.layoutSizingVertical = "FILL"; } catch (e) {}
    }
  }
  return child;
}
function grow(child) {
  return mark(child, "fillW");
}
function stretch(child) {
  return mark(child, "fillW");
}
function fillV(child) {
  return mark(child, "fillH");
}

function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
}

function avatar(name, size, shape) {
  const f = box("avatar/" + name, size, size, {
    fill: C.s2,
    radius: shape === "circle" ? size / 2 : 16,
    dir: "VERTICAL",
    align: "CENTER",
    justify: "CENTER",
  });
  add(f, txt(initials(name), { size: Math.max(11, Math.round(size * 0.3)), weight: 600, color: C.inkSoft }));
  return f;
}

function avatarDotted(name, size) {
  const wrap = box("avatar-dot/" + name, size, size, {});
  add(wrap, avatar(name, size, "circle"));
  const dot = figma.createEllipse();
  dot.resize(size * 0.25, size * 0.25);
  dot.fills = [solid(C.success)];
  dot.strokes = [solid(C.white)];
  dot.strokeWeight = 2;
  wrap.appendChild(dot);
  dot.x = size - size * 0.25;
  dot.y = size - size * 0.25;
  return wrap;
}

function pill(label, o) {
  o = o || {};
  const f = box("pill/" + label, null, o.h || 22, {
    dir: "HORIZONTAL",
    gap: o.gap != null ? o.gap : 4,
    padL: o.padL != null ? o.padL : 10,
    padR: o.padR != null ? o.padR : 10,
    align: "CENTER",
    justify: o.justify,
    radius: o.radius != null ? o.radius : 9999,
    fill: o.fill,
    opacity: o.opacity,
  });
  if (o.icon) add(f, o.icon);
  add(f, txt(label, { size: o.size || 11, weight: o.weight || 600, color: o.color || C.inkSoft, ls: o.ls }));
  return f;
}

function button(label, o) {
  o = o || {};
  const f = box("button/" + label, o.w != null ? o.w : null, o.h || 40, {
    dir: "HORIZONTAL",
    gap: 8,
    padL: o.padX != null ? o.padX : 20,
    padR: o.padX != null ? o.padX : 20,
    align: "CENTER",
    justify: "CENTER",
    radius: o.radius != null ? o.radius : 8,
    fill: o.fill,
  });
  if (o.icon) add(f, o.icon);
  if (label) add(f, txt(label, { size: o.size || 14, weight: o.weight || 600, color: o.color || C.ink }));
  return f;
}

function chip(label, active) {
  return pill(label, {
    h: 28,
    padL: 12,
    padR: 12,
    radius: 9999,
    size: 12,
    weight: 500,
    ls: 0.24,
    fill: active ? C.brand : C.tint,
    color: active ? C.white : C.inkSoft,
  });
}

function segmented(labels, active, variant) {
  const wrap = box("segmented", null, 36, { dir: "HORIZONTAL", gap: 4, pad: 4, align: "CENTER", radius: 9999, fill: C.tint });
  labels.forEach((label, i) => {
    const on = i === active;
    const f = box("seg", null, 28, {
      dir: "HORIZONTAL",
      padL: 16,
      padR: 16,
      align: "CENTER",
      radius: 9999,
      fill: on ? (variant === "brand" ? C.brand : C.white) : null,
    });
    add(f, txt(label, { size: 12, weight: 500, color: on ? (variant === "brand" ? C.white : C.ink) : C.inkSoft, ls: 0.24 }));
    add(wrap, f);
  });
  return wrap;
}

function overline(t, color) {
  return txt(t, { size: 10, weight: 700, color: color || C.muted, ls: 0.5, upper: true });
}

function emptyState(iconName, title, desc) {
  const f = box("empty-state", null, null, { dir: "VERTICAL", gap: 12, align: "CENTER", padT: 64, padB: 64 });
  add(f, icon(iconName, 48, C.ink));
  add(f, txt(title, { size: 20, weight: 600, color: C.ink }));
  add(f, txt(desc, { size: 14, weight: 400, color: C.inkSoft, align: "CENTER", width: 420 }));
  return f;
}

function sidebar(active, height) {
  const s = box("aside", SIDEBAR_W, height, { dir: "VERTICAL", pad: 16, fill: C.sidebar });
  const brand = box("brand", null, null, { dir: "VERTICAL", gap: 2, padT: 8, padB: 24, padL: 12, padR: 12 });
  add(brand, txt("Bugarin", { size: 18, weight: 700, color: C.white, ls: -0.45 }));
  add(brand, txt("PT Platform", { size: 10, weight: 600, color: C.primary, ls: 0.5, upper: true }));
  add(s, stretch(brand));

  const nav = box("nav", null, null, { dir: "VERTICAL", gap: 4 });
  const items = [
    ["Dashboard", "layout-dashboard", "dashboard"],
    ["Verifikasi", "clipboard-check", "verifikasi"],
    ["Klien", "users", "klien"],
    ["Riwayat", "history", "riwayat"],
    ["Feedback", "message-square", "feedback"],
    ["Profil", "user-cog", "profil"],
  ];
  for (const [label, ico, key] of items) {
    const isActive = key === active;
    const item = box("nav/" + label, null, 36, {
      dir: "HORIZONTAL",
      gap: 12,
      padL: 12,
      padR: 12,
      align: "CENTER",
      radius: 8,
      fill: isActive ? C.primary : null,
    });
    add(item, icon(ico, 20, C.white));
    if (!isActive) item.children[0].opacity = 0.7;
    add(item, grow(txt(label, { size: 14, weight: 500, color: C.white, opacity: isActive ? 1 : 0.7 })));
    if (key === "verifikasi") add(item, pill("3", { fill: C.danger, color: C.white, padL: 6, padR: 6, h: 18, size: 10, weight: 600 }));
    add(nav, stretch(item));
  }
  add(s, stretch(nav));
  add(s, fillV(box("spacer", null, 0, { dir: "VERTICAL" })));

  const user = box("user-card", null, null, { dir: "HORIZONTAL", gap: 12, pad: 12, align: "CENTER", radius: 12, fill: C.white, opacity: 0.1 });
  add(user, avatar("Alex Vance", 40, "circle"));
  const ucol = box("user-col", null, null, { dir: "VERTICAL", gap: 2 });
  add(ucol, txt("Alex Vance", { size: 14, weight: 600, color: C.white }));
  add(ucol, txt("Performance Coach", { size: 12, weight: 400, color: C.white, opacity: 0.5 }));
  add(user, grow(ucol));
  add(s, stretch(user));

  const exit = box("exit", null, null, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, padT: 12, align: "CENTER" });
  add(exit, icon("log-out", 16, C.danger));
  add(exit, txt("Exit", { size: 12, weight: 500, color: C.danger }));
  add(s, stretch(exit));
  return s;
}

function headerBar() {
  const h = box("header", SCREEN_W - SIDEBAR_W, HEADER_H, {
    dir: "HORIZONTAL",
    gap: 16,
    padL: 24,
    padR: 24,
    align: "CENTER",
    justify: "MAX",
    fill: C.white,
    stroke: C.s4,
    strokeWeight: 1,
    strokeSides: "bottom",
  });
  add(h, icon("moon", 20, C.inkSoft));
  const bellWrap = box("bell", 24, 24, {});
  bellWrap.appendChild(icon("bell", 20, C.inkSoft));
  const dot = figma.createEllipse();
  dot.resize(8, 8);
  dot.fills = [solid(C.danger)];
  bellWrap.appendChild(dot);
  dot.x = 16;
  dot.y = 0;
  add(h, bellWrap);
  add(h, avatar("Alex Vance", 32, "circle"));
  return h;
}

function ptScreen(name, active, height, build) {
  const root = box(name, SCREEN_W, height, { dir: "HORIZONTAL" });
  add(root, sidebar(active, height));
  const main = box("main-col", SCREEN_W - SIDEBAR_W, height, { dir: "VERTICAL", fill: C.tint });
  add(main, headerBar());
  const content = box("content", SCREEN_W - SIDEBAR_W, null, { dir: "VERTICAL", gap: 24, pad: 24, fill: C.tint });
  add(main, fillV(stretch(content)));
  add(root, main);
  build(content);
  return root;
}

function pageHeader(title, description, badge) {
  const wrap = box("page-header", null, null, { dir: "HORIZONTAL", align: "MIN", justify: "SPACE_BETWEEN", gap: 16 });
  const left = box("ph-left", null, null, { dir: "VERTICAL", gap: 4 });
  const titleRow = box("ph-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(titleRow, txt(title, { size: 40, weight: 800, color: C.ink, ls: -0.7 }));
  if (badge) add(titleRow, badge);
  add(left, titleRow);
  if (description) add(left, txt(description, { size: 20, weight: 400, color: C.inkSoft, width: 1271 }));
  add(wrap, left);
  return wrap;
}

function buildDashboard(content) {
  const banner = box("greeting-banner", null, null, { dir: "VERTICAL", gap: 6, pad: 24, radius: 12, fill: C.primary });
  add(banner, txt("Selamat pagi, Coach Alex!", { size: 40, weight: 700, color: C.white, lh: 44 }));
  add(banner, txt("Jadwal hasil AI disinkronkan otomatis dengan data biometrik klien.", { size: 14, weight: 400, color: C.white, opacity: 0.9 }));
  add(content, stretch(banner));

  const stats = box("stats", null, null, { dir: "HORIZONTAL", gap: 20 });
  add(stats, grow(statCard("users", "Total Klien Aktif", 24)));
  add(stats, grow(statCard("clipboard-check", "Menunggu Verifikasi", 3)));
  add(content, stretch(stats));

  const card = box("schedule-card", null, null, { dir: "VERTICAL", gap: 24, pad: 24, radius: 12, fill: C.white });
  const head = box("schedule-head", null, null, { dir: "HORIZONTAL", align: "MIN", justify: "SPACE_BETWEEN" });
  const hleft = box("head-left", null, null, { dir: "VERTICAL", gap: 4 });
  const htitle = box("head-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(htitle, txt("Trajektori & Jadwal Harian", { size: 20, weight: 600, color: C.ink }));
  const ai = box("badge-ai", null, 20, { dir: "HORIZONTAL", gap: 4, padL: 8, padR: 8, align: "CENTER", radius: 9999, fill: C.brand, opacity: 0.1 });
  add(ai, icon("zap", 12, C.secondaryStrong));
  add(ai, txt("Direncanakan AI", { size: 12, weight: 500, color: C.secondaryStrong }));
  add(htitle, ai);
  add(hleft, htitle);
  add(hleft, txt("Urutan latihan disesuaikan otomatis berdasarkan data biometrik dan HRV.", { size: 12, weight: 400, color: C.muted }));
  add(head, hleft);
  const hright = box("head-right", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(hright, icon("chevron-left", 16, C.muted));
  add(hright, pill("Kamis, 24 Okt", { fill: C.tint, color: C.ink, size: 12, weight: 500, padL: 16, padR: 16, h: 28, ls: 0 }));
  add(hright, icon("chevron-right", 16, C.muted));
  add(head, hright);
  add(card, stretch(head));

  add(card, weekStrip());

  const sessions = box("sessions", null, null, { dir: "VERTICAL", gap: 8 });
  const data = [
    { name: "Marcus Sterling", jam: "09:30", durasi: "45 menit", tujuan: "Turun BB", lokasi: "pusatgym", next: true },
    { name: "Sarah Chen", jam: "11:00", durasi: "60 menit", tujuan: "Naik BB", lokasi: "pusatgym" },
    { name: "Elena Rodriguez", jam: "17:30", durasi: "30 menit", tujuan: "Naik BB", lokasi: "pusatgym" },
    { name: "David Kim", jam: "14:00", durasi: "45 menit", tujuan: "Turun BB", lokasi: "pusatgym", done: true },
  ];
  for (const s of data) add(sessions, stretch(sessionRow(s)));
  add(card, stretch(sessions));
  add(content, stretch(card));
}

function statCard(iconName, label, value) {
  const card = box("stat-card", null, null, { dir: "VERTICAL", pad: 24, radius: 12, fill: C.white });
  const ico = box("stat-icon", 40, 40, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 8, fill: C.brand });
  add(ico, icon(iconName, 20, C.white));
  add(card, ico);
  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  add(card, txt(label, { size: 11, weight: 600, color: C.muted, ls: 0.6, upper: true }));
  add(card, txt(String(value), { size: 36, weight: 700, color: C.ink }));
  return card;
}

function weekStrip() {
  const days = [
    ["SEN", 21, false, C.success],
    ["SEL", 22, false, C.outline],
    ["RAB", 23, false, C.danger],
    ["HARI INI", 24, true, C.white],
    ["JUM", 25, false, C.success],
    ["SAB", 26, false, C.outline],
    ["MIN", 27, false, C.outline],
  ];
  const strip = box("week-strip", null, null, { dir: "HORIZONTAL", gap: 12 });
  for (const [label, date, today, dotColor] of days) {
    const d = box("day", 80, null, { dir: "VERTICAL", gap: 2, padL: 12, padR: 12, padT: 8, padB: 8, align: "CENTER", radius: 8, fill: today ? C.brand : C.tint });
    add(d, txt(label, { size: 10, weight: 600, color: today ? C.white : C.muted, ls: 0.4, upper: true, opacity: today ? 0.8 : 1 }));
    add(d, txt(String(date), { size: 16, weight: 600, color: today ? C.white : C.ink }));
    const dot = figma.createEllipse();
    dot.resize(6, 6);
    dot.fills = [solid(dotColor, today ? 0.7 : 1)];
    add(d, dot);
    add(strip, d);
  }
  return strip;
}

function sessionRow(s) {
  const row = box("session", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", radius: 12, fill: C.tint });
  if (s.done) row.opacity = 0.6;
  const timeBox = box("time", 64, 48, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 8, fill: s.next ? C.brand : C.s3 });
  if (s.done) add(timeBox, icon("check", 16, C.success));
  else {
    add(timeBox, txt(s.next ? "BERIKUTNYA" : "WAKTU", { size: 9, weight: 600, color: s.next ? C.white : C.ink, ls: 0.4, upper: true }));
    add(timeBox, txt(s.jam, { size: 14, weight: 700, color: s.next ? C.white : C.ink }));
  }
  add(row, timeBox);
  add(row, avatar(s.name, 40, "circle"));
  const col = box("info", null, null, { dir: "VERTICAL", gap: 0 });
  add(col, txt(s.name, { size: 16, weight: 600, color: C.ink }));
  add(col, txt(s.durasi, { size: 12, weight: 400, color: C.muted }));
  add(col, txt(s.tujuan, { size: 12, weight: 400, color: C.muted }));
  add(col, txt(s.lokasi, { size: 12, weight: 400, color: C.muted }));
  add(row, grow(col));
  const right = box("row-right", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(right, pill(s.done ? "Selesai" : "Menunggu", { fill: s.done ? C.successContainer : C.s3, color: s.done ? C.success : C.muted, opacity: s.done ? 0.3 : 1, padL: 10, padR: 10 }));
  add(right, icon("ellipsis-vertical", 16, C.muted));
  add(row, right);
  return row;
}

function buildVerifikasi(content) {
  add(content, stretch(pageHeader("Antrian Pendaftaran Klien", "Tinjau penilaian awal calon klien serta tujuan atletik yang menunggu persetujuan atau penolakan sebelum penyusunan jadwal periodisasi.")));

  const toolbar = box("toolbar", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  const search = box("search", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.tint });
  add(search, icon("search", 16, C.muted));
  add(search, txt("Cari pendaftar berdasarkan nama atau email...", { size: 14, weight: 400, color: C.muted }));
  grow(search);
  add(toolbar, search);
  add(toolbar, chip("Semua Menunggu (3)", true));
  add(content, stretch(toolbar));

  const list = box("list", null, null, { dir: "VERTICAL", gap: 0 });
  const data = [
    { nama: "Rachel Cooper", usia: 28, gender: "Wanita", email: "rachel.c@vertexpulse.io", submitted: "Hari ini, 2 jam lalu", kategori: "Hipertrofi", targetSummary: "-6kg Lemak / +3kg Otot", periodization: "Periodisasi 16 Minggu" },
    { nama: "Andi Saputra", usia: 31, gender: "Pria", email: "andi.saputra@mail.com", submitted: "Hari ini, 6 jam lalu", kategori: "Penurunan BB", targetSummary: "-9kg Lemak / +1kg Otot", periodization: "Periodisasi 12 Minggu" },
    { nama: "Candra Wijaya", usia: 24, gender: "Pria", email: "candra.w@mail.com", submitted: "1 hari lalu", kategori: "Hipertrofi", targetSummary: "+7kg Otot / +0kg Lemak", periodization: "Periodisasi 20 Minggu" },
  ];
  for (const r of data) add(list, stretch(verifikasiCard(r)));
  add(content, stretch(list));
}

function verifikasiCard(r) {
  const card = box("verifikasi-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const head = box("head", null, null, { dir: "HORIZONTAL", gap: 16, align: "MIN" });
  add(head, avatarDotted(r.nama, 48));
  const info = box("info", null, null, { dir: "VERTICAL", gap: 4 });
  const nameRow = box("name-row", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(nameRow, txt(r.nama, { size: 18, weight: 700, color: C.ink }));
  add(nameRow, pill("Usia " + r.usia + " • " + r.gender, { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }));
  add(info, nameRow);
  const meta = box("meta", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  const m1 = box("m1", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(m1, icon("mail", 12, C.muted));
  add(m1, txt(r.email, { size: 12, weight: 400, color: C.muted }));
  add(meta, m1);
  add(meta, txt("•", { size: 12, weight: 400, color: C.outline }));
  const m2 = box("m2", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(m2, icon("clock", 12, C.muted));
  add(m2, txt("Diajukan: " + r.submitted, { size: 12, weight: 400, color: C.muted }));
  add(meta, m2);
  add(info, meta);
  add(head, grow(info));
  add(card, stretch(head));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const target = box("target", null, null, { dir: "VERTICAL", gap: 4, pad: 16, radius: 12, fill: C.tint });
  add(target, txt(r.kategori, { size: 10, weight: 600, color: C.muted, ls: 0.5, upper: true }));
  add(target, txt(r.targetSummary, { size: 14, weight: 700, color: C.ink }));
  add(target, txt(r.periodization, { size: 12, weight: 400, color: C.muted }));
  add(card, stretch(target));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 12 });
  add(actions, button("Tolak", { icon: icon("x", 16, C.dangerStrong), fill: C.dangerContainer, color: C.dangerStrong, radius: 9999, padX: 16, h: 40 }));
  add(actions, button("Terima Klien", { icon: icon("check", 16, C.white), fill: C.success, color: C.white, radius: 9999, padX: 16, h: 40 }));
  add(card, stretch(actions));
  return card;
}

function buildKlien(content) {
  add(content, stretch(pageHeader("Klien Aktif", null, pill("6 Terpantau", { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }))));

  const bar = box("filter-bar", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 16, fill: C.white });
  const search = box("search", 576, 40, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.tint });
  add(search, icon("search", 16, C.muted));
  add(search, txt("Cari klien berdasarkan nama atau email...", { size: 14, weight: 400, color: C.muted }));
  add(bar, search);
  const chips = box("chips", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(chips, chip("Semua (6)", true));
  add(chips, chip("Naik BB", false));
  add(chips, chip("Turun BB", false));
  add(chips, box("divider", 1, 24, { fill: C.s3 }));
  const status = box("status", null, 28, { dir: "HORIZONTAL", gap: 4, padL: 12, padR: 12, align: "CENTER", radius: 9999, fill: C.tint });
  add(status, icon("sliders-horizontal", 12, C.inkSoft));
  add(status, txt("Status: Aktif", { size: 12, weight: 600, color: C.inkSoft, ls: 0.24 }));
  add(status, icon("chevron-down", 12, C.inkSoft));
  add(chips, status);
  add(bar, chips);
  add(content, stretch(bar));

  const data = [
    { nama: "Marcus Sterling", email: "marcus.s@lumina.io", mulai: "Mulai 12 Agu", slot: "Hari ini 09.30" },
    { nama: "Sarah Jenkins", email: "sarah.j@vertex.net", mulai: "Mulai 1 Sep", slot: "Besok 08.00" },
    { nama: "Elena Rostova", email: "elena.rostova@cyberpost.org", mulai: "Mulai 15 Jul", slot: "Hari ini 11.15" },
    { nama: "Steve Henderson", email: "steve.s@lumina.io", mulai: "Mulai 12 Agu", slot: "Hari ini 08.20" },
    { nama: "Chloe Bennett", email: "chloe.b@aurahealth.com", mulai: "Mulai 4 Jun", slot: "Hari ini 16.30" },
    { nama: "Jordan Hayes", email: "jordan.h@kinetic.run", mulai: "Mulai 18 Sep", slot: "Jumat 10.00" },
  ];
  const grid = box("grid", null, null, { dir: "VERTICAL", gap: 24 });
  for (let i = 0; i < data.length; i += 3) {
    const row = box("row", null, null, { dir: "HORIZONTAL", gap: 24 });
    for (const k of data.slice(i, i + 3)) add(row, grow(klienCard(k)));
    add(grid, stretch(row));
  }
  add(content, stretch(grid));

  const footer = box("pagination", null, null, { dir: "HORIZONTAL", padL: 16, padR: 16, padT: 12, padB: 12, align: "CENTER", justify: "SPACE_BETWEEN", radius: 12, fill: C.alt });
  add(footer, txt("Menampilkan 1 - 6 dari 6 Klien terdaftar", { size: 12, weight: 400, color: C.muted }));
  const pages = box("pages", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(pages, button("", { icon: icon("chevron-left", 16, C.inkSoft), fill: C.tint, radius: 8, w: 32, h: 32, padX: 0 }));
  add(pages, button("1", { fill: C.primary, color: C.white, radius: 8, w: 32, h: 32, padX: 0, size: 12, weight: 600 }));
  add(pages, button("", { icon: icon("chevron-right", 16, C.inkSoft), fill: C.tint, radius: 8, w: 32, h: 32, padX: 0 }));
  add(footer, pages);
  add(content, stretch(footer));
}

function klienCard(k) {
  const card = box("klien-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const top = box("top", null, null, { dir: "HORIZONTAL", align: "MIN", justify: "SPACE_BETWEEN" });
  const left = box("identity", null, null, { dir: "HORIZONTAL", gap: 16, align: "CENTER" });
  add(left, avatar(k.nama, 56, "square"));
  const col = box("name-col", null, null, { dir: "VERTICAL", gap: 0 });
  add(col, txt(k.nama, { size: 18, weight: 800, color: C.ink }));
  add(col, txt(k.email, { size: 12, weight: 400, color: C.muted }));
  add(left, col);
  add(top, left);
  add(top, icon("message-circle", 16, C.inkSoft));
  add(card, stretch(top));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const started = box("started", null, 22, { dir: "HORIZONTAL", gap: 4, padL: 10, padR: 10, align: "CENTER", radius: 9999, fill: C.tint });
  add(started, icon("calendar-days", 12, C.inkSoft));
  add(started, txt(k.mulai, { size: 12, weight: 600, color: C.inkSoft }));
  add(card, started);

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const slot = box("session-slot", null, null, { dir: "VERTICAL", gap: 4, pad: 16, radius: 12, fill: C.tint, opacity: 0.7 });
  add(slot, txt("Slot Sesi", { size: 10, weight: 700, color: C.muted, ls: 0.5, upper: true }));
  const srow = box("slot-row", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(srow, icon("clock", 14, C.success));
  add(srow, txt(k.slot, { size: 14, weight: 700, color: C.ink }));
  add(slot, srow);
  add(card, stretch(slot));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const link = box("footer-link", null, 40, { dir: "HORIZONTAL", gap: 4, align: "CENTER", justify: "CENTER", radius: 12, fill: C.brand });
  add(link, txt("Lihat Profil & Program Lengkap", { size: 14, weight: 700, color: C.white }));
  add(link, icon("arrow-right", 14, C.white));
  add(card, stretch(link));
  return card;
}

function buildRiwayat(content) {
  add(content, stretch(pageHeader("Progres & Biometrik Klien", null, pill("6 Terpantau", { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }))));

  const toolbar = box("riwayat-toolbar", null, null, { dir: "HORIZONTAL", pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 12, fill: C.white });
  add(toolbar, segmented(["Semua", "Naik BB", "Turun BB"], 0, "brand"));
  add(toolbar, segmented(["Semua", "Perempuan", "Laki-laki"], 0, "white"));
  add(content, stretch(toolbar));

  const card = box("matrix-card", null, null, { dir: "VERTICAL", radius: 12, fill: C.white });
  const titleWrap = box("matrix-title", null, null, { dir: "VERTICAL", pad: 16 });
  add(titleWrap, txt("Matriks Progres Atletik", { size: 18, weight: 600, color: C.ink }));
  add(card, stretch(titleWrap));

  const cols = [320, 180, 160, 220, 0];
  const header = box("thead", null, 38, { dir: "HORIZONTAL", fill: C.white, stroke: C.s4, strokeWeight: 1, strokeSides: "bottom" });
  const heads = ["Profil Klien", "Target", "BB Awal", "BB Sekarang", "Selisih"];
  heads.forEach((t, i) => {
    const cell = box("th", cols[i] === 0 ? null : cols[i], 38, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(cell, overline(t));
    add(header, cols[i] === 0 ? grow(cell) : cell);
  });
  add(card, stretch(header));

  const rows = [
    { nama: "Sarah Jenkins", usia: 29, goal: "weight_loss", bbAwal: "78.5 kg", bbSekarang: "71.2 kg", delta: "-7.3 kg", down: true },
    { nama: "Marcus Sterling", usia: 34, goal: "hypertrophy", bbAwal: "82.0 kg", bbSekarang: "86.8 kg", delta: "+4.8 kg", down: false },
    { nama: "Elena Rostova", usia: 26, goal: "hypertrophy", bbAwal: "59.8 kg", bbSekarang: "63.2 kg", delta: "+3.4 kg", down: false },
    { nama: "David Kim", usia: 31, goal: "weight_loss", bbAwal: "75.0 kg", bbSekarang: "73.9 kg", delta: "-1.1 kg", down: true },
    { nama: "Chloe Bennett", usia: 27, goal: "weight_loss", bbAwal: "69.0 kg", bbSekarang: "63.1 kg", delta: "-5.9 kg", down: true },
    { nama: "Jordan Hayes", usia: 30, goal: "hypertrophy", bbAwal: "77.4 kg", bbSekarang: "80.2 kg", delta: "+2.8 kg", down: false },
  ];
  for (const r of rows) {
    const tr = box("tr", null, null, { dir: "HORIZONTAL", stroke: C.s4, strokeWeight: 1, strokeSides: "bottom" });
    const c0 = box("td", cols[0], null, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, padT: 12, padB: 12, align: "CENTER" });
    add(c0, avatarDotted(r.nama, 40));
    const nm = box("nm", null, null, { dir: "VERTICAL", gap: 0 });
    add(nm, txt(r.nama, { size: 14, weight: 700, color: C.ink }));
    add(nm, overline("Usia " + r.usia));
    add(c0, nm);
    add(tr, c0);
    const c1 = box("td", cols[1], null, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(c1, badgeGoal(r.goal));
    add(tr, c1);
    add(tr, cellText(cols[2], r.bbAwal, 600));
    add(tr, cellText(cols[3], r.bbSekarang, 700));
    const c4 = box("td", null, null, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(c4, badgeDelta(r.down, r.delta));
    add(tr, grow(c4));
    add(card, stretch(tr));
  }
  add(content, stretch(card));
}

function cellText(w, t, weight) {
  const c = box("td", w, null, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
  add(c, txt(t, { size: 12, weight, color: C.ink }));
  return c;
}

function badgeGoal(goal) {
  if (goal === "weight_loss") return pill("Turun BB", { fill: C.dangerContainer, color: C.dangerStrong, size: 11, h: 20, padL: 10, padR: 10 });
  return pill("Naik BB", { fill: C.successContainer, color: C.success, opacity: 0.4, size: 11, h: 20, padL: 10, padR: 10 });
}

function badgeDelta(down, label) {
  const p = pill(label, { fill: down ? C.dangerContainer : C.successContainer, color: down ? C.dangerStrong : C.success, size: 12, h: 24, padL: 10, padR: 10, gap: 2 });
  return p;
}

const FEEDBACK_THREADS = [
  { nama: "Sarah Jenkins", waktu: "14 MNT LALU", preview: "Menyelesaikan interval Rabu, RPE 9 saat deadlift, rasa lapar sedikit meningkat..." },
  { nama: "Marcus Sterling", waktu: "1 JAM LALU", preview: "Angka incline bench naik progresif minggu ini." },
  { nama: "Elena Rostova", waktu: "2 JAM LALU", preview: "Fase catch terasa agak kurang pas saat clean." },
  { nama: "David Kim", waktu: "4 JAM LALU", preview: "Nyeri lutut turun ke 2/10 setelah minggu deload." },
  { nama: "Chloe Bennett", waktu: "KEMARIN", preview: "Tes ulang rotasi toraks pasif: +8 derajat." },
  { nama: "Jordan Hayes", waktu: "2 HARI LALU", preview: "Kedalaman squat membaik, bracing terasa lebih stabil." },
];

function threadColumn(activeIndex) {
  const left = box("thread-col", 442, null, { dir: "VERTICAL", gap: 4 });
  FEEDBACK_THREADS.forEach((t, i) => add(left, threadItem({ ...t, active: i === activeIndex })));
  return left;
}

function buildFeedback(content) {
  add(content, stretch(pageHeader("Pusat Feedback", "Evaluasi biometrik real-time, tinjauan analisis video, dan pengiriman arahan bimbingan.")));

  const grid = box("feedback-grid", null, null, { dir: "HORIZONTAL", gap: 24 });
  add(grid, threadColumn(0));
  const right = box("detail-col", null, null, { dir: "VERTICAL", gap: 24 });
  add(right, athleteCard());
  add(right, composerCard());
  add(grid, grow(right));
  add(content, stretch(grid));
}

function buildFeedbackEmpty(content) {
  add(content, stretch(pageHeader("Pusat Feedback", "Evaluasi biometrik real-time, tinjauan analisis video, dan pengiriman arahan bimbingan.")));

  const grid = box("feedback-grid", null, null, { dir: "HORIZONTAL", gap: 24 });
  add(grid, threadColumn(-1));
  const right = box("detail-col", null, null, { dir: "VERTICAL" });
  add(right, emptyState("message-square", "Pilih klien", "Pilih percakapan klien di sebelah kiri untuk mulai menulis feedback."));
  add(grid, grow(right));
  add(content, stretch(grid));
}

function threadItem(t) {
  const item = box("thread", null, null, { dir: "HORIZONTAL", gap: 12, pad: 16, radius: 12, fill: C.white });
  if (t.active) {
    const strip = box("strip", 4, 72, { radius: 9999, fill: C.primary });
    add(item, strip);
  }
  add(item, avatar(t.nama, 48, "circle"));
  const col = box("thread-info", null, null, { dir: "VERTICAL", gap: 2 });
  const head = box("thread-head", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(head, txt(t.nama, { size: 18, weight: 600, color: C.ink }));
  add(head, txt(t.waktu, { size: 10, weight: 700, color: C.muted, ls: 0.4, upper: true }));
  add(col, stretch(head));
  add(col, txt(t.preview, { size: 12, weight: 400, color: C.inkSoft, width: 320 }));
  add(item, grow(col));
  return item;
}

function athleteCard() {
  const card = box("athlete-card", null, null, { dir: "HORIZONTAL", gap: 16, pad: 24, radius: 16, fill: C.white, align: "CENTER" });
  add(card, avatar("Sarah Jenkins", 64, "square"));
  const col = box("athlete-info", null, null, { dir: "VERTICAL", gap: 2 });
  add(col, txt("Sarah Jenkins", { size: 22, weight: 700, color: C.ink, ls: -0.33 }));
  add(col, txt("Minggu 8/12 • Target Makro: Defisit Tinggi", { size: 12, weight: 500, color: C.muted }));
  add(card, col);
  return card;
}

function composerCard() {
  const card = box("composer", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  add(card, txt("Pengiriman Protokol Bimbingan", { size: 18, weight: 600, color: C.ink }));
  add(card, overline("Susun arahan, koreksi teknik, dan penyesuaian nutrisi."));
  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  add(card, overline("Tag Taksonomi Pengiriman"));

  add(card, box("gap", null, 8, { dir: "VERTICAL" }));
  const wrap = box("composer-box", null, null, { dir: "VERTICAL", gap: 4, pad: 6, radius: 12, fill: C.tint });
  const toolbar = box("toolbar", null, 35, { dir: "HORIZONTAL", gap: 4, padL: 8, padR: 8, align: "CENTER", radius: 8, fill: C.white });
  const tools = ["bold", "italic", "list", "list-ordered", "code", "smile"];
  tools.forEach((name, i) => {
    if (i === 4) add(toolbar, box("divider", 1, 16, { fill: C.outline, opacity: 0.5 }));
    add(toolbar, icon(name, 16, C.inkSoft));
  });
  add(wrap, stretch(toolbar));
  const ta = box("textarea", null, 160, { dir: "VERTICAL", pad: 12, radius: 8, fill: C.white });
  add(ta, txt("Tulis feedback untuk klien...", { size: 14, weight: 400, color: C.muted }));
  add(wrap, stretch(ta));
  add(card, stretch(wrap));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const actions = box("composer-actions", null, null, { dir: "HORIZONTAL", gap: 8, justify: "MAX" });
  add(actions, button("Simpan Draf", { fill: C.s2, color: C.ink, radius: 10, padX: 20, h: 40 }));
  add(actions, button("Kirim Feedback", { fill: C.brand, color: C.white, radius: 10, padX: 20, h: 40 }));
  add(card, stretch(actions));
  return card;
}

function buildProfil(content) {
  add(content, stretch(pageHeader("Pengaturan Profil Pelatih", "Kelola profil bimbingan publik, kredensial, dan parameter autentikasi terenkripsi.")));

  const grid = box("profil-grid", null, null, { dir: "HORIZONTAL", gap: 24 });
  add(grid, profileIdentity());
  const right = box("profil-right", null, null, { dir: "VERTICAL", gap: 24 });
  add(right, personalInfoCard());
  add(right, preferencesCard());
  add(grid, grow(right));
  add(content, stretch(grid));
}

function profileIdentity() {
  const card = box("identity-card", 461, 320, { radius: 16, fill: C.white });

  const cover = box("cover", 461, 112, { fill: C.primary });
  add(card, cover);
  cover.x = 0;
  cover.y = 0;

  const avatarWrap = box("avatar-wrap", 120, 120, {});
  const ring = box("avatar-ring", 120, 120, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 60, fill: C.accentIndigo, opacity: 0.3 });
  const ringInner = box("avatar-inner", 112, 112, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 56, fill: C.white, pad: 4 });
  add(ringInner, avatar("Alex Vance", 104, "circle"));
  add(ring, ringInner);
  add(avatarWrap, ring);
  const cam = box("cam-btn", 32, 32, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 16, fill: C.white });
  add(cam, icon("camera", 16, C.brand));
  add(avatarWrap, cam);
  cam.x = 88;
  cam.y = 88;
  add(card, avatarWrap);
  avatarWrap.x = 32;
  avatarWrap.y = 52;

  const name = txt("Coach Alex Vance, CSCS", { size: 18, weight: 800, color: C.ink });
  add(card, name);
  name.x = 24;
  name.y = 192;

  const handle = txt("@coach_alex", { size: 12, weight: 700, color: C.ink, ls: 0.24 });
  add(card, handle);
  handle.x = 24;
  handle.y = 218;

  const btn = box("change-avatar", 413, 36, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", justify: "CENTER", radius: 9999, fill: C.s2 });
  add(btn, icon("upload", 14, C.brand));
  add(btn, txt("Ganti Foto", { size: 12, weight: 700, color: C.ink }));
  add(card, btn);
  btn.x = 24;
  btn.y = 254;

  return card;
}

function fieldRow(label, value, iconName, tag) {
  const f = box("field", null, null, { dir: "VERTICAL", gap: 6 });
  const lbl = box("label", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(lbl, overline(label));
  if (tag) add(lbl, txt(tag, { size: 10, weight: 600, color: tag === "verified" ? C.success : C.accentIndigo, ls: 0.5, upper: true }));
  add(f, stretch(lbl));
  const input = box("input", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 12, fill: C.tint });
  if (iconName) add(input, icon(iconName, 16, C.muted));
  add(input, txt(value, { size: 14, weight: 400, color: C.ink }));
  add(f, stretch(input));
  return f;
}

function personalInfoCard() {
  const card = box("personal-card", null, null, { dir: "VERTICAL", gap: 16, pad: 24, radius: 16, fill: C.white });
  add(card, txt("Informasi Pribadi", { size: 18, weight: 800, color: C.ink }));
  add(card, txt("Identitas utama yang ditampilkan di ekosistem atlet dan direktori bimbingan.", { size: 12, weight: 400, color: C.inkSoft }));

  const gridA = box("form-grid-a", null, null, { dir: "HORIZONTAL", gap: 16 });
  const colA = box("fg-a", null, null, { dir: "VERTICAL", gap: 16 });
  add(colA, stretch(fieldRow("Nama Profesional", "Alex Vance", "user")));
  add(colA, stretch(fieldRow("Lokasi Gym", "Fithub Orlando", "map-pin")));
  add(colA, stretch(fieldRow("Usia", "33", "calendar-days")));
  const colB = box("fg-b", null, null, { dir: "VERTICAL", gap: 16 });
  add(colB, stretch(fieldRow("Alamat Email", "alex.vance@bugarin.com", "mail", "verified")));
  add(colB, stretch(fieldRow("Jenis Kelamin", "Laki-laki", null)));
  add(gridA, grow(colA));
  add(gridA, grow(colB));
  add(card, stretch(gridA));

  add(card, overline("Spesialisasi"));
  const chips = box("spec-chips", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(chips, specChip("Penurunan BB"));
  add(chips, specChip("Penambahan BB / Bulking"));
  const addSpec = box("add-spec", null, 22, { dir: "HORIZONTAL", gap: 4, padL: 12, padR: 12, align: "CENTER", radius: 9999, fill: C.s3 });
  add(addSpec, icon("plus", 12, C.inkSoft));
  add(addSpec, txt("Tambah Spesialisasi", { size: 10, weight: 600, color: C.inkSoft, ls: 0.4 }));
  add(chips, addSpec);
  add(card, chips);

  const bioLabel = box("bio-label", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(bioLabel, overline("Bio / Filosofi Bimbingan"));
  add(bioLabel, txt(BIO.length + " / 600 karakter", { size: 10, weight: 700, color: C.muted, ls: 0.4 }));
  add(card, stretch(bioLabel));
  const bioBox = box("bio", null, 119, { dir: "VERTICAL", pad: 14, radius: 12, fill: C.tint });
  add(bioBox, txt(BIO, { size: 14, weight: 400, color: C.ink, lh: 22.75, width: 837 }));
  add(card, stretch(bioBox));
  add(card, txt("Ringkasan filosofi ini tampil di awal alur onboarding atletmu.", { size: 12, weight: 400, color: C.muted }));

  add(card, box("gap", null, 8, { dir: "VERTICAL" }));
  const actions = box("form-actions", null, null, { dir: "HORIZONTAL", gap: 12, justify: "MAX" });
  add(actions, button("Batalkan", { fill: C.s2, color: C.ink, radius: 9999, padX: 20, h: 36, size: 14 }));
  add(actions, button("Simpan Perubahan", { icon: icon("save", 16, C.white), fill: C.brand, color: C.white, radius: 9999, padX: 20, h: 36, size: 14 }));
  add(card, stretch(actions));
  return card;
}

function specChip(label) {
  const f = box("spec", null, 22, { dir: "HORIZONTAL", gap: 6, padL: 12, padR: 12, align: "CENTER", radius: 9999, fill: C.accentIndigo, opacity: 0.1 });
  add(f, txt(label, { size: 10, weight: 700, color: C.inkSoft, ls: 0.4 }));
  add(f, icon("x", 10, C.inkSoft));
  return f;
}

function preferencesCard() {
  const card = box("pref-card", null, null, { dir: "VERTICAL", gap: 24, pad: 24, radius: 16, fill: C.white });
  add(card, txt("Preferensi & Keamanan", { size: 18, weight: 800, color: C.ink }));
  add(card, txt("Kontrol tampilan ruang kerja dan jaga keamanan akses akunmu.", { size: 12, weight: 400, color: C.inkSoft }));

  const appearance = box("appearance", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 16, fill: C.tint });
  const aLeft = box("appearance-left", null, null, { dir: "VERTICAL", gap: 2 });
  add(aLeft, txt("Mode Tampilan Antarmuka", { size: 14, weight: 700, color: C.ink }));
  add(aLeft, txt("Pilih antara tampilan terang kontras tinggi dan mode gelap.", { size: 12, weight: 400, color: C.inkSoft }));
  add(appearance, aLeft);
  const seg = box("seg", null, 36, { dir: "HORIZONTAL", gap: 4, pad: 4, align: "CENTER", radius: 9999, fill: C.s2 });
  const on = box("seg-light", null, 28, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.white });
  add(on, icon("sun", 14, C.warning));
  add(on, txt("Terang", { size: 12, weight: 700, color: C.ink }));
  add(seg, on);
  const off = box("seg-dark", null, 28, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999 });
  add(off, icon("moon", 14, C.muted));
  add(off, txt("Gelap", { size: 12, weight: 700, color: C.muted }));
  add(seg, off);
  add(appearance, seg);
  add(card, stretch(appearance));

  const rot = box("rotation", null, null, { dir: "VERTICAL", gap: 16 });
  const rotHead = box("rot-head", null, null, { dir: "VERTICAL", gap: 2 });
  add(rotHead, txt("Rotasi Kunci Autentikasi", { size: 14, weight: 700, color: C.ink }));
  add(rotHead, txt("Pastikan password berisi 12+ karakter termasuk simbol, huruf besar-kecil, dan angka.", { size: 12, weight: 400, color: C.muted }));
  add(rot, rotHead);
  const pwField = box("pw-field", null, null, { dir: "VERTICAL", gap: 6 });
  add(pwField, overline("Password Saat Ini"));
  const pwInput = box("pw-input", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 12, fill: C.tint });
  add(pwInput, icon("key-round", 16, C.muted));
  add(pwInput, grow(txt("••••••••", { size: 14, weight: 400, color: C.ink })));
  add(pwInput, icon("eye", 16, C.muted));
  add(pwField, stretch(pwInput));
  add(rot, stretch(pwField));
  const rotRow = box("rot-row", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER", justify: "SPACE_BETWEEN" });
  const rotInfo = box("rot-info", null, null, { dir: "HORIZONTAL", gap: 6, align: "CENTER" });
  add(rotInfo, icon("rotate-cw", 14, C.muted));
  add(rotInfo, txt("Rotasi kunci terakhir 74 hari lalu", { size: 12, weight: 400, color: C.muted }));
  add(rotRow, rotInfo);
  add(rotRow, button("Ganti Password", { fill: C.brand, color: C.white, radius: 9999, padX: 20, h: 36, size: 14 }));
  add(rot, stretch(rotRow));
  add(card, stretch(rot));
  return card;
}

function buildKlienDetail(content) {
  const back = box("back", null, 32, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(back, icon("arrow-left", 16, C.ink));
  add(back, txt("Kembali ke Klien", { size: 14, weight: 600, color: C.ink }));
  add(content, back);

  const profile = box("detail-profile", null, null, { dir: "VERTICAL", gap: 24, pad: 24, radius: 16, fill: C.white });
  const top = box("detail-top", null, null, { dir: "HORIZONTAL", gap: 20, align: "CENTER" });
  add(top, avatar("Marcus Sterling", 80, "square"));
  const info = box("detail-info", null, null, { dir: "VERTICAL", gap: 4 });
  add(info, txt("Marcus Sterling", { size: 40, weight: 800, color: C.ink, ls: -0.7 }));
  add(info, txt("marcus.s@lumina.io", { size: 16, weight: 400, color: C.inkSoft }));
  const badges = box("detail-badges", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  const st = pill("Mulai 12 Agu", { fill: C.tint, color: C.inkSoft, size: 12, h: 22, padL: 10, padR: 10, icon: icon("calendar-days", 12, C.inkSoft) });
  add(badges, st);
  add(badges, badgeGoal("hypertrophy"));
  add(badges, pill("Hari ini 09.30", { fill: C.s3, color: C.inkSoft, size: 11, h: 22, padL: 10, padR: 10, icon: icon("clock", 12, C.inkSoft) }));
  add(info, badges);
  add(top, info);
  add(profile, stretch(top));

  const metrics = box("metrics", null, null, { dir: "VERTICAL", gap: 16 });
  const m = [
    ["Umur", "29 tahun"],
    ["Jenis Kelamin", "Laki-laki"],
    ["BB Awal", "78 kg"],
    ["BB Sekarang", "82 kg"],
    ["BB Tujuan", "88 kg"],
    ["Tinggi Badan", "180 cm"],
  ];
  for (let i = 0; i < m.length; i += 3) {
    const row = box("metric-row", null, null, { dir: "HORIZONTAL", gap: 16 });
    for (const [label, value] of m.slice(i, i + 3)) add(row, grow(infoItem(label, value)));
    add(metrics, stretch(row));
  }
  add(profile, stretch(metrics));
  add(content, stretch(profile));

  const program = box("program", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const ptitle = box("program-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(ptitle, txt("Penambahan Otot & Kekuatan", { size: 20, weight: 600, color: C.ink }));
  const ai = box("badge-ai", null, 20, { dir: "HORIZONTAL", gap: 4, padL: 8, padR: 8, align: "CENTER", radius: 9999, fill: C.brand, opacity: 0.1 });
  add(ai, icon("sparkles", 12, C.secondaryStrong));
  add(ai, txt("Dibuat AI", { size: 12, weight: 500, color: C.secondaryStrong }));
  add(ptitle, ai);
  add(program, ptitle);
  add(program, txt("Surplus kalori bersih dengan beban progresif untuk menambah massa otot.", { size: 14, weight: 400, color: C.inkSoft }));
  add(program, box("gap", null, 16, { dir: "VERTICAL" }));
  add(program, txt("Rencana Latihan", { size: 14, weight: 600, color: C.ink }));
  add(program, box("gap", null, 12, { dir: "VERTICAL" }));
  const workouts = [
    { hari: "Senin · Dorong", latihan: ["Bench Press 4x8", "Incline DB Press 3x10", "Dips 3x12"] },
    { hari: "Rabu · Tarik", latihan: ["Pull-up 4x8", "Barbell Row 4x10", "Face Pull 3x15"] },
    { hari: "Jumat · Kaki", latihan: ["Squat 4x8", "Leg Curl 3x12", "Calf Raise 4x15"] },
  ];
  const wlist = box("workouts", null, null, { dir: "VERTICAL", gap: 12 });
  for (const w of workouts) {
    const wc = box("workout", null, null, { dir: "VERTICAL", gap: 4, pad: 16, radius: 12, fill: C.alt });
    add(wc, txt(w.hari, { size: 14, weight: 600, color: C.ink }));
    for (const l of w.latihan) add(wc, txt("•  " + l, { size: 14, weight: 400, color: C.inkSoft }));
    add(wlist, stretch(wc));
  }
  add(program, stretch(wlist));
  add(content, stretch(program));
}

function infoItem(label, value) {
  const f = box("info-item", null, null, { dir: "VERTICAL", gap: 4, pad: 16, radius: 12, fill: C.tint });
  add(f, txt(label, { size: 10, weight: 600, color: C.muted, ls: 0.5, upper: true }));
  add(f, txt(value, { size: 18, weight: 600, color: C.ink }));
  return f;
}

function loginScreen() {
  const root = box("Login (Web App)", SCREEN_W, 1117, { dir: "HORIZONTAL" });
  const left = box("photo-panel", SCREEN_W / 2, 1117, { gradient: [C.primary, C.success, C.sidebar] });
  add(root, left);
  const right = box("form-panel", SCREEN_W / 2, 1117, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", fill: C.tint });
  const form = box("form", 480, null, { dir: "VERTICAL", gap: 0 });
  add(form, txt("Welcome Back, Coach", { size: 36, weight: 800, color: C.ink }));

  const fields = box("fields", null, null, { dir: "VERTICAL", gap: 20, padT: 32 });
  const email = box("email-field", null, null, { dir: "VERTICAL", gap: 8 });
  add(email, txt("Email Address", { size: 14, weight: 500, color: C.ink }));
  const emailInput = box("input-email", 480, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: C.white });
  add(emailInput, icon("mail", 16, C.muted));
  add(emailInput, txt("coach@bugarin.com", { size: 14, weight: 400, color: C.muted }));
  add(email, emailInput);
  add(fields, email);

  const pw = box("pw-field", null, null, { dir: "VERTICAL", gap: 8 });
  const pwLabel = box("pw-label", 480, null, { dir: "HORIZONTAL", align: "CENTER", justify: "SPACE_BETWEEN" });
  add(pwLabel, txt("Password", { size: 14, weight: 500, color: C.ink }));
  add(pwLabel, txt("Forgot Password?", { size: 12, weight: 500, color: C.secondaryStrong }));
  add(pw, pwLabel);
  const pwInput = box("input-pw", 480, 40, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: C.white });
  add(pwInput, icon("lock", 16, C.muted));
  add(pwInput, grow(txt("••••••••", { size: 14, weight: 400, color: C.ink })));
  add(pwInput, icon("eye", 16, C.muted));
  add(pw, pwInput);
  add(fields, pw);
  add(form, fields);

  add(form, box("gap", null, 24, { dir: "VERTICAL" }));
  const signIn = box("sign-in", 480, 40, { dir: "HORIZONTAL", align: "CENTER", justify: "CENTER", radius: 8, fill: C.primary });
  add(signIn, txt("Sign In", { size: 14, weight: 600, color: C.white }));
  add(form, signIn);

  add(right, form);
  add(root, right);
  return root;
}

async function main() {
  await loadFonts();
  let page = null;
  for (const p of figma.root.children) {
    if (p.type === "PAGE" && p.name.replace(/\s+/g, " ").trim() === "UI Website PT") page = p;
  }
  if (!page && figma.currentPage.type === "PAGE") page = figma.currentPage;
  if (!page) {
    figma.closePlugin("Halaman 'UI Website PT' tidak ditemukan.");
    return;
  }
  figma.currentPage = page;

  let maxRight = 0;
  let minY = 0;
  let first = true;
  for (const n of page.children) {
    const x = n.x || 0;
    const w = n.width || 0;
    const y = n.y || 0;
    if (x + w > maxRight) maxRight = x + w;
    if (first) {
      minY = y;
      first = false;
    } else if (y < minY) {
      minY = y;
    }
  }

  const startX = maxRight + 400;
  let cursorY = minY;
  const gapY = 120;
  const frames = [
    loginScreen(),
    ptScreen("Dashboard (Web App)", "dashboard", 1117, buildDashboard),
    ptScreen("Verifikasi (Web App)", "verifikasi", 1117, buildVerifikasi),
    ptScreen("Klien (Web App)", "klien", 1180, buildKlien),
    ptScreen("Riwayat (Web App)", "riwayat", 1050, buildRiwayat),
    ptScreen("Feedback (Web App)", "feedback", 1117, buildFeedback),
    ptScreen("Feedback - Kosong (Web App)", "feedback", 1117, buildFeedbackEmpty),
    ptScreen("Profil (Web App)", "profil", 1320, buildProfil),
    ptScreen("Detail Klien (Web App)", "klien", 1500, buildKlienDetail),
  ];
  for (const f of frames) {
    page.appendChild(f);
    f.x = startX;
    f.y = cursorY;
    cursorY += f.height + gapY;
  }
  figma.viewport.scrollAndZoomIntoView(frames);
  const fontNote = USED_FALLBACK
    ? "Font: Inter (fallback) — pasang Plus Jakarta Sans untuk hasil 100%."
    : "Font: Plus Jakarta Sans.";
  figma.closePlugin("Selesai: 9 frame baru dibuat di halaman 'UI Website PT' (desain lama tidak diubah). " + fontNote);
}

main().catch((err) => {
  figma.closePlugin("Gagal: " + (err && err.message ? err.message : String(err)));
});
