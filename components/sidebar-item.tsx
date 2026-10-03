"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { type LucideIcon } from "lucide-react";

interface SidebarItemProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  badgeCount?: number;
}

// Item nav sidebar gelap desain PT (docs/DESIGN_PT.md §5.1).
// Default: putih ~70%; aktif: background primary, teks putih.
// badgeCount: notifikasi merah di kanan item (mis. jumlah pengajuan pending).
export function SidebarItem({
  href,
  label,
  icon: Icon,
  badgeCount,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-control px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-on-primary"
          : "text-white/70 hover:bg-sidebar-accent hover:text-white"
      )}
    >
      {Icon && <Icon className="size-5 shrink-0" />}
      <span>{label}</span>
      {badgeCount && badgeCount > 0 ? (
        <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-semibold text-white">
          {badgeCount}
        </span>
      ) : null}
    </Link>
  );
}
