interface GreetingBannerProps {
  nama: string;
}

// Banner sapaan desain PT (design/DASHBOARD.md §2): hijau primary, radius 12, padding 24.
export function GreetingBanner({ nama }: GreetingBannerProps) {
  return (
    <div className="rounded-card bg-primary p-6 dark:bg-[#2f6b1c]">
      <h1 className="text-[40px] leading-tight font-bold text-white">
        Selamat pagi, Coach {nama}!
      </h1>
      <p className="text-sm text-white/90">
        Jadwal hasil AI disinkronkan otomatis dengan data biometrik klien.
      </p>
    </div>
  );
}
