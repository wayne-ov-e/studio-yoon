"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Assets ──────────────────────────────────────────────────────────────────
const yoonLogo = "https://www.figma.com/api/mcp/asset/34091dbb-493e-4272-a237-d781363cbee5";
const heroImg  = "https://www.figma.com/api/mcp/asset/4065bbce-babb-49e3-9913-39d7283a51a3";
const tableImg = "https://www.figma.com/api/mcp/asset/ac13bf18-d29d-42e1-a277-169c18dc1dc3";
const lampImg  = "https://www.figma.com/api/mcp/asset/32e2f261-1f22-4d32-aaee-6dec6470a255";
const roomImg  = "https://www.figma.com/api/mcp/asset/8104b6f9-1309-4b8d-ae09-30269290756a";

// ─── Data ────────────────────────────────────────────────────────────────────
const projects = [
  {
    num: "01.1",
    title: "A Year Without a Kiln",
    desc: "A non-ceramic translation of Simone Bodmer-Turner's work, this inherently personal solo show was presented in the spring of 2024.",
    images: [0, 1],
  },
  {
    num: "01.2",
    title: "A Summer Arrangement",
    desc: "An impressive collection of multidisciplinary artists, was on view at the LongHouse Reserve East Hampton, New York in the summer of 2023.",
    images: [2, 3],
  },
  {
    num: "01.3",
    title: "Take Part In",
    desc: "An unusual interaction with the seemingly rigid and fragile material that composed the entire show.",
    images: [4, 5],
  },
];

const stripImages = [
  { src: tableImg, w: 93,  h: 69  },
  { src: lampImg,  w: 93,  h: 113 },
  { src: roomImg,  w: 85,  h: 91  },
  { src: tableImg, w: 93,  h: 69  },
  { src: lampImg,  w: 93,  h: 113 },
  { src: roomImg,  w: 85,  h: 91  },
];

// ─── Grid ────────────────────────────────────────────────────────────────────
// 12 cols · 1.5vw left/right margin · 1.5vw column-gap
// colW = (100vw − 2×1.5vw − 11×1.5vw) / 12 = 80.5vw / 12 ≈ 6.708vw
// col7 = margin + 6×(colW + gap) = 1.5vw + 6×(80.5vw/12 + 1.5vw) = 50.75vw
// col8 = col7 + colW + gap = 50.75vw + 6.708vw + 1.5vw = 58.958vw
const colGap = "1.5vw";
const colW   = "calc(80.5vw / 12)";
const col7   = "50.75vw";

// ─── Style tokens ─────────────────────────────────────────────────────────────
const serif: React.CSSProperties = { fontFamily: "var(--font-times-now, 'Times New Roman', serif)" };
const mono: React.CSSProperties  = { fontFamily: "var(--font-mono, monospace)" };

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
  const [showMenu, setShowMenu]             = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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
      }}
    >

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
        {/* "01." + "Case Studies" group: 2rem number col, 12px gap */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginRight: "50px", lineHeight: 1, flexShrink: 0 }}>
          <span style={{ ...mono, fontSize: "12px", fontWeight: 700, color: "#231f20", lineHeight: 1, display: "inline-block", minWidth: 30 }}>01.</span>
          <span
            style={{ ...serif, fontSize: "16px", fontWeight: 600, color: "#231f20", cursor: "default", userSelect: "none", lineHeight: 1 }}
            onMouseEnter={() => { cancelHide(); setShowMenu(true); }}
            onMouseLeave={scheduleHide}
          >
            Case Studies
          </span>
        </div>
        <a href="#" style={{ ...serif, fontSize: "16px", fontWeight: 600, color: "#231f20", marginRight: "50px", lineHeight: 1 }}>Research</a>
        <a href="#" style={{ ...serif, fontSize: "16px", fontWeight: 600, color: "#231f20", marginRight: "50px", lineHeight: 1 }}>About</a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={yoonLogo}
          alt="YOON"
          style={{ height: 22, width: 85, objectFit: "contain", objectPosition: "left center", display: "block", flexShrink: 0 }}
        />
      </nav>

      {/* ── Project list — absolute, anchored to col 7 ── */}
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
            <span style={{ gridColumn: 1, gridRow: 1, alignSelf: "baseline", ...mono, fontSize: "12px", fontWeight: 700, color: hoveredProject === i ? "#231f20" : "#767574", transition: "color 0.2s ease" }}>
              {p.num}
            </span>
            <span style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", fontSize: "16px", fontWeight: 600, color: hoveredProject === i ? "#231f20" : "#767574", lineHeight: 1.1, transition: "color 0.2s ease" }}>
              {p.title}
            </span>
            <p style={{ gridColumn: 2, gridRow: 2, ...serif, fontSize: "16px", fontWeight: 600, color: hoveredProject === i ? "#231f20" : "#767574", lineHeight: 1.1, paddingLeft: colGap, maxWidth: "18.9vw", transition: "color 0.2s ease" }}>
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
          const projectOpacity = anyProjectHover ? (isActive ? 1 : 0.08) : 0.1;
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
              <span style={{ ...mono, fontSize: "12px", fontWeight: 700, color: "#231f20", lineHeight: 1, visibility: isFirstOfPair ? "visible" : "hidden" }}>
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
          left: col7,
          bottom: "3%",
          maxWidth: "19.7vw",
          ...serif,
          fontSize: "16px",
          fontWeight: 600,
          color: "#231f20",
          lineHeight: 1.1,
          ...fade(showMenu),
        }}
      >
        An interior design studio passionate about transforming houses into homes through textural details.
      </p>

    </main>
  );
}
