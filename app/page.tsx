"use client";

import { useState, useRef, useCallback } from "react";

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
const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant, 'Times New Roman', serif)" };
const mono: React.CSSProperties  = { fontFamily: "var(--font-mono, monospace)" };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
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
    }, 120);
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
        <img
          src={heroImg}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* ── Nav — grid child at col 7 to end ── */}
      <nav
        style={{
          gridColumn: "7 / -1",
          gridRow: 1,
          alignSelf: "start",
          paddingTop: 25,
          zIndex: 20,
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "auto",
          columnGap: "50px",
          alignItems: "baseline",
        }}
      >
        {/* "01." + "Case Studies" group: 2rem number col, 12px gap */}
        <div style={{ display: "grid", gridTemplateColumns: "2rem auto", columnGap: "12px", alignItems: "baseline" }}>
          <span style={{ ...mono, fontSize: "0.75rem", color: "#231f20" }}>01.</span>
          <span
            style={{ ...serif, fontSize: "1rem", color: "#231f20", cursor: "default", userSelect: "none" }}
            onMouseEnter={() => { cancelHide(); setShowMenu(true); }}
            onMouseLeave={scheduleHide}
          >
            Case Studies
          </span>
        </div>
        <a href="#" style={{ ...serif, fontSize: "1rem", color: "#231f20" }}>Research</a>
        <a href="#" style={{ ...serif, fontSize: "1rem", color: "#231f20" }}>About</a>
        <img
          src={yoonLogo}
          alt="YOON"
          style={{ height: 22, width: 85, objectFit: "contain", display: "block", alignSelf: "center" }}
        />
      </nav>

      {/* ── Project list — absolute, anchored to col 7 ── */}
      <div
        style={{
          position: "absolute",
          left: col7,
          top: 68,
          right: colGap,
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
              gridTemplateColumns: "2rem 1fr",
              columnGap: "12px",
              marginBottom: "2rem",
              cursor: "default",
            }}
            onMouseEnter={() => setHoveredProject(i)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <span style={{ gridColumn: 1, gridRow: 1, alignSelf: "baseline", ...mono, fontSize: "0.75rem", color: "#767574" }}>
              {p.num}
            </span>
            <span style={{ gridColumn: 2, gridRow: 1, ...serif, fontStyle: "italic", fontSize: "1rem", color: "#767574", lineHeight: 1.1 }}>
              {p.title}
            </span>
            <p style={{ gridColumn: 2, gridRow: 2, ...serif, fontSize: "1rem", color: "#767574", lineHeight: 1.1, paddingLeft: colGap, maxWidth: "18.9vw" }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Image strip — col 1, 12% above bottom ── */}
      <div
        style={{
          position: "absolute",
          left: colGap,
          bottom: "12%",
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "auto",
          columnGap: "6px",
          alignItems: "end",
          ...fade(showMenu),
        }}
      >
        {stripImages.map((img, i) => {
          const isActive = activeImages.includes(i);
          return (
            <div
              key={i}
              style={{
                width: img.w,
                height: img.h,
                overflow: "hidden",
                opacity: anyProjectHover ? (isActive ? 1 : 0.08) : 0.1,
                transition: "opacity 0.35s ease",
              }}
            >
              <img
                src={img.src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
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
          fontSize: "1rem",
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
