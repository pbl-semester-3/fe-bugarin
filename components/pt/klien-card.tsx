import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { Badge } from "@/components/ui/badge";
import type { Klien } from "@/lib/mock/klien";

// Kartu klien (design/KLIEN.md §4.1).
export function KlienCard({ klien }: { klien: Klien }) {
  return (
    <article className="flex flex-col rounded-panel bg-white p-6 shadow-card">
      {/* Card top bar: identitas + aksi cepat (§4.1 no.1) */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={klien.nama} size={56} shape="square" />
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold text-ink">
              {klien.nama}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {klien.email}
            </p>
          </div>
        </div>
        {/* Ikon komen → Feedback untuk klien ini (tanpa menu kebab). */}
        <Link
          href={`/pt/feedback?klien=${klien.id}`}
          aria-label={`Kirim feedback ke ${klien.nama}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-pill text-ink-soft transition-colors hover:bg-surface-tint hover:text-ink"
        >
          <MessageCircle className="size-4" />
        </Link>
      </div>

      {/* Protocol badge: tanggal mulai (§4.1 no.2) */}
      <div className="mt-4">
        <Badge variant="started">
          <CalendarDays className="size-3" />
          {klien.mulaiProgram}
        </Badge>
      </div>

      {/* Telemetry & Compliance Gauge Box: session slot (§4.1 no.3) */}
      <div className="mt-4 rounded-card bg-surface-tint/70 p-4">
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          Session Slot
        </p>
        <div className="mt-1 flex items-center gap-1">
          <Clock className="size-3.5 text-success" />
          <span className="text-sm font-bold text-ink">
            {klien.sessionSlot}
          </span>
        </div>
      </div>

      {/* Card footer action (§4.1 no.4) */}
      <Link
        href={`/pt/klien/${klien.id}`}
        className="mt-4 flex items-center justify-center gap-1 rounded-card bg-brand py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand/90"
      >
        View Full Profile &amp; Program
        <ArrowRight className="size-3.5" />
      </Link>
    </article>
  );
}
