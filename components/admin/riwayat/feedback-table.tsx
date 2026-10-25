"use client";

import {
  Activity,
  Calendar,
  CalendarRange,
  ChevronRight,
  Dumbbell,
  Heart,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { AvatarCell } from "@/components/admin/avatar-cell";
import type { FeedbackCategory, FeedbackLog } from "@/lib/types/admin";
import { cn } from "cn";

const GRID_COLS = "1.2fr 1.6fr 1.6fr 1.5fr 1.2fr 0.8fr";

// Mapping kategori → label, icon, warna (design/admin/riwayat.md §4.3).
const CATEGORY_STYLE: Record<
  FeedbackCategory,
  { label: string; icon: LucideIcon; className: string }
> = {
  EVALUASI_MINGGUAN: {
    label: "Evaluasi Sesi Mingguan",
    icon: Calendar,
    className: "bg-primary/20 text-admin-green-deep",
  },
  EVALUASI_BULANAN: {
    label: "Evaluasi Bulanan",
    icon: CalendarRange,
    className: "bg-admin-track text-admin-navy",
  },
  KOREKSI_TEKNIK: {
    label: "Koreksi Teknik",
    icon: Dumbbell,
    className: "bg-admin-warning text-admin-warning-text",
  },
  PROGRESS_NUTRISI: {
    label: "Progress Nutrisi",
    icon: Utensils,
    className: "bg-onboarding-tint text-admin-brown",
  },
  MOTIVASI_KEPATUHAN: {
    label: "Motivasi & Kepatuhan",
    icon: Heart,
    className: "bg-mint-tint text-admin-mint-text",
  },
  PEMULIHAN_CEDERA: {
    label: "Pemulihan & Cedera",
    icon: Activity,
    className: "bg-admin-danger-tint text-admin-danger-text",
  },
};

function cohortColor(cohort: string) {
  return cohort.includes("Fat Loss")
    ? "text-admin-brown"
    : "text-admin-green-text";
}

interface FeedbackTableProps {
  rows: FeedbackLog[];
  onDetail: (row: FeedbackLog) => void;
}

// Tabel log feedback tab "Daftar Personal Trainer (PT)" (design/admin/riwayat.md §4).
export function FeedbackTable({ rows, onDetail }: FeedbackTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[960px]">
        <div
          className="grid h-12 items-center gap-4 border-b border-admin-low px-4 text-center text-[10px] font-bold tracking-widest text-admin-secondary uppercase"
          style={{ gridTemplateColumns: GRID_COLS }}
        >
          <span>Waktu & ID</span>
          <span>Personal Trainer</span>
          <span>Klien Penerima</span>
          <span>Kategori Feedback</span>
          <span>Catatan Evaluasi</span>
          <span>Tindakan</span>
        </div>

        {rows.map((row) => {
          const category = CATEGORY_STYLE[row.category];
          const CategoryIcon = category.icon;
          const ptLevel = [row.trainer.title, row.trainer.level]
            .filter(Boolean)
            .join(" • ");

          return (
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
                  sub={ptLevel}
                  nameClassName="text-xs"
                  subClassName="text-[10px]"
                />
              </div>

              <div className="flex justify-center">
                <AvatarCell
                  name={row.client.name}
                  size={32}
                  sub={row.client.cohort}
                  nameClassName="text-xs"
                  subClassName={cn("text-[10px]", cohortColor(row.client.cohort))}
                />
              </div>

              <div className="flex justify-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-bold",
                    category.className
                  )}
                >
                  <CategoryIcon className="size-3" />
                  {category.label}
                </span>
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
          );
        })}
      </div>
    </div>
  );
}
