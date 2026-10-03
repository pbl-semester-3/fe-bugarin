import { cn } from "cn";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  className?: string;
}

// Judul halaman desain PT: 40px/ExtraBold tracking -0.7px + subtitle 20px regular
// (design/VERIFIKASI.md §2 — pola ini berlaku untuk judul halaman PT).
export function PageHeader({
  title,
  description,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-[40px] font-extrabold leading-tight tracking-[-0.7px] text-ink">
            {title}
          </h1>
          {badge}
        </div>
        {description && (
          <p className="mt-1 text-xl text-ink-soft">{description}</p>
        )}
      </div>
    </div>
  );
}
