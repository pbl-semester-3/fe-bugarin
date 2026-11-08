import { api } from "@/services/api";
import type {
  KlienDetail,
  KlienListItem,
  MealItem,
  ScheduleConflict,
  WeeklyPlan,
} from "@/types/pt";

// GET /pt/klien
export async function getKlienList() {
  const res = await api.get<{ data: KlienListItem[] }>("/pt/klien");
  return res.data.data;
}

// GET /pt/klien/:id
export async function getKlienDetail(id: number) {
  const res = await api.get<{ data: KlienDetail }>(`/pt/klien/${id}`);
  return res.data.data;
}

// GET /pt/klien/:id/weekly-plan
export async function getWeeklyPlan(id: number) {
  const res = await api.get<{ data: WeeklyPlan | null }>(
    `/pt/klien/${id}/weekly-plan`
  );
  return res.data.data;
}

// PUT /pt/weekly-plan/:id/approve (hanya saat status pending_review)
export async function approveWeeklyPlan(planId: number) {
  await api.put(`/pt/weekly-plan/${planId}/approve`);
}

export type OverrideWorkoutItem = { hari: string; jam: string; jenis: string };
export type OverridePlanInput = {
  workoutPlan: OverrideWorkoutItem[];
  mealPlan: MealItem[];
};

// PUT /pt/weekly-plan/:id/override — TANPA `lokasi` (backend inject dari tempat_gym)
export async function overrideWeeklyPlan(
  planId: number,
  payload: OverridePlanInput
) {
  await api.put(`/pt/weekly-plan/${planId}/override`, payload);
}

// POST /pt/weekly-plan/:id/check-conflicts — cek bentrok sebelum menyimpan.
export async function checkWeeklyPlanConflicts(
  planId: number,
  workoutPlan: OverrideWorkoutItem[]
) {
  const res = await api.post<{ data: { conflicts: ScheduleConflict[] } }>(
    `/pt/weekly-plan/${planId}/check-conflicts`,
    { workoutPlan }
  );
  return res.data.data.conflicts;
}
