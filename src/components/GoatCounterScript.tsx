"use client";

import Script from "next/script";

export default function GoatCounterScript() {
  const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || process.env.GOATCOUNTER_CODE;
  if (!code) return null;

  return (
    <Script
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
