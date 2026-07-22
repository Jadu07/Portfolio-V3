import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { fetchAbout, fetchConfig } from "@/lib/projects";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchConfig();
  return {
    title: `About Me | ${config.name}`,
    description: `Learn more about ${config.name}, their background, skills, and experience.`,
    openGraph: {
      title: `About Me | ${config.name}`,
      description: `Learn more about ${config.name}, their background, skills, and experience.`,
    }
  };
}

export default async function AboutMePage() {
  const aboutData = await fetchAbout();
  const config = await fetchConfig();

  return (
    <main className="relative min-h-screen flex flex-col items-center w-full max-w-[1080px] mx-auto px-[16px] md:px-[32px] py-[32px] gap-[48px]">
      <AboutContent data={aboutData} />
      <Footer config={config} />
    </main>
  );
}
