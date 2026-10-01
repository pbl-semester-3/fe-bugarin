"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRespondPairingRequest } from "@/hooks/usePairingRequests";

export function TolakDialog({ requestId }: { requestId: number }) {
  const [open, setOpen] = useState(false);
  const [alasan, setAlasan] = useState("");
  const respond = useRespondPairingRequest();

  function kirim() {
    respond.mutate({ id: requestId, alasanPenolakan: alasan.trim() });
    setAlasan("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Tolak
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alasan Penolakan</DialogTitle>
          <DialogDescription>
            Alasan wajib diisi sebelum mengirim.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          placeholder="Tuliskan alasan penolakan..."
        />
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={!alasan.trim() || respond.isPending}
            onClick={kirim}
          >
            Kirim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
