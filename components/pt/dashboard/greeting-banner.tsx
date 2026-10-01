interface GreetingBannerProps {
  nama: string;
}

// Banner sapaan desain PT (design/DASHBOARD.md §2): hijau primary, radius 12, padding 24.
export function GreetingBanner({ nama }: GreetingBannerProps) {
  return (
    <div className="rounded-card bg-primary p-6">
      <h1 className="text-[40px] leading-tight font-bold text-on-primary">
        Good morning, Coach {nama}!
      </h1>
      <p className="text-sm text-on-primary/90">
        AI Generated Schedule is synchronized with client biometric streams.
      </p>
    </div>
  );
}
