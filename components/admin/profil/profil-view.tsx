"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { History, IdCard, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { useAdminProfile } from "@/hooks/useAdminProfile";
import { adminProfileName } from "@/lib/types/admin";
import { InfoForm } from "./info-form";
import { SecurityForm } from "./security-form";
import { cn } from "cn";

type TabValue = "info" | "keamanan";

function formatLastUpdated(iso: string) {
  const date = new Date(iso);
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const now = new Date();
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / 86_400_000
  );
  if (diffDays === 0) return `HARI INI, ${time} WIB`;
  if (diffDays === 1) return `KEMARIN, ${time} WIB`;
  return `${date
    .toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    .toUpperCase()}, ${time} WIB`;
}

const TABS: { value: TabValue; label: string; icon: typeof IdCard }[] = [
  { value: "info", label: "Informasi Data Diri", icon: IdCard },
  { value: "keamanan", label: "Keamanan & Ganti Password", icon: ShieldCheck },
];

// View Profil Admin (design/admin/profil.md): banner + tab bar + card form 8/12 kolom.
export function ProfilView({ initialTab }: { initialTab: TabValue }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabValue>(initialTab);
  const { data: profile, isLoading } = useAdminProfile();

  const nama = adminProfileName(profile);

  function changeTab(next: TabValue) {
    setTab(next);
    router.replace(`/admin/profil?tab=${next === "keamanan" ? "keamanan" : "info"}`);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-36 animate-pulse rounded-card bg-admin-surface" />
        <div className="h-12 animate-pulse rounded-card bg-admin-surface" />
        <div className="h-96 animate-pulse rounded-card bg-admin-surface lg:w-2/3" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner Profil (§3.1) */}
      <div className="flex items-center gap-6 rounded-card bg-admin-banner p-6 shadow-card">
        <Avatar
          name={nama}
          src={profile?.photoUrl ?? null}
          size={104}
          shape="square"
          className="rounded-card shadow-card [&_span]:rounded-card"
        />
        <h1 className="text-[28px] font-bold text-white">{nama}</h1>
      </div>

      {/* Tab bar (§3.2) */}
      <div className="flex h-12 items-center justify-between rounded-card bg-admin-surface px-3 shadow-card">
        <div className="flex items-center gap-1">
          {TABS.map((item) => {
            const active = tab === item.value;
            const Icon = item.icon;
            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => changeTab(item.value)}
                className={cn(
                  "flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium transition-colors",
                  active
                    ? "bg-brand text-on-accent"
                    : "text-admin-heading hover:bg-admin-low"
                )}
              >
                <Icon className="size-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
        {profile && (
          <p className="flex items-center gap-1.5 pr-2 text-[10px] font-bold tracking-wider text-admin-heading uppercase">
            <History className="size-3.5 text-admin-green-text" />
            Terakhir diubah: {formatLastUpdated(profile.lastUpdatedAt)}
          </p>
        )}
      </div>

      {/* Card form — span 8 dari 12 kolom (§3.3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <section className="rounded-panel bg-admin-surface p-8 shadow-card lg:col-span-8">
          <h2 className="text-xl font-semibold text-admin-heading">
            {tab === "info"
              ? "Data Diri Pejabat Eksekutif"
              : "Ubah Kata Sandi Root Admin"}
          </h2>
          <p className="mt-1 text-xs text-[#41493A]">
            {tab === "info"
              ? "Informasi ini tercatat pada berkas audit internal platform Bugarin Enterprise."
              : "Perbarui kata sandi akun super admin secara berkala untuk memitigasi risiko keamanan platform."}
          </p>

          <div className="mt-6">
            {tab === "info" ? <InfoForm /> : <SecurityForm />}
          </div>
        </section>
      </div>
    </div>
  );
}
