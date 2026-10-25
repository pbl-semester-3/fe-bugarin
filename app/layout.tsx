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
  title: "Bugarin Dashboard",
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
        {/* Terapkan tema admin tersimpan sebelum render pertama (anti-kedip). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("bugarin-admin-theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t;}}catch(e){}',
          }}
        />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
