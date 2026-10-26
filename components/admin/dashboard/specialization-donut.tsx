"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import type { AdminSpecializationSlice } from "@/lib/types/admin";

const SLICE_COLORS_LIGHT: Record<AdminSpecializationSlice["key"], string> = {
  turun_bb: "#BA1A1A",
  naik_bb: "#82F9BE",
};
// Dark mode: merah diganti agar kontras di latar gelap (dark-mode.md §5.9).
const SLICE_COLORS_DARK: Record<AdminSpecializationSlice["key"], string> = {
  turun_bb: "#E5484D",
  naik_bb: "#82F9BE",
};

// Donut "Spesialisasi PT" (design/admin/dashboard-admin.md §3.5).
// Warna dipetakan berdasarkan key (bukan urutan array).
export function SpecializationDonut({
  data,
}: {
  data: AdminSpecializationSlice[];
}) {
  const { theme } = useAdminTheme();
  const dark = theme === "dark";
  const sliceColors = dark ? SLICE_COLORS_DARK : SLICE_COLORS_LIGHT;
  const total = data.reduce((sum, slice) => sum + slice.count, 0);

  return (
    <section className="rounded-card bg-admin-surface p-4 shadow-card">
      <div className="mb-2">
        <h2 className="text-base font-semibold text-admin-heading">
          Spesialisasi PT
        </h2>
        <p className="text-[10px] text-admin-secondary">
          Komposisi fokus keahlian {total} pelatih
        </p>
      </div>

      <div className="relative h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius="62%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              {data.map((slice) => (
                <Cell key={slice.key} fill={sliceColors[slice.key]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${dark ? "#2A4260" : "#DCE9FF"}`,
                backgroundColor: dark ? "#17324D" : "#FFFFFF",
                color: dark ? "#E8EFF9" : "#0B1C30",
                fontSize: 12,
              }}
              formatter={(value, name) => {
                const count = Number(value);
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return [`${count} PT (${pct}%)`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-admin-heading">{total}</p>
          <p className="text-[8px] font-semibold tracking-widest text-admin-heading uppercase">
            Pelatih Aktif
          </p>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {data.map((slice) => {
          const pct = total > 0 ? Math.round((slice.count / total) * 100) : 0;
          return (
            <div
              key={slice.key}
              className="flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2 text-admin-heading">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: sliceColors[slice.key] }}
                />
                {slice.label}
              </span>
              <span className="font-bold text-admin-heading">
                {slice.count} PT ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
