import { cn } from "cn";

interface PageBannerProps {
  title: string;
  description?: string;
  /** Gradasi lebih terang di sisi kanan (Kelola Pengguna, Edit PT). */
  gradient?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: React.ReactNode;
}

// Banner hijau halaman Admin (design/admin: dashboard §3.2, kelola-pengguna §3.1).
// Warna via token --color-admin-banner agar ikut berubah di dark mode.
export function PageBanner({
  title,
  description,
  gradient = false,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: PageBannerProps) {
  return (
    <div
      className={cn(
        "rounded-card p-6 text-white shadow-card",
        !gradient && "bg-admin-banner",
        className
      )}
      style={
        gradient
          ? {
              background:
                "linear-gradient(90deg, var(--color-admin-banner) 0%, var(--color-admin-banner) 85%, var(--color-admin-banner-grad) 100%)",
            }
          : undefined
      }
    >
      <h1 className={cn("text-2xl font-bold", titleClassName)}>{title}</h1>
      {description && (
        <p
          className={cn(
            "mt-1 max-w-2xl text-sm text-white/90",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
