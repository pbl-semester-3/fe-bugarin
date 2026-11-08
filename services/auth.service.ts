import { api } from "@/services/api";

export type LoginInput = {
  emailOrUsername: string;
  password: string;
};

// POST /auth/login
export async function login(input: LoginInput) {
  const res = await api.post<{ data: { role: string } }>("/auth/login", input);
  return res.data.data;
}

// POST /auth/logout -> cookie `token` dihapus backend.
export async function logout() {
  await api.post("/auth/logout");
}

// POST /auth/forgot-password -> kirim kode reset ke email PT.
export async function forgotPassword(email: string) {
  const res = await api.post<{ data: string }>("/auth/forgot-password", { email });
  return res.data.data;
}
