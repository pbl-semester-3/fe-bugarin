// Landing page (app/(public)) sebagai satu frame tinggi.
const LX = {
  bg: "#FCF9F4",
  cream: "#F6F0E6",
  orange: "#F46B3C",
  orangeSoft: "#FBEFE9",
  green: "#8CBF3F",
  greenSoft: "#EEF6E3",
  ink: "#1F2933",
  muted: "#6B7280",
  line: "#E8E0D4",
  footer: "#202A33",
  white: "#FFFFFF",
};

const LANDING_W = 1440;
const LANDING_CONTAINER = 1200;

function landingSection(name, bg, padY, build) {
  const s = box(name, LANDING_W, null, { dir: "VERTICAL", align: "CENTER", padT: padY, padB: padY, gap: 0, fill: bg });
  build(s);
  return s;
}

function landingEyebrow(text) {
  return txt(text, { size: 12, weight: 700, color: LX.orange, ls: 2 });
}

function landingHeader() {
  const h = box("landing-header", LANDING_W, 80, { dir: "HORIZONTAL", padL: 64, padR: 64, align: "CENTER", justify: "SPACE_BETWEEN", fill: LX.ink });
  const brand = box("landing-brand", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(brand, img("logo", 40, 40, { scaleMode: "CONTAIN", name: "landing-logo" }));
  add(brand, txt("Bugarin", { size: 20, weight: 800, color: LX.white }));
  add(h, brand);
  const nav = box("landing-nav", null, null, { dir: "HORIZONTAL", gap: 28, align: "CENTER" });
  ["Beranda", "Layanan", "Masalah & Solusi", "Prototype", "FAQ"].forEach((l) => {
    add(nav, txt(l, { size: 14, weight: 500, color: LX.white, opacity: 0.75 }));
  });
  add(h, nav);
  return h;
}

function landingHero() {
  const hero = img("hero", LANDING_W, 860, { name: "landing-hero" });
  const shade = box("hero-shade", LANDING_W, 860, {});
  shade.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0, 1, 0], [1, 0, 0]],
      gradientStops: [
        { position: 0, color: Object.assign(rgb("#000000"), { a: 0.82 }) },
        { position: 0.6, color: Object.assign(rgb("#000000"), { a: 0.5 }) },
        { position: 1, color: Object.assign(rgb("#000000"), { a: 0.22 }) },
      ],
    },
  ];
  add(hero, shade);

  const content = box("hero-content", 720, null, { dir: "VERTICAL", gap: 18 });
  add(content, landingEyebrow("PERSONAL TRAINER PLATFORM"));
  const title = box("hero-title", null, null, { dir: "VERTICAL", gap: 0 });
  add(title, txt("Latihan terarah,", { size: 64, weight: 800, color: LX.white, lh: 68, ls: -1.2 }));
  add(title, txt("progres terukur,", { size: 64, weight: 800, color: LX.orange, lh: 68, ls: -1.2 }));
  add(title, txt("ditemani pelatih", { size: 64, weight: 800, color: LX.white, lh: 68, ls: -1.2 }));
  add(title, txt("sungguhan.", { size: 64, weight: 800, color: LX.white, lh: 68, ls: -1.2 }));
  add(content, title);
  add(content, txt("Bugarin menghubungkan kamu dengan personal trainer sungguhan agar setiap latihan punya arah, pendampingan, dan progres yang bisa diukur.", { size: 18, weight: 400, color: LX.white, opacity: 0.82, width: 560, lh: 28 }));
  const cta = box("hero-cta", null, 52, { dir: "HORIZONTAL", gap: 10, padL: 24, padR: 24, align: "CENTER", radius: 9999, fill: LX.orange });
  add(cta, txt("Lihat Prototype", { size: 15, weight: 700, color: LX.white }));
  add(cta, icon("arrow-right", 18, LX.white));
  add(content, cta);
  add(hero, content);
  content.x = 120;
  content.y = 200;
  return hero;
}

function landingAbout() {
  return landingSection("landing-about", LX.cream, 96, (s) => {
    const grid = box("about-grid", LANDING_CONTAINER, null, { dir: "HORIZONTAL", gap: 64, align: "MIN" });
    const left = box("about-text", 560, null, { dir: "VERTICAL", gap: 20 });
    add(left, landingEyebrow("TENTANG BUGARIN"));
    add(left, txt("Bugarin itu proses, bukan hasil sekali jadi.", { size: 40, weight: 800, color: LX.ink, width: 520, lh: 48, ls: -0.8 }));
    add(left, txt("Bugarin percaya bahwa perubahan tubuh yang bertahan dibangun dari kebiasaan kecil yang dijalani konsisten, bukan dari program instan yang membebani.", { size: 15, weight: 400, color: LX.muted, width: 520, lh: 26 }));
    add(left, txt("Karena itu Bugarin mempertemukan kamu dengan personal trainer sungguhan yang menyusun program, mengawal latihan, dan mengevaluasi progres bersama.", { size: 15, weight: 400, color: LX.muted, width: 520, lh: 26 }));
    add(grid, grow(left));
    add(grid, img("about", 560, 373, { radius: 32, name: "about-image" }));
    add(s, grid);

    add(s, box("gap", null, 56, { dir: "VERTICAL" }));
    const values = box("about-values", LANDING_CONTAINER, null, { dir: "HORIZONTAL", gap: 24 });
    [
      ["target", "Terarah", "Program latihan disusun sesuai target dan kondisi tubuh, bukan template generik."],
      ["heart-handshake", "Terdampingi", "Selalu ada personal trainer yang memantau teknik dan menjaga konsistensi."],
      ["chart-line", "Terukur", "Progres latihan, nutrisi, dan berat badan tercatat rapi dan mudah dievaluasi."],
    ].forEach(([ico, title, desc]) => {
      const card = box("value-card", null, null, { dir: "VERTICAL", gap: 12, pad: 28, radius: 24, fill: LX.white, stroke: LX.line, strokeWeight: 1 });
      const ib = box("value-icon", 48, 48, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 14, fill: LX.orangeSoft });
      add(ib, icon(ico, 22, LX.orange));
      add(card, ib);
      add(card, txt(title, { size: 20, weight: 700, color: LX.ink }));
      add(card, txt(desc, { size: 14, weight: 400, color: LX.muted, width: 280, lh: 22 }));
      add(values, grow(card));
    });
    add(s, values);
  });
}

function landingHow() {
  return landingSection("landing-how", LX.bg, 96, (s) => {
    const head = box("how-head", 720, null, { dir: "VERTICAL", gap: 12, align: "CENTER" });
    add(head, txt("LANGKAH AWAL", { size: 12, weight: 700, color: LX.orange, ls: 2, align: "CENTER" }));
    add(head, txt("Cara Kerja Bugarin", { size: 40, weight: 800, color: LX.ink, align: "CENTER" }));
    add(head, txt("Empat langkah sederhana untuk memulai perjalanan yang lebih terarah bersama personal trainer.", { size: 15, weight: 400, color: LX.muted, align: "CENTER", width: 620, lh: 24 }));
    add(s, head);

    add(s, box("gap", null, 48, { dir: "VERTICAL" }));
    const cards = box("how-cards", LANDING_CONTAINER, null, { dir: "HORIZONTAL", gap: 20 });
    [
      ["Isi Profil & Target", "Lengkapi data tubuh dan tentukan target yang ingin dicapai."],
      ["Pilih Personal Trainer", "Temukan PT yang sesuai dengan tujuan dan preferensimu."],
      ["Catat Makan & Latihan", "Catat asupan dan sesi latihan agar mudah dipantau."],
      ["Pantau & Evaluasi", "Lihat progres berkala dan evaluasi bersama PT."],
    ].forEach(([title, desc], i) => {
      const card = box("step-card", null, null, { dir: "VERTICAL", gap: 14, pad: 24, radius: 24, fill: LX.white, stroke: LX.line, strokeWeight: 1 });
      const row = box("step-top", null, null, { dir: "HORIZONTAL", justify: "SPACE_BETWEEN", align: "CENTER" });
      const ib = box("step-icon", 48, 48, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 14, fill: LX.orange });
      add(ib, icon(["target", "user", "clipboard-check", "chart-line"][i], 22, LX.white));
      add(row, ib);
      const num = box("step-num", 32, 32, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 16, fill: LX.cream });
      add(num, txt(String(i + 1), { size: 14, weight: 800, color: LX.orange }));
      add(row, num);
      add(card, row);
      add(card, txt(title, { size: 18, weight: 700, color: LX.ink }));
      add(card, txt(desc, { size: 14, weight: 400, color: LX.muted, width: 230, lh: 22 }));
      add(cards, grow(card));
    });
    add(s, cards);
  });
}

function psCard(label, asset, good) {
  const card = box("ps-card", null, null, { dir: "VERTICAL", gap: 0, radius: 28, fill: LX.white, stroke: good ? "#C9E3A6" : LX.line, strokeWeight: 1 });
  add(card, img(asset, 564, 423, { name: asset + "-image" }));
  const body = box("ps-body", null, null, { dir: "VERTICAL", gap: 14, pad: 28 });
  add(body, txt(label.toUpperCase(), { size: 11, weight: 700, color: good ? LX.green : LX.muted, ls: 1.6 }));
  const items = [
    ["Program latihan generik tanpa arah yang jelas.", "Program disusun personal sesuai target dan kondisi tubuh."],
    ["Tidak tahu apakah latihan sudah tepat.", "Personal trainer memantau teknik dan memberi koreksi yang jelas."],
    ["Tidak ada yang mengingatkan saat kehilangan momentum.", "Pendampingan dan pengingat membantu menjaga konsistensi harian."],
    ["Progres terasa samar karena tidak tercatat.", "Data latihan, nutrisi, dan berat tercatat rapi dan mudah dievaluasi."],
  ];
  items.forEach(([bad, solution]) => {
    const row = box("ps-row", null, null, { dir: "HORIZONTAL", gap: 12, pad: 12, align: "CENTER", radius: 14, fill: good ? LX.greenSoft : "#FBF1EC" });
    const dot = box("ps-dot", 22, 22, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 11, fill: good ? LX.green : "#E8B9A6" });
    add(dot, icon(good ? "check" : "x", 12, LX.white));
    add(row, dot);
    add(row, grow(txt(good ? solution : bad, { size: 13, weight: 500, color: LX.ink, width: 440, lh: 19 })));
    add(body, row);
  });
  add(card, body);
  return card;
}

function landingProblem() {
  return landingSection("landing-problem", LX.cream, 96, (s) => {
    const head = box("ps-head", 780, null, { dir: "VERTICAL", gap: 12, align: "CENTER" });
    add(head, txt("Kenapa banyak orang berhenti di tengah jalan?", { size: 40, weight: 800, color: LX.ink, align: "CENTER", width: 760, lh: 48 }));
    add(head, txt("Bukan karena kurang niat. Sering kali karena tidak ada arah, pendamping, dan cara mengukur progres yang jelas.", { size: 15, weight: 400, color: LX.muted, align: "CENTER", width: 680, lh: 24 }));
    add(s, head);
    add(s, box("gap", null, 44, { dir: "VERTICAL" }));
    const grid = box("ps-grid", LANDING_CONTAINER, null, { dir: "HORIZONTAL", gap: 24 });
    add(grid, grow(psCard("Masalah umum", "problem", false)));
    add(grid, grow(psCard("Solusi Bugarin", "solution", true)));
    add(s, grid);
  });
}

function phoneShot(key, w) {
  const f = img(key, w, Math.round(w * 2), { radius: 38, name: "phone-" + key });
  f.strokes = [solid(LX.ink)];
  f.strokeWeight = 6;
  f.strokeAlign = "INSIDE";
  return f;
}

function landingPreview() {
  return landingSection("landing-preview", LX.bg, 96, (s) => {
    const head = box("preview-head", 720, null, { dir: "VERTICAL", gap: 12, align: "CENTER" });
    add(head, txt("SEKILAS APLIKASI", { size: 12, weight: 700, color: LX.orange, ls: 2, align: "CENTER" }));
    add(head, txt("Intip aplikasinya.", { size: 40, weight: 800, color: LX.ink, align: "CENTER" }));
    add(head, txt("Gambaran singkat bagaimana Bugarin membantu Anda menjalani program, berkomunikasi dengan PT, dan melihat progres.", { size: 15, weight: 400, color: LX.muted, align: "CENTER", width: 620, lh: 24 }));
    add(s, head);

    add(s, box("gap", null, 40, { dir: "VERTICAL" }));
    const row = box("phone-row", null, null, { dir: "HORIZONTAL", gap: 28, align: "CENTER" });
    add(row, phoneShot("m_pt", 190));
    add(row, phoneShot("m_dashboard", 250));
    add(row, phoneShot("m_progress", 190));
    add(s, row);

    add(s, box("gap", null, 28, { dir: "VERTICAL" }));
    const tabs = box("preview-tabs", null, null, { dir: "HORIZONTAL", gap: 10, align: "CENTER" });
    ["Beranda", "PT Ku", "Progres", "Riwayat", "Feedback"].forEach((t, i) => {
      const pillEl = box("preview-tab", null, 38, { dir: "HORIZONTAL", padL: 18, padR: 18, align: "CENTER", radius: 9999, fill: i === 0 ? LX.orange : LX.white, stroke: i === 0 ? null : LX.line, strokeWeight: 1 });
      add(pillEl, txt(t, { size: 13, weight: 600, color: i === 0 ? LX.white : LX.ink }));
      add(tabs, pillEl);
    });
    add(s, tabs);
  });
}

function landingFaq() {
  return landingSection("landing-faq", LX.white, 96, (s) => {
    const grid = box("faq-grid", LANDING_CONTAINER, null, { dir: "HORIZONTAL", gap: 56, align: "MIN" });
    const left = box("faq-left", 660, null, { dir: "VERTICAL", gap: 20 });
    add(left, landingEyebrow("FAQ"));
    add(left, txt("Ketahui lebih banyak seputar Bugarin.", { size: 40, weight: 800, color: LX.ink, width: 560, lh: 48, ls: -0.8 }));
    const list = box("faq-list", null, null, { dir: "VERTICAL", gap: 0 });
    const faqs = [
      ["Apa itu Bugarin?", "Bugarin adalah platform pendampingan kebugaran yang menghubungkan kamu dengan personal trainer sungguhan untuk menyusun program dan memantau progres."],
      ["Siapa yang membuat rencana latihan dan makan?", "Personal trainer kamu yang menyusun rencana latihan dan menu berdasarkan target serta kondisi tubuh."],
      ["Bagaimana cara memilih PT?", "Lihat profil, spesialisasi, dan pengalaman PT lalu pilih yang paling sesuai dengan tujuanmu."],
      ["Apakah data saya aman?", "Data disimpan pada sistem terautentikasi dan hanya diakses oleh kamu serta PT pendamping."],
      ["Apa itu siklus target?", "Siklus target adalah periode evaluasi berkala untuk menyesuaikan program dengan progres terbaru."],
      ["Perangkat apa saja yang didukung?", "Aplikasi mobile untuk klien dan dashboard web untuk personal trainer serta admin."],
    ];
    faqs.forEach(([q, a], i) => {
      const item = box("faq-item", null, null, { dir: "VERTICAL", gap: 10, padT: 18, padB: 18, stroke: LX.line, strokeWeight: 1, strokeSides: "bottom" });
      const qrow = box("faq-q", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER", justify: "SPACE_BETWEEN" });
      add(qrow, txt(q, { size: 16, weight: 700, color: LX.ink }));
      const circle = box("faq-toggle", 34, 34, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 17, fill: i === 0 ? LX.orange : LX.white, stroke: i === 0 ? null : LX.line, strokeWeight: 1 });
      add(circle, icon(i === 0 ? "chevron-up" : "chevron-down", 16, i === 0 ? LX.white : LX.ink));
      add(qrow, circle);
      add(item, qrow);
      if (i === 0) add(item, txt(a, { size: 14, weight: 400, color: LX.muted, width: 600, lh: 22 }));
      add(list, stretch(item));
    });
    add(left, list);
    add(grid, grow(left));
    add(grid, img("faq", 460, 552, { radius: 32, name: "faq-image" }));
    add(s, grid);
  });
}

function landingFooter() {
  const f = box("landing-footer", LANDING_W, null, { dir: "VERTICAL", align: "CENTER", padT: 72, padB: 32, padL: 64, padR: 64, gap: 40, fill: LX.footer });
  const grid = box("footer-grid", LANDING_CONTAINER, null, { dir: "HORIZONTAL", gap: 56, align: "MIN" });

  const c1 = box("footer-brand", 480, null, { dir: "VERTICAL", gap: 14 });
  const brand = box("footer-brand-row", null, null, { dir: "HORIZONTAL", gap: 12, align: "CENTER" });
  add(brand, img("logo", 44, 44, { scaleMode: "CONTAIN", name: "footer-logo" }));
  add(brand, txt("Bugarin", { size: 20, weight: 800, color: LX.white }));
  add(c1, brand);
  add(c1, txt("Platform pendampingan kebugaran yang menghubungkan Anda dengan personal trainer sungguhan.", { size: 14, weight: 400, color: LX.white, opacity: 0.7, width: 420, lh: 22 }));
  const social = box("footer-social", null, null, { dir: "HORIZONTAL", gap: 10 });
  ["instagram", "music-2", "youtube"].forEach((ic) => {
    const b = box("social-btn", 36, 36, { dir: "VERTICAL", align: "CENTER", justify: "CENTER", radius: 18, fill: LX.white, opacity: 0.1 });
    add(b, icon(ic, 16, LX.white));
    add(social, b);
  });
  add(c1, social);
  add(grid, grow(c1));

  const c2 = box("footer-nav", null, null, { dir: "VERTICAL", gap: 12 });
  add(c2, txt("Navigasi Utama", { size: 13, weight: 700, color: LX.white }));
  ["Beranda", "Layanan", "Masalah & Solusi", "Prototype", "FAQ"].forEach((l) => add(c2, txt(l, { size: 14, weight: 400, color: LX.white, opacity: 0.7 })));
  add(grid, c2);

  const c3 = box("footer-contact", null, null, { dir: "VERTICAL", gap: 12 });
  add(c3, txt("Kontak", { size: 13, weight: 700, color: LX.white }));
  [["Email", "hello@bugarin.com"], ["Telepon", "+62 815-2852-5032"], ["Alamat", "Malang, Indonesia"]].forEach(([k, v]) => {
    const row = box("contact-row", null, null, { dir: "VERTICAL", gap: 2 });
    add(row, txt(k, { size: 11, weight: 600, color: LX.white, opacity: 0.5, ls: 1 }));
    add(row, txt(v, { size: 14, weight: 400, color: LX.white, opacity: 0.8 }));
    add(c3, row);
  });
  add(grid, c3);
  add(f, grid);

  const bar = box("footer-bar", LANDING_CONTAINER, null, { dir: "HORIZONTAL", align: "CENTER", justify: "SPACE_BETWEEN", padT: 20, stroke: LX.white, strokeWeight: 1, strokeSides: "bottom" });
  add(bar, txt("© 2026 Bugarin. Seluruh hak cipta dilindungi.", { size: 12, weight: 400, color: LX.white, opacity: 0.6 }));
  add(bar, txt("Dibangun untuk perjalanan kebugaran yang lebih terarah.", { size: 12, weight: 400, color: LX.white, opacity: 0.6 }));
  add(f, bar);
  return f;
}

function buildLandingPage() {
  const root = box("Landing Page (Light)", LANDING_W, null, { dir: "VERTICAL", gap: 0, fill: LX.bg });
  add(root, landingHeader());
  add(root, landingHero());
  add(root, landingAbout());
  add(root, landingHow());
  add(root, landingProblem());
  add(root, landingPreview());
  add(root, landingFaq());
  add(root, landingFooter());
  return root;
}
