"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Hourglass } from "lucide-react";
import { EmptyState } from "@/components/pt/empty-state";
import { FilterChip } from "@/components/pt/filter-chip";
import { SearchBar } from "@/components/pt/search-bar";
import { Button } from "@/components/ui/button";
import { usePairingRequests } from "@/hooks/usePairingRequests";
import { VerifikasiCard } from "./verifikasi-card";

const PAGE_SIZE = 3;

// Toolbar + daftar kartu / empty state (design/VERIFIKASI.md).
export function VerifikasiList() {
  const { data, isLoading } = usePairingRequests();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  function handleQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  const requests = useMemo(() => data ?? [], [data]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter((r) => r.klien.nama.toLowerCase().includes(q));
  }, [requests, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel bg-white p-4 shadow-card">
        <SearchBar
          value={query}
          onChange={handleQuery}
          placeholder="Cari klien berdasarkan nama atau email..."
          className="min-w-[260px] flex-1 sm:max-w-[576px]"
        />
        <FilterChip active>Semua Menunggu ({requests.length})</FilterChip>
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Memuat pengajuan...
        </p>
      ) : requests.length === 0 ? (
        <EmptyState
          icon={<Hourglass />}
          title="Semua pengajuan sudah diproses"
          description="Belum ada pendaftar baru saat ini. Notifikasi otomatis akan muncul di sini begitu ada calon klien mendaftar."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Hourglass />}
          title="Tidak ada pengajuan yang cocok"
          description="Coba ubah kata kunci pencarian."
        />
      ) : (
        <div className="flex flex-col">
          {pageItems.map((request) => (
            <VerifikasiCard key={request.id} request={request} />
          ))}
        </div>
      )}

      {!isLoading && filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} dari{" "}
            {filtered.length} pengajuan
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Halaman sebelumnya"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm font-medium text-ink">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Halaman berikutnya"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
