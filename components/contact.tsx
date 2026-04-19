const contactInfo = [
  { label: "Email", value: "studio@studioyoon.com" },
  { label: "Studio", value: "29 Itaewon-ro, Yongsan-gu\nSeoul, South Korea" },
  { label: "Instagram", value: "@studioyoon" },
  { label: "New Business", value: "+82 2 1234 5678" },
];

export function Contact() {
  return (
    <section
      id="contact"
      style={{ background: "#111110", padding: "8rem 0 7rem" }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}
      >
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
        >
          {/* Left — heading */}
          <div>
            <span
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#787066",
                fontWeight: 500,
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              Get in Touch
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 6vw, 8rem)",
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                color: "#FEFCF9",
                marginBottom: "3rem",
              }}
            >
              Let&apos;s create
              <br />
              <em style={{ fontStyle: "italic", color: "#C8B8A8" }}>
                together
              </em>
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.8,
                color: "rgba(254,252,249,0.45)",
                maxWidth: "360px",
              }}
            >
              We take on a limited number of projects each year to ensure every
              client receives our full attention. Reach out to begin a
              conversation about your space.
            </p>
          </div>

          {/* Right — info */}
          <div style={{ paddingTop: "1.5rem" }}>
            <div style={{ marginBottom: "3rem" }}>
              {contactInfo.map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "7rem 1fr",
                    borderBottom: "1px solid rgba(254,252,249,0.07)",
                    padding: "1.75rem 0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C8B8A8",
                      paddingTop: "0.15rem",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(254,252,249,0.65)",
                      lineHeight: 1.65,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="mailto:studio@studioyoon.com"
              className="cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "#C8B8A8",
                color: "#111110",
                padding: "1.1rem 2.25rem",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Start a Project <span style={{ fontSize: "0.9rem" }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "#111110",
        borderTop: "1px solid rgba(254,252,249,0.07)",
        padding: "2.25rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.88rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(254,252,249,0.35)",
          }}
        >
          Studio Yoon
        </span>
        <span
          style={{
            fontSize: "0.62rem",
            color: "rgba(254,252,249,0.25)",
            letterSpacing: "0.08em",
          }}
        >
          © 2024 Studio Yoon. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
