import * as React from "react"
import { cn } from "cn"

// Input desain PT: bg surface-tint, tanpa border, radius 8, fokus ring indigo.
// (Login memakai bg putih — override lewat className di halaman login.)
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-control border-0 bg-surface-tint px-3 py-1 text-sm text-ink shadow-none transition-[color,box-shadow] outline-none selection:bg-primary selection:text-on-primary placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-[3px] focus-visible:ring-ring/30",
        "aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
