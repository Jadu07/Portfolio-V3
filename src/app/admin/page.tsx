import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getGistData } from "@/lib/github";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  let data;
  try {
    data = await getGistData(token);
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-screen bg-[#0a0e14] text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl text-red-500 mb-4">Error fetching Gist Data</h1>
        <p className="text-[#a1a1aa] mb-8">Your GitHub token might be invalid, or the Gist ID is incorrect.</p>
        <a href="/admin/login" className="bg-white text-black px-6 py-2 rounded-full font-medium">
          Login Again
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white/20 relative z-10">
      <AdminDashboard initialData={data} />
    </div>
  );
}
