"use client";

import { useState } from "react";
import { HomeConfig, Tool } from "@/lib/projects";

interface ToolsEditorProps {
  config: HomeConfig;
  onUpdate: (updatedConfig: HomeConfig) => void;
}

export const PRESET_TOOLS_LIBRARY: { name: string; slug: string; image: string; category: string }[] = [
  // Frontend & Mobile
  { name: "React", slug: "react", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", slug: "nextjs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "TypeScript", slug: "typescript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "JavaScript", slug: "javascript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Frontend" },
  { name: "Vue.js", slug: "vuejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Frontend" },
  { name: "Svelte", slug: "svelte", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", image: "https://cdn.simpleicons.org/tailwindcss", category: "Frontend" },
  { name: "HTML5", slug: "html5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS3", slug: "css3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
  { name: "Redux", slug: "redux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", category: "Frontend" },
  { name: "Flutter", slug: "flutter", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", category: "Mobile" },

  // Backend & APIs
  { name: "Node.js", slug: "nodejs", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Express", slug: "express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend" },
  { name: "Python", slug: "python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend" },
  { name: "Django", slug: "django", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend" },
  { name: "FastAPI", slug: "fastapi", image: "https://cdn.simpleicons.org/fastapi", category: "Backend" },
  { name: "Go", slug: "go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", category: "Backend" },
  { name: "Rust", slug: "rust", image: "https://cdn.simpleicons.org/rust/white", category: "Backend" },
  { name: "GraphQL", slug: "graphql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", category: "Backend" },

  // Databases & Storage
  { name: "PostgreSQL", slug: "postgresql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database" },
  { name: "MongoDB", slug: "mongodb", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
  { name: "Redis", slug: "redis", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Database" },
  { name: "MySQL", slug: "mysql", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database" },
  { name: "Prisma", slug: "prisma", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", category: "Database" },
  { name: "Supabase", slug: "supabase", image: "https://cdn.simpleicons.org/supabase", category: "Database" },
  { name: "Firebase", slug: "firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Database" },
  { name: "Upstash", slug: "upstash", image: "https://cdn.simpleicons.org/upstash", category: "Database" },

  // DevOps & Cloud
  { name: "Docker", slug: "docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" },
  { name: "Kubernetes", slug: "kubernetes", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", category: "DevOps" },
  { name: "Linux", slug: "linux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "DevOps" },
  { name: "AWS", slug: "amazonwebservices", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Cloud" },
  { name: "Google Cloud", slug: "googlecloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", category: "Cloud" },
  { name: "Vercel", slug: "vercel", image: "https://cdn.simpleicons.org/vercel/white", category: "Cloud" },
  { name: "Netlify", slug: "netlify", image: "https://cdn.simpleicons.org/netlify", category: "Cloud" },
  { name: "Cloudflare", slug: "cloudflare", image: "https://cdn.simpleicons.org/cloudflare", category: "Cloud" },
  { name: "Git", slug: "git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps" },
  { name: "GitHub", slug: "github", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "DevOps" },

  // AI & Data
  { name: "OpenAI", slug: "openai", image: "https://cdn.simpleicons.org/openai/white", category: "AI" },
  { name: "Claude (Anthropic)", slug: "claude", image: "https://cdn.simpleicons.org/anthropic/white", category: "AI" },
  { name: "PyTorch", slug: "pytorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI" },
  { name: "TensorFlow", slug: "tensorflow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI" },

  // Tools & Productivity
  { name: "Figma", slug: "figma", image: "https://cdn.simpleicons.org/figma", category: "Tools" },
  { name: "Postman", slug: "postman", image: "https://cdn.simpleicons.org/postman", category: "Tools" },
  { name: "VS Code", slug: "vscode", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tools" },
  { name: "Notion", slug: "notion", image: "https://cdn.simpleicons.org/notion/white", category: "Tools" },
  { name: "Linear", slug: "linear", image: "https://cdn.simpleicons.org/linear/white", category: "Tools" },
  { name: "Jira", slug: "jira", image: "https://cdn.simpleicons.org/jira", category: "Tools" },
  { name: "Discord", slug: "discord", image: "https://cdn.simpleicons.org/discord", category: "Tools" },
  { name: "Vite", slug: "vite", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", category: "Tools" },
  { name: "npm", slug: "npm", image: "https://cdn.simpleicons.org/npm", category: "Tools" },
  { name: "Bun", slug: "bun", image: "https://cdn.simpleicons.org/bun", category: "Tools" }
];

export default function ToolsEditor({ config, onUpdate }: ToolsEditorProps) {
  const tools: Tool[] = (config.tools && config.tools.length > 0)
    ? config.tools.map(t => ({ ...t, isEnabled: t.isEnabled !== false }))
    : PRESET_TOOLS_LIBRARY.map(p => ({ ...p, isEnabled: true }));

  const [search, setSearch] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const handleToolChange = (index: number, field: keyof Tool, value: any) => {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleToggleEnable = (index: number) => {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], isEnabled: !updatedTools[index].isEnabled };
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleAddCustomTool = () => {
    const newTool: Tool = { name: "New Tool", slug: "new-tool", image: "https://cdn.simpleicons.org/code/white", isEnabled: true };
    onUpdate({ ...config, tools: [...tools, newTool] });
  };

  const handleAddPreset = (preset: typeof PRESET_TOOLS_LIBRARY[0]) => {
    if (tools.some(t => t.name.toLowerCase() === preset.name.toLowerCase())) return;
    const newTool: Tool = { name: preset.name, slug: preset.slug, image: preset.image, isEnabled: true, category: preset.category };
    onUpdate({ ...config, tools: [...tools, newTool] });
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleMoveTool = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const updatedTools = [...tools];
      const temp = updatedTools[index];
      updatedTools[index] = updatedTools[index - 1];
      updatedTools[index - 1] = temp;
      onUpdate({ ...config, tools: updatedTools });
    } else if (direction === 'down' && index < tools.length - 1) {
      const updatedTools = [...tools];
      const temp = updatedTools[index];
      updatedTools[index] = updatedTools[index + 1];
      updatedTools[index + 1] = temp;
      onUpdate({ ...config, tools: updatedTools });
    }
  };

  const handleEnableAll = (enable: boolean) => {
    const updatedTools = tools.map(t => ({ ...t, isEnabled: enable }));
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleResetDefaults = () => {
    if (confirm("Reset tools list back to 40+ curated presets?")) {
      const defaultList = PRESET_TOOLS_LIBRARY.map(p => ({ ...p, isEnabled: true }));
      onUpdate({ ...config, tools: defaultList });
    }
  };

  const filteredTools = tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Cloud", "AI", "Tools", "Mobile"];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-white">Tools Marquee</h2>
          <p className="text-xs text-white/50 mt-1">
            Total Tools: {tools.length} | Enabled: {tools.filter(t => t.isEnabled !== false).length}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="bg-blue-600/80 hover:bg-blue-600 text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            + Add Preset Library
          </button>
          <button
            onClick={handleAddCustomTool}
            className="bg-white/15 hover:bg-white/20 text-white px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border border-white/15"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            + Add Custom Tool
          </button>
        </div>
      </div>

      {/* Preset Library Quick Add Drawer */}
      {showLibrary && (
        <div className="bg-[#111622] p-5 rounded-2xl border border-blue-500/30 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm text-blue-400">Curated Tools Library (Click to Add)</h3>
            <button onClick={() => setShowLibrary(false)} className="text-xs text-white/40 hover:text-white">Close ✕</button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filterCategory === cat ? "bg-blue-500 text-white" : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
            {PRESET_TOOLS_LIBRARY
              .filter(p => filterCategory === "All" || p.category === filterCategory)
              .map((preset, pIdx) => {
                const isAdded = tools.some(t => t.name.toLowerCase() === preset.name.toLowerCase());
                return (
                  <button
                    key={pIdx}
                    onClick={() => handleAddPreset(preset)}
                    disabled={isAdded}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isAdded 
                        ? "bg-white/5 border-white/5 opacity-40 cursor-not-allowed text-white/40" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white"
                    }`}
                  >
                    <img src={preset.image} alt={preset.name} className="w-5 h-5 object-contain shrink-0" />
                    <span className="truncate flex-1 font-medium">{preset.name}</span>
                    <span>{isAdded ? "✓" : "+"}</span>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Global Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Search tools by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30 w-full sm:w-[260px]"
        />

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => handleEnableAll(true)}
            className="text-xs text-white/60 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-md border border-white/10"
          >
            Enable All
          </button>
          <button
            onClick={() => handleEnableAll(false)}
            className="text-xs text-white/60 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-md border border-white/10"
          >
            Disable All
          </button>
          <button
            onClick={handleResetDefaults}
            className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-2.5 py-1.5 rounded-md border border-red-500/20"
          >
            Restore Defaults
          </button>
        </div>
      </div>

      {/* Tools Cards List */}
      <div className="flex flex-col gap-3">
        {filteredTools.map((tool, index) => {
          const originalIndex = tools.findIndex(t => t.name === tool.name && t.image === tool.image);
          const idx = originalIndex !== -1 ? originalIndex : index;
          const isEnabled = tool.isEnabled !== false;

          return (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex flex-col gap-4 group transition-all ${
                isEnabled 
                  ? "bg-white/5 border-white/10 hover:border-white/20" 
                  : "bg-white/[0.02] border-white/5 opacity-60 hover:opacity-100"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => handleToggleEnable(idx)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                    />
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isEnabled ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"
                    }`}>
                      {isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </label>
                  <h3 className="font-medium text-white/90 text-sm">
                    {tool.name || `Tool #${idx + 1}`}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveTool(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveTool(idx, 'down')}
                    disabled={idx === tools.length - 1}
                    className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleRemoveTool(idx)}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1"
                    title="Delete Tool"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Input Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/60">Tool Name</label>
                  <input
                    type="text"
                    value={tool.name}
                    onChange={(e) => handleToolChange(idx, "name", e.target.value)}
                    placeholder="e.g. Next.js"
                    className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/60">Icon URL (SVG / PNG / devicon / simpleicons)</label>
                  <input
                    type="text"
                    value={tool.image}
                    onChange={(e) => handleToolChange(idx, "image", e.target.value)}
                    placeholder="https://cdn.simpleicons.org/nextdotjs"
                    className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              {/* Icon Preview */}
              {tool.image && (
                <div className="flex items-center gap-3 p-2.5 bg-black/40 rounded-lg border border-white/5 shrink-0">
                  <span className="text-xs text-white/40">Preview Icon:</span>
                  <img src={tool.image} alt={tool.name} className="w-6 h-6 object-contain opacity-90" />
                </div>
              )}
            </div>
          );
        })}

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-white/40 bg-white/5 rounded-xl border border-white/10 border-dashed flex flex-col gap-2 items-center">
            <span>No tools match your filter.</span>
            <button onClick={handleAddCustomTool} className="text-xs text-blue-400 hover:underline">
              Add a new custom tool
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
