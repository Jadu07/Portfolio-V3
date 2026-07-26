"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HomeConfig } from "@/lib/projects";

export default function ContactForm({ config }: { config: HomeConfig }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="w-full flex flex-col items-center justify-center my-[40px] md:my-[80px] px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[700px] flex flex-col items-center"
      >
        <div className="text-center mb-[32px]">
          <h2 className="text-[32px] md:text-[40px] font-normal tracking-[-0.02em] mb-[12px] text-[#e6e6e6]">
            Get in touch
          </h2>
          <p className="text-[#a1a1aa] text-[16px] md:text-[18px] max-w-[440px] mx-auto leading-[1.6]">
            Have a project in mind or just want to say hi? Drop a message below and I'll get back to you.
          </p>
        </div>

        {/* Transparent Blurry Box */}
        <div className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[24px] p-[24px] md:p-[40px]">
          <form 
            onSubmit={handleSubmit} 
            className="w-full flex flex-col gap-[24px]"
          >
            <div className="flex flex-col md:flex-row gap-[24px]">
              <div className="flex-1 flex flex-col gap-[8px]">
                <label htmlFor="name" className="text-[13px] font-medium text-[#a1a1aa] ml-1 tracking-wide">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-transparent border border-white/10 rounded-[12px] px-[16px] py-[14px] text-[#e6e6e6] placeholder:text-[#a1a1aa]/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.01] transition-all"
                />
              </div>
              
              <div className="flex-1 flex flex-col gap-[8px]">
                <label htmlFor="email" className="text-[13px] font-medium text-[#a1a1aa] ml-1 tracking-wide">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-transparent border border-white/10 rounded-[12px] px-[16px] py-[14px] text-[#e6e6e6] placeholder:text-[#a1a1aa]/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.01] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label htmlFor="message" className="text-[13px] font-medium text-[#a1a1aa] ml-1 tracking-wide">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border border-white/10 rounded-[12px] px-[16px] py-[14px] text-[#e6e6e6] placeholder:text-[#a1a1aa]/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.01] transition-all resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting" || status === "success"}
              className="mt-[8px] w-full bg-[#e6e6e6] text-[#0a0e14] font-medium text-[16px] rounded-[12px] py-[14px] hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === "idle" && "Send Message"}
              {status === "submitting" && (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-[#0a0e14]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
