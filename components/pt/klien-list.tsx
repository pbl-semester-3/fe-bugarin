"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Hourglass,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "cn";
import { EmptyState } from "@/components/pt/empty-state";
import { FilterChip } from "@/components/pt/filter-chip";
import { SearchBar } from "@/components/pt/search-bar";
import { GOAL_LABELS, type Klien, type KlienGoal } from "@/lib/mock/klien";
import { KlienCard } from "./klien-card";

type GoalFilter = "all" | KlienGoal;

const PAGE_SIZE = 6;

interface KlienListProps {
  clients: Klien[];
  isLoading: boolean;
}

// Toolbar + grid kartu / empty state + pagination (design/KLIEN.md §3–§5).
export function KlienList({ clients, isLoading }: KlienListProps) {
  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState<GoalFilter>("all");
  const [page, setPage] = useState(1);

  // Reset ke halaman 1 setiap filter/pencarian berubah.
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
      const matchGoal = goal === "all" || klien.goal === goal;
      const matchQuery =
        !q ||
        klien.nama.toLowerCase().includes(q) ||
        klien.email.toLowerCase().includes(q);
      return matchGoal && matchQuery;
    });
  }, [clients, goal, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Filter & Telemetry Bar (§3) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-panel bg-white p-4 shadow-card">
        <SearchBar
          value={query}
          onChange={handleQuery}
          placeholder="Search athlete by name, email, or protocol..."
          className="min-w-[260px] flex-1 sm:max-w-[576px]"
        />
        <div className="flex flex-wrap items-center gap-1">
          <FilterChip active={goal === "all"} onClick={() => handleGoal("all")}>
            All ({clients.length})
          </FilterChip>
          <FilterChip
            active={goal === "hypertrophy"}
            onClick={() => handleGoal("hypertrophy")}
          >
            {GOAL_LABELS.hypertrophy}
          </FilterChip>
          <FilterChip
            active={goal === "weight_loss"}
            onClick={() => handleGoal("weight_loss")}
          >
            {GOAL_LABELS.weight_loss}
          </FilterChip>
          <span className="mx-1 h-6 w-px bg-surface-3" />
          {/* Dropdown status (§3) — visual; perilaku filter menyusul saat backend siap. */}
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-pill bg-surface-tint px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-surface-2"
          >
            <SlidersHorizontal className="size-3" />
            Status: Active
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <KlienCardSkeleton key={i} />
          ))}
        </div>
      ) : clients.length === 0 ? (
        /* Tidak ada klien sama sekali (§4.3) */
        <EmptyState
          icon={<Hourglass />}
          title="Belum ada klien terdaftar"
          description="Klien yang kamu tangani akan muncul di sini setelah mereka terhubung."
        />
      ) : filtered.length === 0 ? (
        /* Hasil filter/pencarian kosong (§4.3) */
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

      {/* Table Footer / Pagination Deck (§5) */}
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

// Skeleton dengan dimensi tetap supaya layout tidak bergeser saat data datang.
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
      <div className="mt-4 h-[70px] rounded-card bg-surface-2" />
      <div className="mt-4 h-10 rounded-card bg-surface-2" />
    </div>
  );
}
