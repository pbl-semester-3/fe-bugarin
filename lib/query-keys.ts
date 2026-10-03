export const queryKeys = {
  pt: {
    dashboard: ["pt", "dashboard"] as const,
    pairingRequests: ["pt", "pairing-requests"] as const,
    klienList: ["pt", "klien"] as const,
    klienDetail: (id: number) => ["pt", "klien", id] as const,
    weeklyPlan: (klienId: number) => ["pt", "klien", klienId, "weekly-plan"] as const,
    riwayat: ["pt", "riwayat"] as const,
    feedback: ["pt", "feedback"] as const,
    profile: ["pt", "profile"] as const,
  },
  admin: {
    dashboard: ["admin", "dashboard"] as const,
    users: (role?: "klien" | "pt") => ["admin", "users", role ?? "all"] as const,
    riwayat: ["admin", "riwayat"] as const,
    profile: ["admin", "profile"] as const,
  },
};
