"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FeedbackLog } from "@/lib/types/admin";

// Modal Detail Feedback (design/admin/riwayat.md §6).
export function FeedbackDetailDialog({
  log,
  onClose,
}: {
  log: FeedbackLog | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={log !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 overflow-hidden rounded-panel p-0"
      >
        <div className="flex items-center justify-between bg-admin-navy px-8 py-6">
          <DialogTitle className="text-xl font-semibold text-white">
            Detail Feedback
          </DialogTitle>
          <DialogClose
            aria-label="Tutup"
            className="text-white transition-opacity hover:opacity-70"
          >
            <X className="size-5" />
          </DialogClose>
        </div>

        {log && (
          <div className="space-y-5 bg-admin-surface p-7">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-admin-surface p-3 shadow-card">
                <p className="text-[11px] tracking-wide text-admin-secondary uppercase">
                  Coach / Personal Trainer
                </p>
                <p className="mt-1 text-[15px] font-semibold text-admin-heading">
                  {log.trainer.name}
                </p>
              </div>
              <div className="rounded-lg bg-admin-surface p-3 shadow-card">
                <p className="text-[11px] tracking-wide text-admin-secondary uppercase">
                  Klien
                </p>
                <p className="mt-1 text-[15px] font-semibold text-admin-heading">
                  {log.client.name}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest text-admin-secondary uppercase">
                Isi Pesan Evaluasi Lengkap
              </p>
              <div className="mt-2 rounded-card bg-admin-low p-5">
                <p className="text-base leading-relaxed text-admin-heading">
                  &ldquo;{log.note}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end bg-admin-footer px-7 py-4">
          <DialogClose className="rounded-control bg-admin-pill px-6 py-3 text-sm font-medium text-admin-heading shadow-card transition-opacity hover:opacity-90">
            Tutup Panel
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
