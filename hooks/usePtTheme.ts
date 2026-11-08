"use client";

import { useCallback, useSyncExternalStore } from "react";

export type PtTheme = "siang" | "malam";

const STORAGE_KEY = "bugarin-pt-theme";

let currentTheme: PtTheme = "siang";

if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "siang" || stored === "malam") {
      currentTheme = stored;
    } else if (document.documentElement.classList.contains("dark")) {
      currentTheme = "malam";
    }
  } catch {
    // localStorage tidak tersedia — gunakan default terang.
  }
}

const listeners = new Set<() => void>();

function applyTheme(theme: PtTheme) {
  currentTheme = theme;
  document.documentElement.classList.toggle("dark", theme === "malam");
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Preferensi hanya berlaku untuk sesi ini.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Store tema PT — dipakai topbar dan halaman Profil agar selalu sinkron.
export function usePtTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => currentTheme,
    () => "siang" as PtTheme
  );

  const setPtTheme = useCallback((next: PtTheme) => {
    applyTheme(next);
  }, []);

  const togglePtTheme = useCallback(() => {
    applyTheme(currentTheme === "malam" ? "siang" : "malam");
  }, []);

  return { theme, setPtTheme, togglePtTheme };
}
