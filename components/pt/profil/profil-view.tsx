"use client";

import { usePtProfile } from "@/hooks/usePtProfile";
import { PersonalInfoForm } from "./personal-info-form";
import { PreferencesSecurity } from "./preferences-security";
import { ProfileIdentityCard } from "./profile-identity-card";

// Workspace 12 kolom (design/PROFIL.md §1): kiri 4 (identitas), kanan 8 (settings).
export function ProfilView() {
  const { data: profile, isLoading } = usePtProfile();

  if (isLoading || !profile) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Memuat profil...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <ProfileIdentityCard profile={profile} />
      </div>
      <div className="space-y-6 lg:col-span-8">
        <PersonalInfoForm profile={profile} />
        <PreferencesSecurity profile={profile} />
      </div>
    </div>
  );
}
