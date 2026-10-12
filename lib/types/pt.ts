// Tipe data selaras dengan respons backend PT (bugarin-backend, dev e60e302).
// Acuan: backend/src/modules/pt/*.ts

export type Tujuan = "turun_bb" | "naik_bb";
export type JenisKelamin = "pria" | "wanita";
export type Tema = "siang" | "malam";

export function tujuanLabel(tujuan: Tujuan | null | undefined): string {
  if (tujuan === "turun_bb") return "Turun BB";
  if (tujuan === "naik_bb") return "Naik BB";
  return "-";
}

export function genderLabel(gender: JenisKelamin | null | undefined): string {
  if (gender === "wanita") return "Perempuan";
  if (gender === "pria") return "Laki-laki";
  return "-";
}

// GET /pt/profile
export type PtProfile = {
  user: {
    id: number;
    email: string;
    username: string;
    tema: Tema;
  };
  profile: {
    nama: string;
    usia: number | null;
    jenisKelamin: JenisKelamin | null;
    spesialisasi: Tujuan | null;
    tempatGym: string | null;
  };
};

// GET /pt/dashboard-summary
export type JadwalLatihan = {
  klienId: number;
  namaKlien: string;
  hari: string;
  jam: string;
  jenis: string;
  lokasi: string;
};

export type DashboardSummary = {
  jumlahKlienAktif: number;
  jadwalLatihan: JadwalLatihan[];
};

// GET /pt/pairing-requests
export type PairingRequest = {
  id: number;
  createdAt: string;
  klien: {
    id: number;
    nama: string;
    tujuan: Tujuan | null;
  };
};

// GET /pt/klien
export type KlienListItem = {
  id: number;
  nama: string;
  tujuan: Tujuan | null;
  durasiHari: number | null;
};

// GET /pt/klien/:id
export type GrafikBbPoint = { tanggal: string; beratKg: number };

export type KlienDetail = {
  profil: {
    id: number;
    nama: string;
    usia: number | null;
    jenisKelamin: JenisKelamin | null;
    tinggiBadanCm: number | null;
    bbAwalKg: number | null;
    bbTujuanKg: number | null;
    tujuan: Tujuan | null;
    durasiHari: number | null;
  };
  grafikBb: GrafikBbPoint[];
};

// GET /pt/klien/:id/weekly-plan
export type WorkoutItem = {
  hari: string;
  jam: string;
  jenis: string;
  lokasi?: string;
};
export type MealItem = { waktu: string; menu: string; estimasiKalori: number };
export type PlanStatus = "pending_review" | "disetujui" | "override";

export type WeeklyPlan = {
  id: number;
  mingguMulai: string;
  status: PlanStatus;
  workoutPlan: WorkoutItem[];
  mealPlan: MealItem[];
};

// GET /pt/riwayat
export type RiwayatRow = {
  id: number;
  nama: string;
  usia: number | null;
  jenisKelamin: JenisKelamin | null;
  bbAwalKg: number | null;
  bbSekarangKg: number | null;
  tujuan: Tujuan | null;
  durasiHari: number | null;
};

export function netDelta(row: RiwayatRow): number | null {
  if (row.bbAwalKg === null || row.bbSekarangKg === null) return null;
  return Number((row.bbSekarangKg - row.bbAwalKg).toFixed(1));
}

export function planStatusLabel(status: PlanStatus): string {
  if (status === "pending_review") return "Menunggu Review";
  if (status === "disetujui") return "Disetujui";
  return "Override";
}
