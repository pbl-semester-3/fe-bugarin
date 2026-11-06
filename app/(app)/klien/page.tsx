"use client";

import { PageHeader } from "@/app/(app)/components/pt/page-header";
import { Badge } from "@/components/ui/badge";
import { KlienList } from "@/app/(app)/klien/components/klien-list";
import { useKlienList } from "@/hooks/useKlienList";

// Halaman Klien PT (design/KLIEN.md). Data lewat useKlienList (mock sampai backend siap).
export default function KlienPage() {
  const { data, isLoading } = useKlienList();
  const clients = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Klien Aktif"
        badge={
          <Badge variant="count">
            {isLoading ? "-" : clients.length} Terpantau
          </Badge>
        }
      />
      <KlienList clients={clients} isLoading={isLoading} />
    </div>
  );
}
