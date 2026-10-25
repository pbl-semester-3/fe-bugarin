"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFilterBar, type AdminFilterSelect } from "@/components/admin/filter-bar";
import { PageBanner } from "@/components/admin/page-banner";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminTabSwitcher } from "@/components/admin/tab-switcher";
import { TableCard } from "@/components/admin/table-card";
import { useAdminRiwayat } from "@/hooks/useAdminRiwayat";
import type { FeedbackLog } from "@/lib/types/admin";
import { AuditTable } from "./audit-table";
import { FeedbackDetailDialog } from "./feedback-detail-dialog";
import { FeedbackTable } from "./feedback-table";

type TabValue = "pt" | "audit";

const CATEGORY_OPTIONS = [
  { value: "all", label: "Semua Kategori" },
  { value: "EVALUASI_MINGGUAN", label: "Evaluasi Sesi Mingguan" },
  { value: "EVALUASI_BULANAN", label: "Evaluasi Bulanan" },
  { value: "KOREKSI_TEKNIK", label: "Koreksi Teknik" },
  { value: "PROGRESS_NUTRISI", label: "Progress Nutrisi" },
  { value: "MOTIVASI_KEPATUHAN", label: "Motivasi & Kepatuhan" },
  { value: "PEMULIHAN_CEDERA", label: "Pemulihan & Cedera" },
];

// View Riwayat Admin (design/admin/riwayat.md) — read-only, 2 tab.
export function RiwayatView({ initialTab }: { initialTab: TabValue }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabValue>(initialTab);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<FeedbackLog | null>(null);

  const { data, isLoading } = useAdminRiwayat();

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
      const matchCategory = category === "all" || log.category === category;
      return matchSearch && matchCategory;
    });
  }, [data, search, category]);

  const auditLogs = data?.auditLogs ?? [];
  const rows = tab === "pt" ? filteredFeedback : auditLogs;
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const pagedFeedback = filteredFeedback.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );
  const pagedAudit = auditLogs.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  function changeTab(next: TabValue) {
    setTab(next);
    setSearch("");
    setCategory("all");
    setPage(1);
    router.replace(`/admin/riwayat?tab=${next}`);
  }

  const selects: AdminFilterSelect[] = [
    {
      value: category,
      onValueChange: (v) => {
        setCategory(v);
        setPage(1);
      },
      placeholder: "Semua Kategori",
      options: CATEGORY_OPTIONS,
    },
  ];

  const infoText = (
    <p className="text-[11px] text-admin-secondary">
      Menampilkan{" "}
      <span className="font-bold text-admin-heading">
        {tab === "pt" ? pagedFeedback.length : pagedAudit.length}
      </span>{" "}
      dari <span className="font-bold text-admin-heading">{total}</span> entri
    </p>
  );

  return (
    <div className="space-y-6">
      <PageBanner
        title="Audit Trail & Log Operasional"
        description="Monitoring kepatuhan pelatihan personal trainer dan pencatatan forensik CRUD Super Admin"
        className="py-4"
      />

      <AdminTabSwitcher
        value={tab}
        onValueChange={(v) => changeTab(v as TabValue)}
        tabs={[
          {
            value: "pt",
            label: "Daftar Personal Trainer (PT)",
            badge: `${data?.activeTrainers ?? 0} Aktif`,
          },
          { value: "audit", label: "Audit Admin" },
        ]}
      />

      {isLoading ? (
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
              searchPlaceholder="Cari PT, atau Keyword..."
              selects={selects}
              className="gap-1"
            />
            {infoText}
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
      ) : (
        <div className="space-y-3">
          <div className="pl-2">{infoText}</div>
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
      )}

      <FeedbackDetailDialog log={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
