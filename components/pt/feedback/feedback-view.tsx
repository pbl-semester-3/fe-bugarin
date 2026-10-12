"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "cn";
import { Avatar } from "@/components/pt/avatar";
import { EmptyState } from "@/components/pt/empty-state";
import { useKlienList } from "@/hooks/useKlienList";
import { AthleteCard } from "./athlete-card";
import { Composer } from "./composer";

// Feedback Center: panel kiri daftar klien, kanan composer (design/FEEDBACK.md).
export function FeedbackView({
  initialKlienId,
}: {
  initialKlienId: number | null;
}) {
  const { data, isLoading } = useKlienList();
  const [selectedId, setSelectedId] = useState<number | null>(initialKlienId);

  const clients = data ?? [];
  const klien = clients.find((k) => k.id === selectedId) ?? null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        {isLoading ? (
          <p className="p-4 text-sm text-muted-foreground">Memuat klien...</p>
        ) : clients.length === 0 ? (
          <EmptyState
            icon={<MessageSquare />}
            title="Belum ada klien"
            description="Klien yang terhubung akan muncul di sini."
          />
        ) : (
          <div className="flex flex-col gap-1">
            {clients.map((k) => {
              const active = k.id === selectedId;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setSelectedId(k.id)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative w-full rounded-card bg-white p-4 text-left transition-shadow",
                    active ? "shadow-card" : "hover:shadow-card"
                  )}
                >
                  {active && (
                    <span className="absolute top-1/2 left-0 h-[56px] w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <div className="flex items-center gap-3">
                    <Avatar name={k.nama} size={48} />
                    <p className="min-w-0 flex-1 truncate text-lg font-semibold text-ink">
                      {k.nama}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="lg:col-span-8">
        {klien ? (
          <div className="space-y-6">
            <AthleteCard klien={klien} />
            <Composer klien={klien} />
          </div>
        ) : (
          <EmptyState
            icon={<MessageSquare />}
            title="Pilih klien"
            description="Pilih klien di sebelah kiri untuk mulai menulis feedback."
          />
        )}
      </div>
    </div>
  );
}
