import { Badge } from "@/components/ui/badge";

export type StatusType = 
  | "pending"
  | "diterima"
  | "ditolak"
  | "aktif"
  | "selesai"
  | "pending_review"
  | "disetujui"
  | "override";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  
  // Mapping warna sementara, UI/UX akan sesuaikan dengan warna dari Figma nanti
  switch (status) {
    case "diterima":
    case "aktif":
    case "disetujui":
    case "selesai":
      variant = "default"; // Akan dikustomisasi ke warna success jika ada di theme
      break;
    case "ditolak":
    case "override":
      variant = "destructive";
      break;
    case "pending":
    case "pending_review":
      variant = "secondary";
      break;
  }

  const label = status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());

  return <Badge variant={variant}>{label}</Badge>;
}
