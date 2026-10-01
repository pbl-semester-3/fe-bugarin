import { VerifikasiTable } from "@/components/pt/verifikasi-table";

// Contoh halaman penuh (blueprint pola slicing): lihat components/pt/verifikasi-table.tsx.
export default function VerifikasiPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Verifikasi Klien</h1>
        <p className="text-sm text-muted-foreground">
          Daftar permintaan pairing yang menunggu persetujuan.
        </p>
      </div>
      <VerifikasiTable />
    </div>
  );
}
