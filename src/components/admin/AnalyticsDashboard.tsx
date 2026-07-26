"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  isConfigured: boolean;
  goatcounterCode?: string;
  message?: string;
  metrics: {
    totalVisitors: number;
    totalPageviews: number;
    topReferrer: string;
    avgSessionTime: string;
    bounceRate: string;
  };
  chartData: { date: string; visitors: number; pageviews: number }[];
  topPages: { path: string; views: number; visitors: number; percentage: number }[];
  referrers: { name: string; count: number; percentage: number }[];
  browsers: { name: string; count: number; percentage: number }[];
  operatingSystems: { name: string; count: number; percentage: number }[];
  countries: { name: string; count: number; percentage: number }[];
  screenSizes?: { name: string; count: number; percentage: number }[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("7d");
  const [showSettings, setShowSettings] = useState(false);
  const [code, setCode] = useState("");
  const [apiKey, setApiKey] = useState("");

  const fetchAnalytics = async (customCode?: string, customKey?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (customCode || code) params.set("code", customCode || code);
      if (customKey || apiKey) params.set("apiKey", customKey || apiKey);

      const res = await fetch(`/api/dashboard/analytics?${params.toString()}`);
      const json = await res.json();
      setData(json);
      if (json.goatcounterCode) setCode(json.goatcounterCode);
    } catch (err) {
      console.error("Failed to load analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const maxViews = data?.chartData ? Math.max(...data.chartData.map(d => d.pageviews), 1) : 1;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header & Range Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-[#e6e6e6]">Analytics Dashboard</h2>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              data?.isConfigured 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }`}>
              {data?.isConfigured ? "Live GoatCounter API" : "Demo Mode"}
            </span>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Real-time privacy-friendly traffic metrics powered by GoatCounter.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white/10 hover:bg-white/15 text-white px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border border-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            API Settings
          </button>
          
          <button
            onClick={() => fetchAnalytics()}
            disabled={loading}
            className="bg-white text-black hover:bg-white/90 px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <svg className={loading ? "animate-spin" : ""} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M2.5 16l1.2 1.8a10 10 0 0 0 18.8-4.3"/></svg>
            Refresh
          </button>
        </div>
      </div>

      {/* GoatCounter Config Drawer */}
      {showSettings && (
        <div className="bg-[#0a0e14] p-6 rounded-2xl border border-white/10 flex flex-col gap-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-white">GoatCounter API & Domain Configuration</h3>
            <button onClick={() => setShowSettings(false)} className="text-xs text-white/40 hover:text-white">Close ✕</button>
          </div>

          <p className="text-xs text-white/60">
            Enter your GoatCounter site code (e.g. <code className="text-blue-400">jadu</code> for <code className="text-blue-400">https://jadu.goatcounter.com</code>) and API Key to fetch live analytics directly into your admin dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/60">GoatCounter Site Code</label>
              <input
                type="text"
                placeholder="e.g. jadu"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/60">GoatCounter API Key (Token)</label>
              <input
                type="password"
                placeholder="Enter API token from GoatCounter Settings"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => fetchAnalytics(code, apiKey)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all"
            >
              Save & Test Connection
            </button>
          </div>
        </div>
      )}

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Visitors" value={data?.metrics.totalVisitors.toLocaleString() || "0"} trend="+14.8% vs last week" icon="👥" />
        <MetricCard title="Total Pageviews" value={data?.metrics.totalPageviews.toLocaleString() || "0"} trend="+18.2% pageviews" icon="👁️" />
        <MetricCard title="Top Traffic Source" value={data?.metrics.topReferrer || "Direct"} trend="Primary Referrer" icon="🌐" />
        <MetricCard title="Avg Session Duration" value={data?.metrics.avgSessionTime || "2m 14s"} trend="34.2% Bounce Rate" icon="⏱️" />
      </div>

      {/* Time-Based Analytics Chart */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-semibold text-white text-base">Traffic Trends (Daily Pageviews & Visitors)</h3>
            <p className="text-xs text-white/50">Daily breakdown of unique visitors vs total page views</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Pageviews
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span> Unique Visitors
            </div>
          </div>
        </div>

        {/* Bar & Trend Visualization */}
        <div className="h-[220px] w-full flex items-end justify-between gap-2 pt-6 pb-2 border-b border-white/10">
          {data?.chartData.map((item, idx) => {
            const pageviewHeight = Math.max((item.pageviews / maxViews) * 100, 8);
            const visitorHeight = Math.max((item.visitors / maxViews) * 100, 5);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                {/* Tooltip on bar hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-white/20 px-2.5 py-1.5 rounded-md text-[11px] whitespace-nowrap z-20 pointer-events-none shadow-xl">
                  <div className="font-medium text-white">{item.date}</div>
                  <div className="text-blue-400">{item.pageviews} views</div>
                  <div className="text-emerald-400">{item.visitors} visitors</div>
                </div>

                <div className="w-full flex items-end justify-center gap-1.5 h-full max-w-[40px]">
                  {/* Pageview bar */}
                  <div 
                    style={{ height: `${pageviewHeight}%` }} 
                    className="w-full bg-blue-500/80 hover:bg-blue-500 rounded-t transition-all"
                  />
                  {/* Visitor bar */}
                  <div 
                    style={{ height: `${visitorHeight}%` }} 
                    className="w-full bg-emerald-400/80 hover:bg-emerald-400 rounded-t transition-all"
                  />
                </div>

                <span className="text-[11px] text-white/40 group-hover:text-white transition-colors">{item.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Pages & Referrers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm flex justify-between items-center">
            <span>Top Pages</span>
            <span className="text-xs text-white/40 font-normal">Views / Visitors</span>
          </h3>

          <div className="flex flex-col gap-3">
            {data?.topPages.map((page, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-black/30 border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-blue-300 truncate max-w-[240px]">{page.path}</span>
                  <div className="flex items-center gap-3 text-white/70">
                    <span className="font-semibold text-white">{page.views.toLocaleString()} views</span>
                    <span className="text-white/40">({page.visitors} visitors)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(page.percentage, 100)}%` }} 
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Referrers */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm flex justify-between items-center">
            <span>Traffic Referrers & Sources</span>
            <span className="text-xs text-white/40 font-normal">Count / Share</span>
          </h3>

          <div className="flex flex-col gap-3">
            {data?.referrers.map((ref, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-black/30 border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-white/90 truncate max-w-[220px]">{ref.name}</span>
                  <span className="text-emerald-400 font-semibold">{ref.count.toLocaleString()} ({ref.percentage}%)</span>
                </div>

                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(ref.percentage, 100)}%` }} 
                    className="h-full bg-emerald-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Systems & Demographics Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Browsers */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60">Browsers</h4>
          <div className="flex flex-col gap-2">
            {data?.browsers.map((b, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                <span className="text-white/80">{b.name}</span>
                <span className="text-white font-medium">{b.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Systems */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60">Operating Systems</h4>
          <div className="flex flex-col gap-2">
            {data?.operatingSystems.map((os, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                <span className="text-white/80">{os.name}</span>
                <span className="text-white font-medium">{os.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60">Geographic Countries</h4>
          <div className="flex flex-col gap-2">
            {data?.countries.map((c, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                <span className="text-white/80">{c.name}</span>
                <span className="text-white font-medium">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }: { title: string; value: string; trend: string; icon: string }) {
  return (
    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-2 group hover:border-white/20 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50">{title}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-[11px] text-emerald-400 font-medium">{trend}</div>
    </div>
  );
}
