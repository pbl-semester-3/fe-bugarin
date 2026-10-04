// Data dummy khusus PT untuk mode slicing UI (frontend-only).
// Bentuk data sengaja meniru response backend `{ data: ... }` supaya saat
// integrasi asli cukup ubah queryFn di hook tanpa menyentuh komponen halaman.
//
// TODO: hapus folder lib/mock/ setelah seluruh hook tersambung ke backend asli.

export type Tujuan = "turun_bb" | "naik_bb";

export type Gender = "pria" | "wanita";

export type PairingRequest = {
  id: number;
  createdAt: string;
  // Overline di kotak "Athletic Target": "Hipertrofi" / "Penurunan BB".
  kategoriTarget: string;
  // Info di modal Tolak: "Program Terpilih: (…)"; badge "Pemberitahuan Standar".
  selectedProgram: string;
  // Teks bold kotak target: "-6kg Lemak / +3kg Otot".
  targetSummary: string;
  // Caption kotak target: "Periodisasi 16 Minggu".
  periodization: string;
  klien: {
    id: number;
    nama: string;
    usia: number;
    gender: Gender;
    email: string;
    tujuan: Tujuan | null;
  };
};

// Opsi "Klasifikasi Penolakan" di modal Tolak Intake (design/VERIFIKASI.md §5.4).
export const REJECTION_CLASSIFICATIONS = [
  "Kapasitas Penuh",
  "Bentrok Jadwal",
  "Di Luar Target",
  "Perlu Izin Medis",
] as const;

export type RejectionClassification = (typeof REJECTION_CLASSIFICATIONS)[number];

// Pesan default textarea modal Tolak (design/VERIFIKASI.md §5.4).
// Catatan: teks Figma menyebut "CyberPulse" (nama lama) — diganti ke "Bugarin".
export const DEFAULT_DECLINE_MESSAGE =
  "Terima kasih telah mendaftar ke Bugarin. Daftar klien Alex Vance saat ini penuh untuk blok latihan mendatang. Kami senang meninjau kembali pengajuanmu di siklus berikutnya.";

// Mock dibuat relatif terhadap waktu sekarang supaya contoh "Diajukan: Hari ini, X jam lalu" tampil wajar.
function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export type WeekIndicator = "green" | "red" | "gray";

export type WeekDay = {
  label: string; // SEN..MIN
  date: number;
  isToday?: boolean;
  indicator: WeekIndicator;
};

export type SessionSlot = "TIME" | "NEXT UP" | "DONE";

export type TrainingSession = {
  id: number;
  slotLabel: SessionSlot;
  jam: string;
  klienNama: string;
  durasi: string;
  tujuan: Tujuan;
  lokasi: string;
  status: "queued" | "done";
};

export type DashboardSummary = {
  totalKlien: number;
  pendingVerifikasi: number;
  week: WeekDay[];
  sesi: TrainingSession[];
};

// Meniru GET /pt/pairing-requests -> { data: [...] }
// Bentuk field mengikuti kartu pengajuan di design/VERIFIKASI.md §4.
export const mockPairingRequests: PairingRequest[] = [
  {
    id: 1,
    createdAt: hoursAgo(2),
    kategoriTarget: "Hipertrofi",
    selectedProgram: "Penurunan Lemak & Hipertrofi",
    targetSummary: "-6kg Lemak / +3kg Otot",
    periodization: "Periodisasi 16 Minggu",
    klien: {
      id: 101,
      nama: "Rachel Cooper",
      usia: 28,
      gender: "wanita",
      email: "rachel.c@vertexpulse.io",
      tujuan: "naik_bb",
    },
  },
  {
    id: 2,
    createdAt: hoursAgo(6),
    kategoriTarget: "Penurunan BB",
    selectedProgram: "Penurunan Lemak & Kondisioning",
    targetSummary: "-9kg Lemak / +1kg Otot",
    periodization: "Periodisasi 12 Minggu",
    klien: {
      id: 102,
      nama: "Andi Saputra",
      usia: 31,
      gender: "pria",
      email: "andi.saputra@mail.com",
      tujuan: "turun_bb",
    },
  },
  {
    id: 3,
    createdAt: hoursAgo(26),
    kategoriTarget: "Hipertrofi",
    selectedProgram: "Penambahan Otot & Kekuatan",
    targetSummary: "+7kg Otot / +0kg Lemak",
    periodization: "Periodisasi 20 Minggu",
    klien: {
      id: 103,
      nama: "Candra Wijaya",
      usia: 24,
      gender: "pria",
      email: "candra.w@mail.com",
      tujuan: "naik_bb",
    },
  },
];

// Meniru GET /pt/dashboard-summary -> { data: {...} }
// (endpoint backend belum ada; ini dummy tampilan, acuan design/DASHBOARD.md)
export const mockDashboardSummary: DashboardSummary = {
  totalKlien: 24,
  pendingVerifikasi: 3,
  week: [
    { label: "SEN", date: 21, indicator: "green" },
    { label: "SEL", date: 22, indicator: "gray" },
    { label: "RAB", date: 23, indicator: "red" },
    { label: "KAM", date: 24, isToday: true, indicator: "green" },
    { label: "JUM", date: 25, indicator: "green" },
    { label: "SAB", date: 26, indicator: "gray" },
    { label: "MIN", date: 27, indicator: "gray" },
  ],
  sesi: [
    {
      id: 1,
      slotLabel: "NEXT UP",
      jam: "09:30",
      klienNama: "Marcus Sterling",
      durasi: "45 menit",
      tujuan: "turun_bb",
      lokasi: "pusatgym",
      status: "queued",
    },
    {
      id: 2,
      slotLabel: "TIME",
      jam: "11:00",
      klienNama: "Sarah Chen",
      durasi: "60 menit",
      tujuan: "naik_bb",
      lokasi: "pusatgym",
      status: "queued",
    },
    {
      id: 3,
      slotLabel: "DONE",
      jam: "14:00",
      klienNama: "David Kim",
      durasi: "45 menit",
      tujuan: "turun_bb",
      lokasi: "pusatgym",
      status: "done",
    },
    {
      id: 4,
      slotLabel: "TIME",
      jam: "17:30",
      klienNama: "Elena Rodriguez",
      durasi: "30 menit",
      tujuan: "naik_bb",
      lokasi: "pusatgym",
      status: "queued",
    },
  ],
};

export function tujuanLabel(tujuan: Tujuan | null): string {
  if (tujuan === "turun_bb") return "Turun BB";
  if (tujuan === "naik_bb") return "Naik BB";
  return "-";
}

export function genderLabel(gender: Gender): string {
  return gender === "wanita" ? "Wanita" : "Pria";
}

// Format tanggal request jadi label ringkas: "Hari ini, 2 jam lalu" / "4 hari lalu".
export function formatSubmitted(iso: string): string {
  const diffMinutes = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  );
  if (diffMinutes < 60) return `Hari ini, ${diffMinutes} mnt lalu`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Hari ini, ${diffHours} jam lalu`;
  return `${Math.floor(diffHours / 24)} hari lalu`;
}
