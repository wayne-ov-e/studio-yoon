"use client";

import { useEffect, useState } from "react";

// ─── useIsMobile — true below `breakpoint`px. Starts false (matching desktop
// SSR/static output) and updates after mount via matchMedia, so hydration
// never mismatches; the one-frame flash on real mobile devices is an
// acceptable tradeoff for a static export with no server-side UA sniffing. ─
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
