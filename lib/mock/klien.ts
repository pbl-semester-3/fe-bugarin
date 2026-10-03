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

export type KlienGender = "pria" | "wanita";

export function genderLabel(gender: KlienGender): string {
  return gender === "wanita" ? "Perempuan" : "Laki-laki";
}

export type ProgramWorkoutDay = {
  hari: string;
  fokus: string;
  latihan: string[];
};

export type KlienProgram = {
  nama: string;
  ringkasan: string;
  workout: ProgramWorkoutDay[];
};

// Data detail klien untuk halaman "View Full Profile & Program".
export type KlienDetail = {
  usia: number;
  gender: KlienGender;
  // Data yang diinput klien saat onboarding.
  bbAwal: number;
  tinggiBadan: number;
  // BB terbaru (entry terakhir weight_logs).
  bbSekarang: number;
  // Target BB (progress_cycles.bb_tujuan).
  bbTujuan: number;
  program: KlienProgram;
};

export type KlienWithDetail = Klien & KlienDetail;

// Meniru GET /pt/klien/:id -> { data: { ...Klien, ...detail } }
export const mockKlienDetail: Record<number, KlienDetail> = {
  101: {
    usia: 29,
    gender: "pria",
    bbAwal: 78,
    tinggiBadan: 180,
    bbSekarang: 82,
    bbTujuan: 88,
    program: {
      nama: "Muscle Gain & Strength",
      ringkasan:
        "Surplus kalori bersih dengan progressive overload untuk menambah massa otot.",
      workout: [
        {
          hari: "Senin",
          fokus: "Push",
          latihan: ["Bench Press 4x8", "Incline DB Press 3x10", "Dips 3x12"],
        },
        {
          hari: "Rabu",
          fokus: "Pull",
          latihan: ["Pull-up 4x8", "Barbell Row 4x10", "Face Pull 3x15"],
        },
        {
          hari: "Jumat",
          fokus: "Legs",
          latihan: ["Squat 4x8", "Leg Curl 3x12", "Calf Raise 4x15"],
        },
      ],
    },
  },
  102: {
    usia: 32,
    gender: "wanita",
    bbAwal: 72,
    tinggiBadan: 165,
    bbSekarang: 66,
    bbTujuan: 62,
    program: {
      nama: "Fat Loss & Conditioning",
      ringkasan:
        "Defisit kalori moderat dengan latihan beban untuk mempertahankan massa otot.",
      workout: [
        {
          hari: "Selasa",
          fokus: "Cardio Base",
          latihan: ["Lari 5 km", "Core 3x15"],
        },
        {
          hari: "Kamis",
          fokus: "Strength Circuit",
          latihan: ["Goblet Squat 4x12", "Push-up 4x15", "Plank 3x45s"],
        },
        {
          hari: "Sabtu",
          fokus: "Active Recovery",
          latihan: ["Jalan cepat 40 min", "Mobility 15 min"],
        },
      ],
    },
  },
  103: {
    usia: 27,
    gender: "wanita",
    bbAwal: 58,
    tinggiBadan: 168,
    bbSekarang: 61,
    bbTujuan: 66,
    program: {
      nama: "Lean Bulk",
      ringkasan:
        "Penambahan massa otot perlahan dengan komposisi tubuh tetap ramping.",
      workout: [
        {
          hari: "Senin",
          fokus: "Lower Body",
          latihan: ["Hip Thrust 4x10", "Squat 3x10", "Lunges 3x12"],
        },
        {
          hari: "Kamis",
          fokus: "Upper Body",
          latihan: ["Lat Pulldown 4x10", "Shoulder Press 3x12", "Curl 3x12"],
        },
      ],
    },
  },
  104: {
    usia: 35,
    gender: "pria",
    bbAwal: 80,
    tinggiBadan: 178,
    bbSekarang: 85,
    bbTujuan: 90,
    program: {
      nama: "Mass Builder",
      ringkasan:
        "Fokus hipertrofi dengan volume tinggi dan progresi beban bertahap.",
      workout: [
        {
          hari: "Selasa",
          fokus: "Chest & Triceps",
          latihan: ["Bench Press 5x6", "Cable Fly 3x12", "Skull Crusher 3x10"],
        },
        {
          hari: "Kamis",
          fokus: "Back & Biceps",
          latihan: ["Deadlift 4x6", "Lat Pulldown 4x10", "Barbell Curl 3x12"],
        },
        {
          hari: "Sabtu",
          fokus: "Legs",
          latihan: ["Front Squat 4x8", "Leg Press 4x12", "Hamstring Curl 3x12"],
        },
      ],
    },
  },
  105: {
    usia: 30,
    gender: "wanita",
    bbAwal: 70,
    tinggiBadan: 163,
    bbSekarang: 64,
    bbTujuan: 60,
    program: {
      nama: "Tone & Sculpt",
      ringkasan:
        "Latihan fungsional dan kardio ringan untuk membentuk otot dan stamina.",
      workout: [
        {
          hari: "Senin",
          fokus: "Pilates & Core",
          latihan: ["Plank 3x60s", "Bicycle Crunch 3x20", "Glute Bridge 3x15"],
        },
        {
          hari: "Kamis",
          fokus: "Full Body Circuit",
          latihan: ["Squat 3x12", "Push-up 3x12", "Jump Rope 10 min"],
        },
      ],
    },
  },
  106: {
    usia: 26,
    gender: "pria",
    bbAwal: 65,
    tinggiBadan: 175,
    bbSekarang: 69,
    bbTujuan: 75,
    program: {
      nama: "Strength & Size",
      ringkasan:
        "Program kekuatan compound untuk menambah massa dan performa atletik.",
      workout: [
        {
          hari: "Senin",
          fokus: "Push",
          latihan: ["Overhead Press 4x6", "Bench Press 4x8", "Triceps Pushdown 3x12"],
        },
        {
          hari: "Rabu",
          fokus: "Pull",
          latihan: ["Pull-up 4x8", "Seated Row 4x10", "Hammer Curl 3x12"],
        },
        {
          hari: "Jumat",
          fokus: "Legs & Core",
          latihan: ["Back Squat 4x6", "Romanian Deadlift 3x10", "Hanging Leg Raise 3x15"],
        },
      ],
    },
  },
};

export function getKlienById(id: number): Klien | undefined {
  return mockKlienList.find((k) => k.id === id);
}

export function getKlienDetail(id: number): KlienDetail | undefined {
  return mockKlienDetail[id];
}
