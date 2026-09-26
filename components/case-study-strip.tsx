"use client";

import Image from "next/image";

import lampImg from "@/public/images/lamp.jpg";
import roomImg from "@/public/images/room-placeholder.svg";
import houseHomeStrip1 from "@/public/images/a-year-making-a-house-home/detail-01.jpg";
import houseHomeStrip2 from "@/public/images/a-year-making-a-house-home/detail-10.jpg";
import serifStrip1 from "@/public/images/a-place-to-stay-serif/shelf-corner.jpg";
import serifStrip2 from "@/public/images/a-place-to-stay-serif/fig-dieter-rams.jpg";

// Two thumbnails per case study, in the same order as the dropdown's projects
const projectNums = ["01.1", "01.2", "01.3"];

const stripImages = [
  { src: houseHomeStrip1, w: 93,  h: 131 },
  { src: houseHomeStrip2, w: 93,  h: 110 },
  { src: serifStrip1, w: 93,  h: 62  },
  { src: serifStrip2, w: 85,  h: 86  },
  { src: lampImg,  w: 93,  h: 113 },
  { src: roomImg,  w: 85,  h: 91  },
];

const colGap = "1.5vw";
const mono: React.CSSProperties = { fontFamily: '"logic-monospace", var(--font-mono, monospace)' };

const fade = (show: boolean): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transition: "opacity 0.55s ease",
  pointerEvents: show ? "auto" : "none",
  willChange: "opacity",
  transform: "translateZ(0)",
  WebkitTransform: "translateZ(0)",
});

// ─── Case Studies dropdown thumbnail strip ───────────────────────────────────
// Fixed to the viewport (so it stays put on scrolling case study pages) on a
// copy of the page's 12-col grid, spanning cols 1–6, 12vh above the bottom.
export function CaseStudyStrip({ show, hoveredProject }: { show: boolean; hoveredProject: number | null }) {
  const anyProjectHover = hoveredProject !== null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        columnGap: colGap,
        padding: `0 ${colGap}`,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          gridColumn: "1 / 7",
          left: 0,
          right: 0,
          bottom: "12vh",
          display: "flex",
          gap: "24px",
          alignItems: "center",
          ...fade(show),
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
                {projectNums[pi]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
