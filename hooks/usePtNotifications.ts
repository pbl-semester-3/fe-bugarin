import { useCallback, useMemo, useSyncExternalStore } from "react";
import { usePairingRequests } from "@/hooks/usePairingRequests";
import { usePtProfile } from "@/hooks/usePtProfile";

export type PtNotificationItem = {
  key: "pairing";
  title: string;
  description: string;
  count: number;
  href: string;
  unread: boolean;
};

type ReadSnapshot = {
  pairing: number;
};

const EMPTY_SNAPSHOT: ReadSnapshot = { pairing: 0 };
const cache = new Map<string, ReadSnapshot>();
const listeners = new Set<() => void>();

function storageKey(email: string | undefined) {
  return email ? `bugarin-pt-notif-read:${email}` : null;
}

function readSnapshot(email: string | undefined): ReadSnapshot {
  const key = storageKey(email);
  if (!key || typeof window === "undefined") return EMPTY_SNAPSHOT;

  const cached = cache.get(key);
  if (cached) return cached;

  let value = EMPTY_SNAPSHOT;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ReadSnapshot>;
      value = { pairing: Number(parsed.pairing) || 0 };
    }
  } catch {
    value = EMPTY_SNAPSHOT;
  }
  cache.set(key, value);
  return value;
}

function writeSnapshot(email: string | undefined, next: ReadSnapshot) {
  const key = storageKey(email);
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

// Notifikasi ringan PT: pengajuan klien yang menunggu verifikasi.
// Pola sama dengan notifikasi Admin (diturunkan dari data + snapshot localStorage).
export function usePtNotifications() {
  const { data: profile, isLoading: isProfileLoading } = usePtProfile();
  const { data: pairingRequests, isLoading, isError, refetch } =
    usePairingRequests();

  const email = profile?.user.email;

  const snapshot = useSyncExternalStore(
    subscribe,
    () => readSnapshot(email),
    () => EMPTY_SNAPSHOT
  );

  const pending = pairingRequests?.length ?? 0;

  const items = useMemo(() => {
    const result: PtNotificationItem[] = [];
    if (pending > 0) {
      result.push({
        key: "pairing",
        title: "Pengajuan klien menunggu verifikasi",
        description: "Tinjau dan verifikasi pengajuan klien baru.",
        count: pending,
        href: "/verifikasi",
        unread: pending > snapshot.pairing,
      });
    }
    return result;
  }, [pending, snapshot]);

  const isReady = !isProfileLoading;
  const hasUnread =
    isReady &&
    Boolean(email) &&
    !isLoading &&
    Boolean(pairingRequests) &&
    items.some((item) => item.unread);

  const markAllRead = useCallback(() => {
    writeSnapshot(email, { pairing: pending });
  }, [email, pending]);

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
