import { PageBanner } from "@/components/admin/page-banner";

// Banner Dashboard Admin (design/admin/dashboard-admin.md §3.2).
// Angka pelatih aktif di deskripsi dinamis dari data.
export function WelcomeBanner({
  totalActiveTrainers,
}: {
  totalActiveTrainers: number;
}) {
  return (
    <PageBanner
      title="Selamat Datang di Command Center Bugarin"
      description={`Semua microservices berjalan normal. Pantau akselerasi kebugaran atlet, sinkronisasi biomarker, dan kinerja ${totalActiveTrainers} pelatih resmi secara presisi.`}
      titleClassName="text-[28px]"
    />
  );
}
