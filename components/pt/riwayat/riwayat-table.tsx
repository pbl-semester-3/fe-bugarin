import { ArrowDown, ArrowUp, Hourglass } from "lucide-react";
import { Avatar } from "@/components/pt/avatar";
import { EmptyState } from "@/components/pt/empty-state";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { netDelta, type RiwayatRow } from "@/lib/mock/riwayat";

// Kartu "Athletic Progress Matrix" (design/RIWAYAT.md §4).
export function RiwayatTable({
  rows,
  isLoading,
}: {
  rows: RiwayatRow[];
  isLoading: boolean;
}) {
  return (
    <section className="rounded-card bg-white">
      <h2 className="p-4 text-lg font-semibold text-ink">
        Athletic Progress Matrix
      </h2>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Memuat riwayat...
        </p>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={<Hourglass />}
          title="Tidak ada data yang cocok"
          description="Coba ubah filter goal atau gender."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Client Profile
              </TableHead>
              <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Target Vector
              </TableHead>
              <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                BB Awal
              </TableHead>
              <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                BB Sekarang
              </TableHead>
              <TableHead className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Net Delta
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const delta = netDelta(row);
              const isDown = delta < 0;
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar name={row.nama} size={40} statusDot />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">{row.nama}</p>
                        <p className="text-[10px] font-bold tracking-wide text-muted-foreground uppercase">
                          Age {row.usia}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.goal === "weight_loss"
                          ? "weight-loss"
                          : "hypertrophy"
                      }
                    >
                      {row.goal === "weight_loss" ? "Weight Loss" : "Hypertrophy"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-ink">
                    {row.bbAwal.toFixed(1)} kg
                  </TableCell>
                  <TableCell className="text-xs font-bold text-ink">
                    {row.bbSekarang.toFixed(1)} kg
                  </TableCell>
                  <TableCell>
                    <Badge variant={isDown ? "delta-down" : "delta-up"}>
                      {isDown ? (
                        <ArrowDown className="size-3" />
                      ) : (
                        <ArrowUp className="size-3" />
                      )}
                      {delta > 0 ? "+" : ""}
                      {delta.toFixed(1)} kg
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
