interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

// Stat card desain PT (design/DASHBOARD.md §3): kotak ikon oranye 40, overline, angka 36/700.
export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex-1 rounded-card bg-white p-6 shadow-card">
      <div className="mb-4 flex size-10 items-center justify-center rounded-control bg-brand text-on-secondary [&_svg]:size-5">
        {icon}
      </div>
      <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 text-4xl font-bold text-ink">{value}</p>
    </div>
  );
}
