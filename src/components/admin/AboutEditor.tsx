"use client";

import { AboutData } from "@/lib/projects";
import { Section, Input, Textarea } from "./ConfigEditor";

export default function AboutEditor({ about, onChange }: { about: AboutData, onChange: (a: AboutData) => void }) {
  
  const updateField = (field: keyof AboutData, value: any) => {
    onChange({ ...about, [field]: value });
  };

  const moveItem = <T,>(list: T[], index: number, direction: 'up' | 'down', field: keyof AboutData) => {
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
      
      {/* Stats */}
      <Section title="Highlight Stats">
        <div className="flex flex-col gap-4">
          {about.stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Stat {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(about.stats, idx, 'up', 'stats')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(about.stats, idx, 'down', 'stats')}
                    disabled={idx === about.stats.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newStats = [...about.stats];
                      newStats.splice(idx, 1);
                      updateField("stats", newStats);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Delete Stat"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Label (e.g. Users served)" value={stat.label} onChange={(v) => {
                  const newStats = [...about.stats];
                  newStats[idx].label = v;
                  updateField("stats", newStats);
                }} />
                <Input label="Value (e.g. 2K+)" value={stat.value} onChange={(v) => {
                  const newStats = [...about.stats];
                  newStats[idx].value = v;
                  updateField("stats", newStats);
                }} />
              </div>
            </div>
          ))}
          <button 
            onClick={() => updateField("stats", [...about.stats, { label: "New Stat", value: "0" }])}
            className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2 py-3 border border-dashed border-white/10 rounded-xl justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Stat
          </button>
        </div>
      </Section>

      {/* Story */}
      <Section title="My Story (Paragraphs)">
        <div className="flex flex-col gap-4">
          {about.story.map((para, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Paragraph {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(about.story, idx, 'up', 'story')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(about.story, idx, 'down', 'story')}
                    disabled={idx === about.story.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newStory = [...about.story];
                      newStory.splice(idx, 1);
                      updateField("story", newStory);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Delete Paragraph"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <Textarea 
                label="Story Text" 
                value={para} 
                onChange={(v) => {
                  const newStory = [...about.story];
                  newStory[idx] = v;
                  updateField("story", newStory);
                }} 
              />
            </div>
          ))}
          <button 
            onClick={() => updateField("story", [...about.story, "New paragraph..."])}
            className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2 py-4 border border-dashed border-white/10 rounded-xl justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Paragraph
          </button>
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="flex flex-col gap-4">
          {about.experience.map((exp, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Experience {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(about.experience, idx, 'up', 'experience')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(about.experience, idx, 'down', 'experience')}
                    disabled={idx === about.experience.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newExp = [...about.experience];
                      newExp.splice(idx, 1);
                      updateField("experience", newExp);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Delete Experience"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Role" value={exp.role} onChange={(v) => {
                  const newExp = [...about.experience];
                  newExp[idx].role = v;
                  updateField("experience", newExp);
                }} />
                <Input label="Company" value={exp.company} onChange={(v) => {
                  const newExp = [...about.experience];
                  newExp[idx].company = v;
                  updateField("experience", newExp);
                }} />
                <Input label="Duration/Year" value={exp.year} onChange={(v) => {
                  const newExp = [...about.experience];
                  newExp[idx].year = v;
                  updateField("experience", newExp);
                }} />
              </div>
            </div>
          ))}
          <button 
            onClick={() => updateField("experience", [...about.experience, { role: "New Role", company: "Company", year: "2026" }])}
            className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2 py-4 border border-dashed border-white/10 rounded-xl justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Experience
          </button>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="flex flex-col gap-4">
          {about.education.map((edu, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Education {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(about.education, idx, 'up', 'education')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(about.education, idx, 'down', 'education')}
                    disabled={idx === about.education.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newEdu = [...about.education];
                      newEdu.splice(idx, 1);
                      updateField("education", newEdu);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Delete Education"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Degree / Certification" value={edu.degree} onChange={(v) => {
                  const newEdu = [...about.education];
                  newEdu[idx].degree = v;
                  updateField("education", newEdu);
                }} />
                <Input label="School / Institution" value={edu.school} onChange={(v) => {
                  const newEdu = [...about.education];
                  newEdu[idx].school = v;
                  updateField("education", newEdu);
                }} />
                <Input label="Year" value={edu.year} onChange={(v) => {
                  const newEdu = [...about.education];
                  newEdu[idx].year = v;
                  updateField("education", newEdu);
                }} />
              </div>
            </div>
          ))}
          <button 
            onClick={() => updateField("education", [...about.education, { degree: "New Degree", school: "School", year: "2026" }])}
            className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2 py-4 border border-dashed border-white/10 rounded-xl justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Education
          </button>
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-col gap-6">
          {about.skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white/80">Skill Category {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(about.skills, idx, 'up', 'skills')}
                    disabled={idx === 0}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(about.skills, idx, 'down', 'skills')}
                    disabled={idx === about.skills.length - 1}
                    className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newSkills = [...about.skills];
                      newSkills.splice(idx, 1);
                      updateField("skills", newSkills);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                    title="Delete Category"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <Input label="Category Name (e.g. Full Stack Development)" value={skillGroup.category} onChange={(v) => {
                const newSkills = [...about.skills];
                newSkills[idx].category = v;
                updateField("skills", newSkills);
              }} />

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/60">Skills in this category</label>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-[#0a0e14] border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                      <span>{item}</span>
                      <button 
                        onClick={() => {
                          const newSkills = [...about.skills];
                          newSkills[idx].items.splice(itemIdx, 1);
                          updateField("skills", newSkills);
                        }}
                        className="text-red-400 hover:text-red-300"
                        title="Remove Skill"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      placeholder="Add a skill..."
                      className="bg-transparent border-b border-white/20 text-sm px-2 py-1 focus:outline-none focus:border-white w-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          e.preventDefault();
                          const newSkills = [...about.skills];
                          newSkills[idx].items.push(e.currentTarget.value);
                          updateField("skills", newSkills);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => updateField("skills", [...about.skills, { category: "New Category", items: [] }])}
            className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2 py-4 border border-dashed border-white/10 rounded-xl justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Skill Category
          </button>
        </div>
      </Section>

    </div>
  );
}
