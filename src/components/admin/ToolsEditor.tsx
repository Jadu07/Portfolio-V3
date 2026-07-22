"use client";

import { useEffect } from "react";
import { HomeConfig, Tool } from "@/lib/projects";

interface ToolsEditorProps {
  config: HomeConfig;
  onUpdate: (updatedConfig: HomeConfig) => void;
}

export default function ToolsEditor({ config, onUpdate }: ToolsEditorProps) {
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

  const tools = config.tools || defaultTools;

  useEffect(() => {
    // FORCE RESET to the full 31 tools if missing or currently restricted to 12
    if (!config.tools || config.tools.length === 0 || config.tools.length === 12) {
      onUpdate({ ...config, tools: defaultTools });
    }
  }, [config.tools]);

  const handleToolChange = (index: number, field: keyof Tool, value: string) => {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    onUpdate({ ...config, tools: updatedTools });
  };

  const handleAddTool = () => {
    const updatedTools = [...tools, { name: "", slug: "", image: "" }];
    onUpdate({ ...config, tools: updatedTools });
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tools Marquee</h2>
        <button
          onClick={handleAddTool}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Tool
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-white/80">Tool {index + 1}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMoveTool(index, 'up')}
                  disabled={index === 0}
                  className="p-2 text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveTool(index, 'down')}
                  disabled={index === tools.length - 1}
                  className="p-2 text-white/50 hover:text-white disabled:opacity-30 transition-colors"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleRemoveTool(index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/60">Name (e.g., React)</label>
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => handleToolChange(index, "name", e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/60">Image URL (SVG icon)</label>
                <input
                  type="text"
                  value={tool.image}
                  onChange={(e) => handleToolChange(index, "image", e.target.value)}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
            
            {tool.image && (
              <div className="flex items-center gap-4 mt-2 p-3 bg-black/30 rounded-lg border border-white/5">
                <span className="text-xs text-white/40">Preview:</span>
                <img src={tool.image} alt={tool.name} className="w-8 h-8 object-contain opacity-80" />
              </div>
            )}
          </div>
        ))}
        {tools.length === 0 && (
          <div className="text-center py-10 text-white/40 bg-white/5 rounded-xl border border-white/10 border-dashed">
            No tools added yet. Click 'Add Tool' to start.
          </div>
        )}
      </div>
    </div>
  );
}
