import { PageHeader } from "@/components/pt/page-header";
import { VerifikasiList } from "@/components/pt/verifikasi-list";

// Halaman Verifikasi (design/VERIFIKASI.md). Data lewat VerifikasiList (client).
export default function VerifikasiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pending Intake & Onboarding Queue"
        description="Tinjau penilaian awal calon klien serta tujuan atletik yang menunggu persetujuan atau penolakan sebelum penyusunan jadwal periodisasi."
      />
      <VerifikasiList />
    </div>
  );
}
