"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeConfig, DEFAULT_EASTER_EGG_QUOTES } from "@/lib/projects";

interface HeroProps {
  config: HomeConfig['hero'];
  easterEggQuotes?: string[];
}

export default function Hero({ config, easterEggQuotes }: HeroProps) {
  const activeQuotes = easterEggQuotes && easterEggQuotes.length > 0 ? easterEggQuotes : DEFAULT_EASTER_EGG_QUOTES;
  const [easterEggIndex, setEasterEggIndex] = useState<number | null>(null);
  const [easterEggKey, setEasterEggKey] = useState(0);
  const [lastIndex, setLastIndex] = useState<number>(-1);

  useEffect(() => {
    const handleNameClick = () => {
      setLastIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % activeQuotes.length;
        setEasterEggIndex(nextIndex);
        return nextIndex;
      });
      setEasterEggKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("name-clicked", handleNameClick);
    return () => window.removeEventListener("name-clicked", handleNameClick);
  }, [activeQuotes]);

  useEffect(() => {
    if (easterEggIndex !== null) {
      const timer = setTimeout(() => {
        setEasterEggIndex(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [easterEggIndex, easterEggKey]);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center w-full max-w-[1080px] mx-auto pt-[24px]"
      style={{ paddingBottom: '10px' }}
    >
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-full px-[20px] md:px-0">
        {/* Avatar - squircle */}
        <div className="flex justify-center w-full relative">
          <AnimatePresence>
            {easterEggIndex !== null && (
              <motion.div
                key={easterEggKey}
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute -top-[42px] md:-top-[48px] z-30 pointer-events-none"
              >
                {/* Ultra-Minimal Floating Pill (No Arrow) */}
                <div className="bg-[#0f1520]/85 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center">
                  <span className="text-[#e6e6e6] text-[12px] md:text-[13px] font-medium tracking-tight text-center whitespace-nowrap">
                    {activeQuotes[easterEggIndex]}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 50, delay: 0.1, mass: 1, stiffness: 120 }}
            className="relative w-[80px] h-[80px] md:w-[108px] md:h-[108px] shrink-0 overflow-visible rounded-[40px] md:rounded-[60px]"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[40px] md:rounded-[60px]">
              <img
                src={config.photo}
                alt="Avatar"
                className="w-full h-full object-cover object-center block"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center w-full pt-[16px] md:pt-[24px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 50, delay: 0.2, mass: 0.6, stiffness: 300 }}
            className="w-full max-w-[720px]"
          >
            <h1 className="text-[28px] md:text-[44px] font-medium leading-[1.3em] md:leading-[1.2em] tracking-[-0.03em] text-center text-[rgba(230,230,230,1)]">
              {config.title}
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
