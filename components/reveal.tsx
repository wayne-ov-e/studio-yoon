"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

// ─── Reveal — fades + rises an element into place the first time it scrolls
// into view, then stops watching. Positioning/visual styles pass straight
// through via `style`; this only layers opacity/transform/transition on top,
// so it's a drop-in replacement for whatever tag was there before. ──────────
export function Reveal({
  as = "div",
  children,
  style,
  delay = 0,
  distance = 18,
}: {
  as?: ElementType;
  children?: ReactNode;
  style?: CSSProperties;
  delay?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A caller-supplied `style.opacity` is the element's target (revealed) opacity —
  // e.g. the dimmed filmstrip thumbnails at 0.3 — not the initial hidden state.
  const targetOpacity = style?.opacity ?? 1;

  return createElement(
    as,
    {
      ref,
      style: {
        ...style,
        opacity: visible ? targetOpacity : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 0.8s ease ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      },
    },
    children
  );
}

// ─── usePageEnter — true shortly after mount, for a page-wide fade-in on
// load. Starts false so the static/SSR HTML renders invisible, then flips
// once hydrated. Uses setTimeout rather than requestAnimationFrame: rAF is
// paused in background/unfocused tabs, which would leave the page invisible
// indefinitely if it were opened that way. ──────────────────────────────
export function usePageEnter() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(id);
  }, []);
  return entered;
}
