"use client";

import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Moon,
  Sun,
  UserCog,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { SidebarBrand } from "@/components/shell/sidebar-brand";
import { SidebarItem } from "@/components/shell/sidebar-item";
import { PtNotificationBell } from "@/components/shell/notifications/pt-notification-bell";
import { useLogout } from "@/hooks/useAuth";
import { usePairingRequests } from "@/hooks/usePairingRequests";
import { usePtTheme } from "@/hooks/usePtTheme";
import { usePtProfile, useUpdatePtTheme } from "@/hooks/usePtProfile";
import { apiErrorMessage } from "@/services/api";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/verifikasi", label: "Verifikasi", icon: ClipboardCheck },
  { href: "/klien", label: "Klien", icon: Users },
  { href: "/riwayat", label: "Riwayat", icon: History },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/profil", label: "Profil", icon: UserCog },
];

// Mengikuti layout global docs/DESIGN_PT.md §5.
export function PtShell({ children }: { children: React.ReactNode }) {
  // Badge notifikasi menu Verifikasi = jumlah pengajuan pending (design/VERIFIKASI.md §1).
  const { data: pairingRequests } = usePairingRequests();
  const pendingCount = pairingRequests?.length ?? 0;
  // Nama PT yang login (dari GET /pt/profile).
  const { data: profile } = usePtProfile();
  const namaPt = profile?.profile.nama ?? "Coach";
  const fotoUrl = profile?.profile.fotoUrl ?? null;

  const logout = useLogout();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const { theme, setPtTheme } = usePtTheme();
  const updateTheme = useUpdatePtTheme();

  useEffect(() => {
    if (profile?.user.tema) {
      setPtTheme(profile.user.tema);
    }
  }, [profile?.user.tema, setPtTheme]);

  function handleLogout() {
    setLogoutError(null);
    logout.mutate(undefined, {
      onError: (err) => setLogoutError(apiErrorMessage(err)),
    });
  }

  function toggleDark() {
    const next = theme === "malam" ? "siang" : "malam";
    setPtTheme(next);
    updateTheme.mutate(next);
  }

  return (
    <div className="flex min-h-screen bg-surface-tint dark:bg-[#0b1c30]">
      {/* Sidebar sticky: tetap di tempat walau konten halaman panjang (tidak ikut scroll). */}
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sidebar p-4">
        <SidebarBrand subtitle="PT Platform" />

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              badgeCount={
                item.href === "/verifikasi" ? pendingCount : undefined
              }
            />
          ))}
        </nav>

        <div className="mt-auto space-y-3 pt-6">
          <div className="flex items-center gap-3 rounded-card bg-white/10 p-3">
            <Avatar name={namaPt} src={fotoUrl} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {namaPt}
              </p>
              <p className="truncate text-xs text-white/50">
                Performance Coach
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logout.isPending}
            className="flex w-full items-center gap-2 px-3 text-xs font-medium text-danger transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            <LogOut className="size-4" />
            {logout.isPending ? "Keluar..." : "Exit"}
          </button>
          {logoutError && (
            <p className="px-3 text-[10px] leading-tight text-danger">
              {logoutError}
            </p>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b border-surface-4 bg-white px-6">
          <button
            type="button"
            onClick={toggleDark}
            aria-label={
              theme === "malam" ? "Kembali ke mode terang" : "Aktifkan mode gelap"
            }
            className="text-ink-soft transition-colors hover:text-ink"
          >
            {theme === "malam" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
          <PtNotificationBell />
          <Avatar name={namaPt} src={fotoUrl} size={32} />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
