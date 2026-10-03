// Data dummy halaman Riwayat (mode slicing UI, frontend-only).
// Meniru GET /pt/riwayat -> { data: [...] } — acuan design/RIWAYAT.md §4.3.
// TODO: hapus file ini setelah hook tersambung ke backend asli.

export type RiwayatGoal = "weight_loss" | "hypertrophy";
export type RiwayatGender = "female" | "male";

export type RiwayatRow = {
  id: number;
  nama: string;
  usia: number;
  gender: RiwayatGender;
  goal: RiwayatGoal;
  bbAwal: number;
  bbSekarang: number;
};

export const mockRiwayat: RiwayatRow[] = [
  {
    id: 102,
    nama: "Sarah Jenkins",
    usia: 29,
    gender: "female",
    goal: "weight_loss",
    bbAwal: 78.5,
    bbSekarang: 71.2,
  },
  {
    id: 101,
    nama: "Marcus Sterling",
    usia: 34,
    gender: "male",
    goal: "hypertrophy",
    bbAwal: 82.0,
    bbSekarang: 86.8,
  },
  {
    id: 103,
    nama: "Elena Rostova",
    usia: 26,
    gender: "female",
    goal: "hypertrophy",
    // Diselaraskan agar delta +3.4 kg konsisten dengan goal Hypertrophy
    // (design/RIWAYAT.md §4.3 menampilkan +3.4 dari 63.2 -> 59.8 yang tidak konsisten).
    bbAwal: 59.8,
    bbSekarang: 63.2,
  },
  {
    id: 104,
    nama: "David Kim",
    usia: 31,
    gender: "male",
    goal: "weight_loss",
    bbAwal: 75.0,
    bbSekarang: 73.9,
  },
  {
    id: 105,
    nama: "Chloe Bennett",
    usia: 27,
    gender: "female",
    goal: "weight_loss",
    bbAwal: 69.0,
    bbSekarang: 63.1,
  },
  {
    id: 106,
    nama: "Jordan Hayes",
    usia: 30,
    gender: "male",
    goal: "hypertrophy",
    bbAwal: 77.4,
    bbSekarang: 80.2,
  },
];

// Net delta dihitung dari bbSekarang - bbAwal (satu sumber data).
export function netDelta(row: RiwayatRow): number {
  return Number((row.bbSekarang - row.bbAwal).toFixed(1));
}
