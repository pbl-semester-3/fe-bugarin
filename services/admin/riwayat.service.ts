import { api } from "@/services/api";
import type { AdminRiwayatData, AuditAction } from "@/types/admin";

type AdminRiwayatApi = {
  data: {
    feedbackLogs: {
      id: number;
      namaPt: string;
      fotoPt: string | null;
      namaKlien: string;
      fotoKlien: string | null;
      pesan: string;
      createdAt: string;
    }[];
    adminActivityLogs: {
      id: number;
      namaAdmin: string;
      namaTargetUser: string | null;
      fotoTargetUser: string | null;
      aksi: string;
      createdAt: string;
    }[];
  };
  meta: unknown;
};

function formatWib(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return { time: "-", date: "-" };
  return {
    time: `${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    })} WIB`,
    date: date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }),
  };
}

// Data audit di DB hanya menyimpan teks `aksi`; turunkan tipe aksi dari kata kerja.
function toAuditAction(aksi: string): AuditAction {
  const text = aksi.toLowerCase();
  if (text.includes("membuat") || text.includes("create")) return "CREATE";
  if (text.includes("menghapus") || text.includes("delete")) return "DELETE";
  return "UPDATE";
}

// GET /admin/riwayat — ambil batch besar lalu filter/pagination di client.
export async function getAdminRiwayat() {
  const res = await api.get<AdminRiwayatApi>("/admin/riwayat?limit=100");
  const { data } = res.data;
  return {
    activeTrainers: 0,
    feedbackLogs: data.feedbackLogs.map((log) => {
      const when = formatWib(log.createdAt);
      return {
        id: `FBK-${log.id}`,
        time: when.time,
        date: when.date,
        trainer: { name: log.namaPt, photoUrl: log.fotoPt ?? null },
        client: { name: log.namaKlien, photoUrl: log.fotoKlien ?? null },
        note: log.pesan,
      };
    }),
    auditLogs: data.adminActivityLogs.map((log) => {
      const when = formatWib(log.createdAt);
      return {
        id: log.id,
        time: when.time,
        date: when.date,
        actor: log.namaAdmin,
        action: toAuditAction(log.aksi),
        target: log.namaTargetUser ?? "-",
        targetPhotoUrl: log.fotoTargetUser ?? null,
        module: "Kelola Pengguna",
        status: "BERHASIL" as const,
      };
    }),
  } satisfies AdminRiwayatData;
}
