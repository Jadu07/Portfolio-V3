"use client";

import { motion } from "framer-motion";
import { HomeConfig } from "@/lib/projects";

export default function Hero({ config }: { config: HomeConfig['hero'] }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center w-full max-w-[1080px] mx-auto pt-[24px]"
      style={{ paddingBottom: '10px' }}
    >
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-full px-[20px] md:px-0">
        {/* Avatar - squircle */}
        <div className="flex justify-center w-full">
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
