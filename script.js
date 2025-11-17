// === PROJECT DATA ===
// To add a new project, just push a new object into this array.
const projects = [
  {
    id: "gunstride",
    title: "Project GunStride",
    engine: "Unreal",
    year: "2025",
    role: "Solo Developer",
    description:
      "First-person shooter prototype focusing on parkour-style movement, sliding, and environmental puzzles built in Unreal Engine.",
    tags: ["FPS", "Parkour", "Unreal Engine 5", "Prototype"],
    links: {
      github: "",
      itch: "",
      video: ""
    }
  },
  {
    id: "maze-runner",
    title: "Maze Runner",
    engine: "Unity",
    year: "2025",
    role: "Solo Developer",
    description:
      "2D horror maze game with AI-driven guardian using A* pathfinding, last-known-position tracking, and wardrobe ambush mechanics.",
    tags: ["Unity", "AI", "2D", "Horror"],
    links: {
      github: "",
      itch: "",
      video: ""
    }
  },
  {
    id: "fractured-bond",
    title: "The Fractured Bond",
    engine: "Other",
    year: "2024",
    role: "Writer & Designer",
    description:
      "Branching narrative experience exploring betrayal and reconciliation, built in Twine with custom CSS and multiple endings.",
    tags: ["Narrative", "Twine", "Branching Story"],
    links: {
      itch: "https://alithepro243.itch.io/the-fractured-bond"
    }
  }
];

// === DOM HELPERS ===
const select = (selector, all = false) =>
  all ? document.querySelectorAll(selector) : document.querySelector(selector);

function renderProjects(filterEngine = "all") {
  const container = select("#projects-grid");
  if (!container) return;

  container.innerHTML = "";

  const normalizedFilter = filterEngine.toLowerCase();

  const filteredProjects = projects.filter((project) => {
    if (normalizedFilter === "all") return true;
    if (normalizedFilter === "unity") {
      return project.engine.toLowerCase().includes("unity");
    }
    if (normalizedFilter === "unreal") {
      return project.engine.toLowerCase().includes("unreal");
    }
    return false;
  });

  filteredProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    // Header
    const header = document.createElement("div");
    header.className = "project-header";

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = project.title;

    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.textContent = `${project.engine}${project.year ? " · " + project.year : ""}`;

    header.appendChild(title);
    header.appendChild(meta);

    // Description
    const desc = document.createElement("p");
    desc.className = "project-description";
    desc.textContent = project.description;

    // Tags
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "project-tags";
    (project.tags || []).forEach((tagText) => {
      const tag = document.createElement("span");
      tag.className = "project-tag";
      tag.textContent = tagText;
      tagsContainer.appendChild(tag);
    });

    // Links
    const linksContainer = document.createElement("div");
    linksContainer.className = "project-links";

    if (project.links) {
      if (project.links.github) {
        const a = document.createElement("a");
        a.className = "project-link";
        a.href = project.links.github;
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = "GitHub";
        linksContainer.appendChild(a);
      }
      if (project.links.itch) {
        const a = document.createElement("a");
        a.className = "project-link";
        a.href = project.links.itch;
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = "itch.io";
        linksContainer.appendChild(a);
      }
      if (project.links.video) {
        const a = document.createElement("a");
        a.className = "project-link";
        a.href = project.links.video;
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = "Video";
        linksContainer.appendChild(a);
      }
    }

    // Assemble card
    card.appendChild(header);
    card.appendChild(desc);
    if (project.tags?.length) card.appendChild(tagsContainer);
    if (linksContainer.childElementCount > 0) card.appendChild(linksContainer);

    container.appendChild(card);
  });
}

function setupFilters() {
  const buttons = select(".filter-btn", true);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");
      const filterValue = btn.getAttribute("data-filter");
      renderProjects(filterValue);
    });
  });
}

function setupNavigation() {
  const navButtons = [
    ...select(".nav-link", true),
    ...select("[data-nav-target]", true)
  ];

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-nav-target");
      if (!targetId) return;

      // Switch sections
      const sections = select("main .section", true);
      sections.forEach((sec) =>
        sec.id === targetId
          ? sec.classList.add("section--active")
          : sec.classList.remove("section--active")
      );

      // Scroll to top of new section
      const targetEl = select(`#${targetId}`);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });
}

function setYear() {
  const yearEl = select("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// === INITIALISE ===
document.addEventListener("DOMContentLoaded", () => {
  renderProjects("all");
  setupFilters();
  setupNavigation();
  setYear();
});
