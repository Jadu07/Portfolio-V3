"use client";

import { motion } from "framer-motion";
import { AboutData } from "@/lib/projects";

export default function AboutContent({ data }: { data: AboutData | null }) {
  if (!data) return null;

  // Flatten skills for the existing UI layout
  const allSkills = data.skills 
    ? data.skills.flatMap(s => [s.category, ...s.items]).filter(Boolean)
    : [];

  return (
    <div className="relative z-10 w-full flex flex-col items-center pb-[100px]">
      <div className="w-full max-w-[800px] px-5 sm:px-8 flex flex-col gap-[80px]">
        
        {/* Stats Row */}
        {data.stats && data.stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[600px] mx-auto px-4"
          >
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-between gap-6 sm:gap-0 items-center justify-items-center">
              {data.stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col gap-1 text-center sm:text-left min-w-[120px] ${
                    data.stats.length === 3 && idx === 2 
                      ? 'col-span-2 justify-self-center sm:col-span-1' 
                      : ''
                  }`}
                >
                  <span className="text-[12px] text-[#b3c2cb] font-medium">{stat.label}</span>
                  <span className="text-[32px] sm:text-[46px] font-normal text-[#e6e6e6] leading-[1.2]">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bio Story */}
        {data.story && data.story.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-[24px] text-[18px] leading-[1.6] text-[#d1dae0]"
          >
            {data.story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>
        )}

        {/* Selected Experience */}
        {data.experience && data.experience.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-[20px]"
          >
            <h2 className="text-[32px] font-normal text-[#e6e6e6] mb-[10px]">Selected Experience</h2>
            
            <div className="flex flex-col">
              {data.experience.map((job, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start py-[16px] sm:py-[24px] gap-[8px] sm:gap-[0px] border-b border-[#cccccc1a]">
                  <span className="text-[18px] sm:text-[20px] text-[#b3c2cb] font-normal">{job.role}</span>
                  <div className="flex flex-col sm:items-end sm:text-right items-start text-left">
                    <span className="text-[14px] text-[#b3c2cb]">{job.company}</span>
                    <span className="text-[14px] text-[#b3c2cb]">{job.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-[30px]"
          >
            <h2 className="text-[32px] font-normal text-[#e6e6e6]">Skills</h2>
            
            <div className="flex flex-wrap gap-[12px]">
              {allSkills.map((skill, idx) => (
                <div key={idx} className="px-[16px] py-[8px] rounded-[6px] border border-[#cccccc22] bg-[#00000033]">
                  <span className="text-[14px] text-[#d1dae0] font-normal">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-[20px]"
          >
            <h2 className="text-[32px] font-normal text-[#e6e6e6] mb-[10px]">Education</h2>
            
            <div className="flex flex-col">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start py-[16px] sm:py-[24px] gap-[8px] sm:gap-[0px] border-b border-[#cccccc1a]">
                  <span className="text-[18px] sm:text-[20px] text-[#b3c2cb] font-normal">{edu.degree}</span>
                  <div className="flex flex-col sm:items-end sm:text-right items-start text-left">
                    <span className="text-[14px] text-[#b3c2cb]">{edu.school}</span>
                    <span className="text-[14px] text-[#b3c2cb]">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
