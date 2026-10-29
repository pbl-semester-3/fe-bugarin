"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminProgressBar } from "@/components/admin/progress-bar";
import { Avatar } from "@/components/pt/avatar";
import { StatusBadge } from "@/components/admin/status-badge";
import { useAdminKlienDetail } from "@/hooks/useAdminKlienDetail";
import type { ClientRow } from "@/lib/types/admin";

function formatTanggal(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-control bg-admin-low px-3 py-2">
      <p className="text-[10px] font-bold tracking-widest text-admin-secondary uppercase">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-admin-heading">{value}</p>
    </div>
  );
}

// Modal "Lihat" data klien (read-only).
export function KlienDetailDialog({
  row,
  onClose,
}: {
  row: ClientRow | null;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useAdminKlienDetail(row?.id ?? null);

  if (!row) return null;

  const profile = data?.klienProfile;
  const cycle = data?.activeCycle ?? null;
  const tujuan = cycle?.tujuan ?? profile?.tujuan ?? null;
  const program =
    tujuan === "naik_bb"
      ? "Naik Berat Badan"
      : tujuan === "turun_bb"
        ? "Turun Berat Badan"
        : "Belum ada program";
  const progress = profile?.progress ?? row.progress;
  const isNaik = tujuan === "naik_bb";
  const nama = profile?.nama ?? row.name;
  const email = data?.email ?? row.email;
  const trainer = profile?.ptNama ?? row.trainer;
  const fotoUrl = profile?.fotoUrl ?? row.photoUrl;

  return (
    <Dialog open={row !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] w-full max-w-[720px] gap-0 overflow-y-auto rounded-[20px] p-0 sm:max-w-[720px]"
      >
        <div className="flex items-start justify-between bg-admin-navy px-8 py-6">
          <div>
            <DialogTitle className="text-[22px] font-semibold text-white">
              Detail Klien
            </DialogTitle>
            <p className="mt-1 text-sm text-admin-on-navy">
              Profil, program aktif, dan riwayat berat badan klien
            </p>
          </div>
          <DialogClose
            aria-label="Tutup"
            className="text-white transition-opacity hover:opacity-70"
          >
            <X className="size-5" />
          </DialogClose>
        </div>

        <div className="space-y-5 bg-admin-surface p-8">
          {isError && (
            <p className="rounded-control bg-admin-danger-tint px-3 py-2 text-[11px] text-admin-danger-text">
              Gagal memuat detail klien. Menampilkan data dari daftar.
            </p>
          )}

          <div className="flex items-center gap-4 rounded-card border border-admin-track bg-admin-low p-4">
            <Avatar name={nama} src={fotoUrl} size={56} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-admin-heading">
                {nama}
              </p>
              <p className="truncate text-xs text-admin-secondary">{email}</p>
            </div>
            <StatusBadge
              variant={row.status === "AKTIF" ? "aktif" : "onboarding"}
              dot
            >
              {row.status}
            </StatusBadge>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoItem
              label="Usia"
              value={profile?.usia != null ? `${profile.usia} tahun` : "-"}
            />
            <InfoItem
              label="Jenis Kelamin"
              value={
                profile?.jenisKelamin === "pria"
                  ? "Pria"
                  : profile?.jenisKelamin === "wanita"
                    ? "Wanita"
                    : "-"
              }
            />
            <InfoItem
              label="Tinggi Badan"
              value={
                profile?.tinggiBadanCm != null
                  ? `${profile.tinggiBadanCm} cm`
                  : "-"
              }
            />
            <InfoItem
              label="Alergi Makanan"
              value={profile?.alergiMakanan || "-"}
            />
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-widest text-admin-secondary uppercase">
              Personal Trainer Pendamping
            </p>
            {trainer ? (
              <div className="mt-2 flex items-center gap-2 rounded-control bg-admin-low px-3 py-2">
                <Avatar name={trainer} size={32} />
                <p className="text-xs font-semibold text-admin-heading">
                  {trainer}
                </p>
              </div>
            ) : (
              <span className="mt-2 inline-flex rounded-md bg-brand px-4 py-1 text-[11px] font-medium text-on-accent">
                Tidak Ada PT
              </span>
            )}
          </div>

          <div className="rounded-card border border-admin-track p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-admin-heading">
                {program}
              </p>
              <span
                className={
                  !cycle
                    ? "text-xs font-bold text-admin-secondary"
                    : isNaik
                      ? "text-xs font-bold text-admin-green-text"
                      : "text-xs font-bold text-admin-brown"
                }
              >
                {cycle ? `${progress}%` : "—"}
              </span>
            </div>
            <div className="mt-2">
              <AdminProgressBar
                value={cycle ? progress : 0}
                tone={isNaik ? "naik" : "turun"}
              />
            </div>

            {cycle ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <InfoItem label="BB Awal" value={`${cycle.bbAwalKg} kg`} />
                <InfoItem
                  label="BB Sekarang"
                  value={
                    data?.bbSekarangKg != null
                      ? `${data.bbSekarangKg} kg`
                      : "-"
                  }
                />
                <InfoItem label="BB Tujuan" value={`${cycle.bbTujuanKg} kg`} />
                <InfoItem
                  label="Durasi"
                  value={`${cycle.durasiHari} hari`}
                />
                <InfoItem
                  label="Target Kalori"
                  value={`${cycle.targetKaloriPerHari} kkal`}
                />
                <InfoItem label="Streak" value={`${cycle.streak} hari`} />
              </div>
            ) : (
              <p className="mt-3 text-xs text-admin-secondary">
                Klien belum memiliki siklus program aktif.
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-widest text-admin-secondary uppercase">
                Riwayat Berat Badan
              </p>
              {cycle && (
                <p className="text-[10px] text-admin-secondary">
                  Mulai {formatTanggal(cycle.tanggalMulai)}
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="mt-2 space-y-2">
                <div className="h-8 animate-pulse rounded bg-admin-low" />
                <div className="h-8 animate-pulse rounded bg-admin-low" />
              </div>
            ) : data && data.weightLogs.length > 0 ? (
              <div className="mt-2 max-h-48 space-y-1.5 overflow-y-auto pr-1">
                {data.weightLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between rounded-control bg-admin-low px-3 py-2"
                  >
                    <span className="text-xs text-admin-secondary">
                      {formatTanggal(log.tanggal)}
                    </span>
                    <span className="text-xs font-semibold text-admin-heading">
                      {log.beratBadanKg} kg
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-admin-secondary">
                Belum ada riwayat berat badan.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
