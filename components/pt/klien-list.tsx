"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Hourglass } from "lucide-react";
import { cn } from "cn";
import { EmptyState } from "@/components/pt/empty-state";
import { FilterChip } from "@/components/pt/filter-chip";
import { SearchBar } from "@/components/pt/search-bar";
import { tujuanLabel, type KlienListItem, type Tujuan } from "@/lib/types/pt";
import { KlienCard } from "./klien-card";

type GoalFilter = "all" | Tujuan;

const PAGE_SIZE = 6;

interface KlienListProps {
  clients: KlienListItem[];
  isLoading: boolean;
}

// Toolbar + grid kartu / empty state + pagination (design/KLIEN.md, disederhanakan).
export function KlienList({ clients, isLoading }: KlienListProps) {
  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState<GoalFilter>("all");
  const [page, setPage] = useState(1);

  function handleQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleGoal(value: GoalFilter) {
    setGoal(value);
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((klien) => {
      const matchGoal = goal === "all" || klien.tujuan === goal;
      const matchQuery = !q || klien.nama.toLowerCase().includes(q);
      return matchGoal && matchQuery;
    });
  }, [clients, goal, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel bg-white p-4 shadow-card">
        <SearchBar
          value={query}
          onChange={handleQuery}
          placeholder="Cari klien berdasarkan nama..."
          className="min-w-[260px] flex-1 sm:max-w-[576px]"
        />
        <div className="flex flex-wrap items-center gap-1">
          <FilterChip active={goal === "all"} onClick={() => handleGoal("all")}>
            Semua ({clients.length})
          </FilterChip>
          <FilterChip
            active={goal === "naik_bb"}
            onClick={() => handleGoal("naik_bb")}
          >
            {tujuanLabel("naik_bb")}
          </FilterChip>
          <FilterChip
            active={goal === "turun_bb"}
            onClick={() => handleGoal("turun_bb")}
          >
            {tujuanLabel("turun_bb")}
          </FilterChip>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <KlienCardSkeleton key={i} />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <EmptyState
          icon={<Hourglass />}
          title="Belum ada klien terdaftar"
          description="Klien yang kamu tangani akan muncul di sini setelah mereka terhubung."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Hourglass />}
          title="Tidak ada klien yang cocok"
          description="Coba ubah kata kunci atau filter."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((klien) => (
            <KlienCard key={klien.id} klien={klien} />
          ))}
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-surface-alt px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Menampilkan {start + 1} - {start + visible.length} dari{" "}
            {filtered.length} Klien terdaftar
          </p>
          <div className="flex items-center gap-1">
            <PaginationButton
              aria-label="Halaman sebelumnya"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeft className="size-4" />
            </PaginationButton>
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const active = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "size-8 rounded-control text-xs font-semibold transition-colors",
                    active
                      ? "bg-primary text-on-primary"
                      : "text-ink-soft hover:bg-surface-tint"
                  )}
                >
                  {pageNumber}
                </button>
              );
            })}
            <PaginationButton
              aria-label="Halaman berikutnya"
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              <ChevronRight className="size-4" />
            </PaginationButton>
          </div>
        </div>
      )}
    </div>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-control bg-surface-tint text-ink-soft transition-colors hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-40"
      {...props}
    >
      {children}
    </button>
  );
}

function KlienCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-panel bg-white p-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="size-14 rounded-panel bg-surface-2" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-surface-2" />
          <div className="h-3 w-1/2 rounded bg-surface-2" />
        </div>
      </div>
      <div className="mt-4 h-6 w-28 rounded-pill bg-surface-2" />
      <div className="mt-4 h-10 rounded-card bg-surface-2" />
    </div>
  );
}
