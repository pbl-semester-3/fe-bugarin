"use client";

import { useMemo } from "react";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/pt/empty-state";
import { useFeedbackThreads } from "@/hooks/useFeedback";
import { getKlienById } from "@/lib/mock/klien";
import { ThreadItem } from "./thread-item";

interface ThreadListProps {
  selectedKlienId: number | null;
  onSelect: (klienId: number) => void;
}

// Panel kiri: roster feed percakapan klien (design/FEEDBACK.md §3).
export function ThreadList({ selectedKlienId, onSelect }: ThreadListProps) {
  const { data, isLoading } = useFeedbackThreads();
  const threads = useMemo(() => data ?? [], [data]);

  if (isLoading) {
    return (
      <p className="p-4 text-sm text-muted-foreground">Memuat percakapan...</p>
    );
  }

  if (threads.length === 0) {
    return (
      <EmptyState
        icon={<MessageSquare />}
        title="Belum ada percakapan"
        description="Percakapan dengan klien akan muncul di sini."
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {threads.map((thread) => {
        const klien = getKlienById(thread.klienId);
        if (!klien) return null;
        return (
          <ThreadItem
            key={thread.id}
            klien={klien}
            thread={thread}
            active={klien.id === selectedKlienId}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
