import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

// Satu sumber mapping warna badge Admin (design/admin: kelola-pengguna §4.2, riwayat §5.3).
const statusBadgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase",
  {
    variants: {
      variant: {
        aktif: "bg-aktif-tint text-admin-green-text",
        nonaktif: "bg-admin-danger-tint text-admin-danger-text",
        onboarding: "bg-onboarding-tint text-admin-brown",
        create: "bg-primary/20 text-admin-green-deep",
        berhasil: "bg-primary/20 text-admin-green-deep",
        update: "bg-admin-warning text-admin-warning-text",
        delete: "bg-admin-danger-tint text-admin-danger-text",
        gagal: "bg-admin-peach/20 text-admin-warning-text",
      },
    },
  }
);

interface StatusBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof statusBadgeVariants> {
  /** Titik bulat di kiri teks (badge status akun di Kelola Pengguna). */
  dot?: boolean;
}

export function StatusBadge({
  variant,
  dot = false,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
