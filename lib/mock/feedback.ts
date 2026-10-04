// Data dummy halaman Feedback (mode slicing UI, frontend-only).
// Meniru GET /pt/klien/:id/feedbacks (daftar percakapan) — acuan design/FEEDBACK.md §3.
// klienId sengaja memakai id dari lib/mock/klien (mockKlienList) supaya deep-link
// `?klien=<id>` dari halaman Klien konsisten.
// TODO: hapus file ini setelah hook tersambung ke backend asli.

export type FeedbackThread = {
  id: number;
  klienId: number;
  // Waktu relatif, mis. "14 mnt lalu" / "Kemarin".
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
    waktu: "14 mnt lalu",
    preview:
      "Menyelesaikan interval Rabu, RPE 9 saat deadlift, rasa lapar sedikit meningkat...",
    week: 8,
    totalWeeks: 12,
    macroTarget: "Defisit Tinggi",
    unread: true,
  },
  {
    id: 2,
    klienId: 101,
    waktu: "1 jam lalu",
    preview: "Angka incline bench naik progresif minggu ini.",
    week: 6,
    totalWeeks: 12,
    macroTarget: "Penambahan Massa Bertahap",
  },
  {
    id: 3,
    klienId: 103,
    waktu: "2 jam lalu",
    preview: "Fase catch terasa agak kurang pas saat clean.",
    week: 4,
    totalWeeks: 16,
    macroTarget: "Hipertrofi",
  },
  {
    id: 4,
    klienId: 104,
    waktu: "4 jam lalu",
    preview: "Nyeri lutut turun ke 2/10 setelah minggu deload.",
    week: 10,
    totalWeeks: 12,
    macroTarget: "Pemeliharaan",
  },
  {
    id: 5,
    klienId: 105,
    waktu: "Kemarin",
    preview: "Tes ulang rotasi toraks pasif: +8 derajat.",
    week: 5,
    totalWeeks: 12,
    macroTarget: "Penurunan Lemak",
  },
  {
    id: 6,
    klienId: 106,
    waktu: "2 hari lalu",
    preview: "Kedalaman squat membaik, bracing terasa lebih stabil.",
    week: 3,
    totalWeeks: 16,
    macroTarget: "Kekuatan",
  },
];

export function getFeedbackThread(klienId: number): FeedbackThread | undefined {
  return mockFeedbackThreads.find((thread) => thread.klienId === klienId);
}
