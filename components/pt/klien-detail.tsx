"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { EmptyState } from "@/components/pt/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useKlienDetail } from "@/hooks/useKlienDetail";
import { GOAL_LABELS, genderLabel } from "@/lib/mock/klien";

// Halaman "View Full Profile & Program" — profil klien + program hasil generate AI.
export function KlienDetail({ id }: { id: number }) {
  const { data: klien, isLoading } = useKlienDetail(id);

  if (isLoading) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Memuat profil klien...
      </p>
    );
  }

  if (!klien) {
    return (
      <div className="space-y-6">
        <Button asChild variant="ghost" size="sm" className="px-0">
          <Link href="/pt/klien">
            <ArrowLeft className="size-4" />
            Kembali ke Klien
          </Link>
        </Button>
        <EmptyState
          icon={<UserRound />}
          title="Klien tidak ditemukan"
          description="Klien ini tidak terdaftar di bawah akunmu."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="px-0">
        <Link href="/pt/klien">
          <ArrowLeft className="size-4" />
          Kembali ke Klien
        </Link>
      </Button>

      {/* Kartu profil klien */}
      <section className="rounded-panel bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={klien.nama} size={80} shape="square" />
          <div className="min-w-0">
            <h1 className="text-[40px] leading-tight font-extrabold tracking-[-0.7px] text-ink">
              {klien.nama}
            </h1>
            <p className="text-ink-soft">{klien.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="started">
                <CalendarDays className="size-3" />
                {klien.mulaiProgram}
              </Badge>
              <Badge
                variant={
                  klien.goal === "weight_loss" ? "weight-loss" : "hypertrophy"
                }
              >
                {GOAL_LABELS[klien.goal]}
              </Badge>
              <Badge variant="count">
                <Clock className="size-3" />
                {klien.sessionSlot}
              </Badge>
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <InfoItem label="Umur" value={`${klien.usia} tahun`} />
          <InfoItem label="Jenis Kelamin" value={genderLabel(klien.gender)} />
          <InfoItem label="BB Awal" value={`${klien.bbAwal} kg`} />
          <InfoItem label="BB Sekarang" value={`${klien.bbSekarang} kg`} />
          <InfoItem label="BB Tujuan" value={`${klien.bbTujuan} kg`} />
          <InfoItem label="Tinggi Badan" value={`${klien.tinggiBadan} cm`} />
        </dl>
      </section>

      {/* Program hasil generate AI */}
      <section className="rounded-panel bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold text-ink">
            {klien.program.nama}
          </h2>
          <Badge variant="ai">
            <Sparkles className="size-3" />
            Dibuat AI
          </Badge>
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          {klien.program.ringkasan}
        </p>

        <div className="mt-6">
          <div>
            <p className="text-sm font-semibold text-ink">Rencana Latihan</p>
            <ul className="mt-3 space-y-3">
              {klien.program.workout.map((day) => (
                <li key={day.hari} className="rounded-card bg-surface-alt p-4">
                  <p className="text-sm font-semibold text-ink">
                    {day.hari} · {day.fokus}
                  </p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-ink-soft">
                    {day.latihan.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card bg-surface-tint p-4">
      <dt className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold text-ink">{value}</dd>
    </div>
  );
}
