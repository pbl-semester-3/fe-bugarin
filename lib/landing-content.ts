export type LandingNavItem = {
  label: string;
  href: string;
};

export type LandingIconKey =
  | "target"
  | "heart"
  | "chart"
  | "profile"
  | "trainer"
  | "meal"
  | "evaluate";

export type LandingValue = {
  title: string;
  description: string;
  icon: LandingIconKey;
};

export type LandingStep = {
  title: string;
  description: string;
  icon: LandingIconKey;
};

export type LandingProblem = {
  problem: string;
  solution: string;
};

export type LandingAppScreen = {
  key: string;
  label: string;
  tab: string;
  imageSrc: string | null;
};

export type LandingFaq = {
  question: string;
  answer: string;
};

export const LANDING_NAV: LandingNavItem[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Masalah & Solusi", href: "#masalah-solusi" },
  { label: "Prototype", href: "#prototype" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  eyebrow: "PERSONAL TRAINER PLATFORM",
  titleLead: "Latihan terarah,",
  titleHighlight: "progres terukur,",
  titleTail: "ditemani pelatih",
  titleTailLast: "sungguhan.",
  description:
    "Bugarin menghubungkan Anda dengan personal trainer nyata melalui program latihan, nutrisi, dan dukungan harian agar perjalanan menuju kebugaran terasa lebih terarah dan menyenangkan.",
  ctaLabel: "Lihat Prototype",
  ctaHref: "#prototype",
  images: [
    { src: "/landing/beranda1.webp", alt: "Suasana latihan di gym Bugarin" },
    { src: "/landing/beranda2.webp", alt: "Personal trainer mendampingi klien" },
    { src: "/landing/beranda3.webp", alt: "Latihan kekuatan di gym" },
    { src: "/landing/beranda4.webp", alt: "Sesi latihan bersama personal trainer" },
  ],
};

export const ABOUT = {
  eyebrow: "TENTANG BUGARIN",
  titleLead: "Bugarin itu",
  titleHighlight: "proses,",
  titleTail: "bukan hasil sekali jadi.",
  paragraphs: [
    "Kebugaran adalah perjalanan panjang, bukan lomba sprint. Karena itu Bugarin tidak hanya memberi program latihan, tetapi juga pendampingan manusia yang memahami ritme tubuh Anda.",
    "Bersama personal trainer dan data yang tercatat rapi, setiap langkah menjadi lebih jelas: apa yang harus dilakukan, bagaimana progresnya, dan apa yang perlu diperbaiki.",
  ],
};

export const VALUES: LandingValue[] = [
  {
    title: "Terarah",
    description:
      "Program latihan dan nutrisi disusun sesuai target, kondisi tubuh, dan ritme hidup Anda.",
    icon: "target",
  },
  {
    title: "Terdampingi",
    description:
      "Personal trainer memantau progres, memberi evaluasi, dan siap membantu saat Anda butuh arahan.",
    icon: "heart",
  },
  {
    title: "Terukur",
    description:
      "Setiap latihan, berat badan, dan kebiasaan tercatat agar progres terlihat nyata, bukan sekadar perasaan.",
    icon: "chart",
  },
];

export const STEPS: LandingStep[] = [
  {
    title: "Isi Profil & Target",
    description:
      "Ceritakan kondisi tubuh, tujuan, dan kebiasaan Anda. Bugarin menyiapkan dasar program yang paling sesuai.",
    icon: "profile",
  },
  {
    title: "Pilih Personal Trainer",
    description:
      "Temukan pelatih yang cocok dengan tujuan dan gaya pendampingan yang Anda butuhkan.",
    icon: "trainer",
  },
  {
    title: "Catat Makan & Latihan",
    description:
      "Catat asupan dan aktivitas harian. Personal trainer dapat melihat data untuk memberi arahan yang tepat.",
    icon: "meal",
  },
  {
    title: "Pantau & Evaluasi",
    description:
      "Lihat progres berat, konsistensi, dan evaluasi pelatih dalam satu tempat yang mudah dipahami.",
    icon: "evaluate",
  },
];

export const PROBLEMS: LandingProblem[] = [
  {
    problem: "Program latihan generik tanpa arah yang jelas.",
    solution: "Program disusun personal sesuai target dan kondisi tubuh.",
  },
  {
    problem: "Tidak tahu apakah latihan sudah tepat.",
    solution:
      "Personal trainer memantau teknik dan memberi koreksi yang jelas.",
  },
  {
    problem: "Tidak ada yang mengingatkan saat kehilangan momentum.",
    solution:
      "Pendampingan dan pengingat membantu menjaga konsistensi harian.",
  },
  {
    problem: "Progres terasa samar karena tidak tercatat.",
    solution:
      "Data latihan, nutrisi, dan berat tercatat rapi dan mudah dievaluasi.",
  },
];

export const APP_SCREENS: LandingAppScreen[] = [
  {
    key: "beranda",
    label: "Screenshot Beranda",
    tab: "Beranda",
    imageSrc: "/landing/dashboardmobile.webp",
  },
  {
    key: "pt-ku",
    label: "Screenshot PT Ku",
    tab: "PT Ku",
    imageSrc: "/landing/PTkumobile.webp",
  },
  {
    key: "progres",
    label: "Screenshot Progres",
    tab: "Progres",
    imageSrc: "/landing/Progressmobile.webp",
  },
  {
    key: "riwayat",
    label: "Screenshot Riwayat",
    tab: "Riwayat",
    imageSrc: "/landing/Riwayatmobile.webp",
  },
  {
    key: "feedback",
    label: "Screenshot Feedback",
    tab: "Feedback",
    imageSrc: "/landing/Feedbackmobile.webp",
  },
];

export const FAQS: LandingFaq[] = [
  {
    question: "Apa itu Bugarin?",
    answer:
      "Bugarin adalah platform pendampingan kebugaran yang menghubungkan Anda dengan personal trainer untuk menyusun program latihan, nutrisi, dan evaluasi progres.",
  },
  {
    question: "Siapa yang membuat rencana latihan dan makan?",
    answer:
      "Personal trainer menyusun dan menyesuaikan rencana berdasarkan profil, target, serta data yang Anda catat. Bugarin membantu merapikan alurnya.",
  },
  {
    question: "Bagaimana cara memilih PT?",
    answer:
      "Anda dapat melihat rekomendasi personal trainer sesuai tujuan, lalu mengirim pengajuan. Setelah disetujui, pendampingan bisa dimulai.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Data profil dan progres disimpan untuk kebutuhan pendampingan. Akses dibatasi pada akun Anda dan personal trainer yang mendampingi.",
  },
  {
    question: "Apa itu siklus target?",
    answer:
      "Siklus target adalah periode program dengan berat awal, berat tujuan, durasi, dan target kalori yang jelas. Setiap siklus bisa dievaluasi sebelum memulai target baru.",
  },
  {
    question: "Perangkat apa saja yang didukung?",
    answer:
      "Aplikasi Bugarin dirancang untuk perangkat mobile. Halaman ini adalah situs informasi dan tidak digunakan untuk login klien.",
  },
];

export const FOOTER_CONTACTS = [
  { label: "Email", value: "hello@bugarin.com" },
  { label: "Telepon", value: "+62 815-2852-5032" },
  { label: "Alamat", value: "Malang, Indonesia" },
];

export const FOOTER_SOCIALS = ["instagram", "tiktok", "youtube"] as const;
