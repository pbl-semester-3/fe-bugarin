"use client";

import { useState } from "react";
import { Bold, Code, Italic, List, ListOrdered, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSendFeedback } from "@/hooks/useFeedback";
import { apiErrorMessage, getFieldErrors } from "@/lib/api";
import type { KlienListItem } from "@/lib/types/pt";

// Toolbar format visual (design/FEEDBACK.md §4.2). Editor rich-text menyusul.
const tools = [
  { icon: Bold, label: "Tebal" },
  { icon: Italic, label: "Miring" },
  { icon: List, label: "Daftar butir" },
  { icon: ListOrdered, label: "Daftar bernomor" },
  { icon: Code, label: "Kode" },
  { icon: Smile, label: "Emoji" },
];

// Pengiriman Protokol Bimbingan: POST /pt/klien/:id/feedbacks { pesan }.
export function Composer({ klien }: { klien: KlienListItem }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  // TODO(ui): ganti dengan error per-field bawaan FormMessage bila form ini
  // dimigrasikan ke react-hook-form. Untuk sekarang ditampilkan dekat textarea.
  const [pesanError, setPesanError] = useState<string | null>(null);
  const send = useSendFeedback();
  const canSend = message.trim().length >= 5;

  function kirim() {
    if (!canSend) return;
    setError(null);
    setPesanError(null);
    send.mutate(
      { klienId: klien.id, pesan: message.trim() },
      {
        onSuccess: () => setMessage(""),
        onError: (e) => {
          const fields = getFieldErrors(e);
          setPesanError(fields?.pesan?.[0] ?? null);
          if (!fields) setError(apiErrorMessage(e));
        },
      }
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

      <div className="mt-4 rounded-card bg-surface-tint p-1.5">
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
          placeholder="Tulis feedback untuk klien... (min. 5 karakter)"
          className="mt-1 min-h-[160px] bg-white"
        />
      </div>

      {pesanError && (
        <p className="mt-2 text-sm text-danger-strong">{pesanError}</p>
      )}
      {error && <p className="mt-2 text-sm text-danger-strong">{error}</p>}

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          className="rounded-[10px] bg-surface-2 hover:bg-surface-3"
          disabled={!message}
          onClick={() => setMessage("")}
        >
          Batalkan
        </Button>
        <Button
          variant="accent"
          className="rounded-[10px]"
          disabled={!canSend || send.isPending}
          onClick={kirim}
        >
          {send.isPending ? "Mengirim..." : "Kirim Feedback"}
        </Button>
      </div>
    </section>
  );
}
