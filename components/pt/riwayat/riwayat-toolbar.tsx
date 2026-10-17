"use client";

import { SegmentedControl } from "@/components/pt/segmented-control";
import { genderLabel, type JenisKelamin, type Tujuan } from "@/lib/types/pt";

export type GoalFilter = "all" | Tujuan;
export type GenderFilter = "all" | JenisKelamin;

interface RiwayatToolbarProps {
  goal: GoalFilter;
  gender: GenderFilter;
  onGoalChange: (value: GoalFilter) => void;
  onGenderChange: (value: GenderFilter) => void;
}

// Filter & Command Toolbar (design/RIWAYAT.md §3):
// segmented tujuan aktif oranye (brand), segmented gender aktif putih.
export function RiwayatToolbar({
  goal,
  gender,
  onGoalChange,
  onGenderChange,
}: RiwayatToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-white p-4 shadow-card">
      <SegmentedControl
        activeVariant="brand"
        value={goal}
        onChange={onGoalChange}
        options={[
          { label: "Semua", value: "all" },
          { label: "Naik BB", value: "naik_bb" },
          { label: "Turun BB", value: "turun_bb" },
        ]}
      />
      <SegmentedControl
        activeVariant="brand"
        value={gender}
        onChange={onGenderChange}
        options={[
          { label: "Semua", value: "all" },
          { label: genderLabel("wanita"), value: "wanita" },
          { label: genderLabel("pria"), value: "pria" },
        ]}
      />
    </div>
  );
}
