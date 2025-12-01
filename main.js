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
    tags: ["MySQL", "SQL", "Data", "Projet Majeur"],
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
    tags: ["C", "Arduino", "Linux", "Projet Majeur"],
    image: "./WWW.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-WWW---World-Weather-Watcher"
  },
  {
    title: "Traitement du signal",
    desc: "Ce projet simule le fonctionnement complet d’une chaîne de communication numérique",
    tags: ["Python", "Sécurité"],
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
    tags: ["C++", "POO", "Gros Projet"],
    image: "./JDV.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-Jeu-de-la-vie---Programmation-Orient-Objet-POO-"
  },
  {
    title: "Chiffrement (POO)",
    desc: "Chiffrement et déchiffrement d'un .txt en César, XOR et les deux combinés.",
    tags: ["C++", "POO", "Projet Majeur"],
    image: "./CHI.png",
    githubUrl: "https://github.com/BenCsn-sudo/Projet-Chiffrement---POO"
  },
  {
    title: "Application Géométique (POO)",
    desc: "Projet C++/SFML pour créer et afficher des formes géométriques.",
    tags: ["C++", "POO"],
    image: "./GEO.png",
    githubUrl: "https://github.com/BenCsn-sudo/Application-Geometrique---POO"
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
  card.dataset.tags = p.tags.join(",");
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

const cardElements = Array.from(document.querySelectorAll(".card"));
const projectsToggle = document.getElementById("projectsToggle");
const BASE_VISIBLE_CARDS = 8;
const INCREMENT_VISIBLE_CARDS = 8;
let extraVisibleCards = 0;

function getActiveCards() {
  return cardElements.filter((card) => !card.classList.contains("filtered-out"));
}

function updateCardVisibility() {
  const activeCards = getActiveCards();
  const limit = Math.min(BASE_VISIBLE_CARDS + extraVisibleCards, activeCards.length);
  let visibleCount = 0;

  cardElements.forEach((card) => {
    if (card.classList.contains("filtered-out")) {
      card.classList.remove("hidden-card");
      return;
    }

    if (visibleCount < limit) {
      card.classList.remove("hidden-card");
    } else {
      card.classList.add("hidden-card");
    }
    visibleCount += 1;
  });

  if (!projectsToggle) return;

  if (activeCards.length <= BASE_VISIBLE_CARDS) {
    projectsToggle.style.display = "none";
  } else {
    projectsToggle.style.display = "inline-flex";
    const allVisible = limit >= activeCards.length;
    projectsToggle.setAttribute("aria-expanded", allVisible ? "true" : "false");
    projectsToggle.querySelector(".label").textContent = allVisible ? "Voir moins de projets" : "Voir plus de projets";
  }
}

if (projectsToggle) {
  projectsToggle.addEventListener("click", () => {
    const activeCards = getActiveCards();
    const allVisible = BASE_VISIBLE_CARDS + extraVisibleCards >= activeCards.length;

    if (allVisible) {
      extraVisibleCards = 0;
    } else {
      extraVisibleCards = Math.min(
        activeCards.length - BASE_VISIBLE_CARDS,
        extraVisibleCards + INCREMENT_VISIBLE_CARDS
      );
    }

    updateCardVisibility();
  });
}

requestAnimationFrame(updateCardVisibility);

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

cardElements.forEach((c) => cardsObserver.observe(c));

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

  cardElements.forEach((card) => card.classList.remove("filtered-out"));
  extraVisibleCards = 0;
  updateCardVisibility();
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

    cardElements.forEach((card) => {
      const hasTag = (card.dataset.tags || "")
        .split(",")
        .some((storedTag) => storedTag.trim() === tag);
      card.classList.toggle("filtered-out", !hasTag);
    });
    extraVisibleCards = 0;
    updateCardVisibility();
  };

  filters.appendChild(btn);
});

// ============================
// Thème sombre (fixe)
// ============================

// Forcer le mode sombre
document.documentElement.style.setProperty("--bg", "#0e0f12");
document.documentElement.style.setProperty("--text", "#eef2f7");

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

// ============================
// Chargement de l'art ASCII
// ============================

const asciiArtElement = document.getElementById("ascii-art");
if (asciiArtElement) {
  // Utiliser l'art ASCII défini dans le script inline, ou essayer de le charger via fetch
  let asciiText = '';
  
  // Vérifier si l'art ASCII est déjà défini globalement (via script inline)
  if (typeof window.ASCII_ART !== 'undefined') {
    asciiText = window.ASCII_ART;
    displayAsciiArt(asciiText);
  } else {
    // Fallback: essayer de charger via fetch (fonctionne avec un serveur web)
    fetch("./ascii-art.txt")
      .then(response => response.text())
      .then(text => {
        displayAsciiArt(text);
      })
      .catch(error => {
        console.error("Erreur lors du chargement de l'art ASCII:", error);
        // Afficher un message d'erreur
        asciiArtElement.textContent = "Erreur: Impossible de charger l'art ASCII. Veuillez utiliser un serveur web local.";
        asciiArtElement.style.color = 'red';
      });
  }
  
  function displayAsciiArt(text) {
    asciiArtElement.textContent = text;
    // Ajuster la taille de la police pour que l'art ASCII ait une taille similaire à l'image originale
    const adjustFontSize = () => {
      const container = asciiArtElement.parentElement;
      const containerWidth = container.offsetWidth || 620;
      // Trouver la ligne la plus longue dans l'art ASCII
      const lines = text.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length));
      // On veut que l'art ASCII prenne environ la même largeur que l'image (max 620px)
      const targetWidth = Math.min(containerWidth - 32, 588); // 32px pour le padding
      // Calculer la taille de police pour que la ligne la plus longue rentre dans la largeur cible
      const fontSize = (targetWidth / maxLineLength) * 0.9; // 0.9 pour un peu de marge
      asciiArtElement.style.fontSize = `${Math.max(2.5, Math.min(5.5, fontSize))}px`;
      // Synchroniser la taille de police du pseudo-élément si nécessaire
      const beforeElement = asciiArtElement;
      if (beforeElement) {
        beforeElement.style.fontSize = `${Math.max(2.5, Math.min(5.5, fontSize))}px`;
      }
    };
    
    // Ajuster au chargement et au redimensionnement
    setTimeout(adjustFontSize, 100);
    window.addEventListener('resize', adjustFontSize);
  }
}
