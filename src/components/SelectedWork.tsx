"use client";

import { motion } from "framer-motion";
import { ProjectData } from "@/lib/projects";

export default function SelectedWork({ projects }: { projects: ProjectData[] }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="work" className="relative flex flex-col items-center w-full">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[38px] font-normal text-center mb-[60px] text-[#e6e6e6]"
      >
        Selected Work
      </motion.h2>

      <div className="flex flex-col gap-[60px] w-full items-center">
        {projects.map((work, idx) => (
          <motion.div
            key={work.id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative group bg-[#0f151f] rounded-[24px] md:rounded-[32px] p-[24px] sm:p-[40px] md:p-[60px] w-full flex flex-col md:flex-row gap-[32px] md:gap-[60px] focus-within:ring-2 focus-within:ring-[#e6e6e6] transition-all hover:bg-[#131a26]"
          >
            {/* Whole Card Link */}
            {(() => {
              const mainLink = work.cardLink || work.buttons?.find(b => b.isPrimary !== false)?.link;
              return mainLink ? (
                <a 
                  href={mainLink} 
                  className="absolute inset-0 z-0 rounded-[24px] md:rounded-[32px]"
                  aria-label={`View details for ${work.title}`}
                />
              ) : null;
            })()}

            {/* Left Column: Text and Button */}
            <div className={`relative z-10 flex-1 flex flex-col ${work.buttons?.length > 0 ? 'justify-between' : (work.contentVerticalAlign === 'top' ? 'justify-start' : 'justify-center')} ${work.contentAlign === 'center' ? 'items-center text-center' : work.contentAlign === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
              <div className="flex flex-col gap-[12px]">
                <h3 className="text-[24px] md:text-[30px] font-medium text-[#d1dae0]">
                  {work.title}
                </h3>
                <p className="text-[#b3c2cb] text-[16px] md:text-[18px] font-normal leading-[1.4em] max-w-[420px]">
                  {work.desc}
                </p>
              </div>

              {work.buttons && work.buttons.length > 0 && (
                <div className={`mt-[32px] md:mt-0 flex flex-wrap gap-[16px] relative z-20 ${work.contentAlign === 'center' ? 'justify-center' : work.contentAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                  {work.buttons.map((btn, bIdx) => (
                    btn.isEnabled ? (
                      <a 
                        key={bIdx}
                        href={btn.link}
                        className="inline-flex px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-[32px] border text-[15px] md:text-[16px] font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6e6e6] transition-colors border-[#b3c2cb] text-[#d1dae0] hover:bg-[#b3c2cb]/10"
                      >
                        {btn.text}
                      </a>
                    ) : (
                      <span 
                        key={bIdx} 
                        className="inline-flex px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-[32px] border text-[15px] md:text-[16px] font-normal cursor-not-allowed border-[#b3c2cb]/30 text-[#b3c2cb]/50"
                      >
                        {btn.text}
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Image and Stats */}
            <div className="relative z-10 flex-[1.2] flex flex-col gap-[24px] md:gap-[40px] w-full pointer-events-none">
              {/* Image Container */}
              <div className="w-full rounded-[16px] md:rounded-[32px] overflow-hidden bg-[#000000] relative aspect-[1.6]">
                {work.video ? (
                  (() => {
                    const ytMatch = work.video.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                    const vimeoMatch = work.video.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
                    
                    if (ytMatch && ytMatch[1]) {
                      const ytId = ytMatch[1];
                      return (
                        <iframe
                          className="w-full h-full object-cover block pointer-events-none scale-150"
                          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1&iv_load_policy=3`}
                          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                          allowFullScreen
                          title={work.title}
                        />
                      );
                    } else if (vimeoMatch && vimeoMatch[1]) {
                      const vimeoId = vimeoMatch[1];
                      return (
                        <iframe
                          className="w-full h-full object-cover block pointer-events-none scale-[1.15]"
                          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1`}
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={work.title}
                        />
                      );
                    } else {
                      return (
                        <video
                          src={work.video}
                          poster={work.poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover block pointer-events-none"
                        />
                      );
                    }
                  })()
                ) : (
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full block object-cover object-top"
                  />
                )}
              </div>

              {/* Stats Grid */}
              {work.stats && work.stats.length > 0 && (
                <div className="flex flex-row gap-[16px] sm:gap-[32px] w-full">
                  {work.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-[8px] md:gap-[12px] flex-1">
                      <span className="text-[#b3c2cb] text-[14px] md:text-[16px] font-normal">
                        {stat.label}
                      </span>
                      <span className="text-[#e6e6e6] text-[28px] sm:text-[32px] md:text-[42px] font-medium leading-[1]">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
