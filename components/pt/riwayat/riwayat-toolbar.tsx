"use client";

import { SegmentedControl } from "@/components/pt/segmented-control";
import type { RiwayatGender, RiwayatGoal } from "@/lib/mock/riwayat";

export type GoalFilter = "all" | RiwayatGoal;
export type GenderFilter = "all" | RiwayatGender;

interface RiwayatToolbarProps {
  goal: GoalFilter;
  gender: GenderFilter;
  onGoalChange: (value: GoalFilter) => void;
  onGenderChange: (value: GenderFilter) => void;
}

// Filter & Command Toolbar (design/RIWAYAT.md §3):
// segmented goal aktif oranye (brand), segmented gender aktif putih.
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
          { label: "All Goals", value: "all" },
          { label: "Weight Loss", value: "weight_loss" },
          { label: "Hypertrophy / Bulk", value: "hypertrophy" },
        ]}
      />
      <SegmentedControl
        activeVariant="white"
        value={gender}
        onChange={onGenderChange}
        options={[
          { label: "All", value: "all" },
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
        ]}
      />
    </div>
  );
}
