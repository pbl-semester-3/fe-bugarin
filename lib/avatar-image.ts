// Cloudinary face-crop untuk avatar. URL asli tetap dipakai di tempat lain
// (mis. foto profil ukuran penuh); transformasi hanya diterapkan pada Avatar.
const CLOUDINARY_HOST = "res.cloudinary.com";
const UPLOAD_MARKER = "/image/upload/";

export function getFaceCropUrl(
  src: string | null | undefined,
  size: number
): string | null {
  if (!src) return null;

  try {
    const url = new URL(src);
    if (url.hostname !== CLOUDINARY_HOST) return src;

    const markerIndex = url.pathname.indexOf(UPLOAD_MARKER);
    if (markerIndex === -1) return src;

    const rest = url.pathname.slice(markerIndex + UPLOAD_MARKER.length);
    const firstSegment = rest.split("/")[0] ?? "";
    // Hindari transformasi ganda bila URL sudah punya transformasi.
    if (/(^|,)(c_|w_|h_|g_|f_|q_|dpr_)/.test(firstSegment)) return src;

    const px = Math.max(32, Math.min(400, Math.ceil(size * 2)));
    const transform = `c_fill,g_face,w_${px},h_${px},q_auto,f_auto`;
    url.pathname = `${url.pathname.slice(
      0,
      markerIndex + UPLOAD_MARKER.length
    )}${transform}/${rest}`;

    return url.toString();
  } catch {
    return src;
  }
}
