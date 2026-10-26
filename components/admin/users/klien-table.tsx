"use client";

import { Avatar } from "@/components/pt/avatar";
import { AvatarCell } from "@/components/admin/avatar-cell";
import { AdminProgressBar } from "@/components/admin/progress-bar";
import { StatusBadge } from "@/components/admin/status-badge";
import type { ClientRow } from "@/lib/types/admin";

const GRID_COLS = "1.4fr 1.3fr 1.3fr 1fr 1fr";

interface KlienTableProps {
  rows: ClientRow[];
  onDelete: (row: ClientRow) => void;
}

// Tabel tab Klien (design/admin/kelola-pengguna.md §4).
export function KlienTable({ rows, onDelete }: KlienTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <div
          className="grid h-14 items-center gap-4 bg-admin-low px-4 text-center text-[10px] font-bold tracking-widest text-admin-heading uppercase"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span>Profil Klien</span>
          <span>Personal Trainer Pendamping</span>
          <span>Program & Target Aktif</span>
          <span>Status Akun</span>
          <span>Tindakan</span>
        </div>

        {rows.map((row) => {
          const isNaik = row.program === "Naik Berat Badan";
          return (
            <div
              key={row.id}
              className="grid min-h-[100px] items-center gap-4 bg-admin-surface px-4 text-center transition-colors hover:bg-admin-bg"
              style={{ gridTemplateColumns: GRID_COLS }}
            >
              <div className="flex justify-center">
                <AvatarCell
                  name={row.name}
                  sub={row.email}
                  ring={row.status === "ONBOARDING"}
                />
              </div>

              <div className="flex justify-center">
                {row.trainer ? (
                  <div className="flex items-center gap-2">
                    <Avatar name={row.trainer} size={32} />
                    <p className="max-w-40 text-left text-xs leading-tight font-bold text-admin-heading">
                      {row.trainer}
                    </p>
                  </div>
                ) : (
                  <span className="rounded-md bg-brand px-4 py-1 text-[11px] font-medium text-on-accent">
                    Tidak Ada PT
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="flex w-[165px] items-center justify-between">
                  <span className="text-[11px] font-bold text-admin-heading">
                    {row.program}
                  </span>
                  <span
                    className={
                      isNaik
                        ? "text-[11px] font-bold text-admin-green-text"
                        : "text-[11px] font-bold text-admin-brown"
                    }
                  >
                    {row.progress}%
                  </span>
                </div>
                <AdminProgressBar
                  value={row.progress}
                  tone={isNaik ? "naik" : "turun"}
                />
              </div>

              <div className="flex justify-center">
                <StatusBadge
                  variant={row.status === "AKTIF" ? "aktif" : "onboarding"}
                  dot
                >
                  {row.status}
                </StatusBadge>
              </div>

              <div className="flex items-center justify-center gap-2">
                {/* TODO(design): Edit Klien belum ada desain — handler sengaja kosong. */}
                <button
                  type="button"
                  className="rounded-md bg-admin-warning px-3 py-1.5 text-[11px] font-medium text-admin-warning-text transition-opacity hover:opacity-90"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(row)}
                  className="rounded-md bg-admin-danger-tint px-3 py-1.5 text-[11px] font-medium text-admin-danger-text transition-opacity hover:opacity-90"
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
