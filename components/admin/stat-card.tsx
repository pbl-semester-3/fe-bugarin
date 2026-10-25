import { cn } from "cn";

interface AdminStatCardProps {
  /** Icon untuk varian Dashboard (icon box oranye). Kosongkan untuk varian Kelola Pengguna. */
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

// Stat card Admin (design/admin/dashboard-admin.md §3.3, kelola-pengguna.md §3.2).
export function AdminStatCard({
  icon,
  label,
  value,
  className,
}: AdminStatCardProps) {
  return (
    <div className={cn("rounded-card bg-admin-surface p-4 shadow-card", className)}>
      {icon && (
        <div className="mb-3 flex size-8 items-center justify-center rounded-control bg-brand text-white [&_svg]:size-4">
          {icon}
        </div>
      )}
      <p className="text-[11px] font-medium tracking-wider text-admin-secondary uppercase">
        {label}
      </p>
      <p className="mt-1 text-[32px] leading-tight font-bold text-admin-heading">
        {value}
      </p>
    </div>
  );
}
