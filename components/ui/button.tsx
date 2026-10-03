import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Varian sesuai docs/DESIGN_PT.md §6:
// - default  = Primary (hijau)
// - accent   = Accent (oranye) — aksi Save/Send/Update
// - secondary= surface-3 abu
// - pill     = Small pill
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control text-sm font-semibold whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary/90",
        accent: "bg-brand text-on-secondary hover:bg-brand/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-surface-4",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        // Decline (aksi kartu pengajuan, design/VERIFIKASI.md §4.5): bg merah muda, teks danger-strong.
        decline:
          "bg-danger-container text-danger-strong hover:bg-danger-container/80 focus-visible:ring-destructive/20",
        // Accept Trainee (design/VERIFIKASI.md §4.5): bg hijau tua, teks putih.
        success:
          "bg-success text-white hover:bg-success/90 focus-visible:ring-success/30",
        outline:
          "border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        pill: "bg-surface-3 text-ink hover:bg-surface-4",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-control px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-control px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-control px-6 has-[>svg]:px-4",
        pill: "h-8 gap-1.5 rounded-pill px-3 text-xs has-[>svg]:px-2.5",
        icon: "size-10",
        "icon-xs": "size-6 rounded-control [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
