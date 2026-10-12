import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type SendFeedbackInput = {
  klienId: number;
  pesan: string;
};

// POST /pt/klien/:id/feedbacks — body `{ pesan }`
export function useSendFeedback() {
  return useMutation({
    mutationFn: ({ klienId, pesan }: SendFeedbackInput) =>
      api.post(`/pt/klien/${klienId}/feedbacks`, { pesan }),
  });
}
