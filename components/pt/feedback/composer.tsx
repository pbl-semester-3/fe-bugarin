"use client";

import { useState } from "react";
import { Bold, Code, Italic, List, ListOrdered, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSaveDraft, useSendFeedback } from "@/hooks/useFeedback";
import type { Klien } from "@/lib/mock/klien";

// Toolbar format visual (design/FEEDBACK.md §4.2).
// TODO: tombol belum berfungsi (tanpa library rich-text) — sambungkan saat butuh.
const tools = [
  { icon: Bold, label: "Tebal" },
  { icon: Italic, label: "Miring" },
  { icon: List, label: "Daftar butir" },
  { icon: ListOrdered, label: "Daftar bernomor" },
  { icon: Code, label: "Kode" },
  { icon: Smile, label: "Emoji" },
];

// Rich Feedback Composer (design/FEEDBACK.md §4.2).
export function Composer({ klien }: { klien: Klien }) {
  const [message, setMessage] = useState("");
  const send = useSendFeedback();
  const draft = useSaveDraft();
  const canSend = message.trim().length > 0;

  function kirim() {
    if (!canSend) return;
    send.mutate(
      { klienId: klien.id, message: message.trim() },
      { onSuccess: () => setMessage("") }
    );
  }

  return (
    <section className="rounded-panel bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold text-ink">
        Pengiriman Protokol Bimbingan
      </h2>
      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        Susun arahan, koreksi teknik, dan penyesuaian nutrisi.
      </p>

      <p className="mt-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
        Tag Taksonomi Pengiriman
      </p>

      <div className="mt-2 rounded-card bg-surface-tint p-1.5">
        <div className="flex items-center gap-1 rounded-control bg-white px-2 py-1">
          {tools.map((tool, index) => (
            <span key={tool.label} className="flex items-center">
              {index === 4 && (
                <span className="mx-1 h-4 w-px bg-outline/50" />
              )}
              <button
                type="button"
                aria-label={tool.label}
                title={`${tool.label} (belum aktif)`}
                className="flex size-7 items-center justify-center rounded-[4px] text-ink-soft transition-colors hover:bg-surface-tint hover:text-ink"
              >
                <tool.icon className="size-4" />
              </button>
            </span>
          ))}
        </div>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis feedback untuk klien..."
          className="mt-1 min-h-[160px] bg-white"
        />
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          className="rounded-[10px] bg-surface-2 hover:bg-surface-3"
          disabled={!canSend || draft.isPending}
          onClick={() =>
            draft.mutate({ klienId: klien.id, message: message.trim() })
          }
        >
          Simpan Draf
        </Button>
        <Button
          variant="accent"
          className="rounded-[10px]"
          disabled={!canSend || send.isPending}
          onClick={kirim}
        >
          Kirim Feedback
        </Button>
      </div>
    </section>
  );
}
