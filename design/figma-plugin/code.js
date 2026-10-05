const ICONS = require("./icons.generated.js");

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
const SCREEN_H = 1117;
const SIDEBAR_W = 256;
const HEADER_H = 64;

let FAMILY = "Plus Jakarta Sans";
const PJS = { 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold" };
const INTER = { 400: "Regular", 500: "Medium", 600: "Semi Bold", 700: "Bold", 800: "Extra Bold" };
let STYLES = PJS;

async function loadFonts() {
  try {
    for (const w of [400, 500, 600, 700, 800]) {
      await figma.loadFontAsync({ family: FAMILY, style: PJS[w] });
    }
  } catch (e) {
    FAMILY = "Inter";
    STYLES = INTER;
    for (const w of [400, 500, 600, 700, 800]) {
      await figma.loadFontAsync({ family: FAMILY, style: INTER[w] });
    }
  }
}

function rgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
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
    gradientTransform: [
      [0, 1, 0],
      [1, 0, 0],
    ],
    gradientStops: hexes.map((hex, i) => ({
      position: hexes.length === 1 ? 0 : i / (hexes.length - 1),
      color: rgb(hex),
    })),
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

function add(parent, child) {
  parent.appendChild(child);
  const p = PENDING.get(child);
  if (p) {
    if (p.grow) child.layoutGrow = 1;
    if (p.stretch) child.layoutAlign = "STRETCH";
  }
  return child;
}
function grow(child) {
  const p = PENDING.get(child) || {};
  p.grow = true;
  PENDING.set(child, p);
  return child;
}
function stretch(child) {
  const p = PENDING.get(child) || {};
  p.stretch = true;
  PENDING.set(child, p);
  return child;
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");
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

function avatarDotted(name, size, dotColor) {
  const wrap = box("avatar-dot/" + name, size, size, {});
  add(wrap, avatar(name, size, "circle"));
  const dot = figma.createEllipse();
  dot.resize(size * 0.25, size * 0.25);
  dot.fills = [solid(dotColor)];
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
  add(f, txt(label, { size: o.size || 14, weight: o.weight || 600, color: o.color || C.ink }));
  return f;
}

function sidebar(active) {
  const s = box("aside", SIDEBAR_W, SCREEN_H, { dir: "VERTICAL", pad: 16, fill: C.sidebar });

  const brand = box("brand", null, null, { dir: "VERTICAL", gap: 2, padT: 8, padB: 24, padL: 12, padR: 12 });
  add(brand, txt("Bugarin", { size: 18, weight: 700, color: C.white, ls: -0.45 }));
  add(brand, txt("PT Platform", { size: 10, weight: 600, color: C.primary, ls: 0.5, upper: true }));
  add(s, stretch(brand));

  const section = box("nav-label", null, null, { dir: "VERTICAL", padL: 12, padR: 12, padB: 8 });
  add(section, txt("Main Command", { size: 10, weight: 600, color: C.white, opacity: 0.4, ls: 0.5, upper: true }));
  add(s, stretch(section));

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
    if (key === "verifikasi") {
      add(item, pill("3", { fill: C.danger, color: C.white, padL: 6, padR: 6, h: 18, size: 10, weight: 600 }));
    }
    add(nav, stretch(item));
  }
  add(s, stretch(nav));

  add(s, grow(box("spacer", null, 0, { dir: "VERTICAL" })));

  const user = box("user-card", null, null, {
    dir: "HORIZONTAL",
    gap: 12,
    pad: 12,
    align: "CENTER",
    radius: 12,
    fill: C.white,
    opacity: 0.1,
  });
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
  const bellWrap = box("bell", null, null, {});
  bellWrap.resize(24, 24);
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

function contentColumn() {
  return box("content", SCREEN_W - SIDEBAR_W, null, {
    dir: "VERTICAL",
    gap: 24,
    pad: 24,
    fill: C.tint,
  });
}

function ptScreen(name, active) {
  const root = box(name, SCREEN_W, SCREEN_H, { dir: "HORIZONTAL" });
  add(root, sidebar(active));
  const main = box("main-col", SCREEN_W - SIDEBAR_W, SCREEN_H, { dir: "VERTICAL", fill: C.tint });
  add(main, headerBar());
  const content = contentColumn();
  add(main, stretch(grow(content)));
  add(root, main);
  if (active === "dashboard") buildDashboard(content);
  else if (active === "klien") buildKlien(content);
  else if (active === "verifikasi") buildVerifikasi(content);
  return root;
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
    ["MON", 21, false, C.success],
    ["TUE", 22, false, C.outline],
    ["WED", 23, false, C.danger],
    ["HARI INI", 24, true, C.white],
    ["FRI", 25, false, C.success],
    ["SAT", 26, false, C.outline],
    ["SUN", 27, false, C.outline],
  ];
  const strip = box("week-strip", null, null, { dir: "HORIZONTAL", gap: 12, wrap: true });
  for (const [label, date, today, dotColor] of days) {
    const d = box("day", 80, null, {
      dir: "VERTICAL",
      gap: 2,
      padL: 12,
      padR: 12,
      padT: 8,
      padB: 8,
      align: "CENTER",
      radius: 8,
      fill: today ? C.brand : C.tint,
    });
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
  const row = box("session", null, null, {
    dir: "HORIZONTAL",
    gap: 16,
    pad: 16,
    align: "CENTER",
    radius: 12,
    fill: C.tint,
  });
  if (s.done) row.opacity = 0.6;
  const timeBox = box("time", 64, 48, {
    dir: "VERTICAL",
    align: "CENTER",
    justify: "CENTER",
    radius: 8,
    fill: s.next ? C.brand : C.s3,
  });
  if (s.done) {
    add(timeBox, icon("check", 16, C.success));
  } else {
    add(timeBox, txt(s.next ? "NEXT UP" : "TIME", { size: 9, weight: 600, color: s.next ? C.white : C.ink, ls: 0.4, upper: true }));
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
  add(row, pill(s.done ? "Done" : "Queued", { fill: s.done ? C.successContainer : C.s3, color: s.done ? C.success : C.muted, opacity: s.done ? 0.3 : 1, padL: 10, padR: 10 }));
  if (!s.done) add(row, icon("ellipsis-vertical", 16, C.muted));
  return row;
}

function buildDashboard(content) {
  const banner = box("greeting-banner", null, null, { dir: "VERTICAL", gap: 6, pad: 24, radius: 12, fill: C.primary });
  add(banner, txt("Selamat pagi, Coach Alex!", { size: 40, weight: 700, color: C.white, lh: 44 }));
  add(banner, txt("Jadwal hasil AI disinkronkan otomatis dengan data biometrik klien.", { size: 14, weight: 400, color: C.white, opacity: 0.9 }));
  add(content, stretch(banner));

  const stats = box("stats", null, null, { dir: "HORIZONTAL", gap: 20 });
  add(stats, grow(statCard("users", "Total Active Clients", 24)));
  add(stats, grow(statCard("clipboard-check", "Pending Verifications", 3)));
  add(content, stretch(stats));

  const card = box("schedule-card", null, null, { dir: "VERTICAL", gap: 24, pad: 24, radius: 12, fill: C.white });
  const head = box("schedule-head", null, null, { dir: "HORIZONTAL", align: "MIN", justify: "SPACE_BETWEEN" });
  const hleft = box("head-left", null, null, { dir: "VERTICAL", gap: 4 });
  const htitle = box("head-title", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(htitle, txt("Daily Trajectory & Schedule", { size: 20, weight: 600, color: C.ink }));
  const ai = box("badge-ai", null, 20, { dir: "HORIZONTAL", gap: 4, padL: 8, padR: 8, align: "CENTER", radius: 9999, fill: C.brand, opacity: 0.1 });
  add(ai, icon("zap", 12, C.secondaryStrong));
  add(ai, txt("AI Planned", { size: 12, weight: 500, color: C.secondaryStrong }));
  add(htitle, ai);
  add(hleft, htitle);
  add(hleft, txt("Real-time biometrics re-route sequence automatically based on HRV.", { size: 12, weight: 400, color: C.muted }));
  add(head, hleft);
  const hright = box("head-right", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(hright, icon("chevron-left", 16, C.muted));
  add(hright, pill("Thursday, 24 Oct", { fill: C.tint, color: C.ink, size: 12, weight: 500, padL: 16, padR: 16, h: 28, ls: 0 }));
  add(hright, icon("chevron-right", 16, C.muted));
  add(head, hright);
  add(card, stretch(head));

  add(card, stretch(weekStrip()));

  const sessions = box("sessions", null, null, { dir: "VERTICAL", gap: 8 });
  const data = [
    { name: "Marcus Sterling", jam: "09:30", durasi: "45 min", tujuan: "Turun BB", lokasi: "pusatgym", next: true },
    { name: "Sarah Chen", jam: "11:00", durasi: "60 min", tujuan: "Naik BB", lokasi: "pusatgym", next: false },
    { name: "David Kim", jam: "14:00", durasi: "45 min", tujuan: "Turun BB", lokasi: "pusatgym", next: false, done: true },
    { name: "Elena Rodriguez", jam: "17:30", durasi: "30 min", tujuan: "Naik BB", lokasi: "pusatgym", next: false },
  ];
  for (const s of data) add(sessions, stretch(sessionRow(s)));
  add(card, stretch(sessions));
  add(content, stretch(card));
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
  const acts = box("actions", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(acts, icon("message-circle", 16, C.inkSoft));
  add(acts, icon("ellipsis-vertical", 16, C.inkSoft));
  add(top, acts);
  add(card, stretch(top));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const started = box("started", null, 22, { dir: "HORIZONTAL", gap: 4, padL: 10, padR: 10, align: "CENTER", radius: 9999, fill: C.tint });
  add(started, icon("calendar-days", 12, C.inkSoft));
  add(started, txt(k.mulai, { size: 12, weight: 600, color: C.inkSoft }));
  add(card, started);

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const slot = box("session-slot", null, null, { dir: "VERTICAL", gap: 4, pad: 16, radius: 12, fill: C.tint, opacity: 0.7 });
  add(slot, txt("Session Slot", { size: 10, weight: 700, color: C.muted, ls: 0.5, upper: true }));
  const srow = box("slot-row", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(srow, icon("clock", 14, C.success));
  add(srow, txt(k.slot, { size: 14, weight: 700, color: C.ink }));
  add(slot, srow);
  add(card, stretch(slot));

  add(card, box("gap", null, 16, { dir: "VERTICAL" }));
  const link = box("footer-link", null, 40, { dir: "HORIZONTAL", gap: 4, align: "CENTER", justify: "CENTER", radius: 12, fill: C.s3 });
  add(link, txt("View Full Profile & Program", { size: 14, weight: 700, color: C.ink }));
  add(link, icon("arrow-right", 14, C.ink));
  add(card, stretch(link));
  return card;
}

function buildKlien(content) {
  const header = box("page-header", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(header, txt("Active Client", { size: 40, weight: 800, color: C.ink, ls: -0.7 }));
  add(header, pill("6 Tracked", { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }));
  add(content, stretch(header));

  const bar = box("filter-bar", null, null, { dir: "HORIZONTAL", gap: 16, pad: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 16, fill: C.white });
  const search = box("search", 576, 40, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.tint });
  add(search, icon("search", 16, C.muted));
  add(search, txt("Search athlete by name, email, or protocol...", { size: 14, weight: 400, color: C.muted }));
  add(bar, search);
  const chips = box("chips", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER", wrap: true });
  add(chips, pill("All (6)", { fill: C.brand, color: C.white, padL: 16, padR: 16, size: 12, weight: 700, h: 28, ls: 0.24 }));
  add(chips, pill("Hypertrophy", { fill: C.tint, color: C.inkSoft, padL: 16, padR: 16, size: 12, weight: 500, h: 28, ls: 0.24 }));
  add(chips, pill("Weight Loss", { fill: C.tint, color: C.inkSoft, padL: 16, padR: 16, size: 12, weight: 500, h: 28, ls: 0.24 }));
  add(chips, box("divider", 1, 24, { fill: C.s3 }));
  const status = box("status", null, 28, { dir: "HORIZONTAL", gap: 4, padL: 12, padR: 12, align: "CENTER", radius: 9999, fill: C.tint });
  add(status, icon("sliders-horizontal", 12, C.inkSoft));
  add(status, txt("Status: Active", { size: 12, weight: 600, color: C.inkSoft, ls: 0.24 }));
  add(status, icon("chevron-down", 12, C.inkSoft));
  add(chips, status);
  add(bar, chips);
  add(content, stretch(bar));

  const data = [
    { nama: "Marcus Sterling", email: "marcus.s@lumina.io", mulai: "Started Aug 12", slot: "Today 9:30 AM" },
    { nama: "Sarah Jenkins", email: "sarah.j@vertex.net", mulai: "Started Sep 01", slot: "Tomorrow 8:00 AM" },
    { nama: "Elena Rostova", email: "elena.rostova@cyberpost.org", mulai: "Started Jul 15", slot: "Today 11:15 AM" },
    { nama: "Steve Henderson", email: "steve.s@lumina.io", mulai: "Started Aug 12", slot: "Today 8:20 AM" },
    { nama: "Chloe Bennett", email: "chloe.b@aurahealth.com", mulai: "Started Jun 04", slot: "Today 4:30 PM" },
    { nama: "Jordan Hayes", email: "jordan.h@kinetic.run", mulai: "Started Sep 18", slot: "Friday 10:00 AM" },
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

function verifikasiCard(r) {
  const card = box("verifikasi-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 16, fill: C.white });
  const head = box("head", null, null, { dir: "HORIZONTAL", gap: 16, align: "MIN" });
  add(head, avatarDotted(r.nama, 48, C.success));
  const info = box("info", null, null, { dir: "VERTICAL", gap: 4 });
  const nameRow = box("name-row", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(nameRow, txt(r.nama, { size: 18, weight: 700, color: C.ink }));
  add(nameRow, pill("Age " + r.usia + " • " + r.gender, { fill: C.s3, color: C.inkSoft, padL: 10, padR: 10, size: 11, h: 18 }));
  add(info, nameRow);
  const meta = box("meta", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  const m1 = box("m1", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(m1, icon("mail", 12, C.muted));
  add(m1, txt(r.email, { size: 12, weight: 400, color: C.muted }));
  add(meta, m1);
  add(meta, txt("•", { size: 12, weight: 400, color: C.outline }));
  const m2 = box("m2", null, null, { dir: "HORIZONTAL", gap: 4, align: "CENTER" });
  add(m2, icon("clock", 12, C.muted));
  add(m2, txt("Submitted: " + r.submitted, { size: 12, weight: 400, color: C.muted }));
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
  const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 12, wrap: true });
  add(actions, button("Tolak", { icon: icon("x", 16, C.dangerStrong), fill: C.dangerContainer, color: C.dangerStrong, radius: 9999, padX: 16, h: 40 }));
  add(actions, button("Accept Trainee", { icon: icon("check", 16, C.white), fill: C.success, color: C.white, radius: 9999, padX: 16, h: 40 }));
  add(card, stretch(actions));
  return card;
}

function buildVerifikasi(content) {
  const header = box("page-header", null, null, { dir: "VERTICAL", gap: 4 });
  add(header, txt("Pending Intake & Onboarding Queue", { size: 40, weight: 800, color: C.ink, ls: -0.7 }));
  add(header, txt("Tinjau penilaian awal calon klien serta tujuan atletik yang menunggu persetujuan atau penolakan sebelum penyusunan jadwal periodisasi.", { size: 20, weight: 400, color: C.inkSoft, width: 1271 }));
  add(content, stretch(header));

  const toolbar = box("toolbar", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER", wrap: true });
  const search = box("search", null, 40, { dir: "HORIZONTAL", gap: 8, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: C.tint });
  add(search, icon("search", 16, C.muted));
  add(search, txt("Search applicant by name or email...", { size: 14, weight: 400, color: C.muted }));
  grow(search);
  add(toolbar, search);
  add(toolbar, pill("All Pending (3)", { fill: C.brand, color: C.white, padL: 16, padR: 16, size: 12, weight: 500, h: 32 }));
  add(content, stretch(toolbar));

  const list = box("list", null, null, { dir: "VERTICAL", gap: 0 });
  const data = [
    { nama: "Rachel Cooper", usia: 28, gender: "Female", email: "rachel.c@vertexpulse.io", submitted: "Today, 2h ago", kategori: "Hypertrophy", targetSummary: "-6kg Fat / +3kg Muscle", periodization: "16-Week Periodization" },
    { nama: "Andi Saputra", usia: 31, gender: "Male", email: "andi.saputra@mail.com", submitted: "Today, 6h ago", kategori: "Weight Loss", targetSummary: "-9kg Fat / +1kg Muscle", periodization: "12-Week Periodization" },
    { nama: "Candra Wijaya", usia: 24, gender: "Male", email: "candra.w@mail.com", submitted: "1d ago", kategori: "Hypertrophy", targetSummary: "+7kg Muscle / +0kg Fat", periodization: "20-Week Periodization" },
  ];
  for (const r of data) add(list, stretch(verifikasiCard(r)));
  add(content, stretch(list));
}

function loginScreen() {
  const root = box("Login (Web App)", SCREEN_W, SCREEN_H, { dir: "HORIZONTAL" });
  const left = box("photo-panel", SCREEN_W / 2, SCREEN_H, { gradient: [C.primary, C.success, C.sidebar] });
  add(root, left);

  const right = box("form-panel", SCREEN_W / 2, SCREEN_H, {
    dir: "VERTICAL",
    align: "CENTER",
    justify: "CENTER",
    fill: C.tint,
  });
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

  const signIn = box("sign-in", 480, 40, { dir: "HORIZONTAL", align: "CENTER", justify: "CENTER", radius: 8, fill: C.primary, });
  add(signIn, txt("Sign In", { size: 14, weight: 600, color: C.white }));
  add(form, box("gap", null, 24, { dir: "VERTICAL" }));
  add(form, signIn);

  add(right, form);
  add(root, right);
  return root;
}

async function main() {
  await loadFonts();
  let page = null;
  for (const p of figma.root.children) {
    if (p.type === "PAGE" && p.name.trim() === "UI Website PT") page = p;
  }
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
    ptScreen("Dashboard (Web App)", "dashboard"),
    ptScreen("Verifikasi (Web App)", "verifikasi"),
    ptScreen("Klien (Web App)", "klien"),
  ];
  for (const f of frames) {
    page.appendChild(f);
    f.x = startX;
    f.y = cursorY;
    cursorY += f.height + gapY;
  }
  figma.viewport.scrollAndZoomIntoView(frames);
  figma.closePlugin("Selesai: 4 frame baru dibuat di halaman 'UI Website PT' (desain lama tidak diubah).");
}

main().catch((err) => {
  figma.closePlugin("Gagal: " + (err && err.message ? err.message : String(err)));
});
