const projects = [
  {
    id: "01",
    name: "The Hannam Residence",
    location: "Seoul, KR",
    year: "2024",
    type: "Residential",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "02",
    name: "Namu Café",
    location: "Busan, KR",
    year: "2024",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "Itaewon Penthouse",
    location: "Seoul, KR",
    year: "2023",
    type: "Residential",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "04",
    name: "Studio Blanc",
    location: "Jeju, KR",
    year: "2023",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80&auto=format&fit=crop",
  },
];

type Project = (typeof projects)[number];

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div
      className="project-card"
      style={{
        position: "relative",
        height: large ? "30rem" : "22rem",
      }}
    >
      <img
        src={project.image}
        alt={project.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(17,17,16,0.75) 0%, rgba(17,17,16,0.1) 55%, transparent 100%)",
        }}
      />
      {/* Index */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.75rem",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(254,252,249,0.45)",
          fontWeight: 500,
        }}
      >
        {project.id}
      </div>
      {/* Info */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "1.75rem",
          right: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8B8A8",
              marginBottom: "0.45rem",
              fontWeight: 500,
            }}
          >
            {project.type} · {project.year}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: large ? "1.8rem" : "1.4rem",
              fontWeight: 400,
              color: "#FEFCF9",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            {project.name}
          </h3>
        </div>
        <span
          style={{
            fontSize: "0.62rem",
            color: "rgba(254,252,249,0.55)",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
            paddingLeft: "1rem",
          }}
        >
          {project.location}
        </span>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" style={{ padding: "8rem 0", background: "#F7F4EF" }}>
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "1px solid #E4E0DA",
            paddingBottom: "2rem",
            marginBottom: "3rem",
          }}
        >
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
              Portfolio
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 4vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "#111110",
              }}
            >
              Selected Work
            </h2>
          </div>
          <a
            href="#"
            className="nav-link"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#787066",
              fontWeight: 500,
              borderBottom: "1px solid #C8B8A8",
              paddingBottom: "0.2rem",
            }}
          >
            All Projects
          </a>
        </div>

        {/* Row 1 — large left, small right */}
        <div
          className="work-grid-1"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          <ProjectCard project={projects[0]} large />
          <ProjectCard project={projects[1]} />
        </div>

        {/* Row 2 — small left, large right */}
        <div
          className="work-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "1.25rem",
          }}
        >
          <ProjectCard project={projects[2]} />
          <ProjectCard project={projects[3]} large />
        </div>
      </div>
    </section>
  );
}
