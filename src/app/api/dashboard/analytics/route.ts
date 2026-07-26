import { NextResponse } from "next/server";

const DEFAULT_CODE = "jadu07";
const DEFAULT_TOKEN = "2v4281g9d3q4z2p5n4z4y2u6i6c3773n4k3l";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || process.env.GOATCOUNTER_CODE || process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || DEFAULT_CODE;
  const token = searchParams.get("token") || searchParams.get("apiKey") || process.env.GOATCOUNTER_API_KEY || DEFAULT_TOKEN;

  const embedUrl = `https://${code}.goatcounter.com?access-token=${token}&allow-embedding=1`;

  return NextResponse.json({
    isConfigured: true,
    goatcounterCode: code,
    token,
    embedUrl,
    accessUrl: `https://${code}.goatcounter.com?access-token=${token}`
  });
}
