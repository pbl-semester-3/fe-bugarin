import { useMutation } from "@tanstack/react-query";
import { sendFeedback } from "@/services/pt/feedback.service";

// POST /pt/klien/:id/feedbacks — body `{ pesan }`
export function useSendFeedback() {
  return useMutation({
    mutationFn: sendFeedback,
  });
}

export type { SendFeedbackInput } from "@/services/pt/feedback.service";
