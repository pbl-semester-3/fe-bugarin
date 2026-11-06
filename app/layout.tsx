import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

// Font di-host sendiri (bukan next/font/google) untuk menghindari bug Next.js 16 +
// Turbopack: Google Fonts kadang mengembalikan URL tanpa ekstensi sehingga build gagal
// ("next/font/google queries have exactly one entry"). Lihat vercel/next.js#99114.
// File: Plus Jakarta Sans (variable, latin) — lisensi OFL.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bugarin",
  description: "Bugarin Personal Trainer & Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans antialiased">
        {/* Terapkan tema tersimpan sebelum render pertama (anti-kedip). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var p=location.pathname,d=document.documentElement;if(p.indexOf("/admin")===0){d.classList.remove("dark");var a=localStorage.getItem("bugarin-admin-theme");if(a==="dark"||a==="light"){d.dataset.theme=a;}}else if(p.indexOf("/pt")===0){d.removeAttribute("data-theme");var t=localStorage.getItem("bugarin-pt-theme");if(t==="malam"){d.classList.add("dark");}else{d.classList.remove("dark");}}else{d.classList.remove("dark");d.removeAttribute("data-theme");}}catch(e){}',
          }}
        />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
