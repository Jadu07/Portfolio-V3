"use client";

import { HomeConfig } from "@/lib/projects";

export default function ConfigEditor({ config, onChange }: { config: HomeConfig, onChange: (c: HomeConfig) => void }) {
  
  const updateField = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const updateNested = (parent: "hero" | "resume" | "contact", field: string, value: any) => {
    onChange({
      ...config,
      [parent]: { ...config[parent], [field]: value }
    });
  };

  const moveItem = <T,>(list: T[], index: number, direction: 'up' | 'down', field: string) => {
    if (direction === 'up' && index > 0) {
      const updated = [...list];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      updateField(field, updated);
    } else if (direction === 'down' && index < list.length - 1) {
      const updated = [...list];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      updateField(field, updated);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <Section title="General">
        <Input label="Name" value={config.name} onChange={(v) => updateField("name", v)} />
      </Section>

      <Section title="Hero Section">
        <Textarea label="Hero Title" value={config.hero.title} onChange={(v) => updateNested("hero", "title", v)} />
        <Input label="Profile Photo URL" value={config.hero.photo} onChange={(v) => updateNested("hero", "photo", v)} />
      </Section>

      <Section title="Resume Button">
        <div className="flex items-center gap-4 mb-4">
          <input 
            type="checkbox" 
            checked={config.resume.enabled} 
            onChange={(e) => updateNested("resume", "enabled", e.target.checked)} 
            className="w-5 h-5 accent-white"
          />
          <span className="text-[#e6e6e6]">Enable Resume Button</span>
        </div>
        <Input label="Resume URL" value={config.resume.url} onChange={(v) => updateNested("resume", "url", v)} />
      </Section>

      <Section title="Contact Information">
        <Input label="Email" value={config.contact.email} onChange={(v) => updateNested("contact", "email", v)} />
        <Input label="Phone" value={config.contact.phone} onChange={(v) => updateNested("contact", "phone", v)} />
        <Input label="Copyright Text" value={config.contact.copyright} onChange={(v) => updateNested("contact", "copyright", v)} />
      </Section>

      <Section title="Social Links">
        <div className="flex flex-col gap-4">
          {config.socials.map((social, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Social Link {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(config.socials, idx, 'up', 'socials')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(config.socials, idx, 'down', 'socials')}
                    disabled={idx === config.socials.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newSocials = [...config.socials];
                      newSocials.splice(idx, 1);
                      updateField("socials", newSocials);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Remove Social Link"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <Input label="Platform Name" value={social.platform} onChange={(v) => {
                const newSocials = [...config.socials];
                newSocials[idx].platform = v;
                updateField("socials", newSocials);
              }} />
              <Input label="Profile URL" value={social.url} onChange={(v) => {
                const newSocials = [...config.socials];
                newSocials[idx].url = v;
                updateField("socials", newSocials);
              }} />
              <Textarea label="Icon SVG Path (d=...)" value={social.iconSvg} onChange={(v) => {
                const newSocials = [...config.socials];
                newSocials[idx].iconSvg = v;
                updateField("socials", newSocials);
              }} />
              <label className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  checked={social.showOnNavbar ?? false} 
                  onChange={(e) => {
                    const newSocials = [...config.socials];
                    newSocials[idx].showOnNavbar = e.target.checked;
                    updateField("socials", newSocials);
                  }}
                  className="w-4 h-4 accent-white"
                />
                <span className="text-sm text-[#a1a1aa]">Show on top navbar</span>
              </label>
            </div>
          ))}
          <button 
            onClick={() => updateField("socials", [...config.socials, { platform: "New Social", url: "", iconSvg: "", showOnNavbar: true }])}
            className="flex items-center justify-center gap-2 py-4 border border-dashed border-white/20 rounded-2xl text-[#a1a1aa] hover:text-white hover:border-white/40 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Social Link
          </button>
        </div>
      </Section>

      <Section title="Domain Cards (Expertise)">
        <div className="flex flex-col gap-4">
          {config.domains.map((domain, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Domain {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(config.domains, idx, 'up', 'domains')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(config.domains, idx, 'down', 'domains')}
                    disabled={idx === config.domains.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newDomains = [...config.domains];
                      newDomains.splice(idx, 1);
                      updateField("domains", newDomains);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Remove Domain"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <Input label="Title" value={domain.title} onChange={(v) => {
                const newDomains = [...config.domains];
                newDomains[idx].title = v;
                updateField("domains", newDomains);
              }} />
              <Input label="Description" value={domain.desc} onChange={(v) => {
                const newDomains = [...config.domains];
                newDomains[idx].desc = v;
                updateField("domains", newDomains);
              }} />
            </div>
          ))}
          <button 
            onClick={() => updateField("domains", [...config.domains, { title: "New Domain", desc: "" }])}
            className="flex items-center justify-center gap-2 py-4 border border-dashed border-white/20 rounded-2xl text-[#a1a1aa] hover:text-white hover:border-white/40 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Domain
          </button>
        </div>
      </Section>
    </div>
  );
}

export function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="pb-2 border-b border-white/10">
        <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      </div>
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </section>
  );
}

export function Input({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white/60">{label}</label>
      <input 
        type="text" 
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors w-full"
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white/60">{label}</label>
      <textarea 
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors w-full resize-y"
      />
    </div>
  );
}
