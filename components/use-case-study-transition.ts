"use client";

import { useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { flyToHeader, FLY_DELAY_MS, FLY_DURATION_MS } from "@/components/fly-to-header";

const PAGE_FADE_MS = 350;

// ─── Case Studies dropdown → case study page transition, shared by every page
// with the desktop dropdown: the other rows fade, the clicked row slides up
// onto the first row's spot (where every case study page renders its
// header), the page fades out, and the destination fades in beneath the row
// — see flyToHeader. Clicking the page you're already on plays the same
// sequence, fading this page back in at the top. ─────────────────────────
export function useCaseStudyTransition(
  projects: { href: string }[],
  // The page's dropdown hide timer — cancelled when a transition starts; the
  // page's scheduleHide should also bail out while leavingRef is set
  { hideTimer, onSamePage }: { hideTimer: RefObject<ReturnType<typeof setTimeout> | null>; onSamePage: () => void },
) {
  const router = useRouter();
  const pathname = usePathname();
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leavingRef = useRef(false);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [fadingOut, setFadingOut] = useState(false);

  const openCaseStudy = (i: number) => (e: MouseEvent) => {
    const { href } = projects[i];
    const row = rowRefs.current[i];
    const target = rowRefs.current[0];
    if (href === "#" || !row || !target || leavingRef.current) return;
    e.preventDefault();
    const samePage = href === pathname;
    leavingRef.current = true;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (!samePage) router.prefetch(href);
    setLeaving(i);
    // The destination opens scrolled to the top, so aim for where the header
    // will be then, not where the first row is now on a scrolled page
    const release = flyToHeader(row, target, window.scrollY);
    const slideEnd = FLY_DELAY_MS + FLY_DURATION_MS;
    setTimeout(() => setFadingOut(true), slideEnd);
    setTimeout(() => {
      // Jump to the top while invisible, instead of Next's own scroll reset,
      // which the global smooth scroll-behavior would visibly animate
      window.scrollTo({ top: 0, behavior: "instant" });
      if (samePage) {
        // Already here: close the menu and fade this page back in at the top
        onSamePage();
        setLeaving(null);
        setFadingOut(false);
        leavingRef.current = false;
      } else {
        router.push(href, { scroll: false });
      }
      release();
    }, slideEnd + PAGE_FADE_MS);
  };

  const pageFade = (entered: boolean) => ({
    opacity: entered && !fadingOut ? 1 : 0,
    transition: fadingOut ? `opacity ${PAGE_FADE_MS / 1000}s ease` : "opacity 1s ease",
  });

  const rowStyle = (i: number) => ({
    cursor: projects[i].href === "#" ? "default" : "pointer",
    opacity: leaving !== null && leaving !== i ? 0 : 1,
    transition: "opacity 0.2s ease",
  });

  return { rowRefs, leavingRef, leaving, openCaseStudy, pageFade, rowStyle };
}
