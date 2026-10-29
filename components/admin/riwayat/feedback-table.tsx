"use client";

import { ChevronRight } from "lucide-react";
import { AvatarCell } from "@/components/admin/avatar-cell";
import type { FeedbackLog } from "@/lib/types/admin";

const GRID_COLS = "1.1fr 1.3fr 1.3fr 2fr 0.8fr";

interface FeedbackTableProps {
  rows: FeedbackLog[];
  onDetail: (row: FeedbackLog) => void;
}

// Tabel log feedback tab "Daftar Personal Trainer (PT)" (design/admin/riwayat.md §4).
export function FeedbackTable({ rows, onDetail }: FeedbackTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <div
          className="grid h-12 items-center gap-4 border-b border-admin-low px-4 text-center text-[10px] font-bold tracking-widest text-admin-secondary uppercase"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span>Waktu & ID</span>
          <span>Personal Trainer</span>
          <span>Klien Penerima</span>
          <span>Catatan Evaluasi</span>
          <span>Tindakan</span>
        </div>

        {rows.map((row) => (
          <div
            key={row.id}
            className="grid min-h-[59px] items-center gap-4 border-b border-admin-low px-4 py-2 text-center transition-colors last:border-0 hover:bg-admin-bg"
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <div>
              <p className="font-mono text-xs font-bold text-admin-heading">
                {row.time}
              </p>
              <p className="font-mono text-[10px] text-admin-secondary">
                #{row.id}
              </p>
            </div>

            <div className="flex justify-center">
              <AvatarCell
                name={row.trainer.name}
                size={32}
                sub={row.date}
                nameClassName="text-xs"
                subClassName="text-[10px]"
              />
            </div>

            <div className="flex justify-center">
              <AvatarCell
                name={row.client.name}
                size={32}
                sub={row.date}
                nameClassName="text-xs"
                subClassName="text-[10px]"
              />
            </div>

            <p className="line-clamp-2 text-left text-[11px] text-admin-heading">
              &ldquo;{row.note}&rdquo;
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onDetail(row)}
                className="flex items-center gap-1 rounded-md bg-admin-low px-2.5 py-1.5 text-[11px] font-medium text-admin-heading transition-colors hover:bg-admin-track"
              >
                Detail
                <ChevronRight className="size-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
