import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "cn";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Teks kiri varian Kelola Pengguna: "Menampilkan 1 - 5 dari 1,428 Klien terdaftar • Hal 1 dari 286". */
  from?: number;
  to?: number;
  total?: number;
  unit?: string;
  /** Teks kiri varian Riwayat: "Baris per halaman: 10". */
  perPage?: number;
  /** First/last buttons (Kelola Pengguna = true, Riwayat = false). */
  showFirstLast?: boolean;
  className?: string;
}

function pageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const first = [1, 2, 3].filter((n) => n <= totalPages);
  if (page > 3 && page < totalPages) {
    return [1, "…", page, "…", totalPages];
  }
  return [...first, "…", totalPages];
}

function formatNumber(value: number) {
  return value.toLocaleString("id-ID");
}

// Pagination Admin (design/admin/kelola-pengguna.md §3.8, riwayat.md §3.3).
export function AdminPagination({
  page,
  totalPages,
  onPageChange,
  from,
  to,
  total,
  unit,
  perPage,
  showFirstLast = true,
  className,
}: AdminPaginationProps) {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const iconButtonClass =
    "flex size-7 items-center justify-center rounded-md bg-admin-low text-admin-heading transition-opacity disabled:opacity-40 [&_svg]:size-3.5";
  const arrowClass =
    "flex size-7 items-center justify-center text-admin-heading transition-opacity disabled:opacity-40 [&_svg]:size-3.5";

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-admin-surface px-4 py-4",
        className
      )}
    >
      <p className="text-[11px] text-admin-secondary">
        {perPage !== undefined ? (
          <>
            Baris per halaman:{" "}
            <span className="font-bold text-admin-heading">{perPage}</span>
          </>
        ) : (
          <>
            Menampilkan{" "}
            <span className="font-bold text-admin-heading">
              {from} - {to}
            </span>{" "}
            dari{" "}
            <span className="font-bold text-admin-heading">
              {total !== undefined ? formatNumber(total) : 0} {unit}
            </span>{" "}
            • Hal <span className="font-bold text-admin-heading">{page}</span>{" "}
            dari{" "}
            <span className="font-bold text-admin-heading">{totalPages}</span>
          </>
        )}
      </p>

      <div className="flex items-center gap-1">
        {showFirstLast ? (
          <>
            <button
              type="button"
              aria-label="Halaman pertama"
              className={iconButtonClass}
              disabled={isFirst}
              onClick={() => onPageChange(1)}
            >
              <ChevronsLeft />
            </button>
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              className={iconButtonClass}
              disabled={isFirst}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft />
            </button>
          </>
        ) : (
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            className={arrowClass}
            disabled={isFirst}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft />
          </button>
        )}

        {pageNumbers(page, totalPages).map((item, index) =>
          item === "…" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-[11px] text-admin-heading"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={cn(
                "flex size-7 items-center justify-center rounded-md text-[11px]",
                item === page
                  ? "bg-primary font-bold text-on-primary"
                  : "text-admin-heading hover:bg-admin-low"
              )}
            >
              {item}
            </button>
          )
        )}

        {showFirstLast ? (
          <>
            <button
              type="button"
              aria-label="Halaman berikutnya"
              className={iconButtonClass}
              disabled={isLast}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight />
            </button>
            <button
              type="button"
              aria-label="Halaman terakhir"
              className={iconButtonClass}
              disabled={isLast}
              onClick={() => onPageChange(totalPages)}
            >
              <ChevronsRight />
            </button>
          </>
        ) : (
          <button
            type="button"
            aria-label="Halaman berikutnya"
            className={arrowClass}
            disabled={isLast}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
