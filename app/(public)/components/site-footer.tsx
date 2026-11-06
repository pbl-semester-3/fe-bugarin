import Image from "next/image";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import {
  FOOTER_CONTACTS,
  FOOTER_SOCIALS,
  LANDING_NAV,
} from "@/lib/landing-content";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export function SiteFooter() {
  return (
    <footer className="bg-landing-footer text-white">
      <div className="mx-auto grid max-w-[1320px] 2xl:max-w-[1380px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-9">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/bugarin-logo.png"
              alt="Logo Bugarin"
              width={514}
              height={486}
              className="h-11 w-auto"
            />
            <span className="text-2xl font-extrabold tracking-tight">
              Bugarin
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Platform pendampingan kebugaran yang menghubungkan Anda dengan
            personal trainer sungguhan.
          </p>
          <div className="mt-5 flex gap-2">
            {FOOTER_SOCIALS.map((key) => {
              const Icon = SOCIAL_ICONS[key];
              return (
                <span
                  key={key}
                  role="img"
                  aria-label={`Bugarin di ${key}`}
                  title={`Bugarin di ${key}`}
                  className="flex size-9 cursor-default items-center justify-center rounded-full bg-white/10 text-white"
                >
                  <Icon className="size-4" />
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-white/40 uppercase">
            Navigasi Utama
          </p>
          <nav className="mt-4 flex flex-col gap-3">
            {LANDING_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-white/40 uppercase">
            Kontak
          </p>
          <div className="mt-4 space-y-3">
            {FOOTER_CONTACTS.map((contact) => (
              <div key={contact.label}>
                <p className="text-[10px] text-white/40">{contact.label}</p>
                <p className="text-sm text-white/75">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] 2xl:max-w-[1380px] flex-col gap-2 px-5 py-5 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-9">
          <p>© {new Date().getFullYear()} Bugarin. Seluruh hak cipta dilindungi.</p>
          <p>Dibangun untuk perjalanan kebugaran yang lebih terarah.</p>
        </div>
      </div>
    </footer>
  );
}
