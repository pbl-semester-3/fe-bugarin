import { MapPin } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import type { JadwalLatihan } from "@/lib/types/pt";

// Baris jadwal latihan klien (dari GET /pt/dashboard-summary).
export function SessionRow({ jadwal }: { jadwal: JadwalLatihan }) {
  return (
    <div className="flex items-center gap-4 rounded-card bg-surface-tint p-4">
      <div className="flex h-12 w-20 shrink-0 flex-col items-center justify-center gap-0.5 rounded-control bg-surface-3 text-ink">
        <span className="text-[9px] font-semibold tracking-wide uppercase">
          {jadwal.hari}
        </span>
        <span className="text-sm font-bold">{jadwal.jam}</span>
      </div>

      <Avatar name={jadwal.namaKlien} size={40} />

      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-ink">{jadwal.namaKlien}</p>
        <p className="text-xs text-muted-foreground">{jadwal.jenis}</p>
      </div>

      <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="size-3.5" />
        {jadwal.lokasi}
      </span>
    </div>
  );
}
