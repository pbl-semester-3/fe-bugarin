"use client";

import { AvatarCell } from "@/components/admin/avatar-cell";
import { StatusBadge } from "@/components/admin/status-badge";
import type { TrainerRow } from "@/lib/types/admin";

const GRID_COLS = "1.4fr 0.9fr 1.3fr 0.8fr 1.1fr 1fr";

interface PtTableProps {
  rows: TrainerRow[];
  onEdit: (row: TrainerRow) => void;
  onDelete: (row: TrainerRow) => void;
}

function formatCreatedAt(iso: string) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Tabel tab Personal Trainer (design/admin/kelola-pengguna.md §5).
export function PtTable({ rows, onEdit, onDelete }: PtTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[960px]">
        <div
          className="grid h-14 items-center gap-4 bg-admin-low px-4 text-center text-[10px] font-bold tracking-widest text-admin-heading uppercase"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span>Profil Trainer</span>
          <span>Keahlian</span>
          <span>Kredensial & Akses</span>
          <span>Status</span>
          <span>Cabang Gym</span>
          <span>Tindakan Admin</span>
        </div>

        {rows.map((row) => (
          <div
            key={row.id}
            className="grid min-h-[96px] items-center gap-4 bg-admin-surface px-4 text-center transition-colors hover:bg-admin-bg"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <div className="flex justify-center">
              <AvatarCell
                name={row.name}
                src={row.photoUrl}
                size={32}
                sub={`ID: ${row.trainerId} • ${row.hub}`}
                nameClassName="text-[13px]"
                subClassName="text-[10px]"
              />
            </div>

            <div className="flex justify-center">
              <span
                className={
                  row.specialization === "Naik BB"
                    ? "rounded-pill bg-mint-tint px-2.5 py-1 text-[10px] font-medium text-admin-mint-text"
                    : "rounded-pill bg-onboarding-tint px-2.5 py-1 text-[10px] font-medium text-admin-brown"
                }
              >
                {row.specialization}
              </span>
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <p className="text-[11px] text-admin-heading">{row.email}</p>
              <p className="text-[11px] text-admin-secondary">
                Dibuat {formatCreatedAt(row.createdAt)}
              </p>
            </div>

            <div className="flex justify-center">
              <StatusBadge
                variant={row.status === "AKTIF" ? "aktif" : "nonaktif"}
                dot
              >
                {row.status}
              </StatusBadge>
            </div>

            <p className="text-[11px] text-admin-heading">{row.branch}</p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(row)}
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
        ))}
      </div>
    </div>
  );
}
