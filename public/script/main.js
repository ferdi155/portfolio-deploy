let darkMode = false;
let mobileMenuOpen = false;

function toggleDarkMode() {
  darkMode = !darkMode;
  document.documentElement.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", darkMode.toString());

  // Ganti icon bulan ⇄ matahari
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");
  if (moonIcon && sunIcon) {
    moonIcon.classList.toggle("hidden", darkMode);
    sunIcon.classList.toggle("hidden", !darkMode);
  }
}

function initDarkMode() {
  const savedMode = localStorage.getItem("darkMode");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  darkMode = savedMode === "true" || (savedMode === null && systemPrefersDark);
  document.documentElement.classList.toggle("dark", darkMode);

  // Set icon awal
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");
  if (moonIcon && sunIcon) {
    moonIcon.classList.toggle("hidden", darkMode);
    sunIcon.classList.toggle("hidden", !darkMode);
  }
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;

  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  if (mobileMenuOpen) {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    overlay.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function closeMobileMenu() {
  if (mobileMenuOpen) {
    toggleMobileMenu();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initDarkMode();

  // Dark mode toggler
  document
    .getElementById("darkModeToggle")
    ?.addEventListener("click", toggleDarkMode);
  document
    .getElementById("mobileDarkModeToggle")
    ?.addEventListener("click", toggleDarkMode);

  // Mobile menu toggler
  document
    .getElementById("mobileMenuToggle")
    ?.addEventListener("click", toggleMobileMenu);
  document
    .getElementById("closeMobileMenu")
    ?.addEventListener("click", closeMobileMenu);
  document
    .getElementById("overlay")
    ?.addEventListener("click", closeMobileMenu);

  // Klik link close menu
  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Esc close menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  // Resize close menu
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && mobileMenuOpen) {
      closeMobileMenu();
    }
  });
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("opacity-0", "transition-opacity", "duration-500");
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500); 
});
