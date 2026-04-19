const services = [
  {
    num: "01",
    name: "Residential Design",
    desc: "From initial concept through final installation, we design private homes that authentically reflect how you live.",
  },
  {
    num: "02",
    name: "Commercial Interiors",
    desc: "Hospitality, retail, and workplace environments crafted to create lasting impressions and meaningful experiences.",
  },
  {
    num: "03",
    name: "Space Planning",
    desc: "Strategic spatial analysis and planning that maximises the function, flow, and proportions of any environment.",
  },
  {
    num: "04",
    name: "Art & Object Curation",
    desc: "Bespoke curation of furniture, art, and objects that weave together to tell a singular, cohesive story.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      style={{ padding: "8rem 0", background: "#F7F4EF" }}
    >
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}
      >
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "6rem",
            alignItems: "start",
          }}
        >
          {/* Left — heading */}
          <div style={{ position: "sticky", top: "8rem" }}>
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
              What We Do
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 3.5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "#111110",
                marginBottom: "2rem",
              }}
            >
              Our
              <br />
              Services
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.75,
                color: "#787066",
                maxWidth: "280px",
              }}
            >
              Every project is unique. We offer a full spectrum of design
              services, tailored to the scale and ambition of your vision.
            </p>
          </div>

          {/* Right — list */}
          <div>
            {services.map((s, i) => (
              <div
                key={s.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3.5rem 1fr",
                  gap: "1.5rem",
                  padding: "2.75rem 0",
                  borderBottom:
                    i < services.length - 1 ? "1px solid #E4E0DA" : "none",
                  borderTop: i === 0 ? "1px solid #E4E0DA" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "#C8B8A8",
                    letterSpacing: "0.12em",
                    paddingTop: "0.3rem",
                    fontWeight: 500,
                  }}
                >
                  {s.num}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.65rem",
                      fontWeight: 400,
                      color: "#111110",
                      letterSpacing: "-0.01em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      color: "#787066",
                      maxWidth: "440px",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
