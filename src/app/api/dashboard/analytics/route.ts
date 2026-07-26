import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || process.env.GOATCOUNTER_CODE || process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;
  const apiKey = searchParams.get("apiKey") || process.env.GOATCOUNTER_API_KEY;

  if (!code || !apiKey) {
    // Return sample/mock metrics with isConfigured: false so admin dashboard renders immediately
    return NextResponse.json({
      isConfigured: false,
      goatcounterCode: code || "",
      message: "GoatCounter API key or site code missing. Showing demo analytics mode.",
      metrics: {
        totalVisitors: 1248,
        totalPageviews: 3892,
        topReferrer: "github.com",
        avgSessionTime: "2m 14s",
        bounceRate: "34.2%"
      },
      chartData: [
        { date: "Mon", visitors: 140, pageviews: 420 },
        { date: "Tue", visitors: 185, pageviews: 530 },
        { date: "Wed", visitors: 210, pageviews: 680 },
        { date: "Thu", visitors: 195, pageviews: 610 },
        { date: "Fri", visitors: 240, pageviews: 790 },
        { date: "Sat", visitors: 160, pageviews: 470 },
        { date: "Sun", visitors: 118, pageviews: 392 }
      ],
      topPages: [
        { path: "/", views: 1850, visitors: 820, percentage: 47.5 },
        { path: "/about-me", views: 940, visitors: 510, percentage: 24.1 },
        { path: "/work", views: 720, visitors: 410, percentage: 18.5 },
        { path: "/admin", views: 382, visitors: 45, percentage: 9.8 }
      ],
      referrers: [
        { name: "Direct / None", count: 1420, percentage: 36.4 },
        { name: "github.com", count: 1150, percentage: 29.5 },
        { name: "google.com", count: 680, percentage: 17.4 },
        { name: "twitter.com / X", count: 420, percentage: 10.7 },
        { name: "linkedin.com", count: 222, percentage: 5.7 }
      ],
      browsers: [
        { name: "Chrome", count: 2150, percentage: 55.2 },
        { name: "Safari", count: 980, percentage: 25.1 },
        { name: "Firefox", count: 420, percentage: 10.7 },
        { name: "Edge", count: 212, percentage: 5.4 },
        { name: "Brave / Other", count: 130, percentage: 3.3 }
      ],
      operatingSystems: [
        { name: "macOS", count: 1680, percentage: 43.1 },
        { name: "Windows", count: 1240, percentage: 31.8 },
        { name: "iOS", count: 540, percentage: 13.8 },
        { name: "Android", count: 290, percentage: 7.4 },
        { name: "Linux", count: 142, percentage: 3.6 }
      ],
      countries: [
        { name: "United States 🇺🇸", count: 1450, percentage: 37.2 },
        { name: "India 🇮🇳", count: 1120, percentage: 28.7 },
        { name: "United Kingdom 🇬🇧", count: 430, percentage: 11.0 },
        { name: "Germany 🇩🇪", count: 320, percentage: 8.2 },
        { name: "Canada 🇨🇦", count: 210, percentage: 5.3 },
        { name: "Other", count: 362, percentage: 9.3 }
      ],
      screenSizes: [
        { name: "1920x1080 (Desktop)", count: 1540, percentage: 39.5 },
        { name: "1440x900 (Laptop)", count: 1120, percentage: 28.7 },
        { name: "390x844 (Mobile)", count: 850, percentage: 21.8 },
        { name: "2560x1440 (4K/QHD)", count: 382, percentage: 9.8 }
      ]
    });
  }

  try {
    const baseUrl = `https://${code}.goatcounter.com/api/v1`;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    };

    // Query GoatCounter API endpoints in parallel
    const [totalRes, pagesRes, referrersRes, browserRes, osRes, locationRes] = await Promise.all([
      fetch(`${baseUrl}/stats/total`, { headers }).catch(() => null),
      fetch(`${baseUrl}/stats/pages`, { headers }).catch(() => null),
      fetch(`${baseUrl}/stats/referrers`, { headers }).catch(() => null),
      fetch(`${baseUrl}/stats/browser`, { headers }).catch(() => null),
      fetch(`${baseUrl}/stats/os`, { headers }).catch(() => null),
      fetch(`${baseUrl}/stats/location`, { headers }).catch(() => null)
    ]);

    const totalData = totalRes && totalRes.ok ? await totalRes.json() : null;
    const pagesData = pagesRes && pagesRes.ok ? await pagesRes.json() : null;
    const referrersData = referrersRes && referrersRes.ok ? await referrersRes.json() : null;
    const browserData = browserRes && browserRes.ok ? await browserRes.json() : null;
    const osData = osRes && osRes.ok ? await osRes.json() : null;
    const locationData = locationRes && locationRes.ok ? await locationRes.json() : null;

    return NextResponse.json({
      isConfigured: true,
      goatcounterCode: code,
      metrics: {
        totalVisitors: totalData?.total_unique || totalData?.total || 0,
        totalPageviews: totalData?.total || 0,
        topReferrer: referrersData?.stats?.[0]?.name || "Direct",
        avgSessionTime: "N/A",
        bounceRate: "N/A"
      },
      chartData: totalData?.days?.map((d: any) => ({
        date: d.day,
        visitors: d.unique || d.total,
        pageviews: d.total
      })) || [],
      topPages: pagesData?.stats?.map((p: any) => ({
        path: p.path || p.name,
        views: p.count,
        visitors: p.count_unique || p.count,
        percentage: p.percent || 0
      })) || [],
      referrers: referrersData?.stats?.map((r: any) => ({
        name: r.name || "Direct",
        count: r.count,
        percentage: r.percent || 0
      })) || [],
      browsers: browserData?.stats?.map((b: any) => ({
        name: b.name,
        count: b.count,
        percentage: b.percent || 0
      })) || [],
      operatingSystems: osData?.stats?.map((o: any) => ({
        name: o.name,
        count: o.count,
        percentage: o.percent || 0
      })) || [],
      countries: locationData?.stats?.map((l: any) => ({
        name: l.name,
        count: l.count,
        percentage: l.percent || 0
      })) || []
    });
  } catch (error: any) {
    console.error("GoatCounter API Error:", error);
    return NextResponse.json({
      isConfigured: false,
      error: error.message,
      message: "Failed to fetch data from GoatCounter API. Check your site code and API key."
    }, { status: 500 });
  }
}
