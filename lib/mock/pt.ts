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
  // Overline di kotak "Athletic Target": "HYPERTROPHY" / "WEIGHT LOSS".
  kategoriTarget: string;
  // Info di modal Decline: "Selected Program: (…)"; badge "STANDARD NOTICE".
  selectedProgram: string;
  // Teks bold kotak target: "-6kg Fat / +3kg Muscle".
  targetSummary: string;
  // Caption kotak target: "16-Week Periodization".
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

// Opsi "Rejection Classification" di modal Decline Intake Request (design/VERIFIKASI.md §5.4).
export const REJECTION_CLASSIFICATIONS = [
  "Roster At Capacity",
  "Schedule Conflict",
  "Out of Scope Goal",
  "Medical Clearance Needed",
] as const;

export type RejectionClassification = (typeof REJECTION_CLASSIFICATIONS)[number];

// Pesan default textarea modal Decline (design/VERIFIKASI.md §5.4).
// Catatan: teks Figma menyebut "CyberPulse" (nama lama) — diganti ke "Bugarin".
export const DEFAULT_DECLINE_MESSAGE =
  "Thank you for applying to Bugarin. Alex Vance's roster is currently at full capacity for the upcoming training block. We'd love to revisit your intake in a future cycle.";

// Mock dibuat relatif terhadap waktu sekarang supaya contoh "Submitted: Today, Xh ago" tampil wajar.
function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export type WeekIndicator = "green" | "red" | "gray";

export type WeekDay = {
  label: string; // MON..SUN
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
    kategoriTarget: "Hypertrophy",
    selectedProgram: "Fat Loss & Hypertrophy",
    targetSummary: "-6kg Fat / +3kg Muscle",
    periodization: "16-Week Periodization",
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
    kategoriTarget: "Weight Loss",
    selectedProgram: "Fat Loss & Conditioning",
    targetSummary: "-9kg Fat / +1kg Muscle",
    periodization: "12-Week Periodization",
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
    kategoriTarget: "Hypertrophy",
    selectedProgram: "Muscle Gain & Strength",
    targetSummary: "+7kg Muscle / +0kg Fat",
    periodization: "20-Week Periodization",
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
    { label: "MON", date: 21, indicator: "green" },
    { label: "TUE", date: 22, indicator: "gray" },
    { label: "WED", date: 23, indicator: "red" },
    { label: "THU", date: 24, isToday: true, indicator: "green" },
    { label: "FRI", date: 25, indicator: "green" },
    { label: "SAT", date: 26, indicator: "gray" },
    { label: "SUN", date: 27, indicator: "gray" },
  ],
  sesi: [
    {
      id: 1,
      slotLabel: "NEXT UP",
      jam: "09:30",
      klienNama: "Marcus Sterling",
      durasi: "45 min",
      tujuan: "turun_bb",
      lokasi: "pusatgym",
      status: "queued",
    },
    {
      id: 2,
      slotLabel: "TIME",
      jam: "11:00",
      klienNama: "Sarah Chen",
      durasi: "60 min",
      tujuan: "naik_bb",
      lokasi: "pusatgym",
      status: "queued",
    },
    {
      id: 3,
      slotLabel: "DONE",
      jam: "14:00",
      klienNama: "David Kim",
      durasi: "45 min",
      tujuan: "turun_bb",
      lokasi: "pusatgym",
      status: "done",
    },
    {
      id: 4,
      slotLabel: "TIME",
      jam: "17:30",
      klienNama: "Elena Rodriguez",
      durasi: "30 min",
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
  return gender === "wanita" ? "Female" : "Male";
}

// Format tanggal request jadi label ringkas ala desain: "Today, 2h ago" / "4d ago".
export function formatSubmitted(iso: string): string {
  const diffMinutes = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  );
  if (diffMinutes < 60) return `Today, ${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Today, ${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}
