import { PageHeader } from "@/components/pt/page-header";
import { ProfilView } from "@/components/pt/profil/profil-view";

// Halaman Profil PT (design/PROFIL.md). Data lewat usePtProfile (mock sampai backend siap).
export default function ProfilPage() {
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
