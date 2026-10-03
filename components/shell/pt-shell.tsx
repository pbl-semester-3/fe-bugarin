"use client";

import {
  Bell,
  ClipboardCheck,
  History,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Moon,
  UserCog,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { SidebarItem } from "@/components/sidebar-item";
import { usePairingRequests } from "@/hooks/usePairingRequests";

const navItems = [
  { href: "/pt/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pt/verifikasi", label: "Verifikasi", icon: ClipboardCheck },
  { href: "/pt/klien", label: "Klien", icon: Users },
  { href: "/pt/riwayat", label: "Riwayat", icon: History },
  { href: "/pt/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/pt/profil", label: "Profil", icon: UserCog },
];

// Mengikuti layout global docs/DESIGN_PT.md §5.
export function PtShell({ children }: { children: React.ReactNode }) {
  // Badge notifikasi menu Verifikasi = jumlah pengajuan pending (design/VERIFIKASI.md §1).
  const { data: pairingRequests } = usePairingRequests();
  const pendingCount = pairingRequests?.length ?? 0;

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <div className="flex min-h-screen bg-surface-tint">
      {/* Sidebar sticky: tetap di tempat walau konten halaman panjang (tidak ikut scroll). */}
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sidebar p-4">
        <div className="px-3 pt-2 pb-6">
          <p className="text-lg font-bold text-white">Bugarin</p>
          <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
            PT Platform
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              badgeCount={
                item.href === "/pt/verifikasi" ? pendingCount : undefined
              }
            />
          ))}
        </nav>

        <div className="mt-auto space-y-3 pt-6">
          <div className="flex items-center gap-3 rounded-card bg-white/10 p-3">
            <Avatar name="Alex Vance" size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Alex Vance
              </p>
              <p className="truncate text-xs text-white/50">
                Performance Coach
              </p>
            </div>
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 text-xs font-medium text-danger transition-opacity hover:opacity-80"
          >
            <LogOut className="size-4" />
            Exit
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b border-surface-4 bg-white px-6">
          <button
            type="button"
            onClick={toggleDark}
            aria-label="Toggle tema"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            <Moon className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative text-ink-soft transition-colors hover:text-ink"
          >
            <Bell className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-danger" />
          </button>
          <Avatar name="Alex Vance" size={32} />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
