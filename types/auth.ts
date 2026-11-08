export type Role = "klien" | "pt" | "admin";
export type Tema = "siang" | "malam";

// GET /auth/me — identitas sesi aktif.
export type Me = {
  id: number;
  email: string;
  username: string;
  role: Role;
  tema: Tema;
};
