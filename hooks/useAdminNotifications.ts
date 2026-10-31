import {
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useAdminProfile } from "@/hooks/useAdminProfile";

export type AdminNotificationItem = {
  key: "pairing" | "onboarding";
  title: string;
  description: string;
  count: number;
  href: string;
  unread: boolean;
};

type ReadSnapshot = {
  pairing: number;
  onboarding: number;
};

const EMPTY_SNAPSHOT: ReadSnapshot = { pairing: 0, onboarding: 0 };
const cache = new Map<string, ReadSnapshot>();
const listeners = new Set<() => void>();

function storageKey(adminEmail: string | undefined) {
  return adminEmail ? `bugarin-admin-notif-read:${adminEmail}` : null;
}

function readSnapshot(adminEmail: string | undefined): ReadSnapshot {
  const key = storageKey(adminEmail);
  if (!key || typeof window === "undefined") return EMPTY_SNAPSHOT;

  const cached = cache.get(key);
  if (cached) return cached;

  let value = EMPTY_SNAPSHOT;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ReadSnapshot>;
      value = {
        pairing: Number(parsed.pairing) || 0,
        onboarding: Number(parsed.onboarding) || 0,
      };
    }
  } catch {
    value = EMPTY_SNAPSHOT;
  }
  cache.set(key, value);
  return value;
}

function writeSnapshot(adminEmail: string | undefined, next: ReadSnapshot) {
  const key = storageKey(adminEmail);
  if (!key) return;
  cache.set(key, next);
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ ...next, readAt: new Date().toISOString() })
    );
  } catch {
    // localStorage tidak tersedia: cache sesi tetap dipakai.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Notifikasi ringan berbasis data dashboard (belum ada tabel notifikasi backend).
export function useAdminNotifications() {
  const { data: profile, isLoading: isProfileLoading } = useAdminProfile();
  const { data, isLoading, isError, refetch } = useAdminDashboard();

  const snapshot = useSyncExternalStore(
    subscribe,
    () => readSnapshot(profile?.email),
    () => EMPTY_SNAPSHOT
  );

  const pendingPairing = data?.totalRequestPending ?? 0;
  const onboarding = Math.max(
    0,
    (data?.totalKlien ?? 0) - (data?.totalPairingAktif ?? 0)
  );

  const items = useMemo(() => {
    const result: AdminNotificationItem[] = [];
    if (pendingPairing > 0) {
      result.push({
        key: "pairing",
        title: "Pengajuan pairing menunggu",
        description: "Menunggu verifikasi dari Personal Trainer.",
        count: pendingPairing,
        href: "/admin/users?tab=klien",
        unread: pendingPairing > snapshot.pairing,
      });
    }
    if (onboarding > 0) {
      result.push({
        key: "onboarding",
        title: "Klien sedang onboarding",
        description: "Belum terhubung dengan Personal Trainer.",
        count: onboarding,
        href: "/admin/users?tab=klien",
        unread: onboarding > snapshot.onboarding,
      });
    }
    return result;
  }, [onboarding, pendingPairing, snapshot]);

  const isReady = !isProfileLoading;
  const hasUnread =
    isReady && Boolean(profile?.email) && !isLoading && Boolean(data) && items.some((item) => item.unread);

  const markAllRead = useCallback(() => {
    writeSnapshot(profile?.email, { pairing: pendingPairing, onboarding });
  }, [profile?.email, onboarding, pendingPairing]);

  return {
    items,
    hasUnread,
    markAllRead,
    isLoading,
    isError,
    refetch,
    isReady,
  };
}
