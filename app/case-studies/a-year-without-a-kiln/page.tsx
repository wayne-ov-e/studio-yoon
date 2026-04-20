"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Assets ──────────────────────────────────────────────────────────────────
const yoonLogo     = "https://www.figma.com/api/mcp/asset/0507d72c-de77-4cdf-b8a4-b9ee36f384e1";
const furnitureImg = "https://www.figma.com/api/mcp/asset/6580e1bc-30b9-4c25-a791-64c248701e0a";
const tableImg     = "https://www.figma.com/api/mcp/asset/7251893b-2a91-48d1-8741-452cc4385421";

// ─── Data (mirrors homepage) ──────────────────────────────────────────────────
const projects = [
  {
    num: "01.1",
    title: "A Year Without a Kiln",
    desc: "A non-ceramic translation of Simone Bodmer-Turner's work, this inherently personal solo show was presented in the spring of 2024.",
    href: "/case-studies/a-year-without-a-kiln",
  },
  {
    num: "01.2",
    title: "A Summer Arrangement",
    desc: "An impressive collection of multidisciplinary artists, was on view at the LongHouse Reserve East Hampton, New York in the summer of 2023.",
    href: "#",
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
const serif: React.CSSProperties = { fontFamily: "var(--font-times-now, 'Times New Roman', serif)" };
const mono: React.CSSProperties  = { fontFamily: '"logic-monospace", var(--font-mono, monospace)' };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
  willChange: "opacity",
});

export default function YearWithoutKiln() {
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
            src={yoonLogo}
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
            01.1
          </span>
          <span style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1 }}>
            A Year Without a Kiln
          </span>
          <p style={{ gridColumn: 2, gridRow: 2, ...serif, fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1, paddingLeft: "4vw", maxWidth: "25vw" }}>
            A non-ceramic translation of Simone Bodmer-Turner&apos;s work, this inherently personal solo show was presented in the spring of 2024.
          </p>
          <p style={{ gridColumn: 2, gridRow: 3, ...serif, fontSize: "13px", fontWeight: 600, color: "#231f20", lineHeight: 1.1, paddingLeft: "4vw", textIndent: "-4vw", maxWidth: "25vw" }}>
            Aliquam tincidunt molestie mauris, et euismod nulla dictum quis. Suspendisse mattis pharetra lacus. Sed venenatis eleifend arcu, in gravida elit tristique eget. Phasellus id justo vel elit vulputate dictum.
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

      {/* ── Large image — cols 2–7, below header ── */}
      <div
        style={{
          gridColumn: "3 / 10",
          gridRow: 2,
          marginTop: "295px",
          position: "relative",
          aspectRatio: "646 / 479",
          overflow: "hidden",
        }}
      >
        <Image
          src={furnitureImg}
          alt="A Year Without a Kiln"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* ── Second image — cols 4–7 ── */}
      <div
        style={{
          gridColumn: "5 / 9",
          gridRow: 3,
          marginTop: "80px",
          marginBottom: "10vh",
          position: "relative",
          aspectRatio: "382 / 464",
          overflow: "hidden",
        }}
      >
        <Image
          src={tableImg}
          alt="A Year Without a Kiln, detail"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

    </main>
  );
}
