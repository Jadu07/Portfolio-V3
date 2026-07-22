import SelectedWork from "@/components/SelectedWork";
import Footer from "@/components/Footer";
import { fetchProjects, fetchConfig } from "@/lib/projects";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchConfig();
  return {
    title: `Selected Work | ${config.name}`,
    description: `View the featured projects and work of ${config.name}.`,
    openGraph: {
      title: `Selected Work | ${config.name}`,
      description: `View the featured projects and work of ${config.name}.`,
    }
  };
}

export default async function WorkPage() {
  const projects = await fetchProjects();
  const config = await fetchConfig();
  const allProjects = projects.sort((a, b) => a.order - b.order);

  return (
    <main className="relative min-h-screen flex flex-col items-center w-full max-w-[1080px] mx-auto px-[16px] md:px-[32px] py-[32px] gap-[48px]">
      <div className="relative z-10 w-full flex flex-col items-center pb-[100px]">
        {/* We reuse the SelectedWork component which renders the exact Framer design */}
        <SelectedWork projects={allProjects} />
      </div>

      {/* Footer */}
      <Footer config={config} />
    </main>
  );
}
