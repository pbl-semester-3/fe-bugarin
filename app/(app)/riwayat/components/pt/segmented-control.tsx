import { cn } from "cn";

export interface SegmentedOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  activeVariant?: "white" | "brand";
  className?: string;
}

// Segmented control desain PT (§6): wadah pill surface-tint, item aktif putih/oranye.
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  activeVariant = "white",
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-pill bg-surface-tint p-1",
        className
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-pill px-4 py-1.5 text-xs font-medium transition-colors",
              active
                ? activeVariant === "brand"
                  ? "bg-brand text-on-secondary"
                  : "bg-white text-ink shadow-card"
                : "text-ink-soft hover:text-ink"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
