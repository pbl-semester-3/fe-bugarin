"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useAdminTheme } from "@/hooks/useAdminTheme";
import type { AdminActivityPoint } from "@/lib/types/admin";

// Lebar per bulan (3 bar). 7 bulan pertama mengisi card; sisanya scroll horizontal.
const MONTH_WIDTH = 88;

const SERIES = [
  { key: "totalRegistered", label: "Klien Baru", color: "#F69665" },
  { key: "totalNaikBb", label: "Naik BB", color: "#82F9BE" },
  { key: "totalTurunBb", label: "Turun BB", color: "#BA1A1A" },
] as const;

// Chart "Tren Registrasi Klien Baru" (design/admin/dashboard-admin.md §3.4).
export function ActivityTrendChart({ data }: { data: AdminActivityPoint[] }) {
  const { theme } = useAdminTheme();
  const dark = theme === "dark";

  const colors = {
    grid: dark ? "rgba(203,219,245,0.12)" : "rgba(203,219,245,0.45)",
    label: dark ? "#A8B7CB" : "#0B1C30",
    activeLabel: dark ? "#9BDD6B" : "#326B00",
    tooltipBg: dark ? "#17324D" : "#FFFFFF",
    tooltipBorder: dark ? "#2A4260" : "#DCE9FF",
    tooltipText: dark ? "#E8EFF9" : "#0B1C30",
  };

  return (
    <section className="rounded-card bg-admin-surface p-4 shadow-card">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-admin-heading">
            Tren Registrasi Klien Baru
          </h2>
          <p className="text-[10px] text-admin-secondary">
            Jumlah klien baru terdaftar serta komposisi tujuan naik/turun BB tiap
            bulan pada tahun berjalan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-medium text-admin-heading">
          {SERIES.map((series) => (
            <span key={series.key} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: series.color }}
              />
              {series.label}
            </span>
          ))}
        </div>
      </div>

      <div className="h-72 overflow-x-auto">
        <div
          style={{
            width: `${Math.max(data.length, 7) * MONTH_WIDTH}px`,
            minWidth: "100%",
            height: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
              barGap={3}
            >
              <CartesianGrid vertical={false} stroke={colors.grid} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={(props) => {
                  const { x, y, payload } = props as {
                    x: number;
                    y: number;
                    payload: { value: string; index?: number };
                  };
                  const index =
                    payload.index !== undefined
                      ? payload.index
                      : data.findIndex((item) => item.label === payload.value);
                  const isActive = index >= 0 ? Boolean(data[index]?.active) : false;
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
              />
              <Tooltip
                cursor={
                  dark
                    ? { fill: "rgba(255,255,255,0.06)" }
                    : { fill: "rgba(203,219,245,0.25)" }
                }
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${colors.tooltipBorder}`,
                  backgroundColor: colors.tooltipBg,
                  color: colors.tooltipText,
                  fontSize: 12,
                }}
              />
              {SERIES.map((series) => (
                <Bar
                  key={series.key}
                  dataKey={series.key}
                  name={series.label}
                  fill={series.color}
                  barSize={14}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
