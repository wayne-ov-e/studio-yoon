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
const serif: React.CSSProperties    = { fontFamily: "var(--font-times-now, 'Times New Roman', serif)" };
const mono: React.CSSProperties     = { fontFamily: '"logic-monospace", var(--font-mono, monospace)' };
const garamond: React.CSSProperties = { fontFamily: "var(--font-eb-garamond, Garamond, Georgia, serif)" };
const andale: React.CSSProperties   = { fontFamily: '"Andale Mono", AndaleMono, ui-monospace, monospace' };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
  willChange: "opacity",
});

// ─── Body copy — right-hand column, same horizontal position as the nav (~col 7) ─
const textLeft = "calc(50% + 52px)";
const textWidth = 242;

const paragraphs: { top: number; text: string }[] = [
  { top: 13,   text: "In summer 2025, one of my friends asked me if I would design a small coffee roasting space for him. He had just started roasting coffee of his own and was looking for a place to set up his own little roastery.\n\nSince university, I had mostly been designing houses and spaces for people to live in, so designing a roasting space felt very new. But it didn't take long for me to get excited about the opportunity to help my friend - and soon it became my first commercial project." },
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

// ─── Project meta — left column, opposite the body copy ──────────────────────
const meta: { label: string; value: string; top: number }[] = [
  { label: "location", value: "vancouver, bc",              top: 6 },
  { label: "status",   value: "completed in Summer 2026",   top: 20 },
  { label: "Team",     value: "milltown contracting",       top: 35 },
  { label: "area",     value: "570 sqft",                   top: 50 },
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
  { src: cupLamps,           alt: "Cup and desk lamps on the counter",            left: "calc(8.33% + 55.33px)",   top: 5075, width: 980,  height: 560 },
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
];

export default function APlaceToStaySerif() {
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
        <div
          style={{ display: "flex", alignItems: "baseline", gap: "20px", marginRight: "50px", lineHeight: 1, flexShrink: 0, position: "relative", top: "4px" }}
          onMouseEnter={() => { cancelHide(); setShowMenu(true); setHoveredNav("case-studies"); }}
          onMouseLeave={() => { scheduleHide(); setHoveredNav(null); }}
        >
          <span style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#231f20", lineHeight: 1, display: "inline-block", minWidth: 30, opacity: showMenu ? 1 : 0, transition: "opacity 0.2s ease", position: "relative", left: "6px" }}>01.</span>
          <span style={{ ...serif, fontSize: "13px", fontWeight: 600, color: hoveredNav !== null && hoveredNav !== "case-studies" ? "#767574" : "#231f20", cursor: "default", userSelect: "none", lineHeight: 1, transition: "color 0.2s ease", position: "relative", left: "-4px" }}>
            Case Studies
          </span>
        </div>
        <a href="#"
          style={{ ...serif, fontSize: "13px", fontWeight: 600, color: hoveredNav !== null && hoveredNav !== "research" ? "#767574" : "#231f20", marginRight: "50px", lineHeight: 1, transition: "color 0.2s ease", position: "relative", top: "4px", left: "-4px" }}
          onMouseEnter={() => setHoveredNav("research")}
          onMouseLeave={() => setHoveredNav(null)}
        >Research</a>
        <a href="#"
          style={{ ...serif, fontSize: "13px", fontWeight: 600, color: hoveredNav !== null && hoveredNav !== "about" ? "#767574" : "#231f20", marginRight: "50px", lineHeight: 1, transition: "color 0.2s ease", position: "relative", top: "4px", left: "-4px" }}
          onMouseEnter={() => setHoveredNav("about")}
          onMouseLeave={() => setHoveredNav(null)}
        >About</a>
        <Link href="/" style={{ display: "block", flexShrink: 0, alignSelf: "flex-end", lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={yoonLogo.src}
            alt="YOON"
            style={{ height: 17.6, width: 68, objectFit: "contain", objectPosition: "left bottom", display: "block" }}
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

      {/* ── Permanent project header — same position as homepage dropdown ── */}
      <div
        style={{
          position: "absolute",
          left: col7,
          top: "2.5vh",
          right: colGap,
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
          <span style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1 }}>
            A Place to Stay — Serif
          </span>
          <p style={{ gridColumn: 2, gridRow: 2, ...serif, fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1, paddingLeft: "4vw", maxWidth: "25vw" }}>
            A small coffee roasting space in Vancouver, designed around flexibility, quietness, and the idea of a space that can evolve over time.
          </p>
        </div>
      </div>

      {/* ── Case Studies dropdown — same as homepage ── */}
      <div
        style={{
          position: "absolute",
          left: col7,
          top: "2.5vh",
          right: colGap,
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
            <Link href={p.href} style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", fontSize: "13px", fontWeight: 600, color: hoveredProject === i ? "#231f20" : "#767574", lineHeight: 1.1, transition: "color 0.2s ease", textDecoration: "none" }}>
              {p.title}
            </Link>
            <p style={{ gridColumn: 2, gridRow: 2, ...serif, fontSize: "13px", fontWeight: 600, color: hoveredProject === i ? "#231f20" : "#767574", lineHeight: 1.1, paddingLeft: "4vw", maxWidth: "25vw", transition: "color 0.2s ease" }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Case study body — long-form photo essay, positioned to mirror the Figma layout ── */}
      <div
        style={{
          gridColumn: "1 / -1",
          gridRow: 2,
          position: "relative",
          marginTop: "260px",
          minHeight: "6050px",
          paddingBottom: "10vh",
        }}
      >
        {/* Project meta — left column */}
        {meta.map((m) => (
          <div key={m.label} style={{ position: "absolute", left: 20, top: m.top, lineHeight: "normal" }}>
            <span style={{ ...andale, fontSize: "8.5px", color: "#231f20", position: "absolute", left: 0, whiteSpace: "nowrap" }}>{m.label}</span>
            <span style={{ ...garamond, fontSize: "11px", color: "#231f20", position: "absolute", left: 72, width: 242, whiteSpace: "nowrap" }}>{m.value}</span>
          </div>
        ))}

        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              position: "absolute",
              left: textLeft,
              top: p.top,
              width: textWidth,
              ...garamond,
              fontSize: "11px",
              lineHeight: 1.5,
              color: "#231f20",
              whiteSpace: "pre-line",
            }}
          >
            {p.text}
          </p>
        ))}

        {sectionLabels.map((s) => (
          <span
            key={s.label}
            style={{
              position: "absolute",
              left: "calc(41.67% + 129.67px)",
              top: s.top,
              transform: "translateX(-100%)",
              textAlign: "right",
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
        <div style={{ position: "absolute", left: "calc(16.67% + 67.67px)", top: 4351, width: 761, height: 492, mixBlendMode: "multiply" }}>
          <Image src={floorPlan} alt="Floor plan of the Serif roastery" fill style={{ objectFit: "cover" }} sizes="60vw" />
        </div>

        {photos.map((ph, i) => (
          <div
            key={i}
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
          </div>
        ))}

        {maskedPhotos.map((m, i) => (
          <div key={i} style={{ position: "absolute", left: m.left, top: m.top, width: m.width, height: m.height, overflow: "hidden" }}>
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
          </div>
        ))}
      </div>

    </main>
  );
}
