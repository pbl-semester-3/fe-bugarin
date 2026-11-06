"use client";

import { StatusBadge } from "@/app/(app)/components/admin/status-badge";
import type { RequestLogRow } from "@/services/admin/request-logs.service";

const GRID_COLS = "1.1fr 0.8fr 2fr 0.7fr 1.9fr 1.9fr";

const ROLE_LABEL: Record<string, string> = {
  klien: "Klien",
  pt: "PT",
  admin: "Admin",
};

// Tabel tab "Request Log" (error log) di Riwayat Admin. Read-only.
export function RequestLogTable({ rows }: { rows: RequestLogRow[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        <div
          className="grid h-11 items-center gap-4 bg-admin-low/70 px-4 text-center text-[10px] font-bold tracking-widest text-admin-heading uppercase"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span>Waktu</span>
          <span>Role</span>
          <span>Endpoint</span>
          <span>Status</span>
          <span>Request ID</span>
          <span>Pesan</span>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.id}
            className={
              "grid min-h-[56px] items-center gap-4 border-b border-admin-low px-4 py-2 text-center last:border-0 " +
              (index % 2 === 1 ? "bg-admin-low/20" : "")
            }
            style={{ gridTemplateColumns: GRID_COLS }}
          >
            <div>
              <p className="text-xs font-semibold text-admin-heading">
                {row.time}
              </p>
              <p className="text-[10px] text-admin-secondary">{row.date}</p>
            </div>

            <span className="text-xs font-semibold text-admin-heading">
              {row.role ? ROLE_LABEL[row.role] ?? row.role : "-"}
            </span>

            <div className="text-left">
              <p className="text-[11px] font-semibold text-admin-heading">
                {row.endpoint}
              </p>
              <p className="text-[10px] tracking-widest text-admin-secondary uppercase">
                {row.method}
              </p>
            </div>

            <div className="flex justify-center">
              <StatusBadge variant={row.status >= 500 ? "delete" : "update"}>
                {row.status}
              </StatusBadge>
            </div>

            <code
              className="select-all truncate text-left font-mono text-[10px] text-admin-secondary"
              title={row.requestId}
            >
              {row.requestId}
            </code>

            <p className="line-clamp-2 text-left text-[11px] text-admin-heading">
              {row.message ?? "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
