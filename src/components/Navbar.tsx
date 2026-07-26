"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeConfig } from "@/lib/projects";
import { usePathname } from "next/navigation";

export default function Navbar({ config }: { config: HomeConfig }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const iconColor = '#e6e6e6';

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNameClick = () => {
    closeMenu();
    if (typeof window !== "undefined") {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.dispatchEvent(new CustomEvent("name-clicked"));
    }
  };

  return (
    <>
      <nav className="relative mt-[15px] z-[60] w-full flex justify-center">
        <div 
          className="flex items-center justify-between w-full max-w-[1080px]"
          style={{ padding: '19px 32px' }}
        >
          {/* Left Side: Name */}
          <div className="font-small text-[16px] text-white tracking-[0.5px] z-[60] flex items-center">
            <Link 
              href="/" 
              onClick={handleNameClick} 
              className="hover:text-[rgba(230,230,230,0.6)] transition-colors flex items-center cursor-pointer select-none"
            >
              {config.name}
            </Link>
          </div>

          {/* Desktop Right Side: Links */}
          <div className="hidden md:flex items-center gap-[10px]">
            <Link 
              href="/work" 
              className="hover:text-[rgba(230,230,230,0.6)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6e6e6] rounded-[8px] p-[12px] font-medium text-[16px] tracking-[-0.3px] leading-none text-[#e6e6e6]"
            >
              Work
            </Link>
            {config.resume.enabled && (
              <a 
                href={config.resume.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[rgba(230,230,230,0.6)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6e6e6] rounded-[8px] p-[12px] font-medium text-[16px] tracking-[-0.3px] leading-none text-[#e6e6e6]"
              >
                Resume
              </a>
            )}
            <Link 
              href="/about-me" 
              className="hover:text-[rgba(230,230,230,0.6)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6e6e6] rounded-[8px] p-[12px] font-medium text-[16px] tracking-[-0.3px] leading-none text-[#e6e6e6]"
            >
              About Me
            </Link>
            {config.socials.filter(s => s.showOnNavbar !== false).map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-70 transition-opacity flex items-center ml-0 w-[27px] h-[26px]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor} dangerouslySetInnerHTML={{ __html: social.iconSvg }} />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden z-[60] flex flex-col items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-[20px] h-[2px] bg-[#e6e6e6] transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-[4px]'}`} />
            <span className={`block w-[20px] h-[2px] bg-[#e6e6e6] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-[20px] h-[2px] bg-[#e6e6e6] transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-[4px]'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-[rgba(10,14,20,0.85)] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-[32px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <Link 
                  href="/work" 
                  onClick={closeMenu}
                  className="text-[32px] font-medium text-[#e6e6e6] hover:text-white transition-colors"
                >
                  Work
                </Link>
              </motion.div>
              
              {config.resume.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <a 
                    href={config.resume.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-[32px] font-medium text-[#e6e6e6] hover:text-white transition-colors"
                  >
                    Resume
                  </a>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <Link 
                  href="/about-me" 
                  onClick={closeMenu}
                  className="text-[32px] font-medium text-[#e6e6e6] hover:text-white transition-colors"
                >
                  About Me
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex gap-[24px] mt-[24px]"
              >
                {config.socials.filter(s => s.showOnNavbar !== false).map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:opacity-70 transition-opacity flex items-center justify-center w-[32px] h-[32px] text-[#e6e6e6]"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: social.iconSvg }} />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
