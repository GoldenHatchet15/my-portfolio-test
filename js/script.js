const header =
  document.querySelector(".site-header");

const menuToggle =
  document.querySelector(".menu-toggle");

const nav =
  document.querySelector(".main-nav");

const navLinks =
  document.querySelectorAll(".main-nav a");

const sections =
  document.querySelectorAll("main section[id]");

const revealElements =
  document.querySelectorAll(".reveal");

const yearElement =
  document.querySelector("#year");

const themeToggle =
  document.querySelector(".theme-toggle");


/* =========================
   Current Year
========================= */

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


/* =========================
   Dark Mode
========================= */

const savedTheme =
  localStorage.getItem("theme");

const systemPrefersDark =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;


/*
  Priority:

  1. Saved user preference
  2. Operating system preference
  3. Light mode
*/

if (savedTheme) {

  document.documentElement.dataset.theme =
    savedTheme;

} else if (systemPrefersDark) {

  document.documentElement.dataset.theme =
    "dark";

} else {

  document.documentElement.dataset.theme =
    "light";
}


/*
  Change the icon depending
  on the current theme.
*/

const updateThemeButton = () => {

  if (!themeToggle) {
    return;
  }

  const currentTheme =
    document.documentElement.dataset.theme;

  if (currentTheme === "dark") {

    themeToggle.textContent = "☀";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

    themeToggle.setAttribute(
      "title",
      "Switch to light mode"
    );

  } else {

    themeToggle.textContent = "☾";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      "Switch to dark mode"
    );
  }
};


updateThemeButton();


/*
  Toggle between dark
  and light mode.
*/

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      const currentTheme =
        document.documentElement.dataset.theme;

      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";


      document.documentElement.dataset.theme =
        newTheme;


      /*
        Save preference so it remains
        after refreshing the page.
      */

      localStorage.setItem(
        "theme",
        newTheme
      );


      updateThemeButton();
    }
  );
}


/* =========================
   Header Scroll Effect
========================= */

const updateHeader = () => {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );
};


window.addEventListener(
  "scroll",
  updateHeader
);

updateHeader();


/* =========================
   Mobile Navigation
========================= */

if (menuToggle && nav) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle("open");


      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );


      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    }
  );
}


/*
  Close mobile navigation
  after selecting a link.
*/

navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      if (!nav || !menuToggle) {
        return;
      }

      nav.classList.remove("open");


      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );


      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }
  );

});


/* =========================
   Scroll Reveal Animation
========================= */

const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        entry.target.classList.add(
          "visible"
        );


        observer.unobserve(
          entry.target
        );

      });

    },

    {
      threshold: 0.14
    }

  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================
   Active Navigation Section
========================= */

const sectionObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        const sectionId =
          `#${entry.target.id}`;


        navLinks.forEach((link) => {

          link.classList.toggle(

            "active",

            link.getAttribute("href")
              === sectionId

          );

        });

      });

    },

    {
      rootMargin:
        "-35% 0px -55% 0px"
    }

  );


sections.forEach((section) => {

  sectionObserver.observe(
    section
  );

});
