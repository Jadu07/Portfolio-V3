import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { fetchConfig } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchConfig();
  
  return {
    title: {
      default: `${config.name} | Portfolio`,
      template: `%s | ${config.name}`,
    },
    description: `Portfolio and selected work of ${config.name}`,
    openGraph: {
      title: `${config.name} - ${config.hero.title}`,
      description: `Portfolio and selected work of ${config.name}`,
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      siteName: config.name,
      images: [
        {
          url: config.hero.photo,
          width: 800,
          height: 800,
          alt: `${config.name} Profile Picture`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.name} - ${config.hero.title}`,
      description: `Portfolio and selected work of ${config.name}`,
      images: [config.hero.photo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await fetchConfig();

  return (
    <html lang="en">
      <body className={`antialiased bg-[#000000] text-[#e6e6e6] overflow-x-hidden`}>
        <AnimatedBackground />
        <Navbar config={config} />
        {children}
      </body>
    </html>
  );
}
