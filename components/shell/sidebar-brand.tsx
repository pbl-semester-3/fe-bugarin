import Image from "next/image";

// Brand sidebar Admin/PT: logo + wordmark + label role.
export function SidebarBrand({ subtitle }: { subtitle: string }) {
  return (
    <div className="px-3 pt-2 pb-6">
      <div className="flex items-center gap-3">
        <Image
          src="/bugarin-logo.png"
          alt=""
          width={514}
          height={486}
          priority
          className="h-11 w-auto shrink-0"
        />
        <div className="min-w-0">
          <p className="text-lg font-bold text-white">Bugarin</p>
          <p className="text-[10px] font-semibold tracking-widest text-primary uppercase">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
