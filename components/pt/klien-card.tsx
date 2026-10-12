import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { Badge } from "@/components/ui/badge";
import { tujuanLabel, type KlienListItem } from "@/lib/types/pt";

// Kartu klien (design/KLIEN.md §4.1, disederhanakan sesuai backend).
export function KlienCard({ klien }: { klien: KlienListItem }) {
  return (
    <article className="flex flex-col rounded-panel bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={klien.nama} size={56} shape="square" />
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold text-ink">
              {klien.nama}
            </p>
            {klien.durasiHari !== null && (
              <p className="truncate text-xs text-muted-foreground">
                {klien.durasiHari} Hari
              </p>
            )}
          </div>
        </div>
        <Link
          href={`/pt/feedback?klien=${klien.id}`}
          aria-label={`Kirim feedback ke ${klien.nama}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-pill text-ink-soft transition-colors hover:bg-surface-tint hover:text-ink"
        >
          <MessageCircle className="size-4" />
        </Link>
      </div>

      <div className="mt-4">
        <Badge
          variant={
            klien.tujuan === "turun_bb"
              ? "weight-loss"
              : klien.tujuan === "naik_bb"
                ? "hypertrophy"
                : "queued"
          }
        >
          {tujuanLabel(klien.tujuan)}
        </Badge>
      </div>

      <Link
        href={`/pt/klien/${klien.id}`}
        className="mt-4 flex items-center justify-center gap-1 rounded-card bg-brand py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand/90"
      >
        Lihat Profil &amp; Program Lengkap
        <ArrowRight className="size-3.5" />
      </Link>
    </article>
  );
}
