// ============================
// Données des projets
// ============================

const projects = [
  {
    title: "Site e-commerce",
    desc: "Développement complet d’une boutique moderne.",
    tags: ["Web", "React", "Design"]
  },
  {
    title: "Application météo",
    desc: "App dynamique utilisant une API publique.",
    tags: ["JavaScript", "API", "UI"]
  },
  {
    title: "Portfolio personnel",
    desc: "Création d’un portfolio responsive.",
    tags: ["HTML", "CSS", "JS"]
  },
  {
    title: "Dashboard analytique",
    desc: "Interface avec graphiques en temps réel.",
    tags: ["React", "Data", "UI"]
  },
  {
    title: "Landing page startup",
    desc: "Page marketing performante et optimisée.",
    tags: ["Design", "HTML", "CSS"]
  },
  {
    title: "Jeu Web",
    desc: "Mini jeu codé en Canvas et JavaScript pur.",
    tags: ["JavaScript", "Canvas", "Fun"]
  }
];

// ============================
// Injection des projets dans la grille
// ============================

const grid = document.getElementById("projectsGrid");

projects.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="thumb">${p.title.charAt(0)}</div>
    <div class="content">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <span class="tag">${p.tags.join("</span><span class='tag'>")}</span>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// ============================
// Animation d’apparition progressive des cartes
// ============================

const cardsObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".card").forEach((c) => cardsObserver.observe(c));

// ============================
// Système de filtres dynamiques
// ============================

const allTags = [...new Set(projects.flatMap((p) => p.tags))];
const filters = document.getElementById("filters");

// Ajouter le bouton "All" en premier
const allBtn = document.createElement("button");
allBtn.className = "filter active";
allBtn.textContent = "All";

allBtn.onclick = () => {
  document.querySelectorAll(".filter").forEach((f) => f.classList.remove("active"));
  allBtn.classList.add("active");

  document.querySelectorAll(".card").forEach((card) => {
    card.style.display = "block";
  });
};

filters.appendChild(allBtn);

// Ajouter les autres boutons de filtres
allTags.forEach((tag) => {
  const btn = document.createElement("button");
  btn.className = "filter";
  btn.textContent = tag;

  btn.onclick = () => {
    document.querySelectorAll(".filter").forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".card").forEach((card) => {
      const hasTag = card.innerHTML.includes(tag);
      card.style.display = hasTag ? "block" : "none";
    });
  };

  filters.appendChild(btn);
});

// ============================
// Gestion du thème clair/sombre
// ============================

const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
let darkMode = prefersDark;

function setTheme(dark) {
  document.documentElement.style.setProperty("--bg", dark ? "#0e0f12" : "#f7fafc");
  document.documentElement.style.setProperty("--text", dark ? "#eef2f7" : "#0b1220");
}

document.getElementById("themeToggle")?.addEventListener("click", () => {
  darkMode = !darkMode;
  setTheme(darkMode);
});

setTheme(darkMode);

// ============================
// Effets de halo en haut et bas de page
// ============================

function updateHaloEffects() {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollBottom = documentHeight - windowHeight - scrollTop;
  
  // Effet en haut (visible quand on est tout en haut)
  const topHalo = document.querySelector('body::before');
  const topOpacity = scrollTop < 50 ? Math.max(0, 1 - scrollTop / 50) : 0;
  document.documentElement.style.setProperty('--top-halo-opacity', topOpacity);
  
  // Effet en bas (visible quand on est tout en bas)
  const bottomOpacity = scrollBottom < 50 ? Math.max(0, 1 - scrollBottom / 50) : 0;
  document.documentElement.style.setProperty('--bottom-halo-opacity', bottomOpacity);
}

// Écouter le scroll
window.addEventListener('scroll', updateHaloEffects);
updateHaloEffects(); // Appel initial

// ============================
// Footer (année automatique)
// ============================

const copyright = document.getElementById("copyright");
if (copyright) {
  copyright.textContent = `© ${new Date().getFullYear()} — Mon Portfolio`;
}
