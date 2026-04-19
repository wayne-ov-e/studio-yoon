export function Hero() {
  return (
    <section
      className="hero-grid"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "680px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* Left — text */}
      <div
        style={{
          background: "#111110",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "5rem 4.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: "4.5rem",
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(254,252,249,0.35)",
            fontWeight: 500,
          }}
        >
          Seoul · Est. 2018
        </div>

        {/* Decorative line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "3rem",
            width: "1px",
            height: "35%",
            background:
              "linear-gradient(to bottom, transparent, rgba(200,184,168,0.25))",
          }}
        />

        {/* Headline */}
        <h1
          className="fade-up"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5.5rem, 9vw, 12rem)",
            fontWeight: 300,
            lineHeight: 0.88,
            color: "#FEFCF9",
            letterSpacing: "-0.02em",
            marginBottom: "2.5rem",
          }}
        >
          Studio
          <br />
          <em style={{ fontStyle: "italic", color: "#C8B8A8" }}>Yoon</em>
        </h1>

        {/* Bottom row */}
        <div
          className="fade-up fade-up-delay-1"
          style={{
            borderTop: "1px solid rgba(254,252,249,0.12)",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <p
            style={{
              color: "rgba(254,252,249,0.5)",
              fontSize: "0.875rem",
              lineHeight: 1.75,
              maxWidth: "260px",
              letterSpacing: "0.01em",
            }}
          >
            Crafting spaces that balance
            <br />
            beauty with purpose.
          </p>
          <a
            href="#work"
            className="nav-link"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8B8A8",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              whiteSpace: "nowrap",
            }}
          >
            View Work <span style={{ fontSize: "1rem" }}>↓</span>
          </a>
        </div>
      </div>

      {/* Right — image */}
      <div
        className="hero-image-col"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop"
          alt="Studio Yoon — featured interior"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Left edge fade to dark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(17,17,16,0.4) 0%, transparent 35%)",
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "3.5rem",
            background:
              "linear-gradient(to bottom, transparent, rgba(200,184,168,0.6))",
          }}
        />
        <span
          style={{
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(200,184,168,0.6)",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
