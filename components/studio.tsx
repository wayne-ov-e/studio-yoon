/* eslint-disable @next/next/no-img-element */
const stats = [
  { num: "47+", label: "Projects" },
  { num: "8", label: "Years" },
  { num: "3", label: "Countries" },
];

export function Studio() {
  return (
    <section
      id="studio"
      className="studio-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "85vh",
      }}
    >
      {/* Left — image */}
      <div
        className="studio-image-col"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80&auto=format&fit=crop"
          alt="Studio Yoon workspace"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 60%, rgba(17,17,16,0.35))",
          }}
        />
      </div>

      {/* Right — content */}
      <div
        style={{
          background: "#111110",
          padding: "7rem 5.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C8B8A8",
            fontWeight: 500,
            display: "block",
            marginBottom: "1.5rem",
          }}
        >
          The Studio
        </span>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 3.5vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "#FEFCF9",
            letterSpacing: "-0.01em",
            marginBottom: "2.25rem",
          }}
        >
          We design spaces
          <br />
          <em style={{ fontStyle: "italic", color: "#C8B8A8" }}>that endure</em>
        </h2>

        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: 1.85,
            color: "rgba(254,252,249,0.52)",
            maxWidth: "380px",
            letterSpacing: "0.01em",
            marginBottom: "3rem",
          }}
        >
          Studio Yoon is a Seoul-based interior design practice founded on the
          belief that great spaces emerge from the intersection of cultural
          memory and contemporary life. We work closely with each client to
          create environments that are personal, purposeful, and timeless.
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            borderTop: "1px solid rgba(254,252,249,0.1)",
            paddingTop: "2.5rem",
          }}
        >
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.75rem",
                  fontWeight: 300,
                  color: "#FEFCF9",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C8B8A8",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
