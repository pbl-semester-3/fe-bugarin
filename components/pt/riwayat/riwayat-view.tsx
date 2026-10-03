"use client";

import { useMemo, useState } from "react";
import type { RiwayatRow } from "@/lib/mock/riwayat";
import { RiwayatTable } from "./riwayat-table";
import {
  RiwayatToolbar,
  type GenderFilter,
  type GoalFilter,
} from "./riwayat-toolbar";

// Toolbar + tabel (design/RIWAYAT.md §3–§4). Filter client-side.
export function RiwayatView({
  rows,
  isLoading,
}: {
  rows: RiwayatRow[];
  isLoading: boolean;
}) {
  const [goal, setGoal] = useState<GoalFilter>("all");
  const [gender, setGender] = useState<GenderFilter>("all");

  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          (goal === "all" || row.goal === goal) &&
          (gender === "all" || row.gender === gender)
      ),
    [rows, goal, gender]
  );

  return (
    <div className="space-y-6">
      <RiwayatToolbar
        goal={goal}
        gender={gender}
        onGoalChange={setGoal}
        onGenderChange={setGender}
      />
      <RiwayatTable rows={filtered} isLoading={isLoading} />
    </div>
  );
}
