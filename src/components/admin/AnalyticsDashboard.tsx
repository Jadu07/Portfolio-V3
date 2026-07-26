"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isReloading, setIsReloading] = useState(false);
  
  const siteCode = "jadu07";
  const token = "2v4281g9d3q4z2p5n4z4y2u6i6c3773n4k3l";
  const embedUrl = `https://${siteCode}.goatcounter.com?access-token=${token}&allow-embedding=1`;
  const accessUrl = `https://${siteCode}.goatcounter.com?access-token=${token}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(accessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    setIsReloading(true);
    setIframeKey((prev) => prev + 1);
    setTimeout(() => setIsReloading(false), 600);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-[#e6e6e6]">Analytics</h2>
          <p className="text-xs text-white/50 mt-0.5">
            Embedded GoatCounter stats for <code className="text-white/80">{siteCode}.goatcounter.com</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="bg-white/10 hover:bg-white/15 text-white px-3.5 py-2 rounded-xl text-xs font-medium transition-all border border-white/10 flex items-center gap-1.5"
            title="Reload embedded analytics iframe"
          >
            <svg className={isReloading ? "animate-spin" : ""} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M2.5 16l1.2 1.8a10 10 0 0 0 18.8-4.3"/></svg>
            Reload
          </button>
          <button
            onClick={copyUrl}
            className="bg-white/10 hover:bg-white/15 text-white px-3.5 py-2 rounded-xl text-xs font-medium transition-all border border-white/10"
          >
            {copied ? "Copied" : "Copy Access URL"}
          </button>
          <a
            href={accessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black hover:bg-white/90 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
          >
            Open External
          </a>
        </div>
      </div>

      {/* Pure Embedded GoatCounter Dashboard */}
      <div className="w-full bg-[#0a0e14] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
        <div className="px-4 py-3 bg-[#05080c] border-b border-white/10 flex justify-between items-center text-xs">
          <span className="text-white/60 font-mono">Live GoatCounter Dashboard</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReload}
              className="text-white/50 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            >
              Refresh Frame
            </button>
            <span className="text-white/40 font-mono">Token Authenticated</span>
          </div>
        </div>
        <iframe
          key={iframeKey}
          src={embedUrl}
          className="w-full h-[720px] border-0 bg-transparent"
          title="GoatCounter Analytics"
        />
      </div>
    </div>
  );
}
