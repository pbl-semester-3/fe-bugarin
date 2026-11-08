import { cn } from "cn";

interface FilterChipProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Chip/filter desain PT: aktif = oranye (secondary), tidak aktif = tint (§6).
export function FilterChip({
  active = false,
  onClick,
  children,
  className,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-pill px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-brand text-on-secondary"
          : "bg-surface-tint text-ink-soft hover:bg-surface-2",
        className
      )}
    >
      {children}
    </button>
  );
}
