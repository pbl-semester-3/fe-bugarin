import { cn } from "cn";

export interface AdminTab {
  value: string;
  label: string;
  badge?: string;
}

interface AdminTabSwitcherProps {
  tabs: AdminTab[];
  value: string;
  onValueChange: (value: string) => void;
  /** Slot aksi di kanan (mis. tombol "Daftarkan PT Baru"). */
  action?: React.ReactNode;
  className?: string;
}

// Tab switcher Admin (design/admin/kelola-pengguna.md §3.3, riwayat.md §3.2).
export function AdminTabSwitcher({
  tabs,
  value,
  onValueChange,
  action,
  className,
}: AdminTabSwitcherProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const active = tab.value === value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onValueChange(tab.value)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-brand text-on-accent"
                  : "text-admin-heading hover:bg-admin-low"
              )}
            >
              {tab.label}
              {tab.badge && (
                <span
                  className={cn(
                    "rounded-pill px-2 py-0.5 text-[10px] font-bold",
                      active
                      ? "bg-admin-pill text-admin-heading"
                      : "bg-admin-mid text-admin-heading"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {action}
    </div>
  );
}
