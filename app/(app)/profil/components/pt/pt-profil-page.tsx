import { PageHeader } from "@/app/(app)/components/pt/page-header";
import { ProfilView } from "@/app/(app)/profil/components/pt/profil-view";

// Halaman Profil PT (design/PROFIL.md). Data lewat usePtProfile (mock sampai backend siap).
export function PtProfilPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengaturan Profil Pelatih"
        description="Kelola profil bimbingan publik, kredensial, dan parameter autentikasi terenkripsi."
      />
      <ProfilView />
    </div>
  );
}
