import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // We are already inside /admin/..., wait, if we are in /admin/login, we shouldn't redirect!
  // This layout will apply to all /admin routes.
  // Wait, if it applies to /admin/login, it will cause an infinite redirect loop.
  // It's better to NOT put the redirect in the layout, but in a middleware or individual pages.
  // Or put the login page outside of /admin (e.g. /login), but the user said /admin/login.
  return <>{children}</>;
}
