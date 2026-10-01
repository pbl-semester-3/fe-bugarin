"use client";

import { StatCard } from "@/components/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePtDashboard } from "@/hooks/usePtDashboard";

// TODO slicing: sesuaikan tampilan dengan Figma (PRD bab 4.1).
export default function PtDashboardPage() {
  const { data, isLoading } = usePtDashboard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan klien aktif dan jadwal latihan minggu ini.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Klien Aktif"
          value={isLoading ? "-" : (data?.jumlahKlien ?? 0)}
          description="Total klien yang sedang dibimbing"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-semibold">Jadwal Latihan Minggu Ini</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Klien</TableHead>
              <TableHead>Hari</TableHead>
              <TableHead>Jam</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Lokasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Memuat...
                </TableCell>
              </TableRow>
            ) : data && data.jadwalMingguIni.length > 0 ? (
              data.jadwalMingguIni.map((jadwal, i) => (
                <TableRow key={`${jadwal.klienNama}-${i}`}>
                  <TableCell>{jadwal.klienNama}</TableCell>
                  <TableCell>{jadwal.hari}</TableCell>
                  <TableCell>{jadwal.jam}</TableCell>
                  <TableCell>{jadwal.jenis}</TableCell>
                  <TableCell>{jadwal.lokasi}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Belum ada jadwal minggu ini.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
