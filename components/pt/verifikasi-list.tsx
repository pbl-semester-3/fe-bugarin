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

// Toolbar + daftar kartu / empty state (design/VERIFIKASI.md §1, §3, §4.1, §6).
export function VerifikasiList() {
  const { data, isLoading } = usePairingRequests();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Reset ke halaman 1 tiap kata kunci berubah.
  function handleQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  const requests = useMemo(() => data ?? [], [data]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter(
      (r) =>
        r.klien.nama.toLowerCase().includes(q) ||
        r.klien.email.toLowerCase().includes(q)
    );
  }, [requests, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      {/* Toolbar (§3) */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar
          value={query}
          onChange={handleQuery}
          placeholder="Cari pendaftar berdasarkan nama atau email..."
          className="min-w-[260px] flex-1"
        />
        <FilterChip active>Semua Menunggu ({requests.length})</FilterChip>
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Memuat pengajuan...
        </p>
      ) : requests.length === 0 ? (
        /* Empty state (§6) */
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
        /* List wrapper (§4.1): gap 0 sesuai spec Figma — mudah diubah bila hasil
           konfirmasi desain ternyata perlu jarak antar kartu. */
        <div className="flex flex-col">
          {pageItems.map((request) => (
            <VerifikasiCard key={request.id} request={request} />
          ))}
        </div>
      )}

      {/* Pagination: maksimal 3 pengajuan per halaman */}
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
