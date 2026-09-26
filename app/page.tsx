"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Assets ──────────────────────────────────────────────────────────────────
import yoonLogo from "@/public/images/yoon-logo.svg";
import heroImg from "@/public/images/lamp.jpg";
import lampImg from "@/public/images/lamp.jpg";
import roomImg from "@/public/images/room-placeholder.svg";
import houseHomeStrip1 from "@/public/images/a-year-making-a-house-home/detail-01.jpg";
import houseHomeStrip2 from "@/public/images/a-year-making-a-house-home/detail-10.jpg";
import serifStrip1 from "@/public/images/a-place-to-stay-serif/shelf-corner.jpg";
import serifStrip2 from "@/public/images/a-place-to-stay-serif/fig-dieter-rams.jpg";
import { usePageEnter } from "@/components/reveal";
import { useIsMobile } from "@/components/use-is-mobile";

// ─── Data ────────────────────────────────────────────────────────────────────
const projects = [
  {
    num: "01.1",
    title: "A Year Making a House, Home",
    desc: "A year-long renovation of a small townhouse into a home for two — and one dog named August.",
    href: "/case-studies/a-year-making-a-house-home",
    images: [0, 1],
  },
  {
    num: "01.2",
    title: "A Place to Stay — Serif",
    desc: "A small coffee roasting space in Vancouver, designed around flexibility, quietness, and the idea of a space that can evolve over time.",
    href: "/case-studies/a-place-to-stay-serif",
    images: [2, 3],
  },
  {
    num: "01.3",
    title: "Take Part In",
    desc: "An unusual interaction with the seemingly rigid and fragile material that composed the entire show.",
    href: "#",
    images: [4, 5],
  },
];

const stripImages = [
  { src: houseHomeStrip1, w: 93,  h: 131 },
  { src: houseHomeStrip2, w: 93,  h: 110 },
  { src: serifStrip1, w: 93,  h: 62  },
  { src: serifStrip2, w: 85,  h: 86  },
  { src: lampImg,  w: 93,  h: 113 },
  { src: roomImg,  w: 85,  h: 91  },
];

// ─── Grid ────────────────────────────────────────────────────────────────────
// 12 cols · 1.5vw left/right margin · 1.5vw column-gap
// colW = (100vw − 2×1.5vw − 11×1.5vw) / 12 = 80.5vw / 12 ≈ 6.708vw
// col7 = margin + 6×(colW + gap) = 1.5vw + 6×(80.5vw/12 + 1.5vw) = 50.75vw
// col8 = col7 + colW + gap = 50.75vw + 6.708vw + 1.5vw = 58.958vw
const colGap = "1.5vw";
const col7   = "50.75vw";

// ─── Style tokens ─────────────────────────────────────────────────────────────
const serif: React.CSSProperties = { fontFamily: "var(--font-eb-garamond, Garamond, Georgia, serif)", fontSize: "14px", fontWeight: 300, lineHeight: 1.2 };
const mono: React.CSSProperties  = { fontFamily: '"logic-monospace", var(--font-mono, monospace)' };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
  willChange: "opacity",
  transform: "translateZ(0)",
  WebkitTransform: "translateZ(0)",
});

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
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

  const activeImages    = hoveredProject !== null ? projects[hoveredProject].images : [];
  const anyProjectHover = hoveredProject !== null;

  // ─── Mobile: full-bleed hero + a tap-triggered full-screen menu, instead of
  // the desktop's hover-driven mega-dropdown (cols 7–12 of a 12-col grid,
  // which has no room to exist on a ~375px-wide screen) ─────────────────────
  if (isMobile) {
    return (
      <main
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#ececea",
          overflow: "hidden",
          opacity: entered ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        {/* Hero */}
        <div style={{ position: "absolute", top: "1.5vh", bottom: "1.5vh", left: "4vw", right: "4vw", ...fade(!showMenu) }}>
          <Image src={heroImg} alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        </div>

        {/* Nav bar */}
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 5vw",
          }}
        >
          <Link href="/" style={{ display: "block", lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={yoonLogo.src} alt="YOON" style={{ height: 16, width: "auto", objectFit: "contain", display: "block" }} />
          </Link>
          <button
            onClick={() => setShowMenu((v) => !v)}
            aria-label={showMenu ? "Close menu" : "Open menu"}
            style={{
              ...mono,
              fontSize: "11px",
              fontWeight: 700,
              color: "#231f20",
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            {showMenu ? "Close" : "Menu"}
          </button>
        </div>

        {/* Full-screen tap menu */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 15,
            background: "#f7f4ef",
            padding: "80px 6vw 40px",
            overflowY: "auto",
            ...fade(showMenu),
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <span style={{ ...mono, fontSize: "11px", fontWeight: 700, color: "#767574" }}>01.</span>
            <span style={{ ...serif, fontStyle: "italic", color: "#231f20", marginLeft: "12px" }}>
              Case Studies
            </span>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {projects.map((p) => (
                <Link
                  key={p.num}
                  href={p.href}
                  onClick={() => setShowMenu(false)}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#767574" }}>{p.num}</div>
                  <div style={{ ...serif, fontStyle: "italic", color: "#231f20", marginTop: "4px" }}>
                    {p.title}
                  </div>
                  <p style={{ ...serif, color: "#767574", marginTop: "6px" }}>
                    {p.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", borderTop: "1px solid #ddd8cf", paddingTop: "24px" }}>
            <a href="#" onClick={() => setShowMenu(false)} style={{ ...serif, color: "#231f20", textDecoration: "none" }}>Research</a>
            <a href="#" onClick={() => setShowMenu(false)} style={{ ...serif, color: "#231f20", textDecoration: "none" }}>About</a>
          </div>

          <p style={{ ...serif, color: "#767574", marginTop: "40px" }}>
            An interior design studio passionate about transforming houses into homes through textural details.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        background: "#ececea",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        columnGap: colGap,
        padding: `0 ${colGap}`,
        alignContent: "start",
        opacity: entered ? 1 : 0,
        transition: "opacity 1s ease",
      }}
      onMouseEnter={cancelHide}
      onMouseLeave={scheduleHide}
    >

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

      {/* ── Hero: absolute, behind everything ── */}
      <div
        style={{
          position: "absolute",
          top: "0.5vh", bottom: "0.5vh",
          left: "5vw",  right: "5vw",
          ...fade(!showMenu),
        }}
      >
        <Image
          src={heroImg}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      {/* ── Nav — single wrapper spanning cols 7–10 ── */}
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
        {/* "01." + "Case Studies" group — same grid pattern (not flex) as the
            dropdown rows below, so the "01." column aligns with "01.1" etc.
            byte-for-byte regardless of engine-specific flex/grid rounding ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "baseline", columnGap: "20px", marginRight: "50px", lineHeight: 1, flexShrink: 0, position: "relative", top: "4px" }}
          onMouseEnter={() => { cancelHide(); setShowMenu(true); setHoveredNav("case-studies"); }}
          onMouseLeave={() => { scheduleHide(); setHoveredNav(null); }}
        >
          <span style={{ gridColumn: 1, gridRow: 1, alignSelf: "baseline", ...mono, fontSize: "10px", fontWeight: 700, color: "#231f20", lineHeight: 1, minWidth: 30, opacity: showMenu ? 1 : 0, transition: "opacity 0.2s ease", position: "relative", left: "6px" }}>01.</span>
          <span
            style={{ gridColumn: 2, gridRow: 1, alignSelf: "baseline", ...serif, color: hoveredNav !== null && hoveredNav !== "case-studies" ? "#767574" : "#231f20", cursor: "default", userSelect: "none", transition: "color 0.2s ease", position: "relative", left: "-4px" }}
          >
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

      {/* ── Project list — grid-placed at cols 7–12 (not left:col7/right:colGap
          — those are a hand-computed vw approximation of the grid's real
          column-7 line, which drifts a few px from nav's actual gridColumn:
          "7/10" placement at some viewport widths; gridColumn ties it to the
          same real grid computation nav uses, so they always match exactly) ── */}
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
              // Internal grid mirrors the main grid:
              // col 1 = colW (= main col 7 width) → num aligns with "01."
              // col 2 = 1fr          → title/desc start at main col 8 = "Case Studies"
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
            <Link href={p.href} style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", color: hoveredProject === i ? "#231f20" : "#767574", transition: "color 0.2s ease", textDecoration: "none" }}>
              {p.title}
            </Link>
            <p style={{ gridColumn: 2, gridRow: 2, ...serif, color: hoveredProject === i ? "#231f20" : "#767574", paddingLeft: "4vw", maxWidth: "25vw", transition: "color 0.2s ease" }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Image strip — grid cols 1–6, 12% above bottom ── */}
      <div
        style={{
          position: "absolute",
          gridColumn: "1 / 7",
          gridRow: 1,
          left: 0,
          right: 0,
          bottom: "12vh",
          zIndex: 10,
          display: "flex",
          gap: "24px",
          alignItems: "center",
          ...fade(showMenu),
        }}
      >
        {stripImages.map((img, i) => {
          const pi = Math.floor(i / 2);
          const isFirstOfPair = i % 2 === 0;
          const isActive = hoveredProject === pi;
          const projectOpacity = anyProjectHover ? (isActive ? 1 : 0.3) : 0.1;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: "8px",
                opacity: projectOpacity,
                transition: "opacity 0.35s ease",
                flex: 1,
                willChange: "opacity",
                transform: "translateZ(0)",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: `${img.w}/${img.h}`, overflow: "hidden" }}>
                <Image
                  src={img.src}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span style={{ ...mono, fontSize: "10px", fontWeight: 700, color: "#231f20", lineHeight: 1, visibility: isFirstOfPair ? "visible" : "hidden", position: "relative", left: "6px" }}>
                {projects[pi].num}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Tagline — col 7, 3% above bottom ── */}
      <p
        style={{
          position: "absolute",
          left: `calc(${col7} + 50px)`,
          bottom: "3%",
          maxWidth: "19.7vw",
          ...serif,
          color: "#231f20",
          ...fade(showMenu),
        }}
      >
        An interior design studio passionate about transforming houses into homes through textural details.
      </p>

    </main>
  );
}
