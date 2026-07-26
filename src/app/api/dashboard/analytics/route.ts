import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || process.env.GOATCOUNTER_CODE || process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "jadu07";

  const embedUrl = `https://${code}.goatcounter.com?allow-embedding=1`;
  const siteUrl = `https://${code}.goatcounter.com`;

  return NextResponse.json({
    goatcounterCode: code,
    embedUrl,
    siteUrl
  });
}
