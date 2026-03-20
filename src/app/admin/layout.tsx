import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: { template: "%s | Loga Admin", default: "Admin" },
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(220 25% 7%)" }}>
      <AdminSidebar userEmail={user.email ?? ""} />
      <main
        className="flex-1 overflow-auto"
        style={{ background: "hsl(220 22% 10%)" }}
        id="admin-main-content"
      >
        {children}
      </main>
    </div>
  );
}
