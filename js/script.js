const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const yearElement = document.querySelector("#year");

// Current year
yearElement.textContent = new Date().getFullYear();

// Header border on scroll
const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader);
updateHeader();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Active navigation section
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
