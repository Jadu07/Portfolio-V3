"use client";

import { useState } from "react";
import { GistData } from "@/lib/projects";
import { saveGistDataAction } from "@/app/admin/actions";
import ConfigEditor from "./ConfigEditor";
import ProjectsEditor from "./ProjectsEditor";
import AboutEditor from "./AboutEditor";
import ToolsEditor from "./ToolsEditor";
import EasterEggEditor from "./EasterEggEditor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard({ initialData }: { initialData: GistData }) {
  const [data, setData] = useState<GistData>(initialData);
  const [history, setHistory] = useState<GistData[]>([]);
  const [activeTab, setActiveTab] = useState<"config" | "projects" | "about" | "tools" | "easter-egg">("config");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // FORCE SYNC: If they are missing tools entirely, inject all 31 default tools
    if (data.config && (!data.config.tools || data.config.tools.length === 0)) {
      const defaultTools = [
        { name: "React", slug: "react", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", slug: "nextjs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", slug: "typescript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "JavaScript", slug: "javascript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Node.js", slug: "nodejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", slug: "express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", slug: "mongodb", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", slug: "postgresql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", slug: "mysql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Redis", slug: "redis", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
        { name: "Prisma", slug: "prisma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
        { name: "Docker", slug: "docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Git", slug: "git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", slug: "github", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Linux", slug: "linux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "AWS", slug: "amazonwebservices", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Google Cloud", slug: "googlecloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { name: "Firebase", slug: "firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "HTML5", slug: "html5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", slug: "css3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Vercel", slug: "vercel", image: "https://cdn.simpleicons.org/vercel/white" },
        { name: "Figma", slug: "figma", image: "https://cdn.simpleicons.org/figma" },
        { name: "Postman", slug: "postman", image: "https://cdn.simpleicons.org/postman" },
        { name: "Notion", slug: "notion", image: "https://cdn.simpleicons.org/notion/white" },
        { name: "Discord", slug: "discord", image: "https://cdn.simpleicons.org/discord" },
        { name: "Jira", slug: "jira", image: "https://cdn.simpleicons.org/jira" },
        { name: "Netlify", slug: "netlify", image: "https://cdn.simpleicons.org/netlify" },
        { name: "Cloudflare", slug: "cloudflare", image: "https://cdn.simpleicons.org/cloudflare" },
        { name: "Supabase", slug: "supabase", image: "https://cdn.simpleicons.org/supabase" },
        { name: "Upstash", slug: "upstash", image: "https://cdn.simpleicons.org/upstash" },
        { name: "npm", slug: "npm", image: "https://cdn.simpleicons.org/npm" }
      ];
      setData(prev => ({ ...prev, config: { ...prev.config!, tools: defaultTools } }));
    }
    // Also add a forceful reset if it's currently at exactly 12 tools so they get their full list back!
    else if (data.config && data.config.tools && data.config.tools.length === 12) {
      const defaultTools = [
        { name: "React", slug: "react", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", slug: "nextjs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", slug: "typescript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "JavaScript", slug: "javascript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Node.js", slug: "nodejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", slug: "express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", slug: "mongodb", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", slug: "postgresql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", slug: "mysql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Redis", slug: "redis", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
        { name: "Prisma", slug: "prisma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
        { name: "Docker", slug: "docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Git", slug: "git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", slug: "github", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Linux", slug: "linux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
        { name: "AWS", slug: "amazonwebservices", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Google Cloud", slug: "googlecloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { name: "Firebase", slug: "firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "HTML5", slug: "html5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", slug: "css3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Vercel", slug: "vercel", image: "https://cdn.simpleicons.org/vercel/white" },
        { name: "Figma", slug: "figma", image: "https://cdn.simpleicons.org/figma" },
        { name: "Postman", slug: "postman", image: "https://cdn.simpleicons.org/postman" },
        { name: "Notion", slug: "notion", image: "https://cdn.simpleicons.org/notion/white" },
        { name: "Discord", slug: "discord", image: "https://cdn.simpleicons.org/discord" },
        { name: "Jira", slug: "jira", image: "https://cdn.simpleicons.org/jira" },
        { name: "Netlify", slug: "netlify", image: "https://cdn.simpleicons.org/netlify" },
        { name: "Cloudflare", slug: "cloudflare", image: "https://cdn.simpleicons.org/cloudflare" },
        { name: "Supabase", slug: "supabase", image: "https://cdn.simpleicons.org/supabase" },
        { name: "Upstash", slug: "upstash", image: "https://cdn.simpleicons.org/upstash" },
        { name: "npm", slug: "npm", image: "https://cdn.simpleicons.org/npm" }
      ];
      setData(prev => ({ ...prev, config: { ...prev.config!, tools: defaultTools } }));
    }
  }, [data.config?.tools?.length]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    const res = await saveGistDataAction(data);
    if (res.success) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } else {
      setSaveStatus("error");
      alert("Failed to save: " + res.error);
    }
    setIsSaving(false);
  };

  const handleUpdate = (section: keyof GistData, newData: any) => {
    setHistory((prev) => [...prev, data]);
    setData((prev) => ({
      ...prev,
      [section]: newData
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+Z (Mac) or Ctrl+Z (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        setHistory((prev) => {
          if (prev.length === 0) return prev;
          const newHistory = [...prev];
          const previousState = newHistory.pop();
          if (previousState) {
            setData(previousState);
          }
          return newHistory;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="h-[70px] border-b border-white/5 bg-transparent flex items-center justify-between px-6 shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <a href="/" className="font-medium text-[16px] text-white tracking-[0.5px] hover:text-[rgba(230,230,230,0.6)] transition-colors">
            {data.config?.name || "Admin"}
          </a>
          <span className="text-white/20">/</span>
          <h1 className="text-[16px] font-normal tracking-tight text-[#a1a1aa]">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          
          <label className="flex items-center gap-2 text-sm text-[#a1a1aa] cursor-pointer group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors border border-white/5">
            <span>Maintenance (Dev) Mode</span>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${data.config?.maintenanceMode ? 'bg-green-500' : 'bg-white/20'}`}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${data.config?.maintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <input 
              type="checkbox" 
              className="hidden"
              checked={data.config?.maintenanceMode || false}
              onChange={(e) => {
                if(data.config) {
                  handleUpdate("config", { ...data.config, maintenanceMode: e.target.checked });
                }
              }}
            />
          </label>

          <button
            onClick={async () => {
              const { logoutAction } = await import("@/app/admin/actions");
              await logoutAction();
              window.location.href = "/admin/login";
            }}
            className="text-sm text-[#a1a1aa] hover:text-white px-3 py-2 rounded-full transition-colors border border-transparent hover:border-white/10 hover:bg-white/5"
          >
            Logout
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              saveStatus === "success" 
                ? "bg-green-500 text-white" 
                : isSaving 
                  ? "bg-white/20 text-white/50 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {isSaving ? "Saving..." : saveStatus === "success" ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-[240px] border-r border-white/5 bg-black/20 backdrop-blur-xl p-4 flex flex-col gap-2 shrink-0">
          <TabButton active={activeTab === "config"} onClick={() => setActiveTab("config")} label="Global Settings" />
          <TabButton active={activeTab === "projects"} onClick={() => setActiveTab("projects")} label="Projects" />
          <TabButton active={activeTab === "about"} onClick={() => setActiveTab("about")} label="About Me" />
          <TabButton active={activeTab === "tools"} onClick={() => setActiveTab("tools")} label="Tools" />
          <TabButton active={activeTab === "easter-egg"} onClick={() => setActiveTab("easter-egg")} label="Easter Egg Quotes" />
        </aside>

        {/* Editor Area */}
        <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-12 relative">
          <div className="max-w-[900px] mx-auto w-full pb-32">
            {activeTab === "config" && data.config && <ConfigEditor config={data.config} onChange={(c) => handleUpdate("config", c)} />}
            {activeTab === "projects" && <ProjectsEditor projects={data.projects} onChange={(p) => handleUpdate("projects", p)} />}
            {activeTab === "about" && data.about && <AboutEditor about={data.about} onChange={(a) => handleUpdate("about", a)} />}
            {activeTab === "tools" && data.config && <ToolsEditor config={data.config} onUpdate={(c) => handleUpdate("config", c)} />}
            {activeTab === "easter-egg" && data.config && <EasterEggEditor config={data.config} onUpdate={(c) => handleUpdate("config", c)} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl transition-all ${
        active 
          ? "bg-white/10 text-white font-medium border border-white/10" 
          : "text-[#a1a1aa] hover:text-white hover:bg-white/5 border border-transparent"
      }`}
    >
      {label}
    </button>
  );
}
