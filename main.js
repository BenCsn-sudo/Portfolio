// ============================
// Données des projets
// ============================

const projects = [
  {
    title: "Analyseur de log Apache en Python",
    desc: "Parsing, analyse data, détection de DDoS, bots et génération de graphiques.",
    tags: ["Python", "Système", "Sécurité", "Data"],
    image: "./Log.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet---Analyse-de-Log-Apache"
  },
  {
    title: "Modelisation et conception de base de données relationnelle",
    desc: "MySQL, MCD, MLD, MPD et requêtes SQL avancées.",
    tags: ["MySQL", "SQL", "Data", "Projet CESI"],
    image: "./SQL.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-ClearData---Modelisation-et-Conception-de-Base-de-Donnees-Relationnelle"
  },
  {
    title: "Portfolio personnel",
    desc: "Création d'un portfolio responsive.",
    tags: ["HTML", "CSS", "JS"],
    image: "./portfolio.png",
    githubUrl: "https://github.com/BenCsn-sudo/Portfolio"
  },
  {
    title: "Worldwide Weather Watcher",
    desc: "Conception d’une station météo embarquée autonome sur Arduino Uno.",
    tags: ["C++", "Arduino", "Linux", "Projet CESI"],
    image: "./WWW.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-WWW---World-Weather-Watcher"
  },
  {
    title: "Traitement du signal",
    desc: "Ce projet simule le fonctionnement complet d’une chaîne de communication numérique",
    tags: ["Python", "Sécurité", "Projet CESI"],
    image: "./TS.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-Escape-No-Game---Traitement-du-signal"
  },
  {
    title: "API Rest",
    desc: "Création d'une API Rest fonctionnelle et sécurisée de gestion d'utilisateurs.",
    tags: ["JS", "Node.js", "Express", "MongoDB"],
    image: "./API.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-node.js---API-rest"
  },
  {
    title: "Jeu de la vie (POO)",
    desc: "Simulation du Jeu de la Vie de Conway en programmation orientée objet (C++).",
    tags: ["C++", "POO", "Linux", "Projet CESI"],
    image: "./JDV.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-Jeu-de-la-vie---Programmation-Orient-Objet-POO-"
  },
  {
    title: "Chiffrement (POO)",
    desc: "Chiffrement et déchiffrement d'un .txt en César, XOR et les deux combinés.",
    tags: ["C++", "POO", "Linux"],
    image: "./CHI.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-Chiffrement---POO"
  }
];

// ============================
// Injection des projets dans la grille
// ============================

const grid = document.getElementById("projectsGrid");

projects.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.cursor = "pointer";
  card.innerHTML = `
    <div class="thumb">
      <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: contain; border-radius: inherit;">
    </div>
    <div class="content">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <span class="tag">${p.tags.join("</span><span class='tag'>")}</span>
      </div>
    </div>
  `;
  
  // Ajouter l'événement de clic
  card.addEventListener("click", () => {
    window.open(p.githubUrl, "_blank", "noopener,noreferrer");
  });
  
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
  copyright.textContent = `© ${new Date().getFullYear()} — Portfolio Benjamin Cousin`;
}
