import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { isAuthed } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Belle Luxe — Admin Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthed();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
