"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  isConfigured: boolean;
  goatcounterCode?: string;
  accessUrl?: string;
  metrics: {
    totalVisitors: number;
    totalPageviews: number;
    topReferrer: string;
    avgSessionTime: string;
  };
  chartData: { date: string; visitors: number; pageviews: number }[];
  topPages: { path: string; views: number; visitors: number; percentage: number }[];
  referrers: { name: string; count: number; percentage: number }[];
  browsers: { name: string; count: number; percentage: number }[];
  operatingSystems: { name: string; count: number; percentage: number }[];
  countries: { name: string; count: number; percentage: number }[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"embedded" | "summary">("summary");
  const [copied, setCopied] = useState(false);

  const defaultSiteCode = "jadu07";
  const defaultToken = "g1q5z2e5k1v461k1h434o3l27574cb53184i69";
  const accessUrl = data?.accessUrl || `https://${defaultSiteCode}.goatcounter.com?access-token=${defaultToken}`;

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/analytics`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const copySecretUrl = () => {
    navigator.clipboard.writeText(accessUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const maxViews = data?.chartData ? Math.max(...data.chartData.map(d => d.pageviews), 1) : 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-[#e6e6e6]">Analytics</h2>
          <p className="text-xs text-white/50 mt-0.5">
            Site: <code className="text-white/80">{defaultSiteCode}.goatcounter.com</code> • Protected via Secret Access Token
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="bg-[#0a0e14] p-1 rounded-xl border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewMode("summary")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "summary" 
                  ? "bg-white text-black font-semibold shadow-sm" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              Summary Cards
            </button>
            <button
              onClick={() => setViewMode("embedded")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "embedded" 
                  ? "bg-white text-black font-semibold shadow-sm" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              Live GoatCounter View
            </button>
          </div>

          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="bg-white/10 hover:bg-white/15 text-white px-3 py-2 rounded-xl text-xs font-medium transition-all border border-white/10"
            title="Refresh analytics data"
          >
            <svg className={loading ? "animate-spin" : ""} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M2.5 16l1.2 1.8a10 10 0 0 0 18.8-4.3"/></svg>
          </button>
        </div>
      </div>

      {/* Secret Token Information Banner */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-white/90">Secret Access URL:</span>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
          </div>
          <code className="text-xs text-white/50 font-mono truncate max-w-[320px] sm:max-w-[500px]">
            {accessUrl}
          </code>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={copySecretUrl}
            className="text-xs bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-all font-medium"
          >
            {copied ? "✓ Copied Link" : "Copy Access URL"}
          </button>
          <a
            href={accessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white text-black hover:bg-white/90 px-3 py-1.5 rounded-lg font-medium transition-all"
          >
            Open External ↗
          </a>
        </div>
      </div>

      {/* Embedded Live GoatCounter Dashboard */}
      {viewMode === "embedded" ? (
        <div className="w-full bg-[#0a0e14] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
          <div className="p-3 bg-[#05080c] border-b border-white/10 flex justify-between items-center px-4">
            <span className="text-xs text-white/60 font-mono">GoatCounter Embedded Dashboard</span>
            <span className="text-[11px] text-emerald-400 font-mono">Protected Mode</span>
          </div>
          <iframe
            src={`${accessUrl}&allow-embedding=1`}
            className="w-full h-[680px] border-0 bg-transparent"
            title="GoatCounter Live Analytics"
          />
        </div>
      ) : (
        /* Minimal Native Summary Mode */
        <div className="flex flex-col gap-6">
          {/* Key Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard title="Total Visitors" value={data?.metrics.totalVisitors.toLocaleString() || "0"} icon="👤" />
            <SummaryCard title="Total Pageviews" value={data?.metrics.totalPageviews.toLocaleString() || "0"} icon="📄" />
            <SummaryCard title="Top Referrer" value={data?.metrics.topReferrer || "Direct"} icon="🌐" />
            <SummaryCard title="Avg Session Duration" value={data?.metrics.avgSessionTime || "1m 45s"} icon="⏱️" />
          </div>

          {/* Minimal Bar Chart */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm text-[#e6e6e6]">Traffic Activity</h3>
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70"></span> Pageviews
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30"></span> Visitors
                </span>
              </div>
            </div>

            <div className="h-[180px] w-full flex items-end justify-between gap-3 pt-4 pb-1 border-b border-white/10">
              {data?.chartData.map((item, idx) => {
                const pageviewHeight = Math.max((item.pageviews / maxViews) * 100, 10);
                const visitorHeight = Math.max((item.visitors / maxViews) * 100, 6);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                    {/* Hover Card */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap z-20 pointer-events-none shadow-xl">
                      <div className="font-medium text-white">{item.date}</div>
                      <div className="text-white/80">{item.pageviews} views • {item.visitors} visitors</div>
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-full max-w-[32px]">
                      <div 
                        style={{ height: `${pageviewHeight}%` }} 
                        className="w-full bg-white/80 group-hover:bg-white rounded-t transition-all"
                      />
                      <div 
                        style={{ height: `${visitorHeight}%` }} 
                        className="w-full bg-white/30 group-hover:bg-white/50 rounded-t transition-all"
                      />
                    </div>

                    <span className="text-[11px] text-white/40 group-hover:text-white transition-colors">{item.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Pages & Sources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-4">
              <h3 className="font-medium text-sm text-[#e6e6e6]">Top Pages</h3>
              <div className="flex flex-col gap-2.5">
                {data?.topPages.map((page, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-white/90 truncate max-w-[220px]">{page.path}</span>
                      <span className="text-white/60 font-medium">{page.views.toLocaleString()} views</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${Math.min(page.percentage, 100)}%` }} 
                        className="h-full bg-white/70 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referrers */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-4">
              <h3 className="font-medium text-sm text-[#e6e6e6]">Traffic Sources</h3>
              <div className="flex flex-col gap-2.5">
                {data?.referrers.map((ref, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/90 truncate max-w-[220px]">{ref.name}</span>
                      <span className="text-white/60 font-medium">{ref.count.toLocaleString()} ({ref.percentage}%)</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${Math.min(ref.percentage, 100)}%` }} 
                        className="h-full bg-white/50 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System & Demographic Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SystemCard title="Browsers" items={data?.browsers} />
            <SystemCard title="Operating Systems" items={data?.operatingSystems} />
            <SystemCard title="Countries" items={data?.countries} />
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col gap-1 group hover:border-white/20 transition-all">
      <div className="flex justify-between items-center text-xs text-white/50">
        <span>{title}</span>
        <span className="text-base">{icon}</span>
      </div>
      <div className="text-2xl font-semibold text-white tracking-tight mt-1">{value}</div>
    </div>
  );
}

function SystemCard({ title, items }: { title: string; items?: { name: string; percentage: number }[] }) {
  return (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col gap-3">
      <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider">{title}</h4>
      <div className="flex flex-col gap-2">
        {items?.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
            <span className="text-white/80">{item.name}</span>
            <span className="text-white/60 font-mono">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
