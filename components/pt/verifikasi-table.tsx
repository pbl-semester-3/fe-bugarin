"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePairingRequests, useRespondPairingRequest } from "@/hooks/usePairingRequests";
import { tujuanLabel } from "@/lib/mock/pt";
import { TolakDialog } from "./tolak-dialog";

// Contoh halaman penuh (blueprint pola slicing): Table + Dialog + mutation.
export function VerifikasiTable() {
  const { data, isLoading } = usePairingRequests();
  const respond = useRespondPairingRequest();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Klien</TableHead>
          <TableHead>Tujuan</TableHead>
          <TableHead>Tanggal Request</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              Memuat...
            </TableCell>
          </TableRow>
        ) : data && data.length > 0 ? (
          data.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.klien.nama}</TableCell>
              <TableCell>{tujuanLabel(request.klien.tujuan)}</TableCell>
              <TableCell>
                {new Date(request.createdAt).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  size="sm"
                  disabled={respond.isPending}
                  onClick={() => respond.mutate({ id: request.id })}
                >
                  Terima
                </Button>
                <TolakDialog requestId={request.id} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              Tidak ada permintaan pairing yang menunggu.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
