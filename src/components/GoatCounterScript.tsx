"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GoatCounterScript() {
  const pathname = usePathname();
  const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || process.env.GOATCOUNTER_CODE || "jadu07";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Trigger pageview tracking on SPA client-side route transitions
    if ((window as any).goatcounter && typeof (window as any).goatcounter.count === "function") {
      (window as any).goatcounter.count({
        path: pathname + (window.location.search || ""),
        allow_local: true
      });
    } else {
      // Fallback tracking ping for mobile webviews or content blockers
      try {
        const path = encodeURIComponent(pathname + (window.location.search || ""));
        const ref = document.referrer ? encodeURIComponent(document.referrer) : "";
        const screen = `${window.innerWidth}x${window.innerHeight}`;
        const pixelUrl = `https://${code}.goatcounter.com/count?p=${path}&r=${ref}&s=${screen}`;
        
        const img = new window.Image();
        img.src = pixelUrl;
      } catch (e) {
        // Ignore fallback errors
      }
    }
  }, [pathname, code]);

  return (
    <Script
      id="goatcounter-script"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"allow_local": true}'
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
