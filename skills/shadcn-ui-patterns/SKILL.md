---
name: shadcn-ui-patterns
description: Pola pemakaian shadcn/ui + Tailwind untuk komponen Web Dashboard PT & Admin Bugarin — table, dialog, form, dan theming siang/malam. Gunakan saat membangun komponen UI baru.
metadata:
  origin: bugarin-project
---

# shadcn/ui Patterns (Bugarin)

shadcn/ui bukan npm package biasa — komponennya di-generate ke dalam repo (`components/ui/`) lewat CLI, jadi **milik project sepenuhnya** dan boleh diedit langsung. Skill ini fokus ke pola pemakaian yang relevan untuk kebutuhan Bugarin (tabel data, form, dialog konfirmasi, tema).

## Activation

- Menambah komponen shadcn baru (`npx shadcn add ...`).
- Membangun tabel data (Verifikasi, Klien, Riwayat, CRUD User).
- Membangun form dengan validasi (Profil, Tambah PT Baru, Override Weekly Plan).
- Implementasi toggle tema siang/malam.

## Setup Awal

```bash
npx shadcn@latest init
npx shadcn@latest add button table dialog alert-dialog form input select card badge textarea
```

Cek versi/perintah terbaru lewat `context7-docs-lookup` sebelum setup — CLI shadcn cukup sering update nama command.

## Pola Tabel Data + Aksi

Dipakai di Verifikasi, Klien, Riwayat, CRUD User. Kombinasikan `Table` dengan TanStack Table kalau butuh sorting/filtering, atau `Table` polos untuk list sederhana (Riwayat cukup polos).

```tsx
// components/verifikasi-table.tsx
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePairingRequests, useRespondPairingRequest } from "@/hooks/usePairingRequests";
import { TolakDialog } from "./tolak-dialog";

export function VerifikasiTable() {
  const { data } = usePairingRequests();
  const respond = useRespondPairingRequest();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Klien</TableHead>
          <TableHead>Tujuan</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.klienNama}</TableCell>
            <TableCell>{r.tujuan}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button size="sm" onClick={() => respond.mutate({ id: r.id, action: "accept" })}>
                Terima
              </Button>
              <TolakDialog requestId={r.id} /> {/* dialog terpisah, lihat pola di bawah */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Pola Dialog dengan Form (mis. Tolak + Alasan)

Pisahkan dialog jadi komponen sendiri supaya state buka/tutup tidak bocor ke parent table:

```tsx
// components/tolak-dialog.tsx
"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRespondPairingRequest } from "@/hooks/usePairingRequests";

export function TolakDialog({ requestId }: { requestId: number }) {
  const [open, setOpen] = useState(false);
  const [alasan, setAlasan] = useState("");
  const respond = useRespondPairingRequest();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">Tolak</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Alasan Penolakan</DialogTitle></DialogHeader>
        <Textarea value={alasan} onChange={(e) => setAlasan(e.target.value)} placeholder="Wajib diisi" />
        <DialogFooter>
          <Button
            disabled={!alasan.trim()}
            onClick={() => {
              respond.mutate({ id: requestId, action: "reject", alasan });
              setOpen(false);
            }}
          >
            Kirim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Pola Aksi Destruktif (Hapus User di Admin)

Pakai `AlertDialog` (bukan `Dialog` biasa) khusus untuk aksi yang tidak bisa dibatalkan — shadcn membedakan keduanya supaya visual "ini serius" konsisten di seluruh app:

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="destructive">Hapus</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Hapus user ini?</AlertDialogTitle>
      <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Ya, Hapus</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Theming Siang/Malam

shadcn generate CSS variable berbasis class `.dark` di root. Toggle tema Bugarin (bukan cuma preferensi OS, tapi field tersimpan per user di `PUT /pt/theme` dst) berarti kontrol manual, bukan `prefers-color-scheme` otomatis:

```tsx
// providers/theme-provider.tsx
"use client";
import { useEffect } from "react";

export function ThemeProvider({ tema, children }: { tema: "siang" | "malam"; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "malam");
  }, [tema]);
  return <>{children}</>;
}
```
`tema` diambil dari data profil hasil fetch (`GET /pt/profile`), bukan disimpan di localStorage saja — supaya konsisten kalau user pindah device.

## Anti-Patterns

| Anti-Pattern | Risiko | Perbaikan |
|---|---|---|
| Edit `node_modules` untuk kustomisasi komponen shadcn | shadcn bukan npm dependency biasa — komponen ada di `components/ui/`, edit di sana |
| Pakai `Dialog` untuk aksi destruktif (hapus) | Tidak ada visual "warning" konsisten | Pakai `AlertDialog` khusus destructive action |
| Toggle tema hanya via CSS media query OS | Tidak sinkron dengan pengaturan tema tersimpan user di backend | Kontrol manual dari data profil + `document.documentElement.classList` |
| Taruh semua state dialog di parent table | Re-render tabel penuh tiap dialog dibuka/tutup | Pisahkan dialog jadi komponen sendiri dengan state lokal |

## Related

- Skill: `nextjs-app-router-patterns` — Client Component boundary untuk komponen interaktif di atas
- Skill: `form-validation-patterns` — kombinasi shadcn `Form` + react-hook-form + Zod
- Skill: `frontend-taste-bugarin` — arah desain dashboard (dense, scannable) yang mendasari pilihan komponen ini
