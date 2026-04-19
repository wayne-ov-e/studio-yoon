"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled
    ? "rgba(247, 244, 239, 0.96)"
    : "transparent";
  const border = scrolled ? "1px solid #E4E0DA" : "1px solid transparent";
  const textColor = scrolled ? "#111110" : "rgba(254, 252, 249, 0.88)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.45s ease, border-color 0.45s ease",
        background: bg,
        borderBottom: border,
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 3rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.05rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 400,
            color: textColor,
            transition: "color 0.45s ease",
          }}
        >
          Studio Yoon
        </a>

        <nav>
          <ul
            className="nav-links"
            style={{
              display: "flex",
              gap: "2.5rem",
              listStyle: "none",
            }}
          >
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="nav-link"
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: textColor,
                    transition: "color 0.45s ease",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
