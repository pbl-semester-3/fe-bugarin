"use client";

import { AvatarCell } from "@/components/admin/avatar-cell";
import { StatusBadge } from "@/components/admin/status-badge";
import type { AuditLog } from "@/lib/types/admin";
import { cn } from "cn";

const GRID_COLS = "1.2fr 1.2fr 1fr 1.4fr 0.8fr";

// Tabel tab "Audit Admin" (design/admin/riwayat.md §5). Read-only, zebra row.
export function AuditTable({ rows }: { rows: AuditLog[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[860px]">
        <div
          className="grid h-11 items-center gap-4 bg-admin-low/70 px-4 text-center text-[10px] font-bold tracking-widest text-admin-heading uppercase"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span>Waktu & Timestamp ID</span>
          <span>Aktor Super Admin</span>
          <span>Kategori & Tipe Aksi</span>
          <span>Target Objek & Modul</span>
          <span>Status</span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className={cn(
              "grid min-h-[64px] items-center gap-4 px-4 py-2 text-center",
              index % 2 === 1 && "bg-admin-low/20"
            )}
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <div>
              <p className="text-xs font-semibold text-admin-heading">
                {row.time}
              </p>
              <p className="text-[11px] text-admin-secondary">{row.date}</p>
            </div>

            <div className="flex justify-center">
              <AvatarCell name={row.actor} size={32} nameClassName="text-xs" />
            </div>

            <div className="flex justify-center">
              <StatusBadge variant={row.action.toLowerCase() as "create" | "update" | "delete"}>
                {row.action}
              </StatusBadge>
            </div>

            <div>
              <p className="text-xs font-semibold text-admin-heading">
                {row.target}
              </p>
              <p className="text-[10px] tracking-widest text-[#41493A] uppercase">
                {row.module}
              </p>
            </div>

            <div className="flex justify-center">
              <StatusBadge
                variant={row.status === "BERHASIL" ? "berhasil" : "gagal"}
              >
                {row.status}
              </StatusBadge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
