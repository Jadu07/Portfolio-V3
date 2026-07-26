"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [copied, setCopied] = useState(false);
  const siteCode = "jadu07";
  const token = "2v4281g9d3q4z2p5n4z4y2u6i6c3773n4k3l";
  const embedUrl = `https://${siteCode}.goatcounter.com?access-token=${token}&allow-embedding=1`;
  const accessUrl = `https://${siteCode}.goatcounter.com?access-token=${token}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(accessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <span className="text-white/40 font-mono">Token Authenticated</span>
        </div>
        <iframe
          src={embedUrl}
          className="w-full h-[720px] border-0 bg-transparent"
          title="GoatCounter Analytics"
        />
      </div>
    </div>
  );
}
