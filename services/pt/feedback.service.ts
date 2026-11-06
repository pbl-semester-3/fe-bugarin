import { api } from "@/services/api";

export type SendFeedbackInput = {
  klienId: number;
  pesan: string;
};

// POST /pt/klien/:id/feedbacks -> body `{ pesan }`
export async function sendFeedback({ klienId, pesan }: SendFeedbackInput) {
  await api.post(`/pt/klien/${klienId}/feedbacks`, { pesan });
}
