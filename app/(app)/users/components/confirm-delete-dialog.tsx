"use client";

import { Ban, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** "Konfirmasi Hapus PT" / "Konfirmasi Hapus Klien". */
  title: string;
  /** "Yakin Menghapus Akun PT?" / "Yakin Menghapus Akun Klien?". */
  question: string;
  onConfirm: () => void;
  isPending?: boolean;
}

// Modal konfirmasi hapus (design/admin/kelola-pengguna.md §7 & §7.1) —
// satu komponen untuk varian Hapus PT dan Hapus Klien.
export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  question,
  onConfirm,
  isPending = false,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-xl gap-0 overflow-hidden rounded-panel p-0"
      >
        <div className="flex items-center justify-between bg-surface-tint px-8 py-5">
          <DialogTitle className="text-xl font-semibold text-admin-heading">
            {title}
          </DialogTitle>
          <DialogClose
            aria-label="Tutup"
            className="text-ink-soft transition-opacity hover:opacity-70"
          >
            <X className="size-5" />
          </DialogClose>
        </div>

        <div className="px-8 py-6">
          <p className="text-xl font-semibold text-admin-heading">
            {question} <span className="text-admin-danger-dark">*</span>
          </p>
        </div>

        <div className="flex items-center justify-end gap-4 px-8 pb-6">
          <DialogClose
            type="button"
            className="text-base font-semibold text-ink-soft transition-opacity hover:opacity-70"
          >
            Batal
          </DialogClose>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex items-center gap-2 rounded-pill bg-danger-strong px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Ban className="size-4" />
            {isPending ? "Menghapus..." : "Konfirmasi Hapus"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
