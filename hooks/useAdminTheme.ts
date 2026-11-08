"use client";

import { useCallback, useEffect, useState } from "react";

// Store tema Admin — SATU sumber untuk ikon bulan/matahari di topbar dan
// segmented "Mode Tampilan Antarmuka" di Profil (design/admin/profil.md catatan 10–11).
// Preferensi disimpan di localStorage (fallback sampai akun menyimpan di backend).

type AdminTheme = "light" | "dark";

const STORAGE_KEY = "bugarin-admin-theme";

let currentTheme: AdminTheme = "light";
const listeners = new Set<() => void>();

function applyTheme(theme: AdminTheme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage tidak tersedia (privacy mode) — tema hanya berlaku sesi ini.
  }
  listeners.forEach((listener) => listener());
}

// Nilai awal dibaca dari atribut yang sudah di-set script anti-kedip
// di app/layout.tsx (script itu membaca localStorage).
function initialTheme(): AdminTheme {
  if (
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "dark"
  ) {
    return "dark";
  }
  return "light";
}

export function useAdminTheme() {
  const [theme, setTheme] = useState<AdminTheme>(initialTheme);

  useEffect(() => {
    const listener = () => setTheme(currentTheme);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setAdminTheme = useCallback(
    (next: AdminTheme) => applyTheme(next),
    []
  );
  const toggleAdminTheme = useCallback(
    () => applyTheme(currentTheme === "dark" ? "light" : "dark"),
    []
  );

  return { theme, setAdminTheme, toggleAdminTheme };
}
