import Link from "next/link";
import Hero from "@/components/Hero";
import DomainTiles from "@/components/DomainTiles";
import SelectedWork from "@/components/SelectedWork";
import Tools from "@/components/Tools";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { fetchProjects, fetchConfig } from "@/lib/projects";

export default async function Home() {
  const projects = await fetchProjects();
  const config = await fetchConfig();
  const featuredProjects = projects
    .filter((p) => p.isFeatured)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="relative min-h-screen flex flex-col items-center w-full max-w-[1080px] mx-auto px-[16px] md:px-[32px] py-[32px] gap-[48px]">
      <div className="relative z-10 flex flex-col items-center w-full gap-[48px]">
        {/* Hero Section */}
        <Hero config={config.hero} easterEggQuotes={config.easterEggQuotes} />
        <DomainTiles config={config.domains} />

        {/* Selected Work */}
        <div className="w-full flex flex-col items-center">
          <SelectedWork projects={featuredProjects} />
          <Link href="/work" className="mt-[24px] text-white/50 hover:text-white transition-colors underline underline-offset-4 text-sm font-medium">
            View All Work
          </Link>
        </div>

        {/* Tools Section */}
        {config.tools && config.tools.length > 0 && <Tools tools={config.tools} />}

        <ContactForm config={config} />
        <Footer config={config} />
      </div>
    </main>
  );
}
