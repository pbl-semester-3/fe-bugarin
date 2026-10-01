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

// Mapping status -> varian badge desain PT (docs/DESIGN_PT.md §6).
export function StatusBadge({ status }: StatusBadgeProps) {
  let variant:
    | "done"
    | "destructive"
    | "queued" = "queued";

  switch (status) {
    case "diterima":
    case "aktif":
    case "disetujui":
    case "selesai":
      variant = "done";
      break;
    case "ditolak":
    case "override":
      variant = "destructive";
      break;
    case "pending":
    case "pending_review":
      variant = "queued";
      break;
  }

  const label = status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return <Badge variant={variant}>{label}</Badge>;
}
