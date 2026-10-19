"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

// POST /auth/logout -> cookie `token` dihapus backend.
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      // Bersihkan cache data personal agar tidak terbawa setelah login ulang.
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
  });
}
