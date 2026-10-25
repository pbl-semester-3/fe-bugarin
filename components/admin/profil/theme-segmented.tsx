"use client";

import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import { cn } from "cn";

// Blok "Mode Tampilan Antarmuka" (design/admin/profil.md §4.4) —
// satu store dengan ikon bulan/matahari di topbar (useAdminTheme).
export function ThemeSegmented() {
  const { theme, setAdminTheme } = useAdminTheme();

  const options = [
    { value: "light" as const, label: "Terang", icon: Sun },
    { value: "dark" as const, label: "Gelap", icon: Moon },
  ];

  return (
    <div className="flex items-center justify-between gap-4 rounded-panel bg-admin-low p-4">
      <div>
        <p className="text-sm font-semibold text-admin-heading">
          Mode Tampilan Antarmuka
        </p>
        <p className="text-[11px] text-admin-secondary">
          Pilih antara tampilan terang kontras tinggi dan mode gelap.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Mode tampilan"
        className="flex w-[190px] rounded-pill bg-admin-inset p-1"
      >
        {options.map((option) => {
          const active = theme === option.value;
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setAdminTheme(option.value)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-pill px-3 py-1.5 text-xs transition-all",
                active
                  ? "bg-admin-pill font-bold text-admin-heading shadow-card"
                  : "font-medium text-admin-secondary hover:text-admin-heading"
              )}
            >
              <Icon
                className={cn(
                  "size-3.5",
                  option.value === "light" ? "text-warning" : "text-muted-foreground"
                )}
              />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
