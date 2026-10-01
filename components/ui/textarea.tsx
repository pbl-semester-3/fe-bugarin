import * as React from "react"
import { cn } from "cn"

// Textarea desain PT: bg surface-tint, tanpa border, radius 8, fokus ring indigo.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-control border-0 bg-surface-tint px-3 py-2 text-sm text-ink shadow-none transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-[3px] focus-visible:ring-ring/30",
        "aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
