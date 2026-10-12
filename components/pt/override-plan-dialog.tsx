"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOverrideWeeklyPlan } from "@/hooks/useKlienDetail";
import type { WeeklyPlan } from "@/lib/types/pt";

type WorkoutRow = { hari: string; jam: string; jenis: string };
type MealRow = { waktu: string; menu: string; estimasiKalori: string };

// Form override weekly plan (terstruktur, TANPA `lokasi` — backend inject dari tempat_gym).
export function OverridePlanDialog({
  klienId,
  plan,
}: {
  klienId: number;
  plan: WeeklyPlan;
}) {
  const [open, setOpen] = useState(false);
  const override = useOverrideWeeklyPlan(klienId);

  const [workout, setWorkout] = useState<WorkoutRow[]>(
    plan.workoutPlan.map((w) => ({ hari: w.hari, jam: w.jam, jenis: w.jenis }))
  );
  const [meal, setMeal] = useState<MealRow[]>(
    plan.mealPlan.map((m) => ({
      waktu: m.waktu,
      menu: m.menu,
      estimasiKalori: String(m.estimasiKalori),
    }))
  );

  const valid =
    workout.length > 0 &&
    meal.length > 0 &&
    workout.every((w) => w.hari && w.jam && w.jenis) &&
    meal.every(
      (m) => m.waktu && m.menu && Number(m.estimasiKalori) > 0
    );

  function submit() {
    if (!valid) return;
    override.mutate(
      {
        planId: plan.id,
        payload: {
          workoutPlan: workout.map((w) => ({
            hari: w.hari,
            jam: w.jam,
            jenis: w.jenis,
          })),
          mealPlan: meal.map((m) => ({
            waktu: m.waktu,
            menu: m.menu,
            estimasiKalori: Number(m.estimasiKalori),
          })),
        },
      },
      { onSuccess: () => setOpen(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-pill px-4">
          Override
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-panel sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Override Weekly Plan</DialogTitle>
          <DialogDescription>
            Ubah rencana latihan &amp; menu. Lokasi gym otomatis dari profil.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Rencana Latihan</Label>
            {workout.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  placeholder="Hari"
                  value={row.hari}
                  onChange={(e) =>
                    setWorkout((prev) =>
                      prev.map((r, idx) =>
                        idx === i ? { ...r, hari: e.target.value } : r
                      )
                    )
                  }
                />
                <Input
                  placeholder="Jam"
                  value={row.jam}
                  onChange={(e) =>
                    setWorkout((prev) =>
                      prev.map((r, idx) =>
                        idx === i ? { ...r, jam: e.target.value } : r
                      )
                    )
                  }
                />
                <Input
                  placeholder="Jenis"
                  value={row.jenis}
                  onChange={(e) =>
                    setWorkout((prev) =>
                      prev.map((r, idx) =>
                        idx === i ? { ...r, jenis: e.target.value } : r
                      )
                    )
                  }
                />
                <button
                  type="button"
                  aria-label="Hapus baris"
                  onClick={() =>
                    setWorkout((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="shrink-0 text-muted-foreground hover:text-danger-strong"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setWorkout((prev) => [...prev, { hari: "", jam: "", jenis: "" }])
              }
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-indigo"
            >
              <Plus className="size-3" /> Tambah latihan
            </button>
          </div>

          <div className="space-y-2">
            <Label>Rencana Menu</Label>
            {meal.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  placeholder="Waktu"
                  value={row.waktu}
                  onChange={(e) =>
                    setMeal((prev) =>
                      prev.map((r, idx) =>
                        idx === i ? { ...r, waktu: e.target.value } : r
                      )
                    )
                  }
                />
                <Input
                  placeholder="Menu"
                  value={row.menu}
                  onChange={(e) =>
                    setMeal((prev) =>
                      prev.map((r, idx) =>
                        idx === i ? { ...r, menu: e.target.value } : r
                      )
                    )
                  }
                />
                <Input
                  type="number"
                  placeholder="Kalori"
                  value={row.estimasiKalori}
                  onChange={(e) =>
                    setMeal((prev) =>
                      prev.map((r, idx) =>
                        idx === i
                          ? { ...r, estimasiKalori: e.target.value }
                          : r
                      )
                    )
                  }
                />
                <button
                  type="button"
                  aria-label="Hapus baris"
                  onClick={() =>
                    setMeal((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="shrink-0 text-muted-foreground hover:text-danger-strong"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setMeal((prev) => [
                  ...prev,
                  { waktu: "", menu: "", estimasiKalori: "" },
                ])
              }
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-indigo"
            >
              <Plus className="size-3" /> Tambah menu
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            variant="accent"
            className="rounded-pill"
            disabled={!valid || override.isPending}
            onClick={submit}
          >
            Simpan Override
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
