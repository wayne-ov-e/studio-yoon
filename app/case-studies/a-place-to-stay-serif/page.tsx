"use client";

import { useState, useRef, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

// ─── Assets ──────────────────────────────────────────────────────────────────
import yoonLogo from "@/public/images/yoon-logo.svg";
import heroCounter from "@/public/images/a-place-to-stay-serif/hero-counter.jpg";
import figCamping from "@/public/images/a-place-to-stay-serif/fig-camping.jpg";
import figDieterRams from "@/public/images/a-place-to-stay-serif/fig-dieter-rams.jpg";
import fig03 from "@/public/images/a-place-to-stay-serif/fig-03.jpg";
import figAgnesMartin from "@/public/images/a-place-to-stay-serif/fig-agnes-martin.jpg";
import figRoasteryImagined from "@/public/images/a-place-to-stay-serif/fig-roastery-imagined.jpg";
import shelfCorner from "@/public/images/a-place-to-stay-serif/shelf-corner.jpg";
import collageCabinet from "@/public/images/a-place-to-stay-serif/collage-cabinet.jpg";
import detailSmall from "@/public/images/a-place-to-stay-serif/detail-small.jpg";
import filmstrip01 from "@/public/images/a-place-to-stay-serif/filmstrip-01.jpg";
import filmstrip02 from "@/public/images/a-place-to-stay-serif/filmstrip-02.jpg";
import filmstrip03 from "@/public/images/a-place-to-stay-serif/filmstrip-03.jpg";
import filmstrip04 from "@/public/images/a-place-to-stay-serif/filmstrip-04.jpg";
import filmstrip05 from "@/public/images/a-place-to-stay-serif/filmstrip-05.jpg";
import filmstrip06 from "@/public/images/a-place-to-stay-serif/filmstrip-06.jpg";
import floorPlan from "@/public/images/a-place-to-stay-serif/floor-plan.jpg";
import cupLamps from "@/public/images/a-place-to-stay-serif/cup-lamps.jpg";
import { Reveal, usePageEnter } from "@/components/reveal";
import { useIsMobile } from "@/components/use-is-mobile";
import { CaseStudyStrip } from "@/components/case-study-strip";

// ─── Data (mirrors homepage) ──────────────────────────────────────────────────
const projects = [
  {
    num: "01.1",
    title: "A Year Making a House, Home",
    desc: "A year-long renovation of a small townhouse into a home for two — and one dog named August.",
    href: "/case-studies/a-year-making-a-house-home",
  },
  {
    num: "01.2",
    title: "A Place to Stay — Serif",
    desc: "A small coffee roasting space in Vancouver, designed around flexibility, quietness, and the idea of a space that can evolve over time.",
    href: "/case-studies/a-place-to-stay-serif",
  },
  {
    num: "01.3",
    title: "Take Part In",
    desc: "An unusual interaction with the seemingly rigid and fragile material that composed the entire show.",
    href: "#",
  },
];

// ─── Grid (same as homepage) ──────────────────────────────────────────────────
const colGap = "1.5vw";
const col7   = "50.75vw";

// ─── Style tokens ─────────────────────────────────────────────────────────────
const serif: React.CSSProperties    = { fontFamily: "var(--font-eb-garamond, Garamond, Georgia, serif)", fontSize: "14px", fontWeight: 300, lineHeight: 1.2 };
const mono: React.CSSProperties     = { fontFamily: '"logic-monospace", var(--font-mono, monospace)' };
const garamond: React.CSSProperties = { fontFamily: "var(--font-eb-garamond, Garamond, Georgia, serif)", fontSize: "14px", fontWeight: 300, lineHeight: 1.2 };
const andale: React.CSSProperties   = { fontFamily: '"Andale Mono", AndaleMono, ui-monospace, monospace' };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
  willChange: "opacity",
});

// ─── Body copy — aligned to the header paragraph's own text column: col7 +
// the "01.2" label's rendered width (24px) + the grid's 20px column gap, minus
// the 1.5vw grid inset this element's own wrapper (unlike the header) sits in ─
const textLeft = "calc(49.25vw + 44px)";

// ─── Sidenote labels ("concept."/"inspiration."/"design.") — aligned to the
// same real position as the header's "01.2" itself: col7 + its 6px relative
// nudge, minus the same 1.5vw wrapper inset used above ─────────────────────
const sideLabelLeft = "calc(49.25vw + 6px)";

const paragraphs: { top: number; text: string }[] = [
  { top: 1165, text: "The concept for Serif started with my friend's enjoyment of camping. The idea of curating the space as needed, the flexibility to change and adapt, and keeping only what is necessary became some of the starting points for the design. I was drawn to the idea that a camping setup is never completely fixed — you bring what you need, arrange things depending on the moment, and make the space your own. I wanted to bring some of that same feeling into Serif, creating a space that could evolve with the way Serif team work and spend their time there." },
  { top: 1729, text: "I have always been drawn to the quietness in Agnes Martin's work in particular. There is very little in her paintings, but the simplicity never feels empty. The space between the lines, the repetition, and the subtle imperfections all leave room for you to pause and look a little longer. I think that idea stayed with me while designing Serif. Keeping the space to only what was necessary was not about making it empty, but about leaving room for the work, the people, and the everyday moments to happen." },
  { top: 2090, text: "This led to the idea of modular cabinets on casters, allowing the pieces to be moved around and rearranged as needed. Rather than having everything fixed in place, the space can change as their needs change. For me, this flexibility also connects to the idea of timelessness — creating something that doesn't need to stay the same to remain useful, but can continue to adapt and be used in different ways over time." },
  { top: 3725, text: "Behind the two large pivoting doors is the Roasting Room, where the process of roasting unfolds. The space behind the doors was designed as a quieter and more private place where Serif team can focus and spend time on their own. At the same time, the pivoting doors allow the room to open up and invite visitors to catch a glimpse of what happens behind the scenes, making the roasting process part of the experience rather than something completely hidden away." },
  { top: 5681, text: "As you enter Serif, a sheer linen curtain creates a quiet transition between the entrance and a small space for gathering. Rather than feeling like a designated seating area, we wanted it to feel familiar and informal — a place where you can sit around a table, have a drink, talk, or simply spend some time. The curtain gives just enough separation to make the space feel intimate, while still allowing you to feel connected to the roasting and everything happening around it.\n\nThrough Serif, I wanted to create a space that feels comfortable in its everyday life. A place that works quietly in the background, changes when it needs to, and becomes more familiar with time. A place where the Serif team can spend their days, and where visitors can come in, slow down, and feel welcome. In that sense, Serif became A Place to Stay." },
];

// ─── Sidenotes marking each section — right-aligned just left of the text column ─
const sectionLabels: { top: number; label: string }[] = [
  { top: 1168, label: "concept." },
  { top: 1732, label: "inspiration." },
  { top: 2091, label: "design." },
];

// ─── Project meta — left column, opposite the body copy. Tops are relative
// to the same top:"2.5vh" anchor the header title uses, plus its 83px
// paddingTop folded in directly — padding doesn't push position:absolute
// children (they anchor to the padding *edge*, unaffected by the padding
// amount), unlike the header's title, which is a normal-flow grid item and
// does get pushed by it. Row spacing kept the same as before: 14px, 15px, 15px ─
const meta: { label: string; value: string; top: number }[] = [
  { label: "location", value: "vancouver, bc",              top: 79 },
  { label: "status",   value: "completed in Summer 2026",   top: 93 },
  { label: "Team",     value: "milltown contracting",       top: 108 },
  { label: "area",     value: "570 sqft",                   top: 123 },
];

// ─── Figure captions ──────────────────────────────────────────────────────────
const figureCaptions: { top: number; left: string; label: string; caption?: string }[] = [
  { top: 1321, left: "20px",                   label: "Fig (01)", caption: "camping" },
  { top: 1601, left: "calc(83.33% - 8.67px)",  label: "Fig (02)", caption: "Dieter Rams w. modular wall system" },
  { top: 1866, left: "calc(83.33% - 10.67px)", label: "Fig (03)" },
  { top: 1983, left: "calc(16.67% + 3.67px)",  label: "Fig (04)", caption: "Agnes Martin, Untitled 1973." },
  { top: 2297, left: "calc(8.33% + 58.33px)",  label: "Fig (05)", caption: "Serif roastery imagined" },
];

// ─── Photos — top offsets rebased so 0 sits just below the persistent header ──
const photos: { src: StaticImageData; alt: string; left: string; top: number; width: number; height: number; opacity?: number; objectPosition?: string }[] = [
  { src: figCamping,         alt: "Camping — the starting reference for Serif's concept", left: "20px",             top: 1165, width: 197,  height: 148 },
  { src: figDieterRams,      alt: "Dieter Rams, a modular wall storage system",   left: "calc(83.33% - 8.67px)",   top: 1392, width: 202,  height: 203 },
  { src: fig03,              alt: "Reference detail",                             left: "calc(83.33% - 8.67px)",   top: 1729, width: 98,   height: 131 },
  { src: figAgnesMartin,     alt: "Agnes Martin, Untitled 1973",                  left: "calc(16.67% + 3.67px)",   top: 1729, width: 239,  height: 243, objectPosition: "bottom" },
  { src: figRoasteryImagined, alt: "An early rendering imagining the Serif roastery", left: "calc(8.33% + 58.33px)", top: 2090, width: 343, height: 202 },
  { src: shelfCorner,        alt: "Corner of the modular shelving system",        left: "19px",                    top: 2508, width: 1240, height: 829 },
  { src: filmstrip04,        alt: "Process photo",                                left: "20px",                    top: 3527, width: 98,   height: 130 },
  { src: filmstrip05,        alt: "Process photo",                                left: "calc(8.33% + 72.33px)",   top: 3527, width: 98,   height: 130, opacity: 0.3 },
  { src: filmstrip06,        alt: "Process photo",                                left: "calc(33.33% - 0.67px)",   top: 3526, width: 98,   height: 131, opacity: 0.3 },
  { src: filmstrip01,        alt: "Process photo",                                left: "calc(16.67% + 88.67px)",  top: 3526, width: 99,   height: 131, opacity: 0.3 },
  { src: filmstrip02,        alt: "Process photo",                                left: "calc(41.67% + 61.67px)",  top: 3526, width: 88,   height: 131, opacity: 0.3 },
  { src: filmstrip03,        alt: "Process photo",                                left: "calc(50% + 84px)",        top: 3526, width: 154,  height: 131, opacity: 0.3, objectPosition: "bottom" },
];

// ─── Masked photos — Figma clipped these to a smaller window than their source
// frame (a plain rectangular crop, in the hero's case combined with a -90°
// rotation). Reproduced here as an overflow:hidden crop window (left/top/width/
// height) around an oversized, offset "frame" that holds the actual <Image>. ──
type MaskedPhoto = {
  src: StaticImageData; alt: string;
  left: string; top: number; width: number; height: number; // visible crop window
  frameLeft: number; frameTop: number; frameWidth: number; frameHeight: number; // offset frame the image fills
  rotate?: number; boxWidth?: number; boxHeight?: number; // pre-rotation box, when rotated
};

const maskedPhotos: MaskedPhoto[] = [
  {
    src: heroCounter, alt: "Preparing coffee at the Serif counter",
    left: "20px", top: 294, width: 1240, height: 802,
    frameLeft: -69.639, frameTop: -25.636, frameWidth: 1493.184, frameHeight: 842.327,
    rotate: -90, boxWidth: 842.327, boxHeight: 1493.184,
  },
  {
    src: collageCabinet, alt: "The modular cabinet system on casters",
    left: "20px", top: 3725, width: 642, height: 406,
    frameLeft: -14, frameTop: -512, frameWidth: 754.129, frameHeight: 1130.175,
  },
  {
    src: detailSmall, alt: "Detail of the roasting room hardware",
    left: "calc(83.33% + 53.33px)", top: 3991, width: 140, height: 140,
    frameLeft: -4.426, frameTop: -25.455, frameWidth: 149.606, frameHeight: 223.814,
  },
  {
    // No crop here (unlike the two above) — just a straight -90° rotation,
    // matching Figma's own IMG_0998 node. The source file is stored portrait
    // (rotated on disk); rendering it in a plain landscape box with
    // object-fit:cover (as this was originally, incorrectly, set up) crops
    // it into a squeezed sideways sliver instead of the intended photo.
    src: cupLamps, alt: "Guests seated past the entrance curtain",
    left: "calc(8.33% + 55.33px)", top: 5075, width: 980, height: 560,
    frameLeft: 0, frameTop: 0, frameWidth: 980, frameHeight: 560,
    rotate: -90, boxWidth: 560, boxHeight: 980,
  },
];

// ─── Mobile — the desktop layout is absolute-positioned two-column with
// hand-placed masked/rotated crops, none of which means anything on a
// ~375px screen. Rebuilt as a single-column stack in reading order. For the
// two rotated photos, instead of reproducing the exact desktop crop-frame
// math (which assumes a fixed px container), a percentage-based swap trick:
// an inner box sized to (H/W)% × (W/H)% of the outer aspect-ratio box, so
// after a -90° rotation it exactly covers the outer box at any width. ─────
function RotatedCover({ src, alt, ratio }: { src: StaticImageData; alt: string; ratio: string }) {
  const [w, h] = ratio.split("/").map(Number);
  const innerWidthPct = (h / w) * 100;
  const innerHeightPct = (w / h) * 100;
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: ratio, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: `${innerWidthPct}%`, height: `${innerHeightPct}%`, transform: "translate(-50%, -50%) rotate(-90deg)" }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="100vw" />
      </div>
    </div>
  );
}

type MobileItem =
  | { type: "label"; text: string }
  | { type: "text"; text: string }
  | { type: "image"; src: StaticImageData; alt: string; ratio: string; caption?: string; rotate?: true }
  | { type: "filmstrip" }
  | { type: "floorplan" };

const mobileContent: MobileItem[] = [
  { type: "image", src: heroCounter, alt: "Preparing coffee at the Serif counter", ratio: "1240/802", rotate: true },
  { type: "label", text: "concept." },
  { type: "text", text: paragraphs[0].text },
  { type: "image", src: figCamping, alt: "Camping — the starting reference for Serif's concept", ratio: "197/148", caption: "camping" },
  { type: "image", src: figDieterRams, alt: "Dieter Rams, a modular wall storage system", ratio: "202/203", caption: "Dieter Rams w. modular wall system" },
  { type: "label", text: "inspiration." },
  { type: "text", text: paragraphs[1].text },
  { type: "image", src: fig03, alt: "Reference detail", ratio: "98/131" },
  { type: "image", src: figAgnesMartin, alt: "Agnes Martin, Untitled 1973", ratio: "239/243", caption: "Agnes Martin, Untitled 1973." },
  { type: "label", text: "design." },
  { type: "text", text: paragraphs[2].text },
  { type: "image", src: figRoasteryImagined, alt: "An early rendering imagining the Serif roastery", ratio: "343/202", caption: "Serif roastery imagined" },
  { type: "image", src: shelfCorner, alt: "Corner of the modular shelving system", ratio: "1240/829" },
  { type: "text", text: paragraphs[3].text },
  { type: "image", src: collageCabinet, alt: "The modular cabinet system on casters", ratio: "642/406" },
  { type: "filmstrip" },
  { type: "image", src: detailSmall, alt: "Detail of the roasting room hardware", ratio: "140/140" },
  { type: "floorplan" },
  { type: "image", src: cupLamps, alt: "Guests seated past the entrance curtain", ratio: "980/560", rotate: true },
  { type: "text", text: paragraphs[4].text },
];

const filmstripMobile = [
  { src: filmstrip04, alt: "Process photo", opacity: 1 },
  { src: filmstrip05, alt: "Process photo", opacity: 0.3 },
  { src: filmstrip06, alt: "Process photo", opacity: 0.3 },
  { src: filmstrip01, alt: "Process photo", opacity: 0.3 },
  { src: filmstrip02, alt: "Process photo", opacity: 0.3 },
  { src: filmstrip03, alt: "Process photo", opacity: 0.3 },
];

export default function APlaceToStaySerif() {
  const entered = usePageEnter();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu]             = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredNav, setHoveredNav]         = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => {
      setShowMenu(false);
      setHoveredProject(null);
    }, 250);
  }, []);

  if (isMobile) {
    return (
      <main style={{ position: "relative", minHeight: "100vh", background: "#ececea", opacity: entered ? 1 : 0, transition: "opacity 1s ease" }}>
        {/* Nav bar */}
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 6vw",
            background: showMenu ? "transparent" : "rgba(236,236,234,0.92)",
          }}
        >
          <Link href="/" style={{ display: "block", lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={yoonLogo.src} alt="YOON" style={{ height: 16, width: "auto", objectFit: "contain", display: "block" }} />
          </Link>
          <button
            onClick={() => setShowMenu((v) => !v)}
            aria-label={showMenu ? "Close menu" : "Open menu"}
            style={{ ...mono, fontSize: "11px", fontWeight: 700, color: "#231f20", background: "none", border: "none", padding: "8px", cursor: "pointer" }}
          >
            {showMenu ? "Close" : "Menu"}
          </button>
        </div>

        {/* Full-screen tap menu */}
        <div style={{ position: "fixed", inset: 0, zIndex: 15, background: "#f7f4ef", padding: "80px 6vw 40px", overflowY: "auto", ...fade(showMenu) }}>
          <div style={{ marginBottom: "40px" }}>
            <span style={{ ...mono, fontSize: "11px", fontWeight: 700, color: "#767574" }}>01.</span>
            <span style={{ ...serif, fontStyle: "italic", color: "#231f20", marginLeft: "12px" }}>Case Studies</span>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {projects.map((p) => (
                <Link key={p.num} href={p.href} onClick={() => setShowMenu(false)} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#767574" }}>{p.num}</div>
                  <div style={{ ...serif, fontStyle: "italic", color: "#231f20", marginTop: "4px" }}>{p.title}</div>
                  <p style={{ ...serif, color: "#767574", marginTop: "6px" }}>{p.desc}</p>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", borderTop: "1px solid #ddd8cf", paddingTop: "24px" }}>
            <a href="#" onClick={() => setShowMenu(false)} style={{ ...serif, color: "#231f20", textDecoration: "none" }}>Research</a>
            <a href="#" onClick={() => setShowMenu(false)} style={{ ...serif, color: "#231f20", textDecoration: "none" }}>About</a>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "90px 6vw 4px" }}>
          <span style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#767574" }}>01.2</span>
          <div style={{ ...serif, fontStyle: "italic", color: "#231f20", marginTop: "6px" }}>
            A Place to Stay — Serif
          </div>
        </div>

        {/* Meta */}
        <div style={{ padding: "12px 6vw 0", display: "flex", flexDirection: "column", gap: "3px" }}>
          {meta.map((m) => (
            <div key={m.label} style={{ display: "grid", gridTemplateColumns: "84px 1fr", alignItems: "baseline" }}>
              <span style={{ ...andale, fontSize: "9px", color: "#767574", whiteSpace: "nowrap" }}>{m.label}</span>
              <span style={{ ...garamond, color: "#231f20" }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Dek */}
        <p style={{ ...serif, color: "#231f20", whiteSpace: "pre-line", padding: "20px 6vw 0" }}>
          In summer 2025, one of my friends asked me if I would design a small coffee roasting space for him. He had just started roasting coffee of his own and was looking for a place to set up his own little roastery.
          {"\n\n"}Since university, I had mostly been designing houses and spaces for people to live in, so designing a roasting space felt very new. But it didn&apos;t take long for me to get excited about the opportunity to help my friend - and soon it became my first commercial project.
        </p>

        {/* Content */}
        <div style={{ padding: "32px 6vw 80px", display: "flex", flexDirection: "column", gap: "36px" }}>
          {mobileContent.map((item, i) => {
            if (item.type === "label") {
              return (
                <Reveal key={i} as="p" style={{ ...andale, fontSize: "10px", color: "#767574" }}>
                  {item.text}
                </Reveal>
              );
            }
            if (item.type === "text") {
              return (
                <Reveal key={i} as="p" style={{ ...serif, color: "#231f20", whiteSpace: "pre-line" }}>
                  {item.text}
                </Reveal>
              );
            }
            if (item.type === "filmstrip") {
              return (
                <Reveal key={i} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {filmstripMobile.map((f, fi) => (
                    <div key={fi} style={{ position: "relative", width: "100%", aspectRatio: "1", overflow: "hidden", opacity: f.opacity }}>
                      <Image src={f.src} alt={f.alt} fill style={{ objectFit: "cover" }} sizes="33vw" />
                    </div>
                  ))}
                </Reveal>
              );
            }
            if (item.type === "floorplan") {
              return (
                <Reveal key={i} style={{ position: "relative", width: "100%", aspectRatio: "761/492", background: "#e6e3dd" }}>
                  <Image src={floorPlan} alt="Floor plan of the Serif roastery" fill style={{ objectFit: "contain", mixBlendMode: "multiply" }} sizes="100vw" />
                </Reveal>
              );
            }
            // image
            return (
              <Reveal key={i} style={{ width: "100%" }}>
                {item.rotate ? (
                  <RotatedCover src={item.src} alt={item.alt} ratio={item.ratio} />
                ) : (
                  <div style={{ position: "relative", width: "100%", aspectRatio: item.ratio, overflow: "hidden" }}>
                    <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="100vw" priority={i === 0} />
                  </div>
                )}
                {item.caption ? (
                  <p style={{ ...andale, fontSize: "10px", color: "#767574", marginTop: "8px" }}>{item.caption}</p>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#ececea",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        columnGap: colGap,
        padding: `0 ${colGap}`,
        alignContent: "start",
        position: "relative",
        opacity: entered ? 1 : 0,
        transition: "opacity 1s ease",
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >

      {/* ── Nav ── */}
      <nav
        style={{
          gridColumn: "7 / 10",
          gridRow: 1,
          alignSelf: "start",
          marginTop: "2.5vh",
          zIndex: 20,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Same grid pattern (not flex) as the dropdown rows below, so "01."
            aligns with "01.1" etc. byte-for-byte across engines ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "baseline", columnGap: "20px", marginRight: "50px", lineHeight: 1, flexShrink: 0, position: "relative", top: "4px" }}
          onMouseEnter={() => { cancelHide(); setShowMenu(true); setHoveredNav("case-studies"); }}
          onMouseLeave={() => { scheduleHide(); setHoveredNav(null); }}
        >
          <span style={{ gridColumn: 1, gridRow: 1, alignSelf: "baseline", ...mono, fontSize: "10px", fontWeight: 700, color: "#231f20", lineHeight: 1, minWidth: 30, opacity: showMenu ? 1 : 0, transition: "opacity 0.2s ease", position: "relative", left: "6px" }}>01.</span>
          <span style={{ gridColumn: 2, gridRow: 1, alignSelf: "baseline", ...serif, color: hoveredNav !== null && hoveredNav !== "case-studies" ? "#767574" : "#231f20", cursor: "default", userSelect: "none", transition: "color 0.2s ease", position: "relative", left: "-4px" }}>
            Case Studies
          </span>
        </div>
        <a href="#"
          style={{ ...serif, color: hoveredNav !== null && hoveredNav !== "research" ? "#767574" : "#231f20", marginRight: "50px", transition: "color 0.2s ease", position: "relative", top: "4px", left: "-4px" }}
          onMouseEnter={() => setHoveredNav("research")}
          onMouseLeave={() => setHoveredNav(null)}
        >Research</a>
        <a href="#"
          style={{ ...serif, color: hoveredNav !== null && hoveredNav !== "about" ? "#767574" : "#231f20", marginRight: "50px", transition: "color 0.2s ease", position: "relative", top: "4px", left: "-4px" }}
          onMouseEnter={() => setHoveredNav("about")}
          onMouseLeave={() => setHoveredNav(null)}
        >About</a>
        <Link href="/" style={{ display: "block", flexShrink: 0, alignSelf: "flex-end", lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={yoonLogo.src}
            alt="YOON"
            style={{ height: 17.6, width: 103.5, objectFit: "contain", objectPosition: "left bottom", display: "block" }}
          />
        </Link>
      </nav>

      {/* ── White overlay on Case Studies hover ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
          zIndex: 6,
          ...fade(showMenu),
        }}
      />

      {/* ── Permanent project header — grid-placed at cols 7–12, not
          left:col7/right:colGap (see the dropdown's comment below) ── */}
      <div
        style={{
          position: "absolute",
          gridColumn: "7 / -1",
          gridRow: 1,
          top: "2.5vh",
          paddingTop: "83px",
          zIndex: 5,
          opacity: showMenu ? 0 : 1,
          transition: "opacity 0.55s ease",
          pointerEvents: showMenu ? "none" : "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            columnGap: "20px",
          }}
        >
          <span style={{ gridColumn: 1, gridRow: 1, alignSelf: "end", ...mono, fontSize: "10px", fontWeight: 700, color: "#231f20", lineHeight: 1, position: "relative", left: "6px", top: "-2px" }}>
            01.2
          </span>
          <span style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", color: "#231f20" }}>
            A Place to Stay — Serif
          </span>
          <p style={{ gridColumn: 2, gridRow: 2, ...serif, color: "#231f20", paddingLeft: "4vw", maxWidth: "25vw", whiteSpace: "pre-line" }}>
            In summer 2025, one of my friends asked me if I would design a small coffee roasting space for him. He had just started roasting coffee of his own and was looking for a place to set up his own little roastery.
            {"\n\n"}Since university, I had mostly been designing houses and spaces for people to live in, so designing a roasting space felt very new. But it didn't take long for me to get excited about the opportunity to help my friend - and soon it became my first commercial project.
          </p>
        </div>
      </div>

      {/* ── Project meta — anchored with the same top:"2.5vh" + paddingTop
          the header uses (not nested in the body wrapper below, which has
          its own unrelated fixed-px marginTop), so "location" lines up with
          the header's title row at any viewport height, not just one tested
          size. Grid + alignItems:"baseline" per row so the 8.5px label and
          11px value share a real text baseline. ── */}
      <div style={{ position: "absolute", left: 20, top: "2.5vh", zIndex: 4, opacity: showMenu ? 0 : 1, transition: "opacity 0.55s ease", pointerEvents: showMenu ? "none" : "auto" }}>
        {meta.map((m) => (
          <div key={m.label} style={{ position: "absolute", left: 0, top: m.top, display: "grid", gridTemplateColumns: "72px 1fr", alignItems: "baseline", lineHeight: "normal" }}>
            <span style={{ gridColumn: 1, ...andale, fontSize: "8.5px", color: "#231f20", whiteSpace: "nowrap" }}>{m.label}</span>
            <span style={{ gridColumn: 2, ...garamond, color: "#231f20", whiteSpace: "nowrap" }}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* ── Case Studies dropdown — grid-placed at cols 7–12 (not
          left:col7/right:colGap, a hand-computed vw approximation of the
          grid's real column-7 line that drifts a few px from nav's actual
          gridColumn:"7/10" placement at some viewport widths) ── */}
      <div
        style={{
          position: "absolute",
          gridColumn: "7 / -1",
          gridRow: 1,
          top: "2.5vh",
          paddingTop: "83px",
          zIndex: 10,
          ...fade(showMenu),
        }}
        onMouseEnter={cancelHide}
        onMouseLeave={scheduleHide}
      >
        {projects.map((p, i) => (
          <div
            key={p.num}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: "20px",
              marginBottom: "12px",
              cursor: "default",
            }}
            onMouseEnter={() => { cancelHide(); setHoveredProject(i); }}
          >
            <span style={{ gridColumn: 1, gridRow: 1, alignSelf: "baseline", ...mono, fontSize: "10px", fontWeight: 700, color: hoveredProject === i ? "#231f20" : "#767574", transition: "color 0.2s ease", position: "relative", left: "6px" }}>
              {p.num}
            </span>
            <Link href={p.href} style={{ gridColumn: 2, gridRow: 1, alignSelf: "baseline", ...serif, fontStyle: "italic", color: hoveredProject === i ? "#231f20" : "#767574", transition: "color 0.2s ease", textDecoration: "none" }}>
              {p.title}
            </Link>
            <Link href={p.href} style={{ gridColumn: 2, gridRow: 2, display: "block", ...serif, color: hoveredProject === i ? "#231f20" : "#767574", paddingLeft: "4vw", maxWidth: "25vw", transition: "color 0.2s ease", textDecoration: "none" }}>
              {p.desc}
            </Link>
          </div>
        ))}
      </div>

      <CaseStudyStrip show={showMenu} hoveredProject={hoveredProject} />

      {/* ── Case study body — long-form photo essay, positioned to mirror the Figma layout ── */}
      <div
        style={{
          gridColumn: "1 / -1",
          gridRow: 2,
          position: "relative",
          marginTop: "260px",
          minHeight: "6050px",
          paddingBottom: "10vh",
          opacity: showMenu ? 0 : 1,
          transition: "opacity 0.55s ease",
          pointerEvents: showMenu ? "none" : "auto",
        }}
      >

        {paragraphs.map((p, i) => (
          <Reveal
            key={i}
            as="p"
            style={{
              position: "absolute",
              left: textLeft,
              top: p.top,
              maxWidth: "25vw",
              paddingLeft: "4vw",
              ...serif,
              color: "#231f20",
              whiteSpace: "pre-line",
            }}
          >
            {p.text}
          </Reveal>
        ))}

        {sectionLabels.map((s) => (
          <span
            key={s.label}
            style={{
              position: "absolute",
              left: sideLabelLeft,
              top: s.top,
              ...andale,
              fontSize: "8.5px",
              color: "#231f20",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </span>
        ))}

        {figureCaptions.map((f, i) => (
          <p
            key={i}
            style={{
              position: "absolute",
              left: f.left,
              top: f.top,
              width: 204,
              ...andale,
              fontSize: "7px",
              lineHeight: 1.4,
              color: "#231f20",
            }}
          >
            Fig&nbsp;&nbsp;&nbsp;&nbsp;({f.label.replace("Fig (", "").replace(")", "")})
            {f.caption ? <><br />{f.caption}</> : null}
          </p>
        ))}

        {/* Background panel behind the floor plan */}
        <div style={{ position: "absolute", left: "calc(8.33% + 55.33px)", top: 4351, width: 980, height: 494, background: "#e6e3dd" }} />
        <Reveal style={{ position: "absolute", left: "calc(16.67% + 67.67px)", top: 4351, width: 761, height: 492, mixBlendMode: "multiply" }}>
          <Image src={floorPlan} alt="Floor plan of the Serif roastery" fill style={{ objectFit: "cover" }} sizes="60vw" />
        </Reveal>

        {photos.map((ph, i) => (
          <Reveal
            key={i}
            delay={(i % 3) * 90}
            style={{
              position: "absolute",
              left: ph.left,
              top: ph.top,
              width: ph.width,
              height: ph.height,
              overflow: "hidden",
              opacity: ph.opacity ?? 1,
            }}
          >
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              style={{ objectFit: "cover", objectPosition: ph.objectPosition ?? "center" }}
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </Reveal>
        ))}

        {maskedPhotos.map((m, i) => (
          <Reveal key={i} style={{ position: "absolute", left: m.left, top: m.top, width: m.width, height: m.height, overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                left: m.frameLeft,
                top: m.frameTop,
                width: m.frameWidth,
                height: m.frameHeight,
                ...(m.rotate ? { display: "flex", alignItems: "center", justifyContent: "center" } : null),
              }}
            >
              {m.rotate ? (
                <div style={{ position: "relative", width: m.boxWidth, height: m.boxHeight, flexShrink: 0, transform: `rotate(${m.rotate}deg)` }}>
                  <Image src={m.src} alt={m.alt} fill style={{ objectFit: "cover" }} sizes="60vw" priority={i === 0} />
                </div>
              ) : (
                <Image src={m.src} alt={m.alt} fill style={{ objectFit: "cover" }} sizes="40vw" />
              )}
            </div>
          </Reveal>
        ))}
      </div>

    </main>
  );
}
