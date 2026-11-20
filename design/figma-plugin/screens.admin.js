// Halaman admin + dialog. Memakai palet terang; varian dark dibuat lewat applyDark().
const AX = {
  bg: "#F8F9FF",
  heading: "#0B1C30",
  secondary: "#5A5E69",
  low: "#EFF4FF",
  mid: "#E5EEFF",
  track: "#DCE9FF",
  navy: "#213145",
  onNavy: "#C3C6D3",
  greenText: "#326B00",
  mint: "#82F9BE",
  mintText: "#006C47",
  brown: "#95491F",
  warning: "#FFF3AD",
  warningText: "#773308",
  dangerTint: "#FFDAD6",
  dangerText: "#93000A",
  footer: "#EAF1FF",
  surface: "#FFFFFF",
  inset: "#EBEDFB",
  banner: "#7DC04E",
  brand: "#F69665",
  primary: "#7DC04E",
  sidebar: "#2C303A",
  line: "#DCE9FF",
};

const ADMIN_W = SCREEN_W;
const ADMIN_SIDEBAR = SIDEBAR_W;

function adminSidebar(active, height) {
  const s = box("aside", ADMIN_SIDEBAR, height, { dir: "VERTICAL", pad: 16, fill: AX.sidebar });
  const brand = box("brand", null, null, { dir: "HORIZONTAL", gap: 10, align: "CENTER", padT: 8, padB: 24, padL: 12, padR: 12 });
  add(brand, img("logo", 44, 44, { scaleMode: "CONTAIN", name: "admin-brand-logo" }));
  const brandCol = box("brand-col", null, null, { dir: "VERTICAL", gap: 2 });
  add(brandCol, txt("Bugarin", { size: 18, weight: 700, color: "#FFFFFF", ls: -0.45 }));
  add(brandCol, txt("Admin", { size: 10, weight: 600, color: AX.primary, ls: 0.5, upper: true }));
  add(brand, brandCol);
  add(s, stretch(brand));

  const nav = box("nav", null, null, { dir: "VERTICAL", gap: 4 });
  const items = [
    ["Dashboard", "layout-dashboard", "dashboard"],
    ["Kelola Pengguna", "users", "users"],
    ["Riwayat", "history", "riwayat"],
    ["Profil", "user-cog", "profil"],
  ];
  for (const [label, ico, key] of items) {
    const on = key === active;
    const item = box("nav/" + label, null, 38, { dir: "HORIZONTAL", gap: 12, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: on ? AX.primary : null });
    add(item, icon(ico, 20, "#FFFFFF"));
    if (!on) item.children[0].opacity = 0.7;
    add(item, grow(txt(label, { size: 14, weight: 500, color: "#FFFFFF", opacity: on ? 1 : 0.7 })));
    add(nav, stretch(item));
  }
  add(s, stretch(nav));
  add(s, fillV(box("spacer", null, 0, { dir: "VERTICAL" })));

  const user = box("user-card", null, null, { dir: "HORIZONTAL", gap: 12, pad: 12, align: "CENTER", radius: 12, fill: "#FFFFFF", opacity: 0.1 });
  add(user, avatar("Super Admin", 40, "circle"));
  const ucol = box("user-col", null, null, { dir: "VERTICAL", gap: 2 });
  add(ucol, txt("Super Admin", { size: 14, weight: 600, color: "#FFFFFF" }));
  add(ucol, txt("Admin", { size: 12, weight: 400, color: "#FFFFFF", opacity: 0.5 }));
  add(user, grow(ucol));
  add(s, stretch(user));

  const exit = box("exit", null, null, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, padT: 12, align: "CENTER" });
  add(exit, icon("log-out", 16, C.danger));
  add(exit, txt("Exit", { size: 12, weight: 500, color: C.danger }));
  add(s, stretch(exit));
  return s;
}

function adminHeader() {
  const h = box("header", ADMIN_W - ADMIN_SIDEBAR, HEADER_H, {
    dir: "HORIZONTAL",
    gap: 16,
    padL: 32,
    padR: 32,
    align: "CENTER",
    justify: "MAX",
    fill: AX.surface,
    stroke: AX.line,
    strokeWeight: 1,
    strokeSides: "bottom",
  });
  add(h, icon("moon", 20, AX.secondary));
  const bellWrap = box("bell", 24, 24, {});
  bellWrap.appendChild(icon("bell", 20, AX.secondary));
  const dot = figma.createEllipse();
  dot.resize(8, 8);
  dot.fills = [solid(AX.brand)];
  bellWrap.appendChild(dot);
  dot.x = 16;
  dot.y = 0;
  add(h, bellWrap);
  add(h, avatar("Super Admin", 32, "circle"));
  return h;
}

function adminScreen(name, active, height, build) {
  const root = box(name, ADMIN_W, height, { dir: "HORIZONTAL" });
  add(root, adminSidebar(active, height));
  const main = box("main-col", ADMIN_W - ADMIN_SIDEBAR, height, { dir: "VERTICAL", fill: AX.bg });
  add(main, adminHeader());
  const content = box("content", ADMIN_W - ADMIN_SIDEBAR, null, { dir: "VERTICAL", gap: 24, pad: 32, fill: AX.bg });
  add(main, fillV(stretch(content)));
  add(root, main);
  build(content);
  return root;
}

function adminBanner(title, desc) {
  const b = box("admin-banner", null, null, { dir: "VERTICAL", gap: 8, pad: 28, radius: 12, fill: AX.banner });
  add(b, txt(title, { size: 26, weight: 800, color: "#FFFFFF", ls: -0.4 }));
  add(b, txt(desc, { size: 14, weight: 400, color: "#FFFFFF", opacity: 0.92, width: 1180, lh: 21 }));
  return b;
}

function adminStatCard(label, value) {
  const card = box("admin-stat", null, 133, { dir: "HORIZONTAL", gap: 16, pad: 24, align: "CENTER", radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  const ib = box("stat-icon", 40, 40, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 10, fill: AX.brand });
  add(ib, icon("users", 20, "#FFFFFF"));
  add(card, ib);
  const col = box("stat-col", null, null, { dir: "VERTICAL", gap: 4 });
  add(col, txt(label, { size: 11, weight: 600, color: AX.secondary, ls: 0.6, upper: true }));
  add(col, txt(String(value), { size: 32, weight: 700, color: AX.heading }));
  add(card, col);
  return card;
}

function adminTabs(labels, active, badges) {
  const wrap = box("admin-tabs", null, 44, { dir: "HORIZONTAL", gap: 4, pad: 4, align: "CENTER", radius: 9999, fill: AX.low });
  labels.forEach((label, i) => {
    const on = i === active;
    const tab = box("tab", null, 36, { dir: "HORIZONTAL", gap: 8, padL: 18, padR: 18, align: "CENTER", radius: 9999, fill: on ? AX.brand : null });
    add(tab, txt(label, { size: 13, weight: on ? 700 : 500, color: on ? "#FFFFFF" : AX.heading }));
    if (badges && badges[i] != null) {
      add(tab, pill(String(badges[i]), { fill: on ? "#FFFFFF" : AX.mid, color: on ? AX.brand : AX.secondary, size: 10, h: 18, padL: 7, padR: 7 }));
    }
    add(wrap, tab);
  });
  return wrap;
}

function adminSearchBox(placeholder, w) {
  const s = box("admin-search", w != null ? w : 320, 36, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: AX.low });
  add(s, icon("search", 15, AX.secondary));
  add(s, txt(placeholder, { size: 13, weight: 400, color: AX.secondary }));
  return s;
}

function adminSelect(label, w) {
  const b = box("admin-select", w != null ? w : 180, 36, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: AX.low });
  add(b, grow(txt(label, { size: 13, weight: 500, color: AX.heading })));
  add(b, icon("chevron-down", 14, AX.secondary));
  return b;
}

function adminFilterBar(build) {
  const bar = box("admin-filter-bar", null, null, { dir: "HORIZONTAL", gap: 12, pad: 16, align: "CENTER", radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  build(bar);
  return bar;
}

function statusBadge(label, kind) {
  const map = {
    aktif: ["#AFF67C", AX.greenText],
    onboarding: ["#F6B08D", AX.brown],
    nonaktif: [AX.low, AX.secondary],
    berhasil: ["#B9F5D5", AX.mintText],
    create: [AX.warning, AX.warningText],
    update: [AX.low, AX.heading],
    delete: [AX.dangerTint, AX.dangerText],
    gagal: [AX.dangerTint, AX.dangerText],
  };
  const pair = map[kind] || map.nonaktif;
  return pill(label, { fill: pair[0], color: pair[1], size: 10, h: 22, padL: 10, padR: 10 });
}

function avatarCell(name, sub) {
  const wrap = box("avatar-cell", null, null, { dir: "HORIZONTAL", gap: 10, align: "CENTER" });
  add(wrap, avatar(name, 40, "circle"));
  const col = box("ac-col", null, null, { dir: "VERTICAL", gap: 2 });
  add(col, txt(name, { size: 13, weight: 700, color: AX.heading }));
  if (sub) add(col, txt(sub, { size: 11, weight: 400, color: AX.secondary }));
  add(wrap, col);
  return wrap;
}

function progressBar(pct, good) {
  const wrap = box("progress", 150, 8, { radius: 9999, fill: AX.low });
  wrap.appendChild(box("progress-fill", Math.round((150 * pct) / 100), 8, { radius: 9999, fill: good ? AX.primary : AX.brand }));
  return wrap;
}

function td(w, node, o) {
  o = o || {};
  const c = box("td", w != null && w !== 0 ? w : null, null, { dir: o.dir || "HORIZONTAL", gap: o.gap || 8, padL: 16, padR: 16, padT: 12, padB: 12, align: "CENTER" });
  if (node) add(c, node);
  return c;
}

function adminTable(headers, widths, rows, rowFn) {
  const card = box("table-card", null, null, { dir: "VERTICAL", radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  const head = box("thead", null, 54, { dir: "HORIZONTAL", fill: AX.low });
  headers.forEach((h, i) => {
    const w = widths[i];
    const c = box("th", w === 0 ? null : w, 54, { dir: "HORIZONTAL", padL: 16, padR: 16, align: "CENTER" });
    add(c, txt(h, { size: 10, weight: 700, color: AX.secondary, ls: 0.6, upper: true }));
    add(head, w === 0 ? grow(c) : c);
  });
  add(card, head);
  rows.forEach((r) => {
    const tr = box("tr", null, null, { dir: "HORIZONTAL", stroke: AX.line, strokeWeight: 1, strokeSides: "bottom" });
    rowFn(tr, r, widths);
    add(card, stretch(tr));
  });
  return card;
}

function adminPagination(left, page, total) {
  const bar = box("pagination", null, null, { dir: "HORIZONTAL", gap: 8, padT: 12, padB: 12, padL: 16, padR: 16, align: "CENTER", justify: "SPACE_BETWEEN", radius: 12, fill: AX.footer });
  add(bar, txt(left, { size: 12, weight: 500, color: AX.secondary }));
  const pages = box("pages", null, null, { dir: "HORIZONTAL", gap: 6, align: "CENTER" });
  add(pages, box("prev", 32, 32, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 8, fill: AX.surface, stroke: AX.line, strokeWeight: 1 }));
  pages.children[0].appendChild(icon("chevron-left", 14, AX.secondary));
  for (let i = 1; i <= total; i++) {
    const p = box("page", 32, 32, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 8, fill: i === page ? AX.primary : AX.surface, stroke: i === page ? null : AX.line, strokeWeight: 1 });
    add(p, txt(String(i), { size: 12, weight: 700, color: i === page ? "#FFFFFF" : AX.heading }));
    add(pages, p);
  }
  const next = box("next", 32, 32, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 8, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  next.appendChild(icon("chevron-right", 14, AX.secondary));
  add(pages, next);
  add(bar, pages);
  return bar;
}

function adminBarChart() {
  const W = 760;
  const H = 230;
  const padB = 20;
  const months = 7;
  const series = [
    [26, 32, 28, 40, 36, 44, 48],
    [14, 18, 16, 22, 20, 24, 28],
    [10, 12, 11, 15, 13, 17, 19],
  ];
  const colors = ["#F69665", "#82F9BE", "#BA1A1A"];
  const max = 60;
  const groupW = W / months;
  const barW = 12;
  const gap = 3;
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '">';
  [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
    const y = ((H - padB) * (1 - t) + 8).toFixed(1);
    svg += '<line x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="#EBEDFB" stroke-width="1" stroke-dasharray="3 3"/>';
  });
  for (let m = 0; m < months; m++) {
    let x = m * groupW + groupW / 2 - (3 * barW + 2 * gap) / 2;
    series.forEach((s, si) => {
      const h = ((H - padB - 8) * s[m]) / max;
      const y = H - padB - h;
      svg += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW + '" height="' + h.toFixed(1) + '" rx="4" fill="' + colors[si] + '"/>';
      x += barW + gap;
    });
  }
  svg += "</svg>";
  const n = figma.createNodeFromSvg(svg);
  n.name = "admin-bar-chart";
  return n;
}

function adminDonut() {
  const S = 220;
  const cx = 110;
  const cy = 110;
  const r = 78;
  const circ = 2 * Math.PI * r;
  const a = 0.62;
  const b = 0.38;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + S + '" height="' + S + '">' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#BA1A1A" stroke-width="26" stroke-dasharray="' + (circ * a).toFixed(1) + " " + (circ * (1 - a)).toFixed(1) + '" transform="rotate(-90 ' + cx + " " + cy + ')"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#82F9BE" stroke-width="26" stroke-dasharray="' + (circ * b).toFixed(1) + " " + (circ * (1 - b)).toFixed(1) + '" stroke-dashoffset="' + (-circ * a).toFixed(1) + '" transform="rotate(-90 ' + cx + " " + cy + ')"/>' +
    "</svg>";
  const wrap = box("donut", S, S, {});
  add(wrap, figma.createNodeFromSvg(svg));
  const center = box("donut-center", 120, 60, { dir: "VERTICAL", gap: 0, align: "CENTER", justify: "CENTER" });
  add(center, txt("24", { size: 26, weight: 700, color: AX.heading }));
  add(center, txt("Pelatih Aktif", { size: 10, weight: 600, color: AX.secondary, ls: 0.5, upper: true }));
  add(wrap, center);
  center.x = 50;
  center.y = 80;
  return wrap;
}

function buildAdminDashboard(content) {
  add(content, stretch(adminBanner("Selamat Datang di Command Center Bugarin", "Semua microservices berjalan normal. Pantau akselerasi kebugaran atlet, sinkronisasi biomarker, dan kinerja 24 pelatih resmi secara presisi.")));

  const stats = box("admin-stats", null, null, { dir: "HORIZONTAL", gap: 20 });
  add(stats, grow(adminStatCard("Total Klien Aktif", 184)));
  add(stats, grow(adminStatCard("Total Personal Trainer Aktif", 24)));
  add(content, stretch(stats));

  const charts = box("admin-charts", null, null, { dir: "HORIZONTAL", gap: 20, align: "MIN" });
  const left = box("chart-card", 820, null, { dir: "VERTICAL", gap: 0, pad: 24, radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  add(left, txt("Tren Registrasi Klien Baru", { size: 18, weight: 700, color: AX.heading }));
  add(left, txt("Jumlah klien baru terdaftar serta komposisi tujuan naik/turun BB tiap bulan pada tahun berjalan.", { size: 13, weight: 400, color: AX.secondary, width: 760, lh: 19 }));
  add(left, box("gap", null, 16, { dir: "VERTICAL" }));
  const legend = box("legend", null, null, { dir: "HORIZONTAL", gap: 16, align: "CENTER" });
  [["Klien Baru", "#F69665"], ["Naik BB", "#82F9BE"], ["Turun BB", "#BA1A1A"]].forEach(([l, col]) => {
    const item = box("legend-item", null, null, { dir: "HORIZONTAL", gap: 6, align: "CENTER" });
    const d = box("dot", 8, 8, { radius: 4, fill: col });
    add(item, d);
    add(item, txt(l, { size: 11, weight: 500, color: AX.secondary }));
    add(legend, item);
  });
  add(left, legend);
  add(left, box("gap", null, 12, { dir: "VERTICAL" }));
  add(left, adminBarChart());
  add(charts, left);

  const right = box("donut-card", null, null, { dir: "VERTICAL", gap: 0, pad: 24, align: "CENTER", radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  add(right, txt("Spesialisasi PT", { size: 18, weight: 700, color: AX.heading }));
  add(right, txt("Komposisi fokus keahlian 24 pelatih", { size: 12, weight: 400, color: AX.secondary }));
  add(right, box("gap", null, 16, { dir: "VERTICAL" }));
  add(right, adminDonut());
  add(right, box("gap", null, 16, { dir: "VERTICAL" }));
  const legend2 = box("donut-legend", null, null, { dir: "VERTICAL", gap: 10 });
  [["#BA1A1A", "Turun BB", "15 PT (62%)"], ["#82F9BE", "Naik BB", "9 PT (38%)"]].forEach(([col, label, val]) => {
    const row = box("leg-row", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
    add(row, box("dot", 10, 10, { radius: 5, fill: col }));
    add(row, grow(txt(label, { size: 12, weight: 600, color: AX.heading })));
    add(row, txt(val, { size: 11, weight: 400, color: AX.secondary }));
    add(legend2, stretch(row));
  });
  add(right, legend2);
  add(charts, grow(right));
  add(content, stretch(charts));
}

const ADMIN_KLIEN = [
  { nama: "Marcus Sterling", email: "marcus@mail.com", pt: "Alex Vance", program: "Naik BB", pct: 68, status: "aktif" },
  { nama: "Sarah Jenkins", email: "sarah@mail.com", pt: "Alex Vance", program: "Turun BB", pct: 54, status: "aktif" },
  { nama: "Elena Rostova", email: "elena@mail.com", pt: "—", program: "Naik BB", pct: 32, status: "onboarding" },
  { nama: "David Kim", email: "david@mail.com", pt: "Bima Putra", program: "Turun BB", pct: 76, status: "aktif" },
];

const ADMIN_PT = [
  { nama: "Alex Vance", id: "TR-001", hub: "Senopati", keahlian: "Naik BB", status: "aktif", email: "alex@bugarin.fit", dibuat: "12 Jan 2026" },
  { nama: "Bima Putra", id: "TR-002", hub: "Kemang", keahlian: "Turun BB", status: "aktif", email: "bima@bugarin.fit", dibuat: "3 Feb 2026" },
  { nama: "Citra Lestari", id: "TR-003", hub: "BSD", keahlian: "Turun BB", status: "nonaktif", email: "citra@bugarin.fit", dibuat: "21 Feb 2026" },
  { nama: "Dimas Ardi", id: "TR-004", hub: "Depok", keahlian: "Naik BB", status: "aktif", email: "dimas@bugarin.fit", dibuat: "9 Mar 2026" },
];

function buildAdminUsersKlien(content) {
  add(content, stretch(adminBanner("Manajemen Terpusat Klien & Atlet Bugarin", "Pantau 184 atlet aktif, alokasi Personal Trainer pendamping, program latihan aktif, serta kepatuhan biometrik atlet secara real-time.")));

  const stats = box("admin-stats", null, null, { dir: "HORIZONTAL", gap: 20 });
  add(stats, grow(adminStatCard("Total Klien Aktif", 184)));
  add(stats, grow(adminStatCard("Klien Terhubung PT", 142)));
  add(content, stretch(stats));

  const tabsRow = box("tabs-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(tabsRow, adminTabs(["Daftar Personal Trainer (PT)", "Daftar Klien"], 1, ["24 Aktif", "184 Aktif"]));
  add(content, stretch(tabsRow));

  add(content, stretch(adminFilterBar((bar) => {
    add(bar, adminSearchBox("Cari nama klien, email, atau nama PT...", 380));
    add(bar, grow(adminSelect("Semua Status Klien")));
    add(bar, grow(adminSelect("Semua Program & Cohort")));
    add(bar, grow(adminSelect("Semua Personal Trainer Pendamping")));
  })));

  const widths = [0, 360, 330, 190, 190];
  add(content, stretch(adminTable(
    ["Profil Klien", "Personal Trainer Pendamping", "Program & Target Aktif", "Status Akun", "Tindakan"],
    widths,
    ADMIN_KLIEN,
    (tr, r) => {
      add(tr, td(widths[0], avatarCell(r.nama, r.email)));
      add(tr, td(widths[1], r.pt === "—" ? pill("Tidak Ada PT", { fill: AX.brand, color: "#FFFFFF", size: 11, h: 24, padL: 10, padR: 10 }) : avatarCell(r.pt, "PT Pendamping")));
      const prog = box("program-cell", null, null, { dir: "VERTICAL", gap: 6 });
      add(prog, txt(r.program, { size: 12, weight: 700, color: r.program === "Naik BB" ? AX.greenText : AX.brown }));
      add(prog, progressBar(r.pct, r.program === "Naik BB"));
      add(tr, td(widths[2], prog));
      add(tr, td(widths[3], statusBadge(r.status, r.status)));
      const act = box("actions", null, null, { dir: "HORIZONTAL", gap: 8 });
      add(act, pill("Lihat", { fill: AX.warning, color: AX.warningText, size: 11, h: 28, padL: 12, padR: 12 }));
      add(act, pill("Hapus", { fill: AX.dangerTint, color: AX.dangerText, size: 11, h: 28, padL: 12, padR: 12 }));
      add(tr, td(widths[4], act));
    }
  )));

  add(content, adminPagination("Menampilkan 1 - 4 dari 184 Klien terdaftar", 1, 4));
}

function buildAdminUsersPt(content) {
  add(content, stretch(adminBanner("Manajemen Terpusat Klien & Atlet Bugarin", "Pantau 184 atlet aktif, alokasi Personal Trainer pendamping, program latihan aktif, serta kepatuhan biometrik atlet secara real-time.")));

  const stats = box("admin-stats", null, null, { dir: "HORIZONTAL", gap: 20 });
  add(stats, grow(adminStatCard("Total Klien Aktif", 184)));
  add(stats, grow(adminStatCard("Klien Terhubung PT", 142)));
  add(content, stretch(stats));

  const tabsRow = box("tabs-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(tabsRow, adminTabs(["Daftar Personal Trainer (PT)", "Daftar Klien"], 0, ["24 Aktif", "184 Aktif"]));
  add(tabsRow, button("Daftarkan PT Baru", { icon: icon("user-plus", 16, "#FFFFFF"), fill: AX.brand, color: "#FFFFFF", radius: 9999, padX: 18, h: 40, size: 13 }));
  add(content, stretch(tabsRow));

  add(content, stretch(adminFilterBar((bar) => {
    add(bar, adminSearchBox("Cari nama PT, email, atau ID trainer...", 380));
    add(bar, grow(adminSelect("Semua Status PT")));
    add(bar, grow(adminSelect("Semua Keahlian")));
    add(bar, grow(adminSelect("Semua Cabang Gym")));
  })));

  const widths = [0, 160, 300, 150, 200, 180];
  add(content, stretch(adminTable(
    ["Profil Trainer", "Keahlian", "Kredensial & Akses", "Status", "Cabang Gym", "Tindakan Admin"],
    widths,
    ADMIN_PT,
    (tr, r) => {
      add(tr, td(widths[0], avatarCell(r.nama, "ID: " + r.id + " • " + r.hub)));
      add(tr, td(widths[1], pill(r.keahlian, { fill: r.keahlian === "Naik BB" ? "#D6F5E2" : "#F6D9C9", color: r.keahlian === "Naik BB" ? AX.mintText : AX.brown, size: 11, h: 24, padL: 10, padR: 10 })));
      const cred = box("cred", null, null, { dir: "VERTICAL", gap: 2 });
      add(cred, txt(r.email, { size: 12, weight: 600, color: AX.heading }));
      add(cred, txt("Dibuat " + r.dibuat, { size: 11, weight: 400, color: AX.secondary }));
      add(tr, td(widths[2], cred));
      add(tr, td(widths[3], statusBadge(r.status, r.status)));
      add(tr, td(widths[4], txt(r.hub + " Hub", { size: 12, weight: 500, color: AX.heading })));
      const act = box("actions", null, null, { dir: "HORIZONTAL", gap: 8 });
      add(act, pill("Edit", { fill: AX.warning, color: AX.warningText, size: 11, h: 28, padL: 12, padR: 12 }));
      add(act, pill("Hapus", { fill: AX.dangerTint, color: AX.dangerText, size: 11, h: 28, padL: 12, padR: 12 }));
      add(tr, td(widths[5], act));
    }
  )));

  add(content, adminPagination("Menampilkan 1 - 4 dari 24 PT terdaftar", 1, 4));
}

function adminRiwayatBanner() {
  return adminBanner("Audit Trail & Log Operasional", "Monitoring kepatuhan pelatihan personal trainer, pencatatan forensik CRUD Super Admin, dan log error untuk penelusuran request.");
}

const ADMIN_FEEDBACK = [
  { waktu: "12 Okt 2026 • #F-901", pt: "Alex Vance", klien: "Marcus Sterling", note: "Teknik push day sudah membaik, tambah beban bertahap minggu depan.", tgl: "12 Okt 2026" },
  { waktu: "11 Okt 2026 • #F-900", pt: "Bima Putra", klien: "Sarah Jenkins", note: "Cardio ditingkatkan, evaluasi asupan protein harian.", tgl: "11 Okt 2026" },
  { waktu: "10 Okt 2026 • #F-899", pt: "Citra Lestari", klien: "Elena Rostova", note: "Tambah variasi latihan kaki dan jaga hidrasi.", tgl: "10 Okt 2026" },
  { waktu: "9 Okt 2026 • #F-898", pt: "Dimas Ardi", klien: "David Kim", note: "Konsisten turun berat, pertahankan defisit kalori ringan.", tgl: "9 Okt 2026" },
];

const ADMIN_AUDIT = [
  { waktu: "12 Okt 2026 • #A-501", aktor: "Super Admin", aksi: "create", target: "Bima Putra", modul: "Kelola Pengguna" },
  { waktu: "12 Okt 2026 • #A-500", aktor: "Super Admin", aksi: "update", target: "Sarah Jenkins", modul: "Program Klien" },
  { waktu: "11 Okt 2026 • #A-499", aktor: "Super Admin", aksi: "delete", target: "Akun Dummy", modul: "Kelola Pengguna" },
  { waktu: "11 Okt 2026 • #A-498", aktor: "Super Admin", aksi: "update", target: "Alex Vance", modul: "Profil PT" },
];

const ADMIN_LOG = [
  { waktu: "12 Okt 2026 09:41", role: "PT", endpoint: "GET /pt/klien", status: 200, rid: "req_8f2a1c", pesan: "-" },
  { waktu: "12 Okt 2026 09:40", role: "Admin", endpoint: "POST /admin/users/pt", status: 201, rid: "req_11b9de", pesan: "-" },
  { waktu: "12 Okt 2026 09:38", role: "Klien", endpoint: "GET /klien/plan", status: 404, rid: "req_55aa02", pesan: "Weekly plan tidak ditemukan" },
  { waktu: "12 Okt 2026 09:35", role: "PT", endpoint: "PUT /pt/feedback", status: 422, rid: "req_9c31f0", pesan: "Isi feedback minimal 5 karakter" },
  { waktu: "12 Okt 2026 09:30", role: "Admin", endpoint: "GET /admin/audit", status: 200, rid: "req_71ee8b", pesan: "-" },
];

function buildAdminRiwayatPt(content) {
  add(content, stretch(adminRiwayatBanner()));
  const tabsRow = box("tabs-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(tabsRow, adminTabs(["Daftar Personal Trainer (PT)", "Audit Admin", "Request Log"], 0, ["24 Aktif"]));
  add(content, stretch(tabsRow));
  add(content, stretch(adminFilterBar((bar) => {
    add(bar, adminSearchBox("Cari PT, klien, atau keyword...", 420));
    add(bar, grow(box("spacer", null, 0, {})));
    add(bar, txt("Menampilkan 4 dari 96 entri", { size: 12, weight: 500, color: AX.secondary }));
  })));
  const widths = [190, 260, 260, 0, 140];
  add(content, stretch(adminTable(
    ["Waktu & ID", "Personal Trainer", "Klien Penerima", "Catatan Evaluasi", "Tindakan"],
    widths,
    ADMIN_FEEDBACK,
    (tr, r) => {
      const t = box("tcell", null, null, { dir: "VERTICAL", gap: 2 });
      add(t, txt(r.waktu.split(" • ")[0], { size: 12, weight: 600, color: AX.heading }));
      add(t, txt(r.waktu.split(" • ")[1], { size: 11, weight: 400, color: AX.secondary }));
      add(tr, td(widths[0], t));
      add(tr, td(widths[1], avatarCell(r.pt, r.tgl)));
      add(tr, td(widths[2], avatarCell(r.klien, "Klien")));
      add(tr, td(widths[3], txt("“" + r.note + "”", { size: 12, weight: 400, color: AX.heading, width: 420, lh: 18 })));
      add(tr, td(widths[4], pill("Detail", { fill: AX.low, color: AX.heading, size: 11, h: 28, padL: 12, padR: 12 })));
    }
  )));
  add(content, adminPagination("Menampilkan 1 - 4 dari 96 entri", 1, 3));
}

function buildAdminRiwayatAudit(content) {
  add(content, stretch(adminRiwayatBanner()));
  const tabsRow = box("tabs-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(tabsRow, adminTabs(["Daftar Personal Trainer (PT)", "Audit Admin", "Request Log"], 1, ["24 Aktif"]));
  add(content, stretch(tabsRow));
  const widths = [210, 220, 200, 0, 150];
  add(content, stretch(adminTable(
    ["Waktu & Timestamp ID", "Aktor Super Admin", "Kategori & Tipe Aksi", "Target Objek & Modul", "Status"],
    widths,
    ADMIN_AUDIT,
    (tr, r) => {
      const t = box("tcell", null, null, { dir: "VERTICAL", gap: 2 });
      add(t, txt(r.waktu.split(" • ")[0], { size: 12, weight: 600, color: AX.heading }));
      add(t, txt(r.waktu.split(" • ")[1], { size: 11, weight: 400, color: AX.secondary }));
      add(tr, td(widths[0], t));
      add(tr, td(widths[1], avatarCell(r.aktor, "Super Admin")));
      add(tr, td(widths[2], statusBadge(r.aksi, r.aksi)));
      const target = box("target", null, null, { dir: "VERTICAL", gap: 2 });
      add(target, txt(r.target, { size: 12, weight: 600, color: AX.heading }));
      add(target, txt(r.modul, { size: 10, weight: 600, color: AX.secondary, upper: true, ls: 0.5 }));
      add(tr, td(widths[3], target));
      add(tr, td(widths[4], statusBadge("berhasil", "berhasil")));
    }
  )));
  add(content, adminPagination("Menampilkan 1 - 4 dari 32 entri", 1, 3));
}

function buildAdminRiwayatLog(content) {
  add(content, stretch(adminRiwayatBanner()));
  const tabsRow = box("tabs-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(tabsRow, adminTabs(["Daftar Personal Trainer (PT)", "Audit Admin", "Request Log"], 2, ["24 Aktif"]));
  add(content, stretch(tabsRow));
  add(content, stretch(adminFilterBar((bar) => {
    add(bar, adminSearchBox("Cari endpoint, pesan, atau Request ID...", 380));
    add(bar, adminSelect("Semua role", 150));
    add(bar, adminSelect("Semua status", 150));
  })));
  const widths = [170, 90, 210, 90, 150, 0];
  add(content, stretch(adminTable(
    ["Waktu", "Role", "Endpoint", "Status", "Request ID", "Pesan"],
    widths,
    ADMIN_LOG,
    (tr, r) => {
      add(tr, td(widths[0], txt(r.waktu, { size: 12, weight: 500, color: AX.heading })));
      add(tr, td(widths[1], txt(r.role, { size: 12, weight: 600, color: AX.heading })));
      add(tr, td(widths[2], txt(r.endpoint, { size: 12, weight: 400, color: AX.heading })));
      add(tr, td(widths[3], statusBadge(String(r.status), r.status >= 500 ? "delete" : r.status >= 400 ? "update" : "berhasil")));
      add(tr, td(widths[4], txt(r.rid, { size: 12, weight: 400, color: AX.secondary })));
      add(tr, td(widths[5], txt(r.pesan, { size: 12, weight: 400, color: AX.secondary })));
    }
  )));
  add(content, adminPagination("Menampilkan 1 - 5 dari 240 entri", 1, 3));
}

function adminProfilBanner() {
  const b = box("admin-profile-banner", null, null, { dir: "HORIZONTAL", gap: 20, pad: 28, align: "CENTER", radius: 12, fill: AX.banner });
  add(b, avatar("Super Admin", 104, "circle"));
  const col = box("pb-col", null, null, { dir: "VERTICAL", gap: 4 });
  add(col, txt("Super Admin", { size: 28, weight: 700, color: "#FFFFFF" }));
  add(col, txt("Administrator Platform", { size: 13, weight: 500, color: "#FFFFFF", opacity: 0.85 }));
  add(b, col);
  return b;
}

function adminProfilTabs(active) {
  const row = box("profil-tabs-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
  add(row, adminTabs(["Informasi Data Diri", "Keamanan & Ganti Password"], active));
  const right = box("last-updated", null, null, { dir: "HORIZONTAL", gap: 6, align: "CENTER" });
  add(right, icon("history", 14, AX.secondary));
  add(right, txt("Terakhir diubah: 12 Okt 2026 08:30 WIB", { size: 11, weight: 500, color: AX.secondary }));
  add(row, right);
  return row;
}

function adminField(label, value) {
  const f = box("admin-field", null, null, { dir: "VERTICAL", gap: 6 });
  add(f, txt(label, { size: 10, weight: 700, color: AX.secondary, ls: 0.5, upper: true }));
  const input = box("input", null, 38, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: AX.low });
  add(input, icon("user", 15, AX.secondary));
  add(input, grow(txt(value, { size: 13, weight: 400, color: AX.heading })));
  add(f, stretch(input));
  return f;
}

function buildAdminProfilInfo(content) {
  add(content, stretch(adminProfilBanner()));
  add(content, stretch(adminProfilTabs(0)));

  const card = box("admin-info-card", null, null, { dir: "VERTICAL", gap: 20, pad: 28, radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  add(card, txt("Data Diri Pejabat Eksekutif", { size: 18, weight: 700, color: AX.heading }));
  add(card, txt("Informasi ini tercatat pada berkas audit internal platform Bugarin Enterprise.", { size: 13, weight: 400, color: AX.secondary }));
  const grid = box("admin-form-grid", null, null, { dir: "VERTICAL", gap: 16 });
  [["Nama Depan", "Super"], ["Nama Belakang", "Admin"], ["Email Admin", "admin@bugarin.fit"], ["Nomor Telepon / WhatsApp Verifikasi", "+62 812 3456 7890"]].forEach((pair, i) => {
    if (i % 2 === 0) {
      const row = box("frow", null, null, { dir: "HORIZONTAL", gap: 16 });
      add(row, grow(adminField(pair[0], pair[1])));
      add(grid, stretch(row));
    }
  });
  // isi sel kedua tiap baris
  const rows = grid.children;
  rows[0].appendChild(grow(adminField("Nama Belakang", "Admin")));
  rows[1].appendChild(grow(adminField("Nomor Telepon / WhatsApp Verifikasi", "+62 812 3456 7890")));
  add(card, stretch(grid));

  const bio = box("bio-field", null, null, { dir: "VERTICAL", gap: 6 });
  add(bio, txt("Catatan Biografi Singkat & Delegasi Wewenang", { size: 10, weight: 700, color: AX.secondary, ls: 0.5, upper: true }));
  const ta = box("bio", null, 140, { dir: "VERTICAL", pad: 12, radius: 8, fill: AX.low });
  add(ta, txt("Mengawasi operasional platform, audit akun, dan tata kelola data Bugarin.", { size: 13, weight: 400, color: AX.heading }));
  add(bio, stretch(ta));
  add(card, stretch(bio));

  const actions = box("admin-form-actions", null, null, { dir: "HORIZONTAL", gap: 12, justify: "MAX" });
  add(actions, button("Batalkan", { fill: AX.low, color: AX.heading, radius: 8, padX: 20, h: 38, size: 13 }));
  add(actions, button("Simpan", { icon: icon("save", 16, "#FFFFFF"), fill: AX.brand, color: "#FFFFFF", radius: 8, padX: 20, h: 38, size: 13 }));
  add(card, stretch(actions));
  add(content, stretch(card));

  const theme = box("admin-theme-block", null, null, { dir: "HORIZONTAL", gap: 16, pad: 20, align: "CENTER", justify: "SPACE_BETWEEN", radius: 12, fill: AX.low });
  const tl = box("theme-left", null, null, { dir: "VERTICAL", gap: 2 });
  add(tl, txt("Mode Tampilan Antarmuka", { size: 13, weight: 700, color: AX.heading }));
  add(tl, txt("Pilih antara tampilan terang kontras tinggi dan mode gelap.", { size: 11, weight: 400, color: AX.secondary }));
  add(theme, tl);
  const seg = box("theme-seg", null, 36, { dir: "HORIZONTAL", gap: 4, pad: 4, align: "CENTER", radius: 9999, fill: AX.inset });
  const on = box("seg-on", null, 28, { dir: "HORIZONTAL", gap: 6, padL: 16, padR: 16, align: "CENTER", radius: 9999, fill: AX.surface });
  add(on, icon("sun", 14, "#F59E0B"));
  add(on, txt("Terang", { size: 12, weight: 700, color: AX.heading }));
  add(seg, on);
  const off = box("seg-off", null, 28, { dir: "HORIZONTAL", gap: 6, padL: 16, padR: 16, align: "CENTER", radius: 9999 });
  add(off, icon("moon", 14, AX.secondary));
  add(off, txt("Gelap", { size: 12, weight: 700, color: AX.secondary }));
  add(seg, off);
  add(theme, seg);
  add(content, stretch(theme));
}

function buildAdminProfilSecurity(content) {
  add(content, stretch(adminProfilBanner()));
  add(content, stretch(adminProfilTabs(1)));

  const card = box("admin-security-card", null, null, { dir: "VERTICAL", gap: 20, pad: 28, radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  add(card, txt("Ubah Kata Sandi Root Admin", { size: 18, weight: 700, color: AX.heading }));
  add(card, txt("Perbarui kata sandi akun super admin secara berkala untuk memitigasi risiko keamanan platform.", { size: 13, weight: 400, color: AX.secondary, width: 900, lh: 19 }));
  ["Kata Sandi Saat Ini *", "Kata Sandi Baru *", "Konfirmasi Kata Sandi Baru *"].forEach((label) => {
    const f = box("pw-field", null, null, { dir: "VERTICAL", gap: 6 });
    add(f, txt(label, { size: 10, weight: 700, color: AX.secondary, ls: 0.5, upper: true }));
    const input = box("input", null, 38, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: AX.low });
    add(input, icon("lock", 15, AX.secondary));
    add(input, grow(txt("••••••••", { size: 13, weight: 400, color: AX.heading })));
    add(input, icon("eye", 15, AX.secondary));
    add(f, stretch(input));
    add(card, stretch(f));
  });
  const actions = box("sec-actions", null, null, { dir: "HORIZONTAL", gap: 12, justify: "MAX" });
  add(actions, button("Batal", { fill: AX.low, color: AX.heading, radius: 8, padX: 20, h: 38, size: 13 }));
  add(actions, button("Simpan Kata Sandi Baru", { icon: icon("key-round", 16, "#FFFFFF"), fill: AX.brand, color: "#FFFFFF", radius: 8, padX: 20, h: 38, size: 13 }));
  add(card, stretch(actions));
  add(content, stretch(card));
}

function buildAdminEditPt(content) {
  const back = box("edit-back", null, 32, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
  add(back, icon("arrow-left", 16, AX.heading));
  add(back, txt("Batal & Kembali", { size: 13, weight: 600, color: AX.heading }));
  add(content, back);
  add(content, stretch(adminBanner("Edit Konfigurasi & Profil Personal Trainer", "Perbarui profil kredensial, penyesuaian kuota klien, hak akses cabang, dan aksi keamanan akun pelatih.")));

  const grid = box("edit-grid", null, null, { dir: "HORIZONTAL", gap: 24, align: "MIN" });
  const left = box("edit-identity", null, null, { dir: "VERTICAL", gap: 16, pad: 28, radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  add(left, txt("Identitas & Biodata Operasional", { size: 16, weight: 700, color: AX.heading }));
  [["Nama Lengkap", "Alex Vance"], ["Nomor WhatsApp Operasional", "+62 812 3456 7890"], ["Email Resmi", "alex@bugarin.fit"], ["Cabang Gym", "Senopati Hub (Jakarta Selatan)"]].forEach((pair) => add(left, stretch(adminField(pair[0], pair[1]))));
  const save = box("edit-save", null, null, { dir: "HORIZONTAL", justify: "MAX" });
  add(save, button("Simpan Perubahan", { icon: icon("save", 16, "#FFFFFF"), fill: AX.brand, color: "#FFFFFF", radius: 8, padX: 20, h: 38, size: 13 }));
  add(left, stretch(save));
  add(grid, grow(left));

  const right = box("edit-security", null, null, { dir: "VERTICAL", gap: 16, pad: 28, radius: 12, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  add(right, txt("Aksi Kredensial & Kontrol Keamanan", { size: 16, weight: 700, color: AX.heading }));
  add(right, txt("Perbarui Password Personal Trainer", { size: 12, weight: 700, color: AX.heading }));
  add(right, button("Kirim Kode Reset Password", { icon: icon("key-round", 16, AX.heading), fill: AX.low, color: AX.heading, radius: 8, padX: 16, h: 38, size: 13 }));
  add(right, txt("Kunci Sementara Akun Pelatih (Suspend)", { size: 12, weight: 700, color: AX.heading }));
  const suspend = box("suspend-row", null, null, { dir: "HORIZONTAL", pad: 14, align: "CENTER", justify: "SPACE_BETWEEN", radius: 10, fill: AX.low });
  add(suspend, statusBadge("AKTIF", "aktif"));
  const toggle = box("toggle", 44, 24, { radius: 9999, fill: AX.primary });
  toggle.appendChild(box("knob", 18, 18, { radius: 9, fill: "#FFFFFF" }));
  toggle.children[0].x = 22;
  toggle.children[0].y = 3;
  add(suspend, toggle);
  add(right, stretch(suspend));
  add(grid, grow(right));
  add(content, stretch(grid));
}

// ---------- Dialog ----------

function dialogFrame(name, w, build) {
  const root = box(name, w, null, { dir: "VERTICAL", gap: 0, radius: 16, fill: AX.surface, stroke: AX.line, strokeWeight: 1 });
  build(root);
  return root;
}

function dialogTolak() {
  return dialogFrame("Dialog - Tolak Verifikasi", 520, (root) => {
    const body = box("body", null, null, { dir: "VERTICAL", gap: 16, pad: 24 });
    add(body, txt("Tolak Permintaan — Rachel Cooper", { size: 18, weight: 700, color: AX.heading }));
    const f = box("reason", null, null, { dir: "VERTICAL", gap: 6 });
    add(f, txt("Alasan Penolakan *", { size: 10, weight: 700, color: AX.heading, ls: 0.5, upper: true }));
    const ta = box("textarea", null, 120, { dir: "VERTICAL", pad: 12, radius: 8, fill: AX.low });
    add(ta, txt("Tuliskan alasan penolakan untuk klien...", { size: 13, weight: 400, color: AX.secondary }));
    add(f, stretch(ta));
    add(body, stretch(f));
    const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 10, justify: "MAX" });
    add(actions, button("Batal", { fill: AX.low, color: AX.heading, radius: 9999, padX: 18, h: 38, size: 13 }));
    add(actions, button("Konfirmasi Penolakan", { icon: icon("ban", 15, "#FFFFFF"), fill: "#BA1A1A", color: "#FFFFFF", radius: 9999, padX: 18, h: 38, size: 13 }));
    add(body, stretch(actions));
    add(root, body);
  });
}

function dialogOverride() {
  return dialogFrame("Dialog - Override Plan", 640, (root) => {
    const body = box("body", null, null, { dir: "VERTICAL", gap: 16, pad: 24 });
    add(body, txt("Override Weekly Plan", { size: 18, weight: 700, color: AX.heading }));
    add(body, txt("Ubah rencana latihan & menu. Lokasi gym otomatis dari profil.", { size: 12, weight: 400, color: AX.secondary }));
    add(body, txt("Rencana Latihan", { size: 12, weight: 700, color: AX.heading }));
    [["Senin", "09:00", "Push Day"], ["Rabu", "09:00", "Pull Day"]].forEach(([d, t, j]) => {
      const row = box("ov-row", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
      [d, t, j].forEach((v) => {
        const inp = box("ov-input", null, 36, { dir: "HORIZONTAL", padL: 10, padR: 10, align: "CENTER", radius: 8, fill: AX.low });
        add(inp, txt(v, { size: 12, weight: 500, color: AX.heading }));
        add(row, grow(inp));
      });
      add(row, icon("trash-2", 16, AX.dangerText));
      add(body, stretch(row));
    });
    add(body, txt("+ Tambah latihan", { size: 12, weight: 600, color: AX.brand }));
    add(body, txt("Rencana Menu", { size: 12, weight: 700, color: AX.heading }));
    [["Sarapan", "Oatmeal + telur", "420"], ["Makan Siang", "Nasi + ayam + sayur", "650"]].forEach(([w, m, k]) => {
      const row = box("ov-row", null, null, { dir: "HORIZONTAL", gap: 8, align: "CENTER" });
      [w, m, k].forEach((v) => {
        const inp = box("ov-input", null, 36, { dir: "HORIZONTAL", padL: 10, padR: 10, align: "CENTER", radius: 8, fill: AX.low });
        add(inp, txt(v, { size: 12, weight: 500, color: AX.heading }));
        add(row, grow(inp));
      });
      add(row, icon("trash-2", 16, AX.dangerText));
      add(body, stretch(row));
    });
    add(body, txt("+ Tambah menu", { size: 12, weight: 600, color: AX.brand }));
    const warn = box("ov-warn", null, null, { dir: "VERTICAL", pad: 12, radius: 10, fill: AX.dangerTint });
    add(warn, txt("Ada 1 bentrok. Tombol simpan dinonaktifkan sampai jadwal bebas bentrok.", { size: 11, weight: 500, color: AX.dangerText, width: 540 }));
    add(body, stretch(warn));
    const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 10, justify: "MAX" });
    add(actions, button("Batal", { fill: AX.low, color: AX.heading, radius: 9999, padX: 18, h: 38, size: 13 }));
    add(actions, button("Simpan Override", { fill: AX.brand, color: "#FFFFFF", radius: 9999, padX: 18, h: 38, size: 13 }));
    add(body, stretch(actions));
    add(root, body);
  });
}

function dialogDaftarPt() {
  return dialogFrame("Dialog - Daftar PT", 720, (root) => {
    const head = box("dlg-head", null, null, { dir: "HORIZONTAL", pad: 24, align: "MIN", justify: "SPACE_BETWEEN", fill: AX.navy });
    const hc = box("hc", null, null, { dir: "VERTICAL", gap: 4 });
    add(hc, txt("Daftarkan Akun PT Baru", { size: 18, weight: 700, color: "#FFFFFF" }));
    add(hc, txt("Penerbitan akun trainer resmi ekosistem Bugarin", { size: 12, weight: 400, color: AX.onNavy }));
    add(head, hc);
    add(head, icon("x", 18, "#FFFFFF"));
    add(root, stretch(head));
    const body = box("body", null, null, { dir: "VERTICAL", gap: 16, pad: 24 });
    add(body, txt("1. Identitas Personal Trainer", { size: 13, weight: 700, color: AX.heading }));
    [["Nama Lengkap & Gelar Resmi *", "Alex Vance"], ["Alamat Email Resmi (@bugarin.fit) *", "alex@bugarin.fit"], ["Nomor WhatsApp Aktif *", "+62 812 3456 7890"], ["Cabang Penempatan Utama Gym *", "Senopati Hub (Jakarta Selatan)"]].forEach((pair) => add(body, stretch(adminField(pair[0], pair[1]))));
    add(body, txt("2. Kredensial Akun", { size: 13, weight: 700, color: AX.heading }));
    add(body, stretch(adminField("Password *", "••••••••")));
    const actions = box("actions", null, null, { dir: "HORIZONTAL", justify: "MAX" });
    add(actions, button("Konfirmasi Pembuatan", { fill: AX.brand, color: "#FFFFFF", radius: 8, padX: 20, h: 40, size: 13 }));
    add(body, stretch(actions));
    add(root, stretch(body));
  });
}

function dialogDetailKlien() {
  return dialogFrame("Dialog - Detail Klien", 720, (root) => {
    const head = box("dlg-head", null, null, { dir: "HORIZONTAL", pad: 24, align: "MIN", justify: "SPACE_BETWEEN", fill: AX.navy });
    const hc = box("hc", null, null, { dir: "VERTICAL", gap: 4 });
    add(hc, txt("Detail Klien", { size: 18, weight: 700, color: "#FFFFFF" }));
    add(hc, txt("Profil, program aktif, dan riwayat berat badan klien", { size: 12, weight: 400, color: AX.onNavy }));
    add(head, hc);
    add(head, icon("x", 18, "#FFFFFF"));
    add(root, stretch(head));
    const body = box("body", null, null, { dir: "VERTICAL", gap: 16, pad: 24 });
    add(body, avatarCell("Marcus Sterling", "marcus@mail.com"));
    const info = box("info-grid", null, null, { dir: "HORIZONTAL", gap: 12 });
    [["Usia", "29 tahun"], ["Jenis Kelamin", "Laki-laki"], ["Tinggi Badan", "180 cm"], ["Alergi Makanan", "-"]].forEach(([k, v]) => {
      const c = box("info-chip", null, null, { dir: "VERTICAL", gap: 2, pad: 12, radius: 10, fill: AX.low });
      add(c, txt(k, { size: 10, weight: 600, color: AX.secondary, upper: true, ls: 0.4 }));
      add(c, txt(v, { size: 13, weight: 700, color: AX.heading }));
      add(info, grow(c));
    });
    add(body, stretch(info));
    const prog = box("prog-block", null, null, { dir: "VERTICAL", gap: 8, pad: 14, radius: 10, fill: AX.low });
    add(prog, txt("Program: Naik BB", { size: 13, weight: 700, color: AX.heading }));
    add(prog, progressBar(68, true));
    const metrics = box("metrics", null, null, { dir: "HORIZONTAL", gap: 12 });
    [["BB Awal", "78 kg"], ["BB Sekarang", "82 kg"], ["BB Tujuan", "88 kg"], ["Durasi", "56 Hari"]].forEach(([k, v]) => {
      const c = box("m", null, null, { dir: "VERTICAL", gap: 2 });
      add(c, txt(k, { size: 10, weight: 600, color: AX.secondary, upper: true }));
      add(c, txt(v, { size: 13, weight: 700, color: AX.heading }));
      add(metrics, grow(c));
    });
    add(prog, stretch(metrics));
    add(body, stretch(prog));
    add(body, txt("Riwayat Berat Badan", { size: 12, weight: 700, color: AX.heading }));
    [["1 Agu 2026", "78.0 kg"], ["15 Agu 2026", "79.4 kg"], ["29 Agu 2026", "81.1 kg"]].forEach(([d, v]) => {
      const row = box("hist-row", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", pad: 10, radius: 8, fill: AX.low });
      add(row, txt(d, { size: 12, weight: 400, color: AX.secondary }));
      add(row, txt(v, { size: 12, weight: 700, color: AX.heading }));
      add(body, stretch(row));
    });
    const foot = box("dlg-foot", null, null, { dir: "HORIZONTAL", justify: "MAX", pad: 20, fill: AX.footer });
    add(foot, button("Tutup", { fill: AX.brand, color: "#FFFFFF", radius: 9999, padX: 18, h: 36, size: 12 }));
    add(root, stretch(foot));
  });
}

function dialogHapus() {
  return dialogFrame("Dialog - Hapus Akun", 576, (root) => {
    const head = box("dlg-head", null, null, { dir: "HORIZONTAL", pad: 20, align: "CENTER", justify: "SPACE_BETWEEN", fill: AX.low });
    add(head, txt("Konfirmasi Hapus Klien", { size: 16, weight: 700, color: AX.heading }));
    add(head, icon("x", 16, AX.heading));
    add(root, stretch(head));
    const body = box("body", null, null, { dir: "VERTICAL", gap: 14, pad: 24 });
    add(body, txt("Yakin Menghapus Akun Klien?", { size: 16, weight: 700, color: AX.heading }));
    add(body, txt("Tindakan ini permanen. Data program dan riwayat klien akan ikut terhapus.", { size: 13, weight: 400, color: AX.secondary, width: 480, lh: 19 }));
    const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 10, justify: "MAX" });
    add(actions, button("Batal", { fill: null, color: AX.heading, radius: 8, padX: 16, h: 36, size: 12 }));
    add(actions, button("Konfirmasi Hapus", { icon: icon("ban", 14, "#FFFFFF"), fill: "#BA1A1A", color: "#FFFFFF", radius: 9999, padX: 16, h: 36, size: 12 }));
    add(body, stretch(actions));
    add(root, body);
  });
}

function dialogDetailFeedback() {
  return dialogFrame("Dialog - Detail Feedback", 460, (root) => {
    const head = box("dlg-head", null, null, { dir: "HORIZONTAL", pad: 20, align: "CENTER", justify: "SPACE_BETWEEN", fill: AX.navy });
    add(head, txt("Detail Feedback", { size: 16, weight: 700, color: "#FFFFFF" }));
    add(head, icon("x", 16, "#FFFFFF"));
    add(root, stretch(head));
    const body = box("body", null, null, { dir: "VERTICAL", gap: 14, pad: 20 });
    const pair = box("pair", null, null, { dir: "HORIZONTAL", gap: 12 });
    ["Coach / Personal Trainer", "Klien"].forEach((label, i) => {
      const c = box("mini-card", null, null, { dir: "VERTICAL", gap: 8, pad: 12, radius: 10, fill: AX.low });
      add(c, txt(label, { size: 10, weight: 600, color: AX.secondary, upper: true }));
      add(c, avatarCell(i === 0 ? "Alex Vance" : "Marcus Sterling", null));
      add(pair, grow(c));
    });
    add(body, stretch(pair));
    add(body, txt("Isi Pesan Evaluasi Lengkap", { size: 11, weight: 700, color: AX.heading }));
    const msg = box("msg", null, null, { dir: "VERTICAL", pad: 12, radius: 10, fill: AX.low });
    add(msg, txt("“Teknik push day sudah membaik, tambah beban bertahap minggu depan.”", { size: 12, weight: 400, color: AX.heading, width: 380, lh: 18 }));
    add(body, stretch(msg));
    add(root, stretch(body));
    const foot = box("dlg-foot", null, null, { dir: "HORIZONTAL", justify: "MAX", pad: 16, fill: AX.footer });
    add(foot, button("Tutup Panel", { fill: AX.low, color: AX.heading, radius: 8, padX: 16, h: 34, size: 12 }));
    add(root, stretch(foot));
  });
}

function dialogGantiPassword() {
  return dialogFrame("Dialog - Ganti Password", 448, (root) => {
    const body = box("body", null, null, { dir: "VERTICAL", gap: 14, pad: 24 });
    add(body, txt("Ganti Password", { size: 18, weight: 700, color: AX.heading }));
    add(body, txt("Masukkan password saat ini, password baru, dan konfirmasinya.", { size: 12, weight: 400, color: AX.secondary, width: 380 }));
    ["Password Saat Ini", "Password Baru", "Konfirmasi Password Baru"].forEach((label) => {
      const f = box("pw-field", null, null, { dir: "VERTICAL", gap: 6 });
      add(f, txt(label, { size: 10, weight: 700, color: AX.secondary, ls: 0.5, upper: true }));
      const input = box("input", null, 38, { dir: "HORIZONTAL", gap: 8, padL: 12, padR: 12, align: "CENTER", radius: 8, fill: AX.low });
      add(input, icon("lock", 15, AX.secondary));
      add(input, grow(txt("••••••••", { size: 13, weight: 400, color: AX.heading })));
      add(input, icon("eye", 15, AX.secondary));
      add(f, stretch(input));
      add(body, stretch(f));
    });
    const actions = box("actions", null, null, { dir: "HORIZONTAL", gap: 10, justify: "MAX" });
    add(actions, button("Batal", { fill: "#FFFFFF", color: AX.heading, radius: 8, padX: 16, h: 36, size: 12 }));
    add(actions, button("Perbarui Password", { fill: AX.brand, color: "#FFFFFF", radius: 9999, padX: 16, h: 36, size: 12 }));
    add(body, stretch(actions));
    add(root, body);
  });
}

const DIALOG_SPECS = [
  { name: "Dialog - Tolak Verifikasi", build: dialogTolak },
  { name: "Dialog - Override Plan", build: dialogOverride },
  { name: "Dialog - Daftar PT", build: dialogDaftarPt },
  { name: "Dialog - Detail Klien", build: dialogDetailKlien },
  { name: "Dialog - Hapus Akun", build: dialogHapus },
  { name: "Dialog - Detail Feedback", build: dialogDetailFeedback },
  { name: "Dialog - Ganti Password", build: dialogGantiPassword },
];
