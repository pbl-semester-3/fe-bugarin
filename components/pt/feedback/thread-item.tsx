"use client";

import { cn } from "cn";
import { Avatar } from "@/components/pt/avatar";
import type { FeedbackThread } from "@/lib/mock/feedback";
import type { Klien } from "@/lib/mock/klien";

interface ThreadItemProps {
  klien: Klien;
  thread: FeedbackThread;
  active: boolean;
  onSelect: (klienId: number) => void;
}

// Kartu percakapan (design/FEEDBACK.md §3.1): item terpilih punya strip hijau di kiri.
export function ThreadItem({
  klien,
  thread,
  active,
  onSelect,
}: ThreadItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(klien.id)}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative w-full rounded-card bg-white p-4 text-left transition-shadow",
        active ? "shadow-card" : "hover:shadow-card"
      )}
    >
      {active && (
        <span className="absolute top-1/2 left-0 h-[72px] w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}
      <div className="flex items-start gap-3">
        <Avatar name={klien.nama} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-lg font-semibold text-ink">
              {klien.nama}
            </p>
            <span className="shrink-0 text-[10px] font-bold tracking-wide text-muted-foreground uppercase">
              {thread.waktu}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft">
            {thread.preview}
          </p>
        </div>
      </div>
    </button>
  );
}
