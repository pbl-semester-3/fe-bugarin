// Tipe data halaman Admin (design/admin/*.md). Selama slicing, nilai berasal
// dari lib/mock/admin.ts — struktur dibuat mendekati kontrak API nantinya.

// ===== Dashboard (design/admin/dashboard-admin.md) =====
export type AdminActivityPoint = {
  month: string;
  sessions: number;
  newClients: number | null;
  active?: boolean;
};

export type AdminSpecializationSlice = {
  label: string;
  count: number;
};

export type AdminDashboardData = {
  welcome: { totalActiveTrainers: number };
  stats: { totalActiveClients: number; totalActivePersonalTrainers: number };
  activityTrend: AdminActivityPoint[];
  specialization: AdminSpecializationSlice[];
};

// ===== Kelola Pengguna (design/admin/kelola-pengguna.md) =====
export type ClientStatus = "AKTIF" | "ONBOARDING";
export type ClientProgram = "Naik Berat Badan" | "Turun Berat Badan";

export type ClientRow = {
  id: number;
  name: string;
  email: string;
  photoUrl: string | null;
  trainer: string | null;
  program: ClientProgram;
  progress: number;
  status: ClientStatus;
};

export type TrainerRow = {
  id: number;
  name: string;
  trainerId: string;
  hub: string;
  specialization: "Naik BB" | "Turun BB";
  email: string;
  createdAt: string;
  status: "AKTIF";
  branch: string;
};

export type AdminUsersStats = {
  totalActiveClients: number;
  clientsConnectedToPT: number;
  activeTrainers: number;
};

export type AdminUsersData = {
  stats: AdminUsersStats;
  clients: ClientRow[];
  trainers: TrainerRow[];
};

export type TrainerForm = {
  fullName: string;
  email: string;
  whatsapp: string;
  branch: string;
  gender: "Laki-laki" | "Perempuan";
  specialization: string;
};

export type TrainerEditForm = {
  fullName: string;
  whatsapp: string;
  email: string;
  branch: string;
  suspended: boolean;
};

// ===== Riwayat (design/admin/riwayat.md) =====
export type FeedbackCategory =
  | "EVALUASI_MINGGUAN"
  | "EVALUASI_BULANAN"
  | "KOREKSI_TEKNIK"
  | "PROGRESS_NUTRISI"
  | "MOTIVASI_KEPATUHAN"
  | "PEMULIHAN_CEDERA";

export type FeedbackLog = {
  id: string;
  time: string;
  trainer: { name: string; title: string; level: string };
  client: { name: string; cohort: string };
  category: FeedbackCategory;
  note: string;
};

export type AuditAction = "CREATE" | "UPDATE" | "DELETE";
export type AuditStatus = "BERHASIL" | "GAGAL";

export type AuditLog = {
  id: number;
  time: string;
  date: string;
  actor: string;
  action: AuditAction;
  target: string;
  module: string;
  status: AuditStatus;
};

export type AdminRiwayatData = {
  activeTrainers: number;
  feedbackLogs: FeedbackLog[];
  auditLogs: AuditLog[];
};

// ===== Profil (design/admin/profil.md) =====
export type AdminProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  photoUrl: string | null;
  role: "ADMIN";
  lastUpdatedAt: string;
};

export function adminProfileName(profile: AdminProfile | null | undefined) {
  if (!profile) return "Admin";
  return `${profile.firstName} ${profile.lastName}`.trim() || "Admin";
}
