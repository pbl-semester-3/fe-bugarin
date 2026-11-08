"use client";

import { useEffect, useState } from "react";
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
import { useCheckWeeklyPlanConflicts, useOverrideWeeklyPlan } from "@/hooks/useKlienDetail";
import { apiErrorMessage, getFieldErrors } from "@/services/api";
import type { ScheduleConflict, WeeklyPlan } from "@/types/pt";

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
  const checkConflicts = useCheckWeeklyPlanConflicts();
  const [serverError, setServerError] = useState<string | null>(null);

  const [conflicts, setConflicts] = useState<ScheduleConflict[]>([]);
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);

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

  const workoutValid =
    workout.length > 0 && workout.every((w) => w.hari && w.jam && w.jenis);
  const valid =
    workoutValid &&
    meal.length > 0 &&
    meal.every((m) => m.waktu && m.menu && Number(m.estimasiKalori) > 0);

  // Cek bentrok real-time saat hari/jam diubah (debounce), termasuk saat dialog dibuka.
  const checkConflictsAsync = checkConflicts.mutateAsync;

  useEffect(() => {
    if (!open || !workoutValid) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setChecking(true);
      checkConflictsAsync({
        planId: plan.id,
        workoutPlan: workout.map((w) => ({ hari: w.hari, jam: w.jam, jenis: w.jenis })),
      })
        .then((result) => {
          if (cancelled) return;
          setConflicts(result);
          setCheckError(null);
        })
        .catch((err) => {
          if (cancelled) return;
          setConflicts([]);
          setCheckError(apiErrorMessage(err, "Gagal memeriksa bentrok jadwal."));
        })
        .finally(() => {
          if (!cancelled) setChecking(false);
        });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, workout, workoutValid, plan.id, checkConflictsAsync]);

  // Saat form belum valid/dialog tertutup, sembunyikan hasil cek lama.
  const activeConflicts = open && workoutValid ? conflicts : [];
  const activeCheckError = open && workoutValid ? checkError : null;
  const hasConflict = activeConflicts.length > 0;
  const saveDisabled =
    !valid ||
    override.isPending ||
    checking ||
    hasConflict ||
    activeCheckError !== null;

  async function submit() {
    if (!valid) return;
    setServerError(null);

    // Cek ulang sebelum menyimpan (server juga menolak bila bentrok).
    try {
      const fresh = await checkConflicts.mutateAsync({
        planId: plan.id,
        workoutPlan: workout.map((w) => ({ hari: w.hari, jam: w.jam, jenis: w.jenis })),
      });
      setConflicts(fresh);
      if (fresh.length > 0) {
        setServerError("Jadwal masih bentrok. Perbaiki hari/jam terlebih dahulu.");
        return;
      }
    } catch (err) {
      setServerError(apiErrorMessage(err, "Gagal memeriksa bentrok jadwal."));
      return;
    }

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
      {
        onSuccess: () => setOpen(false),
        onError: (err) => {
          const fields = getFieldErrors(err);
          const first = fields ? Object.values(fields)[0]?.[0] : null;
          setServerError(first ?? apiErrorMessage(err));
        },
      }
    );
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setConflicts([]);
      setCheckError(null);
      setChecking(false);
      setServerError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
            {workout.map((row, i) => {
              const rowConflicts = activeConflicts.filter(
                (c) => c.proposedIndex === i
              );
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
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
                  {rowConflicts.map((c, idx) => (
                    <p key={idx} className="pl-1 text-xs text-danger-strong">
                      {c.tipe === "dalam_plan"
                        ? `Bentrok dengan sesi lain di plan ini (${c.denganHari} ${c.denganJam}).`
                        : `Bentrok dengan ${c.denganNamaKlien} (${c.denganHari} ${c.denganJam}).`}
                    </p>
                  ))}
                </div>
              );
            })}
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

        {checking && (
          <p className="text-sm text-muted-foreground">Memeriksa bentrok jadwal...</p>
        )}
        {activeCheckError && (
          <p className="text-sm text-danger-strong">{activeCheckError}</p>
        )}
        {hasConflict && (
          <p className="text-sm text-danger-strong">
            Ada {activeConflicts.length} bentrok. Tombol simpan dinonaktifkan sampai
            jadwal bebas bentrok.
          </p>
        )}
        {serverError && (
          <p className="text-sm text-danger-strong">{serverError}</p>
        )}

        <DialogFooter>
          <Button variant="ghost" type="button" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            variant="accent"
            className="rounded-pill"
            disabled={saveDisabled}
            onClick={submit}
          >
            Simpan Override
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
