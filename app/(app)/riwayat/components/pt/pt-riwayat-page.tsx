"use client";

import { PageHeader } from "@/app/(app)/components/pt/page-header";
import { RiwayatView } from "@/app/(app)/riwayat/components/pt/riwayat-view";
import { Badge } from "@/components/ui/badge";
import { useRiwayat } from "@/hooks/useRiwayat";

// Halaman Riwayat PT (design/RIWAYAT.md). Data lewat useRiwayat (mock sampai backend siap).
export function PtRiwayatPage() {
  const { data, isLoading } = useRiwayat();
  const rows = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Progres & Biometrik Klien"
        badge={
          <Badge variant="count">
            {isLoading ? "-" : rows.length} Terpantau
          </Badge>
        }
      />
      <RiwayatView rows={rows} isLoading={isLoading} />
    </div>
  );
}
