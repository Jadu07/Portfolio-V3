"use client";

import { motion } from "framer-motion";
import { HomeConfig } from "@/lib/projects";

export default function DomainTiles({ config }: { config: HomeConfig['domains'] }) {
  // If no domains are configured, return null
  if (!config || config.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
      className="flex flex-col md:flex-row justify-between items-stretch overflow-hidden w-full gap-[24px]"
    >
      {config.map((tile, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-start self-stretch overflow-hidden flex-1 px-[20px] py-[24px] md:px-[32px] rounded-[24px] border border-[rgba(255,255,255,0.05)] bg-transparent"
        >
          <p className="text-center w-full text-[16px] md:text-[18px] font-normal leading-[1.4em] tracking-[-0.3px] text-[rgba(230,230,230,0.6)]">
            <span className="block mb-[4px] font-medium text-[rgb(230,230,230)]">
              {tile.title}
            </span>
            {tile.desc}
          </p>
        </div>
      ))}
    </motion.section>
  );
}
