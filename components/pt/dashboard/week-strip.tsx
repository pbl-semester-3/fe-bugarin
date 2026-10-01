import { cn } from "cn";
import type { WeekDay, WeekIndicator } from "@/lib/mock/pt";

const indicatorColor: Record<WeekIndicator, string> = {
  green: "bg-success",
  red: "bg-danger",
  gray: "bg-outline",
};

// Week strip desain PT (design/DASHBOARD.md §4.2): 7 kartu hari, hari ini highlight secondary.
export function WeekStrip({ days }: { days: WeekDay[] }) {
  return (
    <div className="flex gap-3">
      {days.map((day) => (
        <div
          key={`${day.label}-${day.date}`}
          className={cn(
            "flex-1 rounded-control px-3 py-2 text-center",
            day.isToday ? "bg-brand text-on-secondary shadow-card" : "bg-surface-tint"
          )}
        >
          <p
            className={cn(
              "text-[10px] font-semibold tracking-wide uppercase",
              day.isToday ? "text-on-secondary/80" : "text-muted-foreground"
            )}
          >
            {day.isToday ? "TODAY" : day.label}
          </p>
          <p
            className={cn(
              "text-base font-semibold",
              day.isToday ? "text-on-secondary" : "text-ink"
            )}
          >
            {day.date}
          </p>
          <span
            className={cn(
              "mx-auto mt-1 block size-1.5 rounded-full",
              day.isToday ? "bg-white/70" : indicatorColor[day.indicator]
            )}
          />
        </div>
      ))}
    </div>
  );
}
