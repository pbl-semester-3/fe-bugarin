import axios from "axios";

export const api = axios.create({
  // Relatif ke origin FE sendiri; next.config.ts me-rewrite /api/* ke backend.
  baseURL: "/api",
  withCredentials: true, // wajib — supaya cookie httpOnly JWT ikut terkirim
  headers: {
    "X-Client-Type": "web", // backend pakai ini untuk tentukan cookie vs bearer body
  },
});

// Cegah beberapa request 401 bersamaan memicu logout berulang.
let handling401 = false;

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url: string = err.config?.url ?? "";
    // Jangan redirect untuk request auth (login) agar pesan error bisa ditampilkan.
    const isAuthRequest = url.includes("/auth/");
    if (
      typeof window !== "undefined" &&
      err.response?.status === 401 &&
      !isAuthRequest &&
      !handling401
    ) {
      handling401 = true;
      // Sesi tidak valid/kedaluwarsa: bersihkan cookie (best-effort) DULU,
      // lalu ke /login. Tanpa ini, proxy bisa melempar balik ke /pt (loop).
      api
        .post("/auth/logout")
        .catch(() => undefined)
        .finally(() => {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = "/login";
        });
    }
    return Promise.reject(err);
  }
);

export function apiErrorMessage(err: unknown, fallback = "Terjadi kesalahan.") {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { error?: string | { fields?: Record<string, string> } }
      | undefined;
    const error = data?.error;
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && error.fields) {
      const first = Object.values(error.fields)[0];
      if (first) return first;
    }
    if (err.message) return err.message;
  }
  return fallback;
}
