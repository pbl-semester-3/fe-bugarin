// Data dummy khusus PT untuk mode slicing UI (frontend-only).
// Bentuk data sengaja meniru response backend `{ data: ... }` supaya saat
// integrasi asli cukup ubah queryFn di hook tanpa menyentuh komponen halaman.
//
// TODO: hapus folder lib/mock/ setelah seluruh hook tersambung ke backend asli.

export type Tujuan = "turun_bb" | "naik_bb";

export type PairingRequest = {
  id: number;
  createdAt: string;
  klien: {
    id: number;
    nama: string;
    tujuan: Tujuan | null;
  };
};

export type JadwalLatihan = {
  klienNama: string;
  hari: string;
  jam: string;
  jenis: string;
  lokasi: string;
};

export type DashboardSummary = {
  jumlahKlien: number;
  jadwalMingguIni: JadwalLatihan[];
};

// Meniru GET /pt/pairing-requests -> { data: [...] }
export const mockPairingRequests: PairingRequest[] = [
  {
    id: 1,
    createdAt: "2026-09-28T08:30:00.000Z",
    klien: { id: 101, nama: "Andi Saputra", tujuan: "turun_bb" },
  },
  {
    id: 2,
    createdAt: "2026-09-29T10:15:00.000Z",
    klien: { id: 102, nama: "Bella Kartika", tujuan: "naik_bb" },
  },
  {
    id: 3,
    createdAt: "2026-09-30T03:45:00.000Z",
    klien: { id: 103, nama: "Candra Wijaya", tujuan: "turun_bb" },
  },
];

// Meniru GET /pt/dashboard-summary -> { data: {...} }
// (endpoint backend belum ada; ini dummy tampilan)
export const mockDashboardSummary: DashboardSummary = {
  jumlahKlien: 8,
  jadwalMingguIni: [
    {
      klienNama: "Andi Saputra",
      hari: "Senin",
      jam: "07:00",
      jenis: "Upper Body",
      lokasi: "Gym Merdeka",
    },
    {
      klienNama: "Bella Kartika",
      hari: "Selasa",
      jam: "18:30",
      jenis: "Kardio",
      lokasi: "Gym Merdeka",
    },
    {
      klienNama: "Candra Wijaya",
      hari: "Kamis",
      jam: "06:30",
      jenis: "HIIT",
      lokasi: "Gym Sudirman",
    },
  ],
};

export function tujuanLabel(tujuan: Tujuan | null): string {
  if (tujuan === "turun_bb") return "Turun BB";
  if (tujuan === "naik_bb") return "Naik BB";
  return "-";
}
