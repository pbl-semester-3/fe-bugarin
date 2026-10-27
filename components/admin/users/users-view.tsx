"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Users } from "lucide-react";
import { AdminFilterBar, type AdminFilterSelect } from "@/components/admin/filter-bar";
import { PageBanner } from "@/components/admin/page-banner";
import { AdminPagination } from "@/components/admin/pagination";
import { AdminStatCard } from "@/components/admin/stat-card";
import { AdminTabSwitcher } from "@/components/admin/tab-switcher";
import { TableCard } from "@/components/admin/table-card";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { useAdminKlien, useDeleteKlien } from "@/hooks/useAdminKlien";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useAdminTrainers, useDeleteTrainer } from "@/hooks/useAdminTrainers";
import type { ClientRow, TrainerRow } from "@/lib/types/admin";
import { CreateTrainerDialog } from "./create-trainer-dialog";
import { KlienTable } from "./klien-table";
import { PtTable } from "./pt-table";

const PER_PAGE = 5;

type TabValue = "klien" | "pt";

// View Kelola Pengguna (design/admin/kelola-pengguna.md): 1 halaman, 2 tab.
export function UsersView({ initialTab }: { initialTab: TabValue }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabValue>(initialTab);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [secondFilter, setSecondFilter] = useState("all");
  const [thirdFilter, setThirdFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<
    | { type: "klien"; row: ClientRow }
    | { type: "pt"; row: TrainerRow }
    | null
  >(null);

  const { data: klienData, isLoading: isKlienLoading } = useAdminKlien();
  const { data: trainerData, isLoading: isTrainersLoading } = useAdminTrainers();
  const { data: dashboard } = useAdminDashboard();
  const deleteKlien = useDeleteKlien();
  const deleteTrainer = useDeleteTrainer();

  const trainers = useMemo(() => trainerData ?? [], [trainerData]);
  // Foto PT tidak ikut di response list klien, jadi ambil dari data PT
  // (kunci: nama PT yang sama dengan `ptNama`).
  const trainerPhotoByName = useMemo(
    () => new Map(trainers.map((trainer) => [trainer.name, trainer.photoUrl])),
    [trainers]
  );
  const clients = useMemo(
    () =>
      (klienData ?? []).map((client) => ({
        ...client,
        trainerPhotoUrl: client.trainer
          ? trainerPhotoByName.get(client.trainer) ?? null
          : null,
      })),
    [klienData, trainerPhotoByName]
  );
  const totalActiveClients = dashboard?.totalKlien ?? 0;
  const clientsConnectedToPT = dashboard?.totalPairingAktif ?? 0;
  const activeTrainerCount = useMemo(
    () => trainers.filter((trainer) => trainer.status === "AKTIF").length,
    [trainers]
  );

  function changeTab(next: TabValue) {
    setTab(next);
    setSearch("");
    setStatusFilter("all");
    setSecondFilter("all");
    setThirdFilter("all");
    setPage(1);
    router.replace(`/admin/users?tab=${next}`);
  }

  function resetPage() {
    setPage(1);
  }

  const filteredClients = useMemo(
    () =>
      clients.filter((client) => {
        const keyword = search.toLowerCase();
        const matchSearch =
          !keyword ||
          client.name.toLowerCase().includes(keyword) ||
          client.email.toLowerCase().includes(keyword) ||
          (client.trainer ?? "").toLowerCase().includes(keyword);
        const matchStatus =
          statusFilter === "all" || client.status === statusFilter;
        const matchProgram =
          secondFilter === "all" ||
          (secondFilter === "none"
            ? client.program === null
            : client.program === secondFilter);
        const matchTrainer =
          thirdFilter === "all" || client.trainer === thirdFilter;
        return matchSearch && matchStatus && matchProgram && matchTrainer;
      }),
    [clients, search, statusFilter, secondFilter, thirdFilter]
  );

  const filteredTrainers = useMemo(
    () =>
      trainers.filter((trainer) => {
        const keyword = search.toLowerCase();
        const matchSearch =
          !keyword ||
          trainer.name.toLowerCase().includes(keyword) ||
          trainer.email.toLowerCase().includes(keyword) ||
          trainer.trainerId.toLowerCase().includes(keyword);
        const matchStatus =
          statusFilter === "all" || trainer.status === statusFilter;
        const matchSpec =
          secondFilter === "all" || trainer.specialization === secondFilter;
        const matchBranch =
          thirdFilter === "all" || trainer.branch === thirdFilter;
        return matchSearch && matchStatus && matchSpec && matchBranch;
      }),
    [trainers, search, statusFilter, secondFilter, thirdFilter]
  );

  const isKlien = tab === "klien";
  const isLoading = isKlien ? isKlienLoading : isTrainersLoading;
  const total = isKlien ? filteredClients.length : filteredTrainers.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const pagedClients = filteredClients.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE
  );
  const pagedTrainers = filteredTrainers.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE
  );

  const selects: AdminFilterSelect[] = isKlien
    ? [
        {
          value: statusFilter,
          onValueChange: (v) => {
            setStatusFilter(v);
            resetPage();
          },
          placeholder: "Semua Status Klien",
          options: [
            { value: "all", label: "Semua Status Klien" },
            { value: "AKTIF", label: "AKTIF" },
            { value: "ONBOARDING", label: "ONBOARDING" },
          ],
        },
        {
          value: secondFilter,
          onValueChange: (v) => {
            setSecondFilter(v);
            resetPage();
          },
          placeholder: "Semua Program & Cohort",
          options: [
            { value: "all", label: "Semua Program & Cohort" },
            { value: "Naik Berat Badan", label: "Naik Berat Badan" },
            { value: "Turun Berat Badan", label: "Turun Berat Badan" },
            { value: "none", label: "Belum ada program" },
          ],
        },
        {
          value: thirdFilter,
          onValueChange: (v) => {
            setThirdFilter(v);
            resetPage();
          },
          placeholder: "Semua Personal Trainer Pendamping",
          options: [
            { value: "all", label: "Semua Personal Trainer Pendamping" },
            ...Array.from(
              new Set(clients.map((c) => c.trainer).filter(Boolean))
            ).map((t) => ({ value: t as string, label: t as string })),
          ],
        },
      ]
    : [
        {
          value: statusFilter,
          onValueChange: (v) => {
            setStatusFilter(v);
            resetPage();
          },
          placeholder: "Semua Status PT",
          options: [
            { value: "all", label: "Semua Status PT" },
            { value: "AKTIF", label: "AKTIF" },
            { value: "NONAKTIF", label: "NONAKTIF" },
          ],
        },
        {
          value: secondFilter,
          onValueChange: (v) => {
            setSecondFilter(v);
            resetPage();
          },
          placeholder: "Semua Keahlian",
          options: [
            { value: "all", label: "Semua Keahlian" },
            { value: "Naik BB", label: "Naik BB" },
            { value: "Turun BB", label: "Turun BB" },
          ],
        },
        {
          value: thirdFilter,
          onValueChange: (v) => {
            setThirdFilter(v);
            resetPage();
          },
          placeholder: "Semua Cabang Gym",
          options: [
            { value: "all", label: "Semua Cabang Gym" },
            ...Array.from(new Set(trainers.map((t) => t.branch))).map(
              (branch) => ({ value: branch, label: branch })
            ),
          ],
        },
      ];

  const from = total === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
  const to = Math.min(safePage * PER_PAGE, total);

  return (
    <div className="space-y-6">
      <PageBanner
        gradient
        title="Manajemen Terpusat Klien & Atlet Bugarin"
        description={`Pantau ${totalActiveClients.toLocaleString("id-ID")} atlet aktif, alokasi Personal Trainer pendamping, program latihan aktif, serta kepatuhan biometrik atlet secara real-time.`}
      />

      <div className="grid grid-cols-1 gap-4 pb-2 sm:grid-cols-2">
        <AdminStatCard
          icon={<Users />}
          label="Total Klien Aktif"
          value={totalActiveClients.toLocaleString("id-ID")}
          className="h-[133px]"
        />
        <AdminStatCard
          icon={<Users />}
          label="Klien Terhubung PT"
          value={clientsConnectedToPT.toLocaleString("id-ID")}
          className="h-[133px]"
        />
      </div>

      <AdminTabSwitcher
        value={tab}
        onValueChange={(v) => changeTab(v as TabValue)}
        tabs={[
          {
            value: "pt",
            label: "Daftar Personal Trainer (PT)",
            badge: `${activeTrainerCount} Aktif`,
          },
          {
            value: "klien",
            label: "Daftar Klien",
            badge: `${totalActiveClients.toLocaleString("id-ID")} Aktif`,
          },
        ]}
        action={
          tab === "pt" ? (
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 rounded-control bg-brand px-4 py-2 text-xs font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              <UserPlus className="size-4" />
              Daftarkan PT Baru
            </button>
          ) : undefined
        }
      />

      <TableCard>
        <div className="px-4 pt-4 pb-4">
          <AdminFilterBar
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              resetPage();
            }}
            searchPlaceholder={
              isKlien
                ? "Cari nama klien, email, atau nama PT..."
                : "Cari nama PT, email, atau ID trainer..."
            }
            selects={selects}
          />
        </div>

        {isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-control bg-admin-low"
              />
            ))}
          </div>
        ) : isKlien ? (
          pagedClients.length === 0 ? (
            <p className="py-16 text-center text-sm text-admin-secondary">
              Tidak ada data yang cocok
            </p>
          ) : (
            <KlienTable
              rows={pagedClients}
              onDelete={(row) => setDeleteTarget({ type: "klien", row })}
            />
          )
        ) : pagedTrainers.length === 0 ? (
          <p className="py-16 text-center text-sm text-admin-secondary">
            Tidak ada data yang cocok
          </p>
        ) : (
          <PtTable
            rows={pagedTrainers}
            onEdit={(row) => router.push(`/admin/users/pt/${row.id}/edit`)}
            onDelete={(row) => setDeleteTarget({ type: "pt", row })}
          />
        )}

        <AdminPagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          from={from}
          to={to}
          total={total}
          unit={isKlien ? "Klien terdaftar" : "PT terdaftar"}
        />
      </TableCard>

      <CreateTrainerDialog open={createOpen} onOpenChange={setCreateOpen} />

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title={
          deleteTarget?.type === "klien"
            ? "Konfirmasi Hapus Klien"
            : "Konfirmasi Hapus PT"
        }
        question={
          deleteTarget?.type === "klien"
            ? "Yakin Menghapus Akun Klien?"
            : "Yakin Menghapus Akun PT?"
        }
        isPending={
          deleteTarget?.type === "pt"
            ? deleteTrainer.isPending
            : deleteKlien.isPending
        }
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.type === "pt") {
            deleteTrainer.mutate(deleteTarget.row.id, {
              onSuccess: () => setDeleteTarget(null),
            });
            return;
          }
          deleteKlien.mutate(deleteTarget.row.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />
    </div>
  );
}
