import { redirect } from "next/navigation";
import { AdminShell } from "@/components/shell/admin-shell";
import { PtShell } from "@/components/shell/pt-shell";
import { getMe } from "@/services/auth.server";

function themeInitScript(role: "admin" | "pt") {
  if (role === "admin") {
    return 'try{var d=document.documentElement;d.classList.remove("dark");var a=localStorage.getItem("bugarin-admin-theme");if(a==="dark"||a==="light"){d.dataset.theme=a;}}catch(e){}';
  }
  return 'try{var d=document.documentElement;d.removeAttribute("data-theme");var t=localStorage.getItem("bugarin-pt-theme");if(t==="malam"){d.classList.add("dark");}else{d.classList.remove("dark");}}catch(e){}';
}

// Guard + shell untuk seluruh halaman web PT/Admin dengan URL bersih.
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) redirect("/login");
  if (me.role !== "admin" && me.role !== "pt") redirect("/login");

  const isAdmin = me.role === "admin";

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript(me.role) }} />
      {isAdmin ? <AdminShell>{children}</AdminShell> : <PtShell>{children}</PtShell>}
    </>
  );
}
