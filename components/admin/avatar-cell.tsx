import { Avatar } from "@/components/pt/avatar";
import { cn } from "cn";

type AvatarCellSize = 32 | 40;

interface AvatarCellProps {
  name: string;
  sub?: React.ReactNode;
  size?: AvatarCellSize;
  /** Ring oranye — klien Onboarding tanpa PT (design/admin/kelola-pengguna.md §4.2). */
  ring?: boolean;
  nameClassName?: string;
  subClassName?: string;
  className?: string;
}

// Sel avatar + nama + sub-teks (dipakai tabel Klien, PT, Riwayat).
export function AvatarCell({
  name,
  sub,
  size = 40,
  ring = false,
  nameClassName,
  subClassName,
  className,
}: AvatarCellProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar
        name={name}
        size={size}
        className={cn(ring && "rounded-full ring-2 ring-brand")}
      />
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-sm font-semibold text-admin-heading",
            nameClassName
          )}
        >
          {name}
        </p>
        {sub && (
          <div className={cn("truncate text-[11px] text-admin-secondary", subClassName)}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
