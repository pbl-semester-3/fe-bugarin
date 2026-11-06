import { cn } from "cn";

interface AdminProgressBarProps {
  value: number;
  /** "naik" = hijau (Naik BB), "turun" = oranye (Turun BB). */
  tone: "naik" | "turun";
  className?: string;
}

// Progress bar program klien (design/admin/kelola-pengguna.md §4.2).
export function AdminProgressBar({
  value,
  tone,
  className,
}: AdminProgressBarProps) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={width}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-[5px] w-[165px] rounded-pill bg-admin-track", className)}
    >
      <div
        className={cn(
          "h-full rounded-pill",
          tone === "naik" ? "bg-primary" : "bg-brand"
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
