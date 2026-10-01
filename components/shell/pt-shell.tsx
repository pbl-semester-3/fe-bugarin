"use client";

import {
  ClipboardCheck,
  History,
  LayoutDashboard,
  MessageSquare,
  UserCog,
  Users,
} from "lucide-react";
import { SidebarItem } from "@/components/sidebar-item";

const navItems = [
  { href: "/pt/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pt/verifikasi", label: "Verifikasi", icon: ClipboardCheck },
  { href: "/pt/klien", label: "Klien", icon: Users },
  { href: "/pt/riwayat", label: "Riwayat", icon: History },
  { href: "/pt/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/pt/profil", label: "Profil", icon: UserCog },
];

export function PtShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r p-4">
        <p className="mb-4 px-3 font-semibold">Bugarin PT</p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-6">
          {/* TODO slicing: tampilkan nama PT yang login + tombol toggle tema */}
          <span className="text-sm text-muted-foreground">
            Dashboard Personal Trainer
          </span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
