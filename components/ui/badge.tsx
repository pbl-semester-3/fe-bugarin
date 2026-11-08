import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Varian dasar shadcn + varian badge desain PT (docs/DESIGN_PT.md §6).
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-pill border border-transparent px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary [a&]:hover:bg-primary/90",
        accent: "bg-brand text-on-secondary [a&]:hover:bg-brand/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-outline text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost:
          "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        // --- badge desain PT ---
        count: "bg-surface-3 text-ink-soft text-[11px]",
        ai: "bg-brand/10 text-secondary-strong",
        queued: "bg-surface-3 text-muted-foreground",
        done: "bg-success-container/30 text-success",
        "weight-loss": "bg-danger-container text-danger-strong",
        hypertrophy: "bg-success-container/40 text-success",
        "delta-down": "bg-danger-container text-danger-strong",
        "delta-up": "bg-success-container text-success",
        started: "bg-surface-tint text-ink-soft",
        draft: "bg-surface-tint text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
