import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "cn";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFilter?: () => void;
  className?: string;
}

// Search bar pill desain PT (docs/DESIGN_PT.md §6).
export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onFilter,
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex h-10 items-center gap-2 rounded-pill bg-surface-tint px-4",
        className
      )}
    >
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-full flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
      />
      {onFilter && (
        <button
          type="button"
          onClick={onFilter}
          className="shrink-0 text-muted-foreground transition-colors hover:text-ink"
          aria-label="Filter"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      )}
    </div>
  );
}
