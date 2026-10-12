"use client";

import { Check, Clock } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRespondPairingRequest } from "@/hooks/usePairingRequests";
import { tujuanLabel, type PairingRequest } from "@/lib/types/pt";
import { DeclineDialog } from "./decline-dialog";

// Kartu pengajuan (disederhanakan: backend hanya { id, nama, tujuan }).
export function VerifikasiCard({ request }: { request: PairingRequest }) {
  const respond = useRespondPairingRequest();

  return (
    <article className="rounded-panel bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <Avatar name={request.klien.nama} size={48} statusDot />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-ink">{request.klien.nama}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              Diajukan:{" "}
              {new Date(request.createdAt).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>
        <Badge
          variant={
            request.klien.tujuan === "turun_bb"
              ? "weight-loss"
              : request.klien.tujuan === "naik_bb"
                ? "hypertrophy"
                : "queued"
          }
        >
          {tujuanLabel(request.klien.tujuan)}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <DeclineDialog request={request} />
        <Button
          variant="success"
          className="rounded-pill px-4"
          disabled={respond.isPending}
          onClick={() => respond.mutate({ id: request.id })}
        >
          <Check className="size-4" />
          Terima Klien
        </Button>
      </div>
    </article>
  );
}
