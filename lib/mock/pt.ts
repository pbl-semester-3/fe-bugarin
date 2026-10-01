// Data dummy khusus PT untuk mode slicing UI (frontend-only).
// Bentuk data sengaja meniru response backend `{ data: ... }` supaya saat
// integrasi asli cukup ubah queryFn di hook tanpa menyentuh komponen halaman.
//
// TODO: hapus folder lib/mock/ setelah seluruh hook tersambung ke backend asli.

export type Tujuan = "turun_bb" | "naik_bb";

export type PairingRequest = {
  id: number;
  createdAt: string;
  klien: {
    id: number;
    nama: string;
    tujuan: Tujuan | null;
  };
};

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
export const mockPairingRequests: PairingRequest[] = [
  {
    id: 1,
    createdAt: "2026-09-28T08:30:00.000Z",
    klien: { id: 101, nama: "Andi Saputra", tujuan: "turun_bb" },
  },
  {
    id: 2,
    createdAt: "2026-09-29T10:15:00.000Z",
    klien: { id: 102, nama: "Bella Kartika", tujuan: "naik_bb" },
  },
  {
    id: 3,
    createdAt: "2026-09-30T03:45:00.000Z",
    klien: { id: 103, nama: "Candra Wijaya", tujuan: "turun_bb" },
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
