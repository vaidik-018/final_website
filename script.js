/* ---------------- Theme ---------------- */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
  body.classList.remove("light", "dark");
  body.classList.add(mode);
  localStorage.setItem("theme", mode);
  // swap icon
  if (themeToggle) {
    themeToggle.innerHTML =
      mode === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
  }
}
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
})();
themeToggle?.addEventListener("click", () => {
  setTheme(body.classList.contains("dark") ? "light" : "dark");
});

/* ---------------- Mobile Menu ---------------- */
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelectorAll(".mobile-link, .navlink");
mobileToggle?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("hidden");
});
navLinks.forEach(l =>
  l.addEventListener("click", () => mobileMenu?.classList.add("hidden"))
);

/* ---------------- Smooth scroll handled by CSS ---------------- */
/* We also ensure offset works via section{scroll-margin-top} in CSS */

/* ---------------- Back to top ---------------- */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------------- Typing Effect ---------------- */
const typedEl = document.getElementById("typed");
const phrases = ["B.Tech CSE (AI & ML) Student", "Programmer", "Problem Solver", "Web Developer"];
let pIndex = 0, cIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[pIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIndex);
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --cIndex);
    if (cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
if (typedEl) typeLoop();

/* ---------------- Reveal on Scroll ---------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("active");
    // remove below line if you don't want re-hide on scroll out
    else entry.target.classList.remove("active");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => observer.observe(el));

/* Auto add reveal to all sections if not present */
document.querySelectorAll("section").forEach(sec => {
  if (![...sec.classList].some(c => c.startsWith("reveal"))) {
    sec.classList.add("reveal");
    observer.observe(sec);
  }
});

/* ---------------- Animate Skill Bars when in view ---------------- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll(".fill").forEach(fill => {
        const pct = fill.getAttribute("data-progress") || "0";
        fill.style.width = pct + "%";
      });
      skillObserver.unobserve(e.target); // animate once
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById("skills");
if (skillsSection) skillObserver.observe(skillsSection);
