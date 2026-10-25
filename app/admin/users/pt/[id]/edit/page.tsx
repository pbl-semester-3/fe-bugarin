import { EditTrainerForm } from "@/components/admin/users/edit-trainer-form";

// Halaman Edit PT (design/admin/kelola-pengguna.md §8).
export default async function EditTrainerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditTrainerForm trainerId={Number(id)} />;
}
