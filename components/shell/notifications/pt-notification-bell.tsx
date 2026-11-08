"use client";

import { useRouter } from "next/navigation";
import { Bell, BellOff, ClipboardCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePtNotifications } from "@/hooks/usePtNotifications";
import { cn } from "cn";

// Lonceng notifikasi PT: pengajuan klien yang menunggu verifikasi.
// Pola & UX mengikuti AdminNotificationBell, dengan token tema PT.
export function PtNotificationBell() {
  const router = useRouter();
  const {
    items,
    hasUnread,
    markAllRead,
    isLoading,
    isError,
    refetch,
    isReady,
  } = usePtNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative text-ink-soft transition-colors hover:text-ink"
        >
          <Bell className="size-5" />
          {isReady && hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-danger-strong" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[340px] p-0">
        <div className="flex items-start justify-between gap-3 border-b border-surface-4 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-ink">Notifikasi</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              {hasUnread ? "Ada pembaruan baru" : "Semua sudah dibaca"}
            </p>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            disabled={!hasUnread}
            className="text-[10px] font-medium text-accent-indigo transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40"
          >
            Tandai semua dibaca
          </button>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-1">
          {!isReady || isLoading ? (
            <div className="space-y-2 p-2">
              <div className="h-10 animate-pulse rounded-control bg-surface-2" />
              <div className="h-10 animate-pulse rounded-control bg-surface-2" />
            </div>
          ) : isError ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-muted-foreground">
                Gagal memuat notifikasi.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 text-[11px] font-medium text-accent-indigo"
              >
                Coba lagi
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center px-3 py-7 text-center">
              <BellOff className="size-6 text-muted-foreground" />
              <p className="mt-2 text-xs font-medium text-ink">
                Belum ada notifikasi
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Semua pengajuan klien sudah tertangani.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <DropdownMenuItem
                key={item.key}
                onSelect={() => {
                  markAllRead();
                  router.push(item.href);
                }}
                className={cn(
                  "items-start py-2.5",
                  item.unread && "bg-surface-tint"
                )}
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-control bg-surface-2 text-muted-foreground">
                  <ClipboardCheck className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="rounded-pill bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-ink">
                    {item.count}
                  </span>
                  {item.unread && (
                    <span className="size-1.5 rounded-full bg-danger-strong" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
