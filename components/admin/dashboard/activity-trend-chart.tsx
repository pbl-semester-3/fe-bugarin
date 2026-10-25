"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import type { AdminActivityPoint } from "@/lib/types/admin";

// Chart "Tren Aktivitas Sesi & Registrasi" (design/admin/dashboard-admin.md §3.4).
// Warna mengikuti tema (dark-mode.md §5.9).
export function ActivityTrendChart({ data }: { data: AdminActivityPoint[] }) {
  const { theme } = useAdminTheme();
  const dark = theme === "dark";

  const colors = {
    grid: dark ? "rgba(203,219,245,0.12)" : "rgba(203,219,245,0.45)",
    label: dark ? "#A8B7CB" : "#0B1C30",
    activeLabel: dark ? "#9BDD6B" : "#326B00",
    barFade: dark ? 0.05 : 0.15,
    lineTo: dark ? "#E0703C" : "#95491F",
    markerFill: dark ? "#12283F" : "#FFFFFF",
    activeMarker: dark ? "#E8EFF9" : "#0B1C30",
    tooltipBg: dark ? "#17324D" : "#FFFFFF",
    tooltipBorder: dark ? "#2A4260" : "#DCE9FF",
    tooltipText: dark ? "#E8EFF9" : "#0B1C30",
  };

  const lineData = data.map((point) => ({
    ...point,
    newClients: point.newClients ?? undefined,
  }));

  return (
    <section className="rounded-card bg-admin-surface p-4 shadow-card">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-admin-heading">
            Tren Aktivitas Sesi & Registrasi
          </h2>
          <p className="text-[10px] text-admin-secondary">
            Korelasi lonjakan latihan terpandu vs penambahan atlet 7 bulan ke
            belakang
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-medium text-admin-heading">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" />
            Sesi Latihan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-admin-peach" />
            Klien Baru
          </span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={lineData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DC04E" stopOpacity={1} />
                <stop offset="100%" stopColor="#7DC04E" stopOpacity={colors.barFade} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF9E6C" />
                <stop offset="100%" stopColor={colors.lineTo} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={colors.grid} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={(props) => {
                const { x, y, payload } = props as {
                  x: number;
                  y: number;
                  payload: { value: string; index?: number };
                };
                const isActive =
                  payload.index !== undefined
                    ? data[payload.index]?.active
                    : false;
                return (
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    fontSize={9}
                    fontWeight={isActive ? 700 : 500}
                    fill={isActive ? colors.activeLabel : colors.label}
                  >
                    {payload.value}
                  </text>
                );
              }}
              interval={0}
            />
            <Tooltip
              cursor={
                dark
                  ? { fill: "rgba(255,255,255,0.05)" }
                  : { fill: "rgba(203,219,245,0.25)" }
              }
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${colors.tooltipBorder}`,
                backgroundColor: colors.tooltipBg,
                color: colors.tooltipText,
                fontSize: 12,
              }}
              formatter={(value, name) => [
                value,
                name === "sessions" ? "Sesi Latihan" : "Klien Baru",
              ]}
            />
            <Bar
              dataKey="sessions"
              barSize={28}
              radius={[4, 4, 0, 0]}
              fill="url(#barGradient)"
              shape={(props) => {
                const { x, y, width, height, payload } =
                  props as unknown as {
                    x: number;
                    y: number;
                    width: number;
                    height: number;
                    payload: AdminActivityPoint;
                  };
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={4}
                      fill={payload.active ? "#7DC04E" : "url(#barGradient)"}
                    />
                    {payload.active && (
                      <circle
                        cx={x + width / 2}
                        cy={y - 4}
                        r={3}
                        fill={colors.activeMarker}
                      />
                    )}
                  </g>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="newClients"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              connectNulls={false}
              dot={{
                r: 3,
                fill: colors.markerFill,
                stroke: "#FF9E6C",
                strokeWidth: 2,
              }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
