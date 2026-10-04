"use client";

import { SegmentedControl } from "@/components/pt/segmented-control";
import {
  riwayatGenderLabel,
  type RiwayatGender,
  type RiwayatGoal,
} from "@/lib/mock/riwayat";

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
          { label: "Semua", value: "all" },
          { label: "Naik BB", value: "hypertrophy" },
          { label: "Turun BB", value: "weight_loss" },
        ]}
      />
      <SegmentedControl
        activeVariant="white"
        value={gender}
        onChange={onGenderChange}
        options={[
          { label: "Semua", value: "all" },
          { label: riwayatGenderLabel("female"), value: "female" },
          { label: riwayatGenderLabel("male"), value: "male" },
        ]}
      />
    </div>
  );
}
