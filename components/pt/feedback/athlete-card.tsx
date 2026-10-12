import { Avatar } from "@/components/pt/avatar";
import { tujuanLabel, type KlienListItem } from "@/lib/types/pt";

// Kartu profil atlet (design/FEEDBACK.md §4.1, disederhanakan sesuai backend).
export function AthleteCard({ klien }: { klien: KlienListItem }) {
  const meta = [
    klien.durasiHari !== null ? `${klien.durasiHari} Hari` : null,
    `Target: ${tujuanLabel(klien.tujuan)}`,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <section className="flex items-center gap-4 rounded-panel bg-white p-6 shadow-card">
      <Avatar name={klien.nama} size={64} shape="square" />
      <div className="min-w-0">
        <h2 className="text-[22px] leading-snug font-bold tracking-[-0.33px] text-ink">
          {klien.nama}
        </h2>
        <p className="text-xs font-medium text-muted-foreground">{meta}</p>
      </div>
    </section>
  );
}
