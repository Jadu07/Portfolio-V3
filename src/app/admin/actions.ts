"use server";

import { cookies } from "next/headers";
import { getGistData, updateGistData } from "@/lib/github";
import { GistData } from "@/lib/projects";
import { revalidatePath } from "next/cache";

export async function saveGistDataAction(newData: GistData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Fetch current to ensure we don't overwrite blindly
    const currentData = await getGistData(token);
    
    // 2. Merge data (in a real scenario we could do deep merge, but replacing is fine here since we send the whole object)
    const updatedData = { ...currentData, ...newData };
    
    // 3. Save to gist
    await updateGistData(token, updatedData);

    // 4. Bust the Next.js cache so the live site updates
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save gist:", error);
    return { success: false, error: String(error) };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}
