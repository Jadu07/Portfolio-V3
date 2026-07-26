"use client";

import { useState } from "react";
import { ProjectData } from "@/lib/projects";
import { Section, Input, Textarea } from "./ConfigEditor";

export default function ProjectsEditor({ projects, onChange }: { projects: ProjectData[], onChange: (p: ProjectData[]) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

  const addProject = () => {
    const newId = Date.now().toString();
    const newProject: ProjectData = {
      id: newId,
      title: "New Project",
      desc: "",
      order: projects.length + 1,
      isFeatured: false,
      stats: [],
      buttons: [],
      contentAlign: "left",
    };
    onChange([...projects, newProject]);
    setExpandedId(newId);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof ProjectData, value: any) => {
    onChange(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const updated = [...projects];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      updated.forEach((p, i) => p.order = i + 1);
      onChange(updated);
    } else if (direction === 'down' && index < projects.length - 1) {
      const updated = [...projects];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      updated.forEach((p, i) => p.order = i + 1);
      onChange(updated);
    }
  };

  const moveStat = (projId: string, index: number, direction: 'up' | 'down') => {
    const proj = projects.find(p => p.id === projId);
    if (!proj || !proj.stats) return;
    if (direction === 'up' && index > 0) {
      const updated = [...proj.stats];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      updateProject(projId, 'stats', updated);
    } else if (direction === 'down' && index < proj.stats.length - 1) {
      const updated = [...proj.stats];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      updateProject(projId, 'stats', updated);
    }
  };

  const moveButton = (projId: string, index: number, direction: 'up' | 'down') => {
    const proj = projects.find(p => p.id === projId);
    if (!proj || !proj.buttons) return;
    if (direction === 'up' && index > 0) {
      const updated = [...proj.buttons];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      updateProject(projId, 'buttons', updated);
    } else if (direction === 'down' && index < proj.buttons.length - 1) {
      const updated = [...proj.buttons];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      updateProject(projId, 'buttons', updated);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h2 className="text-2xl font-medium tracking-tight">Projects</h2>
        <button 
          onClick={addProject}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Add Project
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((proj, idx) => {
          const isExpanded = expandedId === proj.id;
          
          return (
            <div key={proj.id} className="bg-[#131a26] border border-white/5 rounded-2xl overflow-hidden">
              {/* Header / Collapsed View */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : proj.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => moveProject(idx, 'up')}
                      disabled={idx === 0}
                      className="w-6 h-6 flex items-center justify-center bg-white/5 text-white/60 rounded hover:bg-white/10 hover:text-white disabled:opacity-20 transition-colors text-xs"
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button 
                      onClick={() => moveProject(idx, 'down')}
                      disabled={idx === projects.length - 1}
                      className="w-6 h-6 flex items-center justify-center bg-white/5 text-white/60 rounded hover:bg-white/10 hover:text-white disabled:opacity-20 transition-colors text-xs"
                      title="Move Down"
                    >
                      ↓
                    </button>
                  </div>
                  <span className="text-[#a1a1aa] font-mono text-sm">#{idx + 1}</span>
                  <h3 className="font-medium text-[#e6e6e6]">{proj.title || "Untitled Project"}</h3>
                  {proj.isFeatured && <span className="text-[10px] uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Featured</span>}
                </div>
                <div className="flex items-center gap-2">
                  <svg className={`w-5 h-5 text-[#a1a1aa] transition-transform ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-6 border-t border-white/5 flex flex-col gap-8 bg-[#0f151f]">
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={proj.isFeatured} 
                        onChange={(e) => updateProject(proj.id, "isFeatured", e.target.checked)}
                        className="w-5 h-5 accent-white"
                      />
                      <span className="text-sm font-medium">Show on Homepage (Featured)</span>
                    </label>

                    <button 
                      onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      Delete Project
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6">
                      <Input label="Title" value={proj.title} onChange={(v) => updateProject(proj.id, "title", v)} />
                      <Textarea label="Description" value={proj.desc} onChange={(v) => updateProject(proj.id, "desc", v)} />
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a1a1aa]">Content Horizontal Alignment</label>
                        <select 
                          value={proj.contentAlign || "left"} 
                          onChange={(e) => updateProject(proj.id, "contentAlign", e.target.value)}
                          className="bg-[#0a0e14] border border-white/10 rounded-xl px-4 py-3 text-[#e6e6e6] focus:outline-none focus:border-white/30 transition-colors w-full"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[#a1a1aa]">Content Vertical Alignment (if no buttons)</label>
                        <select 
                          value={proj.contentVerticalAlign || "center"} 
                          onChange={(e) => updateProject(proj.id, "contentVerticalAlign", e.target.value)}
                          className="bg-[#0a0e14] border border-white/10 rounded-xl px-4 py-3 text-[#e6e6e6] focus:outline-none focus:border-white/30 transition-colors w-full"
                        >
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                        </select>
                      </div>
                      <Input label="Card Link (Optional URL for entire card)" value={proj.cardLink || ""} onChange={(v) => updateProject(proj.id, "cardLink", v)} />
                    </div>

                    <div className="flex flex-col gap-6">
                      <Input label="Order (Sorting priority)" value={proj.order.toString()} onChange={(v) => updateProject(proj.id, "order", parseInt(v) || 0)} />
                      <Input label="Static Image URL" value={proj.image || ""} onChange={(v) => updateProject(proj.id, "image", v)} />
                      <Input label="Video URL (MP4, YouTube, Vimeo)" value={proj.video || ""} onChange={(v) => updateProject(proj.id, "video", v)} />
                      <Input label="Video Poster URL (Fallback image)" value={proj.poster || ""} onChange={(v) => updateProject(proj.id, "poster", v)} />
                    </div>
                  </div>

                  {/* Stats Array */}
                  <div className="flex flex-col gap-4 p-4 border border-white/5 rounded-2xl bg-[#0a0e14]">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-[#e6e6e6]">Highlight Stats</h4>
                      <button 
                        onClick={() => updateProject(proj.id, "stats", [...(proj.stats || []), { label: "New Stat", value: "0" }])}
                        className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-1"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        Add Stat
                      </button>
                    </div>
                    {proj.stats?.map((stat, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 p-4 bg-[#131a26] rounded-xl relative group">
                        <div className="flex flex-col gap-1 shrink-0">
                          <button 
                            onClick={() => moveStat(proj.id, sIdx, 'up')}
                            disabled={sIdx === 0}
                            className="w-6 h-6 flex items-center justify-center bg-white/5 text-white/60 rounded hover:bg-white/10 hover:text-white disabled:opacity-20 transition-colors text-xs"
                            title="Move Up"
                          >
                            ↑
                          </button>
                          <button 
                            onClick={() => moveStat(proj.id, sIdx, 'down')}
                            disabled={sIdx === (proj.stats?.length || 0) - 1}
                            className="w-6 h-6 flex items-center justify-center bg-white/5 text-white/60 rounded hover:bg-white/10 hover:text-white disabled:opacity-20 transition-colors text-xs"
                            title="Move Down"
                          >
                            ↓
                          </button>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <Input label="Label (e.g. Time Saved)" value={stat.label} onChange={(v) => {
                            const newStats = [...proj.stats];
                            newStats[sIdx].label = v;
                            updateProject(proj.id, "stats", newStats);
                          }} />
                          <Input label="Value (e.g. $3M+)" value={stat.value} onChange={(v) => {
                            const newStats = [...proj.stats];
                            newStats[sIdx].value = v;
                            updateProject(proj.id, "stats", newStats);
                          }} />
                        </div>
                        <button 
                          onClick={() => {
                            const newStats = [...proj.stats];
                            newStats.splice(sIdx, 1);
                            updateProject(proj.id, "stats", newStats);
                          }}
                          className="mt-6 w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 shrink-0"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Buttons Array */}
                  <div className="flex flex-col gap-4 p-4 border border-white/5 rounded-2xl bg-[#0a0e14]">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-[#e6e6e6]">Action Buttons</h4>
                      <button 
                        onClick={() => updateProject(proj.id, "buttons", [...(proj.buttons || []), { text: "New Button", link: "", isEnabled: true, isPrimary: true }])}
                        className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-1"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        Add Button
                      </button>
                    </div>
                    {proj.buttons?.map((btn, bIdx) => (
                      <div key={bIdx} className="flex flex-col gap-4 p-4 bg-[#131a26] rounded-xl relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">Button #{bIdx + 1}</span>
                          <div className="flex items-center gap-2 mr-8">
                            <button 
                              onClick={() => moveButton(proj.id, bIdx, 'up')}
                              disabled={bIdx === 0}
                              className="w-6 h-6 flex items-center justify-center bg-white/5 text-white/60 rounded hover:bg-white/10 hover:text-white disabled:opacity-20 transition-colors text-xs"
                              title="Move Up"
                            >
                              ↑
                            </button>
                            <button 
                              onClick={() => moveButton(proj.id, bIdx, 'down')}
                              disabled={bIdx === (proj.buttons?.length || 0) - 1}
                              className="w-6 h-6 flex items-center justify-center bg-white/5 text-white/60 rounded hover:bg-white/10 hover:text-white disabled:opacity-20 transition-colors text-xs"
                              title="Move Down"
                            >
                              ↓
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            const newBtns = [...proj.buttons];
                            newBtns.splice(bIdx, 1);
                            updateProject(proj.id, "buttons", newBtns);
                          }}
                          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10">
                          <Input label="Button Text" value={btn.text} onChange={(v) => {
                            const newBtns = [...proj.buttons];
                            newBtns[bIdx].text = v;
                            updateProject(proj.id, "buttons", newBtns);
                          }} />
                          <Input label="URL Link" value={btn.link} onChange={(v) => {
                            const newBtns = [...proj.buttons];
                            newBtns[bIdx].link = v;
                            updateProject(proj.id, "buttons", newBtns);
                          }} />
                        </div>
                        <div className="flex gap-6 mt-2">
                          <label className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={btn.isEnabled} 
                              onChange={(e) => {
                                const newBtns = [...proj.buttons];
                                newBtns[bIdx].isEnabled = e.target.checked;
                                updateProject(proj.id, "buttons", newBtns);
                              }}
                              className="w-4 h-4 accent-white"
                            />
                            <span className="text-sm text-[#a1a1aa]">Enabled</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={btn.isPrimary ?? false} 
                              onChange={(e) => {
                                const newBtns = [...proj.buttons];
                                // Ensure only one button is primary for the cardLink logic
                                if (e.target.checked) {
                                  newBtns.forEach(b => b.isPrimary = false);
                                }
                                newBtns[bIdx].isPrimary = e.target.checked;
                                updateProject(proj.id, "buttons", newBtns);
                              }}
                              className="w-4 h-4 accent-white"
                            />
                            <span className="text-sm text-[#a1a1aa]">Is Primary (Used for card link)</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
