"use client";

import { HomeConfig } from "@/lib/projects";

export default function Footer({ config }: { config: HomeConfig }) {
  return (
    <footer className="w-full pb-[60px] pt-[80px] flex flex-col items-center justify-center gap-[24px]">
      
      {/* Social Icons */}
      {config.socials && config.socials.length > 0 && (
        <div className="flex flex-row items-center justify-center gap-[24px] text-[rgba(230,230,230,0.9)]">
          {config.socials.map((social, idx) => (
            <a 
              key={idx}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-70 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: social.iconSvg }} />
            </a>
          ))}
        </div>
      )}
      
      {/* Footer Text (Contact + Copyright) */}
      <div className="flex flex-col items-center justify-center gap-[8px] text-[#b3c2cb] text-[12px] font-normal" style={{ fontFamily: '"Satoshi", sans-serif' }}>
        <div className="flex items-center gap-[8px]">
          <a href={`tel:${config.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
            {config.contact.phone}
          </a>
          <span className="opacity-40">•</span>
          <a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors">
            {config.contact.email}
          </a>
        </div>
        <p>
          {config.contact.copyright}
        </p>
      </div>
    </footer>
  );
}
