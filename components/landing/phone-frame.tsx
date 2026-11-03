import Image from "next/image";
import { cn } from "cn";

// Frame HP + placeholder layar aplikasi. Isi `imageSrc` setelah screenshot tersedia.
export function PhoneFrame({
  label,
  imageSrc = null,
  className,
  screenClassName,
}: {
  label: string;
  imageSrc?: string | null;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2.4rem] border-[6px] border-landing-ink bg-landing-ink p-1 shadow-[0_24px_60px_rgba(31,41,51,0.18)]",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-landing-bg",
          screenClassName
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={label}
            fill
            sizes="(max-width: 768px) 70vw, 280px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col gap-3 bg-landing-bg p-4">
            <div className="flex items-center justify-between text-[8px] font-semibold text-landing-ink">
              <span>9:41</span>
              <span className="flex gap-1">
                <span className="size-1 rounded-full bg-landing-ink/40" />
                <span className="size-1 rounded-full bg-landing-ink/40" />
                <span className="size-1 rounded-full bg-landing-ink/40" />
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[7px] text-landing-muted">Selamat pagi,</p>
                <p className="text-[10px] font-bold text-landing-ink">Coach</p>
              </div>
              <span className="size-6 rounded-full bg-landing-green-soft" />
            </div>

            <div className="rounded-2xl bg-landing-orange p-3 text-white">
              <p className="text-[7px] opacity-80">Target hari ini</p>
              <p className="mt-1 text-[16px] font-bold">1.800</p>
              <p className="text-[7px] opacity-80">kkal tersisa</p>
              <div className="mt-2 h-1 rounded-full bg-white/30">
                <div className="h-1 w-2/3 rounded-full bg-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <p className="text-[7px] text-landing-muted">Latihan</p>
                <p className="text-[12px] font-bold text-landing-ink">45 mnt</p>
              </div>
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <p className="text-[7px] text-landing-muted">Streak</p>
                <p className="text-[12px] font-bold text-landing-ink">12 hari</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 w-2/3 rounded-full bg-landing-ink/10" />
              <div className="rounded-xl bg-white p-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-lg bg-landing-green-soft" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-3/4 rounded-full bg-landing-ink/15" />
                    <div className="h-1.5 w-1/2 rounded-full bg-landing-ink/10" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-lg bg-landing-orange-soft" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-2/3 rounded-full bg-landing-ink/15" />
                    <div className="h-1.5 w-2/5 rounded-full bg-landing-ink/10" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-auto pb-1 text-center text-[8px] font-medium text-landing-muted">
              {label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
