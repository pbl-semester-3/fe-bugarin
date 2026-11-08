import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

/**
 * Petakan error validasi backend (`{ error: { fields } }`) ke field react-hook-form.
 *
 * `map` menerjemahkan nama field backend → nama field form (keduanya bisa berbeda,
 * mis. `jenisKelamin` → `gender`, `passwordBaru` → `newPassword`).
 *
 * Mengembalikan pesan pertama yang tidak punya padanan field, untuk ditampilkan
 * sebagai pesan umum (fallback). Null bila semua error berhasil dipetakan.
 */
export function applyFieldErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldErrors: Record<string, string[]>,
  map: Partial<Record<string, Path<T>>>,
): string | null {
  let firstUnmapped: string | null = null;

  for (const [serverField, messages] of Object.entries(fieldErrors)) {
    const target = map[serverField];
    if (target) {
      form.setError(target, { type: "server", message: messages[0] });
    } else if (!firstUnmapped) {
      firstUnmapped = messages[0] ?? null;
    }
  }

  return firstUnmapped;
}
