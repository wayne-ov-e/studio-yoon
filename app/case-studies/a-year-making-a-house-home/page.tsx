"use client";

import { useState, useRef, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

// ─── Assets ──────────────────────────────────────────────────────────────────
import yoonLogo from "@/public/images/yoon-logo.svg";
import heroImg from "@/public/images/a-year-making-a-house-home/hero.jpg";
import detail01 from "@/public/images/a-year-making-a-house-home/detail-01.jpg";
import detail02 from "@/public/images/a-year-making-a-house-home/detail-02.jpg";
import detail03 from "@/public/images/a-year-making-a-house-home/detail-03.jpg";
import detail04 from "@/public/images/a-year-making-a-house-home/detail-04.jpg";
import detail05 from "@/public/images/a-year-making-a-house-home/detail-05.jpg";
import detail06 from "@/public/images/a-year-making-a-house-home/detail-06.jpg";
import detail07 from "@/public/images/a-year-making-a-house-home/detail-07.jpg";
import detail08 from "@/public/images/a-year-making-a-house-home/detail-08.jpg";
import detail09 from "@/public/images/a-year-making-a-house-home/detail-09.jpg";
import detail10 from "@/public/images/a-year-making-a-house-home/detail-10.jpg";
import detail11 from "@/public/images/a-year-making-a-house-home/detail-11.jpg";
import detail12 from "@/public/images/a-year-making-a-house-home/detail-12.jpg";
import detail13 from "@/public/images/a-year-making-a-house-home/detail-13.jpg";
import detail14 from "@/public/images/a-year-making-a-house-home/detail-14.jpg";
import { Reveal, usePageEnter } from "@/components/reveal";
import { useIsMobile } from "@/components/use-is-mobile";

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
const serif: React.CSSProperties    = { fontFamily: "var(--font-eb-garamond, Garamond, Georgia, serif)" };
const mono: React.CSSProperties     = { fontFamily: '"logic-monospace", var(--font-mono, monospace)' };
const andale: React.CSSProperties   = { fontFamily: '"Andale Mono", AndaleMono, ui-monospace, monospace' };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
  willChange: "opacity",
});

// ─── Body copy — aligned to the header paragraph's own text column: col7 +
// the "01.1" label's rendered width (24px) + the grid's 20px column gap, minus
// the 1.5vw grid inset this element's own wrapper (unlike the header) sits in ─
const textLeft = "calc(49.25vw + 44px)";

const paragraphs: { top: number; text: string }[] = [
  { top: 847, text: "As soon as we visited the place for the open house, we had a feeling it could be the one. We had already been to so many viewings and were trying to be quite critical about what we actually wanted in our new home. Built in 1987, the townhouse had a fairly simple, rectangular floor plan, with just enough room upstairs to add another bathroom. Having an extra bathroom was important to us, as we wanted to be able to host family and friends who might come to visit us or spend a few days in the city." },
  { top: 1114, text: "We started drawing up plans for the new bathroom, which would take over the existing laundry closet. We also removed a few unnecessary pony walls and bulkheads to keep things simple and clean. More than anything, we wanted our home to feel like a place where we could slow down, relax, and recharge — somewhere quiet and comfortable away from everything outside." },
  { top: 2628, text: "In the entrance, we chose cobblestone limestone flooring that we hope will age and weather with us. We wanted something durable, but also something that would become more beautiful over time — a material that could feel timeless in our home. Functionally, it also worked well for us and August, especially when it came to cleaning her muddy paws after being outside." },
  { top: 3220, text: "In the kitchen, we extended the countertop all the way toward the adjacent window without adding any upper cabinets. This gave us more usable counter space while still leaving plenty of room for cooking and prep." },
  { top: 4235, text: "For our master bedroom, we explored limewash paint across the walls and ceiling. We wanted to try a slightly darker room that would make us feel cozy and relaxed, almost like a little retreat from the rest of the house.\n\nThe master ensuite has a walk-in shower finished in beautiful ceramic tiles designed by Norm Architects. We chose the vertically textured version for the walls, which adds a soft, subtle texture to the space. The built-in ledge continues the same material and gives us a practical spot for everyday things without adding too much visual clutter.\n\nThe office was transformed with a long custom desktop that runs along the wall, giving us plenty of space to work while keeping the room simple and open. We also added a small daybed underneath the window for August — which quickly became her favourite spot in the house." },
  { top: 5551, text: "Looking back, the renovation was really about figuring out what we needed from our home and making small, thoughtful changes to support the way we live. We didn't want to make the house feel overly designed or perfect, but rather create a space that would grow with us and feel more comfortable over time. There are still things we would change and little projects we want to work on, but that's also part of what makes it feel like ours. After a year of living, renovating, and slowly settling in, the house has finally started to feel like home." },
  { top: 7446, text: "A home like this doesn't come together on its own. I'm really grateful to everyone who helped us along the way and brought the ideas from drawings into something we could actually live in. A special thank you to our contractor for his patience, care, and all the little things he helped us work through during the renovation. There were many decisions, adjustments, and unexpected moments along the way, and having someone we could trust made the process so much easier. Thank you to all our friends and family who was a big part of making this house feel like home." },
];

// ─── Hero — the only image whose right edge must track the text column's own
// right edge (both scale with vw), so it's sized with calc()/aspectRatio
// instead of a fixed px box like the rest of the photos below ──────────────
const heroLeft = 20;
const heroTop = 119;
const heroWidth = "calc(74.25vw + 24px)"; // mirrors textLeft + 25vw, minus heroLeft
const heroAspectRatio = "1061 / 593";

// ─── Photos — top offsets rebased so 0 sits just below the persistent header ──
const photos: { src: StaticImageData; alt: string; left: string; top: number; width: number; height: number }[] = [
  { src: detail05, alt: "Entry hallway",                     left: "20px",                   top: 1825, width: 139,  height: 205 },
  { src: detail07, alt: "Upstairs landing",                  left: "calc(8.33% + 71.33px)",  top: 1825, width: 137,  height: 205 },
  { src: detail06, alt: "Hallway detail",                    left: "calc(83.33% + 40.33px)", top: 1405, width: 123,  height: 182 },
  { src: detail10, alt: "The new upstairs bathroom",         left: "calc(25% + 25px)",       top: 1117, width: 322,  height: 384 },
  { src: detail14, alt: "Setting the tiled step at the entrance", left: "calc(33.33% + 95.33px)", top: 2102, width: 732, height: 494 },
  { src: detail01, alt: "Cobblestone limestone entrance floor", left: "20px",                top: 2396, width: 142,  height: 200 },
  { src: detail02, alt: "Notebook and pencil on the counter", left: "calc(33.33% - 0.67px)", top: 2951, width: 248,  height: 323 },
  { src: detail13, alt: "The extended kitchen countertop",   left: "20px",                   top: 3343, width: 1016, height: 640 },
  { src: detail03, alt: "The limewashed master bedroom",     left: "calc(8.33% + 3.33px)",   top: 4487, width: 564,  height: 843 },
  { src: detail04, alt: "Textured ceramic tile in the ensuite shower", left: "calc(83.33% + 41.33px)", top: 5104, width: 152, height: 226 },
  { src: detail11, alt: "The office desk beneath the window", left: "calc(16.67% + 16.67px)", top: 5551, width: 437,  height: 653 },
  { src: detail08, alt: "August resting on her daybed",      left: "20px",                   top: 6572, width: 545,  height: 718 },
  { src: detail09, alt: "Evening light in the living room",  left: "calc(58.33% + 84.33px)", top: 6778, width: 205,  height: 306 },
  { src: detail12, alt: "A quiet corner of the finished home", left: "calc(75% + 117px)",    top: 7426, width: 219,  height: 324 },
];

// ─── Mobile — the desktop layout is absolute-positioned two-column (images
// clustered left/center, text column on the right), which has no meaning on
// a ~375px screen. Rebuilt as a single-column stack in the same reading
// order as the desktop version, full-width images with their aspect ratio
// preserved via CSS aspect-ratio instead of a fixed px box. ────────────────
type MobileItem =
  | { type: "image"; src: StaticImageData; alt: string; ratio: string }
  | { type: "text"; text: string }
  | { type: "epilogue" };

const mobileContent: MobileItem[] = [
  { type: "image", src: heroImg,  alt: "Light through the kitchen window", ratio: "1061/593" },
  { type: "text", text: paragraphs[0].text },
  { type: "text", text: paragraphs[1].text },
  { type: "image", src: detail10, alt: "The new upstairs bathroom", ratio: "322/384" },
  { type: "image", src: detail06, alt: "Hallway detail", ratio: "123/182" },
  { type: "image", src: detail05, alt: "Entry hallway", ratio: "139/205" },
  { type: "image", src: detail07, alt: "Upstairs landing", ratio: "137/205" },
  { type: "image", src: detail14, alt: "Setting the tiled step at the entrance", ratio: "732/494" },
  { type: "image", src: detail01, alt: "Cobblestone limestone entrance floor", ratio: "142/200" },
  { type: "text", text: paragraphs[2].text },
  { type: "image", src: detail02, alt: "Notebook and pencil on the counter", ratio: "248/323" },
  { type: "text", text: paragraphs[3].text },
  { type: "image", src: detail13, alt: "The extended kitchen countertop", ratio: "1016/640" },
  { type: "text", text: paragraphs[4].text },
  { type: "image", src: detail03, alt: "The limewashed master bedroom", ratio: "564/843" },
  { type: "image", src: detail04, alt: "Textured ceramic tile in the ensuite shower", ratio: "152/226" },
  { type: "image", src: detail11, alt: "The office desk beneath the window", ratio: "437/653" },
  { type: "text", text: paragraphs[5].text },
  { type: "image", src: detail08, alt: "August resting on her daybed", ratio: "545/718" },
  { type: "image", src: detail09, alt: "Evening light in the living room", ratio: "205/306" },
  { type: "image", src: detail12, alt: "A quiet corner of the finished home", ratio: "219/324" },
  { type: "epilogue" },
  { type: "text", text: paragraphs[6].text },
];

export default function AYearMakingAHouseHome() {
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
            <span style={{ ...serif, fontStyle: "italic", fontSize: "18px", fontWeight: 600, color: "#231f20", marginLeft: "12px" }}>Case Studies</span>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {projects.map((p) => (
                <Link key={p.num} href={p.href} onClick={() => setShowMenu(false)} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#767574" }}>{p.num}</div>
                  <div style={{ ...serif, fontStyle: "italic", fontSize: "16px", fontWeight: 600, color: "#231f20", marginTop: "4px" }}>{p.title}</div>
                  <p style={{ ...serif, fontSize: "13px", color: "#767574", lineHeight: 1.4, marginTop: "6px" }}>{p.desc}</p>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", borderTop: "1px solid #ddd8cf", paddingTop: "24px" }}>
            <a href="#" onClick={() => setShowMenu(false)} style={{ ...serif, fontSize: "16px", fontWeight: 600, color: "#231f20", textDecoration: "none" }}>Research</a>
            <a href="#" onClick={() => setShowMenu(false)} style={{ ...serif, fontSize: "16px", fontWeight: 600, color: "#231f20", textDecoration: "none" }}>About</a>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "90px 6vw 8px" }}>
          <span style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#767574" }}>01.1</span>
          <div style={{ ...serif, fontStyle: "italic", fontSize: "20px", fontWeight: 600, color: "#231f20", marginTop: "6px" }}>
            A Year Making a House, Home
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 6vw 80px", display: "flex", flexDirection: "column", gap: "36px" }}>
          {mobileContent.map((item, i) => {
            if (item.type === "image") {
              return (
                <Reveal key={i} style={{ position: "relative", width: "100%", aspectRatio: item.ratio, overflow: "hidden" }}>
                  <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="100vw" priority={i === 0} />
                </Reveal>
              );
            }
            if (item.type === "epilogue") {
              return (
                <Reveal key={i} as="p" style={{ ...andale, fontSize: "11px", color: "#231f20" }}>
                  Epilogue.
                </Reveal>
              );
            }
            return (
              <Reveal key={i} as="p" style={{ ...serif, fontSize: "15px", fontWeight: 500, lineHeight: 1.6, color: "#231f20", whiteSpace: "pre-line" }}>
                {item.text}
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
          <span style={{ gridColumn: 2, gridRow: 1, alignSelf: "baseline", ...serif, fontSize: "13px", fontWeight: 600, color: hoveredNav !== null && hoveredNav !== "case-studies" ? "#767574" : "#231f20", cursor: "default", userSelect: "none", lineHeight: 1, transition: "color 0.2s ease", position: "relative", left: "-4px" }}>
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
            01.1
          </span>
          <span style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1 }}>
            A Year Making a House, Home
          </span>
          <p style={{ gridColumn: 2, gridRow: 2, ...serif, fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1, paddingLeft: "4vw", maxWidth: "25vw" }}>
            In early 2024, we bought a small townhouse. It was an upgrade from the apartment we had lived in since getting married. The townhouse had two floors, with two bedrooms and a bathroom upstairs, and a good-sized kitchen, living room, and small garden on the main floor — just enough space for the three of us: my husband, myself, and our dog, August.
          </p>
        </div>
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
          minHeight: "7850px",
          paddingBottom: "10vh",
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
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#231f20",
              whiteSpace: "pre-line",
            }}
          >
            {p.text}
          </Reveal>
        ))}

        <Reveal
          as="p"
          style={{
            position: "absolute",
            left: textLeft,
            top: 7430,
            paddingLeft: "4vw",
            ...andale,
            fontSize: "10px",
            color: "#231f20",
          }}
        >
          Epilogue.
        </Reveal>

        <Reveal
          style={{
            position: "absolute",
            left: heroLeft,
            top: heroTop,
            width: heroWidth,
            aspectRatio: heroAspectRatio,
            overflow: "hidden",
          }}
        >
          <Image
            src={heroImg}
            alt="Light through the kitchen window"
            fill
            style={{ objectFit: "cover" }}
            sizes="80vw"
            priority
          />
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
            }}
          >
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </Reveal>
        ))}
      </div>

    </main>
  );
}
