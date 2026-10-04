"use client";

import { useState } from "react";
import { Ban, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRespondPairingRequest } from "@/hooks/usePairingRequests";
import {
  DEFAULT_DECLINE_MESSAGE,
  REJECTION_CLASSIFICATIONS,
  type PairingRequest,
  type RejectionClassification,
} from "@/lib/mock/pt";

// Modal "Decline Intake Request" (design/VERIFIKASI.md §5).
export function DeclineDialog({ request }: { request: PairingRequest }) {
  const [open, setOpen] = useState(false);
  const [klasifikasi, setKlasifikasi] =
    useState<RejectionClassification | null>(null);
  const [pesan, setPesan] = useState(DEFAULT_DECLINE_MESSAGE);
  const respond = useRespondPairingRequest();

  const bisaKirim = !!klasifikasi && pesan.trim().length > 0;

  function kirim() {
    if (!bisaKirim) return;
    respond.mutate({
      id: request.id,
      klasifikasi: klasifikasi ?? undefined,
      alasanPenolakan: pesan.trim(),
    });
    setKlasifikasi(null);
    setPesan(DEFAULT_DECLINE_MESSAGE);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="decline" className="rounded-pill px-4">
          <X className="size-4" />
          Tolak
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="top-16 max-w-[576px] translate-y-0 gap-0 overflow-hidden rounded-panel border-0 p-0 sm:top-[256px] sm:max-w-[576px]"
      >
        {/* Header — tint surface-tint (design/VERIFIKASI.md §5.3) */}
        <div className="flex items-center justify-between gap-4 bg-surface-tint px-6 py-4">
          <DialogTitle className="text-lg font-bold text-ink">
            Tolak Permintaan Intake — {request.klien.nama}
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Tutup"
              className="text-muted-foreground transition-colors hover:text-ink"
            >
              <X className="size-5" />
            </button>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">
          Isi klasifikasi dan pesan penolakan sebelum mengirim.
        </DialogDescription>

        {/* Body (design/VERIFIKASI.md §5.4) */}
        <div className="space-y-4 px-6 py-6">
          <div className="flex items-center justify-between gap-3 rounded-control bg-surface-tint px-4 py-3">
            <span className="inline-flex items-center gap-2 text-sm text-ink">
              <Info className="size-4 shrink-0 text-muted-foreground" />
              Program Terpilih: ({request.selectedProgram})
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              Pemberitahuan Standar
            </span>
          </div>

          <div className="space-y-2">
            <Label>
              Klasifikasi Penolakan
              <span className="text-danger-strong">*</span>
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {REJECTION_CLASSIFICATIONS.map((option) => {
                const active = option === klasifikasi;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setKlasifikasi(option)}
                    className={
                      active
                        ? "rounded-pill bg-brand px-3 py-1.5 text-xs font-medium text-on-secondary transition-colors"
                        : "rounded-pill bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-surface-3"
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label>
                Pesan Wajib
                <span className="text-danger-strong">*</span>
              </Label>
              <span className="text-xs text-muted-foreground">
                Akan dikirim ke email klien
              </span>
            </div>
            <Textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              rows={4}
              placeholder="Tuliskan pesan untuk klien..."
            />
          </div>
        </div>

        {/* Footer — tint surface-tint (design/VERIFIKASI.md §5.5) */}
        <div className="flex items-center justify-end gap-2 bg-surface-tint px-6 py-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            className="rounded-pill px-4"
            disabled={!bisaKirim || respond.isPending}
            onClick={kirim}
          >
            <Ban className="size-4" />
            Konfirmasi Penolakan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
