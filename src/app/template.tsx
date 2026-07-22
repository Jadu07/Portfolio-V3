"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] // Apple-like smooth ease-out curve, no wobble/bounce
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
