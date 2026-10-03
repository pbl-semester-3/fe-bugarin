"use client";

import { PageHeader } from "@/components/pt/page-header";
import { RiwayatView } from "@/components/pt/riwayat/riwayat-view";
import { Badge } from "@/components/ui/badge";
import { useRiwayat } from "@/hooks/useRiwayat";

// Halaman Riwayat PT (design/RIWAYAT.md). Data lewat useRiwayat (mock sampai backend siap).
export default function RiwayatPage() {
  const { data, isLoading } = useRiwayat();
  const rows = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Client Progress & Biometrics"
        badge={
          <Badge variant="count">
            {isLoading ? "-" : rows.length} Tracked
          </Badge>
        }
      />
      <RiwayatView rows={rows} isLoading={isLoading} />
    </div>
  );
}
