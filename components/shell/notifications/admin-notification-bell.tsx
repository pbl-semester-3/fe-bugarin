"use client";

import { useRouter } from "next/navigation";
import { Bell, BellOff, Clock, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import { cn } from "cn";

const ICONS = {
  pairing: Clock,
  onboarding: Users,
};

// Lonceng notifikasi Admin: ringkasan onboarding & pairing dari dashboard.
export function AdminNotificationBell() {
  const router = useRouter();
  const {
    items,
    hasUnread,
    markAllRead,
    isLoading,
    isError,
    refetch,
    isReady,
  } = useAdminNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative text-admin-secondary transition-colors hover:text-admin-heading"
        >
          <Bell className="size-5" />
          {isReady && hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-danger-strong" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[340px] p-0">
        <div className="flex items-start justify-between gap-3 border-b border-admin-track px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-admin-heading">Notifikasi</p>
            <p className="mt-0.5 text-[10px] text-admin-secondary">
              {hasUnread ? "Ada pembaruan baru" : "Semua sudah dibaca"}
            </p>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            disabled={!hasUnread}
            className="text-[10px] font-medium text-admin-green-text transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40"
          >
            Tandai semua dibaca
          </button>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-1">
          {!isReady || isLoading ? (
            <div className="space-y-2 p-2">
              <div className="h-10 animate-pulse rounded-control bg-admin-low" />
              <div className="h-10 animate-pulse rounded-control bg-admin-low" />
            </div>
          ) : isError ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-admin-secondary">
                Gagal memuat notifikasi.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 text-[11px] font-medium text-admin-green-text"
              >
                Coba lagi
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center px-3 py-7 text-center">
              <BellOff className="size-6 text-admin-secondary" />
              <p className="mt-2 text-xs font-medium text-admin-heading">
                Belum ada notifikasi
              </p>
              <p className="mt-0.5 text-[10px] text-admin-secondary">
                Semua klien dan pengajuan sudah tertangani.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const Icon = ICONS[item.key];
              return (
                <DropdownMenuItem
                  key={item.key}
                  onSelect={() => {
                    markAllRead();
                    router.push(item.href);
                  }}
                  className={cn(
                    "items-start py-2.5",
                    item.unread && "bg-admin-low/50"
                  )}
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-control bg-admin-low text-admin-secondary">
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-xs font-semibold text-admin-heading">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-snug text-admin-secondary">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="rounded-pill bg-admin-low px-2 py-0.5 text-[10px] font-bold text-admin-heading">
                      {item.count}
                    </span>
                    {item.unread && (
                      <span className="size-1.5 rounded-full bg-danger-strong" />
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
