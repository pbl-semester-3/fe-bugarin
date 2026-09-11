---
name: tanstack-query-patterns
description: Query key factory, mutation + invalidation, dan konfigurasi Axios untuk TanStack Query di Web Dashboard PT & Admin Bugarin. Gunakan saat menulis hook data-fetching baru.
metadata:
  origin: bugarin-project
---

# TanStack Query Patterns (Bugarin)

Web PT & Admin fetch semua data lewat TanStack Query + Axios (bukan `fetch()` Server Component langsung) — lihat alasan di skill `nextjs-app-router-patterns`. Skill ini fokus ke konvensi supaya query key dan invalidation konsisten antar developer.

## Activation

- Menulis hook baru untuk resource API (`usePairingRequests`, `useKlienDetail`, dst).
- Ada bug data tidak ter-refresh setelah mutation.
- Review PR frontend — cek query key factory dipakai konsisten.

## Setup Axios Instance (satu untuk seluruh app)

```typescript
// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // wajib — supaya cookie httpOnly JWT ikut terkirim
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = "/login"; // session habis/invalid
    }
    return Promise.reject(err);
  }
);
```

## Query Key Factory (wajib, jangan tulis array key manual berulang)

```typescript
// lib/query-keys.ts
export const queryKeys = {
  pt: {
    dashboard: ["pt", "dashboard"] as const,
    pairingRequests: ["pt", "pairing-requests"] as const,
    klienList: ["pt", "klien"] as const,
    klienDetail: (id: number) => ["pt", "klien", id] as const,
    weeklyPlan: (klienId: number) => ["pt", "klien", klienId, "weekly-plan"] as const,
    riwayat: ["pt", "riwayat"] as const,
  },
  admin: {
    dashboard: ["admin", "dashboard"] as const,
    users: (role?: "klien" | "pt") => ["admin", "users", role ?? "all"] as const,
    riwayat: ["admin", "riwayat"] as const,
  },
};
```

Kenapa factory, bukan tulis `["pt", "klien", id]` manual di tiap file: kalau bentuk key berubah (misal nambah parameter filter), cukup ubah satu tempat — semua `useQuery`/`invalidateQueries` yang memakainya otomatis konsisten.

## Pola Hook Query

```typescript
// hooks/useKlienDetail.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export function useKlienDetail(id: number) {
  return useQuery({
    queryKey: queryKeys.pt.klienDetail(id),
    queryFn: () => api.get(`/pt/klien/${id}`).then((r) => r.data.data),
    enabled: !!id, // jangan fetch kalau id belum ada (mis. saat route param masih loading)
  });
}
```

## Pola Hook Mutation + Invalidation

```typescript
// hooks/usePairingRequests.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

export function usePairingRequests() {
  return useQuery({
    queryKey: queryKeys.pt.pairingRequests,
    queryFn: () => api.get("/pt/pairing-requests").then((r) => r.data.data),
  });
}

export function useRespondPairingRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; action: "accept" | "reject"; alasan?: string }) =>
      api.put(`/pt/pairing-requests/${payload.id}`, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.pt.pairingRequests });
      qc.invalidateQueries({ queryKey: queryKeys.pt.dashboard }); // jumlah klien di dashboard ikut berubah
    },
  });
}
```

**Aturan invalidation**: tiap mutation, pikirkan **semua** query lain yang datanya ikut berubah (contoh di atas: terima request → daftar pairing berubah **dan** jumlah klien di dashboard berubah). Jangan cuma invalidate query yang paling jelas.

## Konfigurasi Default (staleTime)

```typescript
// providers/query-provider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 detik — data dashboard cukup sering berubah tapi tidak perlu realtime murni
        retry: 1,
      },
    },
  }));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

Untuk data yang jarang berubah (master olahraga/makanan kalau frontend ikut fetch, riwayat historis), boleh set `staleTime` lebih panjang per-query lewat parameter di `useQuery`, bukan ubah default global.

## Anti-Patterns

| Anti-Pattern | Risiko | Perbaikan |
|---|---|---|
| Tulis query key array manual di tiap file (`["pt","klien",id]`) | Gampang typo/inkonsisten, susah refactor | Pakai `queryKeys` factory terpusat |
| Invalidate cuma query yang "kelihatan jelas" berubah | Data lain di halaman lain jadi stale tanpa disadari | Cek semua efek samping mutation, invalidate semua yang relevan |
| `fetch()` langsung di Server Component untuk data personal, dobel sama TanStack Query di client | Dua sumber data, race condition, bingung mana yang jadi source of truth | Konsisten: data personal lewat TanStack Query di Client Component saja |
| Tidak set `withCredentials: true` di Axios | Cookie httpOnly JWT tidak ikut terkirim, semua request 401 | Selalu set di instance Axios terpusat |

## Related

- Skill: `nextjs-app-router-patterns` — kenapa data personal difetch di Client Component, bukan Server Component
- Skill: `api-contract-bugarin` (backend) — bentuk response `{ data, meta }` / `{ error }` yang di-parse hook ini
