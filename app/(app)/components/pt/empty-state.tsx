import { cn } from "cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

// Empty state desain PT (§6): ikon besar, judul 20px, deskripsi ink-soft, rata tengah.
export function EmptyState({
  icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-center",
        className
      )}
    >
      {icon && <div className="text-ink [&_svg]:size-12">{icon}</div>}
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      {description && (
        <p className="max-w-md text-sm text-ink-soft">{description}</p>
      )}
    </div>
  );
}
