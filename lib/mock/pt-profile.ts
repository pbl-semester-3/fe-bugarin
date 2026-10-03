// Data dummy profil PT (mode slicing UI, frontend-only).
// Meniru GET /pt/profile -> { data: ... } — acuan design/PROFIL.md.
// TODO: hapus file ini setelah hook tersambung ke backend asli.

export type PtGender = "pria" | "wanita";
export type PtTheme = "siang" | "malam";

export type PtProfile = {
  nama: string;
  email: string;
  // Handle publik, ditampilkan sebagai "@username".
  username: string;
  gender: PtGender;
  usia: number;
  // Lokasi gym tempat PT mengajar — WAJIB, dipakai AI untuk menyusun jadwal.
  tempatGym: string;
  spesialisasi: string[];
  bio: string;
  tema: PtTheme;
  // Ditampilkan di baris "Last key rotation executed X days ago".
  lastPasswordRotationDays: number;
};

// Opsi spesialisasi untuk multi-select.
export const SPECIALIZATION_OPTIONS = [
  "Weight Loss",
  "Weight Gain / Bulking",
  "Hypertrophy",
  "Endurance",
  "Mobility",
] as const;

export const BIO_MAX_LENGTH = 600;

// Email/handle disesuaikan ke brand Bugarin (design asli memakai apexpulse/cyberpulse).
export const mockPtProfile: PtProfile = {
  nama: "Alex Vance",
  email: "alex.vance@bugarin.com",
  username: "coach_alex",
  gender: "pria",
  usia: 33,
  tempatGym: "Fithub Orlando",
  spesialisasi: ["Weight Loss", "Weight Gain / Bulking"],
  bio: "Saya percaya progres terbaik lahir dari kebiasaan kecil yang konsisten. Fokus coaching: teknik angkat yang aman, periodisasi bertahap, dan nutrisi yang realistis untuk gaya hidup klien.",
  tema: "siang",
  lastPasswordRotationDays: 74,
};
