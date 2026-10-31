"use client";

import { useEffect, useState } from "react";
import {
  History,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  UserCog,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { AdminNotificationBell } from "@/components/admin/notifications/admin-notification-bell";
import { SidebarItem } from "@/components/sidebar-item";
import { useAdminProfile, useUpdateAdminTema } from "@/hooks/useAdminProfile";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import { useLogout } from "@/hooks/useAuth";
import { apiErrorMessage } from "@/lib/api";
import { adminProfileName } from "@/lib/types/admin";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Kelola Pengguna", icon: Users },
  { href: "/admin/riwayat", label: "Riwayat", icon: History },
  { href: "/admin/profil", label: "Profil", icon: UserCog },
];

// Shell halaman Admin (design/admin/dashboard-admin.md §2–§3):
// sidebar gelap 256px + topbar putih 64px + konten bg #F8F9FF.
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: profile } = useAdminProfile();
  const namaAdmin = adminProfileName(profile);
  const fotoUrl = profile?.photoUrl ?? null;

  const logout = useLogout();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const { theme, setAdminTheme } = useAdminTheme();
  const updateTema = useUpdateAdminTema();

  // Tema dari backend menjadi sumber awal; toggle tetap tersimpan lokal saat request.
  useEffect(() => {
    if (profile?.tema) {
      setAdminTheme(profile.tema === "malam" ? "dark" : "light");
    }
  }, [profile?.tema, setAdminTheme]);

  function handleToggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setAdminTheme(next);
    updateTema.mutate(next === "dark" ? "malam" : "siang");
  }

  function handleLogout() {
    setLogoutError(null);
    logout.mutate(undefined, {
      onError: (err) => setLogoutError(apiErrorMessage(err)),
    });
  }

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sidebar p-4">
        <div className="px-3 pt-2 pb-6">
          <p className="text-lg font-bold text-white">Bugarin</p>
          <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
            Admin
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="mt-auto space-y-3 pt-6">
          <div className="flex items-center gap-3 rounded-card bg-white/10 p-3">
            <Avatar name={namaAdmin} src={fotoUrl} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {namaAdmin}
              </p>
              <p className="truncate text-xs text-white/50">Admin</p>
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
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b border-surface-4 bg-admin-surface px-6">
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={theme === "dark" ? "Kembali ke mode terang" : "Aktifkan mode gelap"}
            className="text-admin-secondary transition-colors hover:text-admin-heading"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
          <AdminNotificationBell />
          <Avatar name={namaAdmin} src={fotoUrl} size={32} />
        </header>

        <main className="flex-1 px-8 pt-6 pb-8">{children}</main>
      </div>
    </div>
  );
}
