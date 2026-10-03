import Image from "next/image";
import { cn } from "cn";

type AvatarSize = 32 | 40 | 48 | 56 | 64 | 80 | 104;

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  shape?: "circle" | "square";
  statusDot?: boolean;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Avatar desain PT (§6): bulat/kotak, fallback inisial, titik status hijau opsional.
export function Avatar({
  name,
  src,
  size = 40,
  shape = "circle",
  statusDot = false,
  className,
}: AvatarProps) {
  const rounded = shape === "circle" ? "rounded-full" : "rounded-panel";
  const dimension = { width: size, height: size };

  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={dimension}>
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className={cn("size-full object-cover", rounded)}
        />
      ) : (
        <span
          className={cn(
            "flex size-full items-center justify-center bg-surface-2 font-semibold text-ink-soft",
            rounded
          )}
          style={{ fontSize: Math.max(11, size * 0.3) }}
        >
          {initials(name)}
        </span>
      )}
      {statusDot && (
        <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-success" />
      )}
    </span>
  );
}
