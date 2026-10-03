// Data dummy khusus halaman Klien PT untuk mode slicing UI (frontend-only).
// Bentuk data sengaja meniru response backend `{ data: ... }` supaya saat
// integrasi asli cukup ubah queryFn di hook tanpa menyentuh komponen halaman.
//
// Acuan: design/KLIEN.md §4 (kartu klien & data contoh).
// TODO: hapus file ini setelah hook tersambung ke backend asli.

export type KlienGoal = "hypertrophy" | "weight_loss";

export const GOAL_LABELS: Record<KlienGoal, string> = {
  hypertrophy: "Hypertrophy",
  weight_loss: "Weight Loss",
};

export type Klien = {
  id: number;
  nama: string;
  email: string;
  // Badge "Started Aug 12" di kartu klien.
  mulaiProgram: string;
  // Isi kotak SESSION SLOT, mis. "Today 9:30 AM".
  sessionSlot: string;
  goal: KlienGoal;
  status: "active";
};

// Meniru GET /pt/klien -> { data: [...] }
// 6 klien sesuai contoh di design/KLIEN.md §4.2.
export const mockKlienList: Klien[] = [
  {
    id: 101,
    nama: "Marcus Sterling",
    email: "marcus.s@lumina.io",
    mulaiProgram: "Started Aug 12",
    sessionSlot: "Today 9:30 AM",
    goal: "hypertrophy",
    status: "active",
  },
  {
    id: 102,
    nama: "Sarah Jenkins",
    email: "sarah.j@vertex.net",
    mulaiProgram: "Started Sep 01",
    sessionSlot: "Tomorrow 8:00 AM",
    goal: "weight_loss",
    status: "active",
  },
  {
    id: 103,
    nama: "Elena Rostova",
    email: "elena.rostova@cyberpost.org",
    mulaiProgram: "Started Jul 15",
    sessionSlot: "Today 11:15 AM",
    goal: "hypertrophy",
    status: "active",
  },
  {
    id: 104,
    nama: "Steve Henderson",
    email: "steve.s@lumina.io",
    mulaiProgram: "Started Aug 12",
    sessionSlot: "Today 8:20 AM",
    goal: "hypertrophy",
    status: "active",
  },
  {
    id: 105,
    nama: "Chloe Bennett",
    email: "chloe.b@aurahealth.com",
    mulaiProgram: "Started Jun 04",
    sessionSlot: "Today 4:30 PM",
    goal: "weight_loss",
    status: "active",
  },
  {
    id: 106,
    nama: "Jordan Hayes",
    email: "jordan.h@kinetic.run",
    mulaiProgram: "Started Sep 18",
    sessionSlot: "Friday 10:00 AM",
    goal: "hypertrophy",
    status: "active",
  },
];
