// Floating Patterns
const canvas = document.getElementById("bg-patterns");
let ctx = canvas.getContext("2d");
let W = window.innerWidth,
  H = window.innerHeight;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}
resize();
window.addEventListener("resize", resize);

let shapes = [];
const colors = ["#124E66", "#748D92", "#2E3944", "#D3D9D4", "#212A31"];
function makeShapes(num = 10) {
  shapes = [];
  for (let i = 0; i < num; i++) {
    shapes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 24 + Math.random() * 31,
      dx: 0.22 + Math.random() * 0.33,
      dy: 0.09 + Math.random() * 0.23,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.07 + Math.random() * 0.07,
      t: Math.random() * Math.PI * 2,
    });
  }
}
makeShapes();
function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let s of shapes) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.ellipse(
      s.x,
      s.y,
      s.r + Math.sin(s.t) * 6,
      s.r * 0.67 + Math.cos(s.t / 2) * 4,
      s.t,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = s.color;
    ctx.fill();
    ctx.restore();
    s.x += Math.sin(s.t) * s.dx;
    s.y += Math.cos(s.t / 1.7) * s.dy;
    s.t += 0.007 + s.dx * 0.0022;
    if (s.x < s.r + 8) s.dx *= -1;
    if (s.x > W - s.r - 8) s.dx *= -1;
    if (s.y < s.r + 8) s.dy *= -1;
    if (s.y > H - s.r - 8) s.dy *= -1;
  }
  requestAnimationFrame(draw);
}
setInterval(() => makeShapes(10 + Math.floor(Math.random() * 2)), 8000);
draw();

// Expandable Experience/Education
function toggleBox(id) {
  const box = document.getElementById(id);
  box.classList.toggle("collapsed");
}
document.getElementById("education-box").classList.add("collapsed");
document.getElementById("exp-box").classList.add("collapsed");

/* Smooth scrolling for nav links */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      e.preventDefault();
      window.scrollTo({
        top: targetSection.getBoundingClientRect().top + window.scrollY - 63,
        behavior: "smooth",
      });
      // Add focus ring
      targetSection.classList.add("focus-pulse");
      setTimeout(() => targetSection.classList.remove("focus-pulse"), 800);
    }
  });
});

/* Animated Custom Cursor */
const cursor = document.getElementById("custom-cursor");
const clickPulse = document.getElementById("cursor-click");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  clickPulse.style.left = e.clientX + "px";
  clickPulse.style.top = e.clientY + "px";
});
["a", "button", ".expand-btn", ".project-link-btn"].forEach((sel) => {
  document.querySelectorAll(sel).forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
});
document.body.addEventListener("mousedown", (e) => {
  clickPulse.classList.add("active");
  setTimeout(() => clickPulse.classList.remove("active"), 285);
});

/* Nice focus/hover effect on jump */
const style = document.createElement("style");
style.innerHTML = `.focus-pulse { box-shadow: 0 0 0 3px #124E66BB !important; transition: box-shadow 0.5s; }`;
document.head.appendChild(style);

// Dark/Light Theme Toggle
const THEME_KEY = "site-theme";
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function setTheme(mode) {
  document.body.classList.toggle("light-mode", mode === "light");
  themeIcon.textContent = mode === "light" ? "🌙" : "☀️"; // moon for light, sun for dark
  localStorage.setItem(THEME_KEY, mode);
}
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme:light)").matches
    ? "light"
    : "dark";
}
function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  setTheme(stored ?? getSystemTheme());
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const nowLight = !document.body.classList.contains("light-mode");
    setTheme(nowLight ? "light" : "dark");
  });
  initTheme();
}

// Hamburger/info dropdown
const navToggle = document.getElementById("navToggle");
const navDropdown = document.getElementById("navDropdown");

// Open and close dropdown on tap/click
navToggle.addEventListener("click", function () {
  const isOpen = navDropdown.style.display === "block";
  navDropdown.style.display = isOpen ? "none" : "block";
  // Optionally: smooth fade
  if (!isOpen) {
    navDropdown.classList.add("active-drop");
  }
});

// Hide dropdown when a nav link is chosen on mobile (for smooth UX)
navDropdown.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navDropdown.style.display = "none";
  });
});

// Click outside closes dropdown
document.addEventListener("click", function (e) {
  if (
    navDropdown.style.display === "block" &&
    !navDropdown.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    navDropdown.style.display = "none";
  }
});
