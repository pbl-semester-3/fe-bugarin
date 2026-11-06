import { cn } from "cn";

// Container putih tabel Admin (design/admin/kelola-pengguna.md §3.4).
export function TableCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card bg-admin-surface shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}
