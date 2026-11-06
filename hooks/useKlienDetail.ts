import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  approveWeeklyPlan,
  getKlienDetail,
  getWeeklyPlan,
  overrideWeeklyPlan,
} from "@/services/pt/klien.service";

// GET /pt/klien/:id + GET /pt/klien/:id/weekly-plan
export function useKlienDetail(id: number) {
  const enabled = Number.isFinite(id) && id > 0;

  const detail = useQuery({
    queryKey: queryKeys.pt.klienDetail(id),
    queryFn: () => getKlienDetail(id),
    enabled,
  });

  const plan = useQuery({
    queryKey: queryKeys.pt.weeklyPlan(id),
    queryFn: () => getWeeklyPlan(id),
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
    mutationFn: approveWeeklyPlan,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.weeklyPlan(klienId) });
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard });
    },
  });
}

// PUT /pt/weekly-plan/:id/override — TANPA `lokasi` (backend inject dari tempat_gym)
export function useOverrideWeeklyPlan(klienId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      planId,
      payload,
    }: {
      planId: number;
      payload: import("@/services/pt/klien.service").OverridePlanInput;
    }) => overrideWeeklyPlan(planId, payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: queryKeys.pt.weeklyPlan(klienId) }),
  });
}

export type {
  OverridePlanInput,
  OverrideWorkoutItem,
} from "@/services/pt/klien.service";
