"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFilterBar } from "@/app/(app)/components/admin/filter-bar";
import { PageBanner } from "@/app/(app)/components/admin/page-banner";
import { AdminPagination } from "@/app/(app)/components/admin/pagination";
import { AdminTabSwitcher } from "@/app/(app)/components/admin/tab-switcher";
import { TableCard } from "@/app/(app)/components/admin/table-card";
import { useAdminRiwayat } from "@/hooks/useAdminRiwayat";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useAdminRequestLogs } from "@/hooks/useAdminRequestLogs";
import type { FeedbackLog, RequestLogRole } from "@/types/admin";
import { AuditTable } from "./audit-table";
import { FeedbackDetailDialog } from "./feedback-detail-dialog";
import { FeedbackTable } from "./feedback-table";
import { RequestLogTable } from "./request-log-table";

type TabValue = "pt" | "audit" | "request";

const ROLE_OPTIONS = [
  { value: "all", label: "Semua role" },
  { value: "klien", label: "Klien" },
  { value: "pt", label: "PT" },
  { value: "admin", label: "Admin" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Semua status" },
  ...[400, 401, 403, 404, 409, 422, 429, 500].map((code) => ({
    value: String(code),
    label: String(code),
  })),
];

// View Riwayat Admin (design/admin/riwayat.md) — read-only.
export function RiwayatView({ initialTab }: { initialTab: TabValue }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabValue>(initialTab);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<FeedbackLog | null>(null);

  // State khusus tab "Request Log" (pagination server-side).
  const [requestSearch, setRequestSearch] = useState("");
  const [requestRole, setRequestRole] = useState("all");
  const [requestStatus, setRequestStatus] = useState("all");
  const [requestPage, setRequestPage] = useState(1);

  const { data, isLoading } = useAdminRiwayat();
  const { data: dashboard } = useAdminDashboard();
  const requestLogs = useAdminRequestLogs(
    {
      page: requestPage,
      limit: 10,
      role: requestRole === "all" ? undefined : (requestRole as RequestLogRole),
      status: requestStatus === "all" ? undefined : Number(requestStatus),
      q: requestSearch || undefined,
    },
    tab === "request",
  );

  const perPage = tab === "pt" ? 10 : 5;

  const filteredFeedback = useMemo(() => {
    const logs = data?.feedbackLogs ?? [];
    const keyword = search.toLowerCase();
    return logs.filter((log) => {
      const matchSearch =
        !keyword ||
        log.trainer.name.toLowerCase().includes(keyword) ||
        log.client.name.toLowerCase().includes(keyword) ||
        log.id.toLowerCase().includes(keyword) ||
        log.note.toLowerCase().includes(keyword);
      return matchSearch;
    });
  }, [data, search]);

  const auditLogs = data?.auditLogs ?? [];
  const rows = tab === "pt" ? filteredFeedback : auditLogs;
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const pagedFeedback = filteredFeedback.slice(
    (safePage - 1) * perPage,
    safePage * perPage,
  );
  const pagedAudit = auditLogs.slice(
    (safePage - 1) * perPage,
    safePage * perPage,
  );

  function changeTab(next: TabValue) {
    setTab(next);
    setSearch("");
    setPage(1);
    setRequestSearch("");
    setRequestRole("all");
    setRequestStatus("all");
    setRequestPage(1);
    router.replace(`/riwayat?tab=${next}`);
  }

  const infoText = (count: number, totalCount: number) => (
    <p className="text-[11px] text-admin-secondary">
      Menampilkan{" "}
      <span className="font-bold text-admin-heading">{count}</span> dari{" "}
      <span className="font-bold text-admin-heading">{totalCount}</span> entri
    </p>
  );

  const activeLoading = tab === "request" ? requestLogs.isLoading : isLoading;
  const requestRows = requestLogs.data?.rows ?? [];
  const requestMeta = requestLogs.data?.meta;

  return (
    <div className="space-y-6">
      <PageBanner
        title="Audit Trail & Log Operasional"
        description="Monitoring kepatuhan pelatihan personal trainer, pencatatan forensik CRUD Super Admin, dan log error untuk penelusuran request"
        className="py-4"
      />

      <AdminTabSwitcher
        value={tab}
        onValueChange={(v) => changeTab(v as TabValue)}
        tabs={[
          {
            value: "pt",
            label: "Daftar Personal Trainer (PT)",
            badge: `${dashboard?.totalPt ?? 0} Aktif`,
          },
          { value: "audit", label: "Audit Admin" },
          { value: "request", label: "Request Log" },
        ]}
      />

      {activeLoading ? (
        <div className="space-y-3 rounded-card bg-white p-4 shadow-card">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-control bg-admin-low"
            />
          ))}
        </div>
      ) : tab === "pt" ? (
        <TableCard>
          <div className="space-y-3 border-t border-admin-low px-4 py-4">
            <AdminFilterBar
              searchValue={search}
              onSearchChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
              searchPlaceholder="Cari PT, klien, atau keyword..."
              selects={[]}
              className="gap-1"
            />
            {infoText(pagedFeedback.length, total)}
          </div>

          {pagedFeedback.length === 0 ? (
            <p className="py-16 text-center text-sm text-admin-secondary">
              Tidak ada data yang cocok
            </p>
          ) : (
            <FeedbackTable rows={pagedFeedback} onDetail={setDetail} />
          )}

          <AdminPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            perPage={perPage}
            showFirstLast={false}
          />
        </TableCard>
      ) : tab === "audit" ? (
        <div className="space-y-3">
          <div className="pl-2">{infoText(pagedAudit.length, total)}</div>
          <TableCard>
            {pagedAudit.length === 0 ? (
              <p className="py-16 text-center text-sm text-admin-secondary">
                Belum ada riwayat
              </p>
            ) : (
              <AuditTable rows={pagedAudit} />
            )}
            <AdminPagination
              page={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
              perPage={perPage}
              showFirstLast={false}
            />
          </TableCard>
        </div>
      ) : (
        <div className="space-y-3">
          <TableCard>
            <div className="space-y-3 border-t border-admin-low px-4 py-4">
              <AdminFilterBar
                searchValue={requestSearch}
                onSearchChange={(v) => {
                  setRequestSearch(v);
                  setRequestPage(1);
                }}
                searchPlaceholder="Cari endpoint, pesan, atau Request ID..."
                selects={[
                  {
                    value: requestRole,
                    onValueChange: (v) => {
                      setRequestRole(v);
                      setRequestPage(1);
                    },
                    placeholder: "Semua role",
                    options: ROLE_OPTIONS,
                  },
                  {
                    value: requestStatus,
                    onValueChange: (v) => {
                      setRequestStatus(v);
                      setRequestPage(1);
                    },
                    placeholder: "Semua status",
                    options: STATUS_OPTIONS,
                  },
                ]}
                className="gap-1"
              />
              {infoText(requestRows.length, requestMeta?.total ?? 0)}
            </div>

            {requestRows.length === 0 ? (
              <p className="py-16 text-center text-sm text-admin-secondary">
                Tidak ada data yang cocok
              </p>
            ) : (
              <RequestLogTable rows={requestRows} />
            )}

            <AdminPagination
              page={requestMeta?.page ?? requestPage}
              totalPages={requestMeta?.totalPages ?? 1}
              onPageChange={setRequestPage}
              perPage={requestMeta?.limit ?? 10}
              showFirstLast={false}
            />
          </TableCard>
        </div>
      )}

      <FeedbackDetailDialog log={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
