"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GoatCounterScript() {
  const pathname = usePathname();
  const code = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || process.env.GOATCOUNTER_CODE || "jadu07";

  useEffect(() => {
    // Trigger pageview tracking on SPA client-side route transitions
    if (typeof window !== "undefined" && (window as any).goatcounter && (window as any).goatcounter.count) {
      (window as any).goatcounter.count({
        path: pathname + (window.location.search || "")
      });
    }
  }, [pathname]);

  return (
    <Script
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
