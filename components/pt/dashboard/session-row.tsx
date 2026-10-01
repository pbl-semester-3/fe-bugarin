import { Check, MoreVertical } from "lucide-react";
import { cn } from "cn";
import { Avatar } from "@/components/pt/avatar";
import { Badge } from "@/components/ui/badge";
import { tujuanLabel, type TrainingSession } from "@/lib/mock/pt";

// Baris sesi desain PT (design/DASHBOARD.md §4.4).
export function SessionRow({ session }: { session: TrainingSession }) {
  const isDone = session.status === "done";
  const isNextUp = session.slotLabel === "NEXT UP";

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-card bg-surface-tint p-4",
        isDone && "opacity-60"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-control",
          isNextUp ? "bg-brand text-on-secondary" : "bg-surface-3 text-ink"
        )}
      >
        {isDone ? (
          <Check className="size-4 text-success" />
        ) : (
          <>
            <span className="text-[9px] font-semibold tracking-wide uppercase">
              {session.slotLabel}
            </span>
            <span className="text-sm font-bold">{session.jam}</span>
          </>
        )}
      </div>

      <Avatar name={session.klienNama} size={40} />

      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-ink">{session.klienNama}</p>
        <p className="text-xs text-muted-foreground">{session.durasi}</p>
        <p className="text-xs text-muted-foreground">{tujuanLabel(session.tujuan)}</p>
        <p className="text-xs text-muted-foreground">{session.lokasi}</p>
      </div>

      <Badge variant={isDone ? "done" : "queued"}>
        {isDone ? "Done" : "Queued"}
      </Badge>

      {!isDone && (
        <button
          type="button"
          aria-label="Menu sesi"
          className="shrink-0 text-muted-foreground transition-colors hover:text-ink"
        >
          <MoreVertical className="size-4" />
        </button>
      )}
    </div>
  );
}
