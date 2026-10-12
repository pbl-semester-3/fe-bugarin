"use client";

import { useState } from "react";
import { Ban, X } from "lucide-react";
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
import type { PairingRequest } from "@/lib/types/pt";

// Modal tolak pengajuan. Backend: kirim `alasanPenolakan` -> ditolak.
export function DeclineDialog({ request }: { request: PairingRequest }) {
  const [open, setOpen] = useState(false);
  const [alasan, setAlasan] = useState("");
  const respond = useRespondPairingRequest();

  const bisaKirim = alasan.trim().length > 0;

  function kirim() {
    if (!bisaKirim) return;
    respond.mutate({ id: request.id, alasanPenolakan: alasan.trim() });
    setAlasan("");
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

      <DialogContent className="rounded-panel sm:max-w-[520px]">
        <DialogTitle className="text-lg font-bold text-ink">
          Tolak Permintaan — {request.klien.nama}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Isi alasan penolakan sebelum mengirim.
        </DialogDescription>

        <div className="space-y-2">
          <Label>
            Alasan Penolakan
            <span className="text-danger-strong"> *</span>
          </Label>
          <Textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            rows={4}
            placeholder="Tuliskan alasan penolakan untuk klien..."
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Batal
            </Button>
          </DialogClose>
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
