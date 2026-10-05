// ─── flyToHeader — the Case Studies dropdown → case study page transition.
// Clones the clicked dropdown row onto <body> (which persists across client
// navigations, unlike the page) at its exact on-screen position, then slides
// the clone up onto `targetEl`'s position — the dropdown's first row, which
// sits exactly where every case study page renders its permanent header. The
// clone stays put while the page underneath swaps and fades in, then fades
// out over the identical header, so the title never visibly jumps or blinks. ─

export const FLY_DELAY_MS = 150;   // lets the other rows fade first
export const FLY_DURATION_MS = 700;
const HOLD_AFTER_NAV_MS = 1100;    // destination's usePageEnter fade-in (50ms + 1s)
const GHOST_FADE_MS = 300;
const SNAP_AFTER_NAV_MS = 150;     // once the destination has rendered (still invisible)
const SNAP_RANGE_PX = 12;

// The destination header's number is aligned slightly differently from the
// dropdown's (alignSelf:"end" + a nudge vs. baseline), and a classic
// (non-overlay) scrollbar on the scrolling destination narrows its grid by a
// few px, so nudge each piece of the clone onto the matching text the
// destination actually rendered, if it's within a few px — invisible at this
// size, but it keeps the handoff exact.
function snapToDestination(ghost: HTMLElement) {
  let lastDx = 0; // pieces with no match on the destination (the description) follow the title sideways
  for (const el of Array.from(ghost.children) as HTMLElement[]) {
    const text = el.textContent?.trim();
    if (!text) continue;
    el.style.transition = "transform 0.25s ease";
    const r = el.getBoundingClientRect();
    let best: { dx: number; dy: number } | null = null;
    for (const cand of Array.from(document.querySelectorAll<HTMLElement>("main span, main a"))) {
      if (cand.textContent?.trim() !== text) continue;
      const c = cand.getBoundingClientRect();
      const dx = c.left - r.left;
      const dy = c.bottom - r.bottom;
      if (Math.abs(dx) > SNAP_RANGE_PX || Math.abs(dy) > SNAP_RANGE_PX) continue;
      if (!best || Math.hypot(dx, dy) < Math.hypot(best.dx, best.dy)) best = { dx, dy };
    }
    if (best) lastDx = best.dx;
    const { dx, dy } = best ?? { dx: lastDx, dy: 0 };
    if (dx || dy) el.style.transform = `${el.style.transform ?? ""} translate(${dx}px, ${dy}px)`;
  }
}

export function flyToHeader(rowEl: HTMLElement, targetEl: HTMLElement) {
  const from = rowEl.getBoundingClientRect();
  const to = targetEl.getBoundingClientRect();

  const ghost = rowEl.cloneNode(true) as HTMLElement;
  Object.assign(ghost.style, {
    position: "fixed",
    top: `${from.top}px`,
    left: `${from.left}px`,
    width: `${from.width}px`,
    margin: "0",
    zIndex: "1000",
    pointerEvents: "none",
  });
  document.body.appendChild(ghost);
  rowEl.style.visibility = "hidden";

  ghost.animate(
    [{ transform: "translateY(0)" }, { transform: `translateY(${to.top - from.top}px)` }],
    { duration: FLY_DURATION_MS, delay: FLY_DELAY_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
  );

  // Call once navigation has been kicked off
  return function release() {
    setTimeout(() => snapToDestination(ghost), SNAP_AFTER_NAV_MS);
    setTimeout(() => {
      ghost
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: GHOST_FADE_MS, fill: "forwards" })
        .finished.then(() => ghost.remove());
    }, HOLD_AFTER_NAV_MS);
  };
}
