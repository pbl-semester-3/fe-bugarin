import { cn } from "cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[11px] font-bold tracking-[0.2em] text-landing-orange uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-landing-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-landing-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
