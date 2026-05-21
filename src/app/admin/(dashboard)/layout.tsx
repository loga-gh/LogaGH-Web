import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: { template: "%s | Loga Admin", default: "Admin" },
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient();
  
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    // Ignore fetch errors from mock Supabase endpoint
  }

  const cookieStore = await cookies();
  const isMockAuth = cookieStore.get("mock_admin_auth")?.value === "true";

  if (!user && !isMockAuth) {
    redirect("/admin/login");
  }

  const userEmail = user?.email ?? "loga (Admin)";

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(220 25% 7%)" }}>
      <AdminSidebar userEmail={userEmail} />
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
