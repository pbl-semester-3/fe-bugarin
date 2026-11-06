import { ImageIcon } from "lucide-react";
import { cn } from "cn";

// Placeholder aset landing. Ganti dengan next/image setelah aset Figma tersedia.
export function AssetPlaceholder({
  label,
  note = "TODO: ganti dengan aset Figma",
  className,
}: {
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[28px] border-2 border-dashed border-landing-orange/30 bg-landing-orange-soft px-6 py-10 text-center",
        className
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-white text-landing-orange shadow-sm">
        <ImageIcon className="size-5" />
      </span>
      <p className="text-sm font-semibold text-landing-ink">{label}</p>
      <p className="text-[11px] text-landing-muted">{note}</p>
    </div>
  );
}
