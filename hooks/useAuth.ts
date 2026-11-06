"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";

// POST /auth/logout -> cookie `token` dihapus backend.
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Bersihkan cache data personal agar tidak terbawa setelah login ulang.
      queryClient.clear();
      document.documentElement.classList.remove("dark");
      router.replace("/login");
      router.refresh();
    },
  });
}
