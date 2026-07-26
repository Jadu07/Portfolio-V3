"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Tool } from "@/lib/projects";

export default function Tools({ tools = [] }: { tools?: Tool[] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="w-full flex flex-col items-center justify-center my-[20px] md:my-[40px]">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[32px] md:text-[38px] font-normal text-center mb-[40px] text-[#e6e6e6]"
      >
        Tools
      </motion.h2>

      <div 
        className="relative w-full max-w-[900px] overflow-hidden py-4"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
        }}
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 60, repeat: Infinity }}
          className="flex flex-row items-center gap-[48px] w-max py-2"
        >
          {[...tools, ...tools].map((tool, idx) => (
            <div
              key={idx}
              className="relative group/tool shrink-0 flex flex-col items-center"
            >
              <div className="w-[50px] h-[50px] flex items-center justify-center hover:scale-110 transition-all duration-300 opacity-85 hover:opacity-100 cursor-pointer">
                <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" />
              </div>

              {/* Tooltip Badge on Hover */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/tool:opacity-100 group-hover/tool:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap">
                <div className="bg-[#0f1520]/95 border border-white/15 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-[#e6e6e6] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  {tool.name}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
