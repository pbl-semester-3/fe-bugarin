import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { KlienDetail, MealItem, WeeklyPlan } from "@/lib/types/pt";

// GET /pt/klien/:id + GET /pt/klien/:id/weekly-plan
export function useKlienDetail(id: number) {
  const enabled = Number.isFinite(id) && id > 0;

  const detail = useQuery({
    queryKey: queryKeys.pt.klienDetail(id),
    queryFn: () =>
      api
        .get<{ data: KlienDetail }>(`/pt/klien/${id}`)
        .then((r) => r.data.data),
    enabled,
  });

  const plan = useQuery({
    queryKey: queryKeys.pt.weeklyPlan(id),
    queryFn: () =>
      api
        .get<{ data: WeeklyPlan | null }>(`/pt/klien/${id}/weekly-plan`)
        .then((r) => r.data.data),
    enabled,
  });

  return {
    data: detail.data ?? null,
    plan: plan.data ?? null,
    isLoading: detail.isLoading || plan.isLoading,
    error: detail.error ?? plan.error,
  };
}

// PUT /pt/weekly-plan/:id/approve (hanya saat status pending_review)
export function useApproveWeeklyPlan(klienId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (planId: number) => api.put(`/pt/weekly-plan/${planId}/approve`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.weeklyPlan(klienId) });
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard });
    },
  });
}

export type OverrideWorkoutItem = { hari: string; jam: string; jenis: string };
export type OverridePlanInput = {
  workoutPlan: OverrideWorkoutItem[];
  mealPlan: MealItem[];
};

// PUT /pt/weekly-plan/:id/override — TANPA `lokasi` (backend inject dari tempat_gym)
export function useOverrideWeeklyPlan(klienId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      planId,
      payload,
    }: {
      planId: number;
      payload: OverridePlanInput;
    }) => api.put(`/pt/weekly-plan/${planId}/override`, payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.pt.weeklyPlan(klienId) }),
  });
}
