"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Dumbbell,
  LineChart as LineChartIcon,
  Salad,
  UserRound,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar } from "@/components/pt/avatar";
import { EmptyState } from "@/components/pt/empty-state";
import { OverridePlanDialog } from "@/components/pt/override-plan-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApproveWeeklyPlan, useKlienDetail } from "@/hooks/useKlienDetail";
import {
  genderLabel,
  planStatusLabel,
  tujuanLabel,
  type PlanStatus,
} from "@/lib/types/pt";

function planBadgeVariant(status: PlanStatus) {
  if (status === "disetujui") return "done" as const;
  if (status === "override") return "ai" as const;
  return "queued" as const;
}

// "View Full Profile & Program" — profil klien + grafik BB + review weekly plan.
export function KlienDetail({ id }: { id: number }) {
  const { data: klien, plan, isLoading } = useKlienDetail(id);
  const approve = useApproveWeeklyPlan(id);

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

  const { profil, grafikBb } = klien;

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
          <Avatar name={profil.nama} size={80} shape="square" />
          <div className="min-w-0">
            <h1 className="text-[40px] leading-tight font-extrabold tracking-[-0.7px] text-ink">
              {profil.nama}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                variant={
                  profil.tujuan === "turun_bb"
                    ? "weight-loss"
                    : profil.tujuan === "naik_bb"
                      ? "hypertrophy"
                      : "queued"
                }
              >
                {tujuanLabel(profil.tujuan)}
              </Badge>
              {profil.durasiHari !== null && (
                <Badge variant="count">{profil.durasiHari} Hari</Badge>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <InfoItem label="Umur" value={profil.usia ? `${profil.usia} tahun` : "-"} />
          <InfoItem label="Jenis Kelamin" value={genderLabel(profil.jenisKelamin)} />
          <InfoItem
            label="Tinggi Badan"
            value={profil.tinggiBadanCm ? `${profil.tinggiBadanCm} cm` : "-"}
          />
          <InfoItem
            label="BB Awal"
            value={profil.bbAwalKg !== null ? `${profil.bbAwalKg} kg` : "-"}
          />
          <InfoItem
            label="BB Tujuan"
            value={profil.bbTujuanKg !== null ? `${profil.bbTujuanKg} kg` : "-"}
          />
          <InfoItem
            label="BB Sekarang"
            value={
              grafikBb.length > 0
                ? `${grafikBb[grafikBb.length - 1].beratKg} kg`
                : "-"
            }
          />
        </dl>
      </section>

      {/* Grafik BB */}
      <section className="rounded-panel bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">Grafik Berat Badan</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Riwayat penimbangan klien.
        </p>
        <div className="mt-4">
          {grafikBb.length > 0 ? (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grafikBb} margin={{ left: 8, right: 16, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EBEDFB" />
                  <XAxis dataKey="tanggal" tick={{ fontSize: 11 }} />
                  <YAxis unit=" kg" tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
                  <Tooltip formatter={(value) => [`${value} kg`, "Berat"]} />
                  <Line
                    type="monotone"
                    dataKey="beratKg"
                    stroke="#7DC04E"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState
              icon={<LineChartIcon />}
              title="Belum ada data berat badan"
              description="Grafik akan muncul setelah klien mencatat berat badannya."
            />
          )}
        </div>
      </section>

      {/* Review Weekly Plan */}
      <section className="rounded-panel bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold text-ink">Weekly Plan</h2>
          {plan && (
            <Badge variant={planBadgeVariant(plan.status)}>
              {planStatusLabel(plan.status)}
            </Badge>
          )}
        </div>

        {!plan ? (
          <EmptyState
            icon={<Dumbbell />}
            title="Belum ada weekly plan"
            description="Plan belum dibuat untuk klien ini pada minggu berjalan."
          />
        ) : (
          <>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <Dumbbell className="size-4 text-brand" />
                  Rencana Latihan
                </p>
                <ul className="mt-3 space-y-2">
                  {plan.workoutPlan.map((w, i) => (
                    <li
                      key={i}
                      className="rounded-card bg-surface-alt px-4 py-3 text-sm"
                    >
                      <span className="font-semibold text-ink">
                        {w.hari} · {w.jam}
                      </span>
                      <span className="block text-ink-soft">
                        {w.jenis}
                        {w.lokasi ? ` · ${w.lokasi}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <Salad className="size-4 text-success" />
                  Rencana Menu
                </p>
                <ul className="mt-3 space-y-2">
                  {plan.mealPlan.map((m, i) => (
                    <li
                      key={i}
                      className="rounded-card bg-surface-alt px-4 py-3 text-sm"
                    >
                      <span className="font-semibold text-ink">{m.waktu}</span>
                      <span className="block text-ink-soft">
                        {m.menu} · {m.estimasiKalori} kkal
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {plan.status === "pending_review" && (
              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <OverridePlanDialog klienId={id} plan={plan} />
                <Button
                  className="rounded-pill px-4"
                  disabled={approve.isPending}
                  onClick={() => approve.mutate(plan.id)}
                >
                  <Check className="size-4" />
                  Setujui
                </Button>
              </div>
            )}
          </>
        )}
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
