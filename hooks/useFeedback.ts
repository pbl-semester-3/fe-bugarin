import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockFeedbackThreads, type FeedbackThread } from "@/lib/mock/feedback";

// Sumber data sementara: dummy di lib/mock/feedback.
// TODO: ganti queryFn ke endpoint backend saat siap:
//   queryFn: () => api.get<{ data: FeedbackThread[] }>("/pt/feedbacks").then((r) => r.data.data)
export function useFeedbackThreads() {
  return useQuery({
    queryKey: queryKeys.pt.feedback,
    queryFn: () =>
      Promise.resolve(mockFeedbackThreads) as Promise<FeedbackThread[]>,
  });
}

export type FeedbackPayload = {
  klienId: number;
  message: string;
};

// TODO: ganti mutationFn ke backend saat siap:
//   api.post(`/pt/klien/${payload.klienId}/feedbacks`, { message: payload.message })
export function useSendFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: FeedbackPayload) =>
      Promise.resolve({ ...payload, status: "sent" as const }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.feedback });
    },
  });
}

// TODO: ganti mutationFn ke backend saat siap (endpoint draft belum pasti).
export function useSaveDraft() {
  return useMutation({
    mutationFn: (payload: FeedbackPayload) =>
      Promise.resolve({ ...payload, status: "draft" as const }),
  });
}
