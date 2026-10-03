// Data dummy halaman Feedback (mode slicing UI, frontend-only).
// Meniru GET /pt/klien/:id/feedbacks (daftar percakapan) — acuan design/FEEDBACK.md §3.
// klienId sengaja memakai id dari lib/mock/klien (mockKlienList) supaya deep-link
// `?klien=<id>` dari halaman Klien konsisten.
// TODO: hapus file ini setelah hook tersambung ke backend asli.

export type FeedbackThread = {
  id: number;
  klienId: number;
  // Waktu relatif, mis. "14m ago" / "Yesterday".
  waktu: string;
  // Cuplikan pesan terakhir (maks 2 baris di UI).
  preview: string;
  // Metadata atlet untuk kartu profil di panel kanan (§4.1).
  week: number;
  totalWeeks: number;
  macroTarget: string;
  unread?: boolean;
};

export const mockFeedbackThreads: FeedbackThread[] = [
  {
    id: 1,
    klienId: 102,
    waktu: "14m ago",
    preview:
      "Completed Wednesday intervals, RPE 9 on deadlifts, hunger spiked slightly...",
    week: 8,
    totalWeeks: 12,
    macroTarget: "Hyper-Deficit",
    unread: true,
  },
  {
    id: 2,
    klienId: 101,
    waktu: "1h ago",
    preview: "Incline bench numbers hit progressive overload this week.",
    week: 6,
    totalWeeks: 12,
    macroTarget: "Lean Bulk",
  },
  {
    id: 3,
    klienId: 103,
    waktu: "2h ago",
    preview: "Noticed catch phase feels slightly off on cleans.",
    week: 4,
    totalWeeks: 16,
    macroTarget: "Hypertrophy",
  },
  {
    id: 4,
    klienId: 104,
    waktu: "4h ago",
    preview: "Knee soreness down to 2/10 after deload week.",
    week: 10,
    totalWeeks: 12,
    macroTarget: "Maintenance",
  },
  {
    id: 5,
    klienId: 105,
    waktu: "Yesterday",
    preview: "Re-tested passive thoracic rotation: +8 degrees.",
    week: 5,
    totalWeeks: 12,
    macroTarget: "Fat Loss",
  },
  {
    id: 6,
    klienId: 106,
    waktu: "2d ago",
    preview: "Squat depth improving, bracing feels more stable.",
    week: 3,
    totalWeeks: 16,
    macroTarget: "Strength",
  },
];

export function getFeedbackThread(klienId: number): FeedbackThread | undefined {
  return mockFeedbackThreads.find((thread) => thread.klienId === klienId);
}
