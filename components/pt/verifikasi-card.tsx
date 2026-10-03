"use client";

import { Check, Clock, Mail } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRespondPairingRequest } from "@/hooks/usePairingRequests";
import {
  formatSubmitted,
  genderLabel,
  type PairingRequest,
} from "@/lib/mock/pt";
import { DeclineDialog } from "./decline-dialog";

// Kartu pengajuan (design/VERIFIKASI.md §4.2–4.5).
export function VerifikasiCard({ request }: { request: PairingRequest }) {
  const respond = useRespondPairingRequest();
  const { klien } = request;

  return (
    <article className="rounded-panel bg-white p-6 shadow-card">
      {/* Header: avatar + identitas (design/VERIFIKASI.md §4.3) */}
      <div className="flex items-start gap-4">
        <Avatar name={klien.nama} size={48} statusDot />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-ink">{klien.nama}</p>
            <Badge variant="count">
              Age {klien.usia} • {genderLabel(klien.gender)}
            </Badge>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Mail className="size-3.5" />
              {klien.email}
            </span>
            <span className="text-outline">•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              Submitted: {formatSubmitted(request.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Athletic Target — grid 4×1, hanya kolom pertama terisi (§4.4).
          3 kolom lain sengaja dibiarkan reserved sampai metrik tambahan dari Figma jelas. */}
      <div className="mt-4 grid grid-cols-4 gap-2 rounded-card bg-surface-tint p-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            {request.kategoriTarget}
          </p>
          <p className="mt-1 text-sm font-bold text-ink">
            {request.targetSummary}
          </p>
          <p className="text-xs text-muted-foreground">
            {request.periodization}
          </p>
        </div>
      </div>

      {/* Aksi (§4.5) */}
      <div className="mt-4 flex flex-wrap gap-3">
        <DeclineDialog request={request} />
        <Button
          variant="success"
          className="rounded-pill px-4"
          disabled={respond.isPending}
          onClick={() => respond.mutate({ id: request.id })}
        >
          <Check className="size-4" />
          Accept Trainee
        </Button>
      </div>
    </article>
  );
}
