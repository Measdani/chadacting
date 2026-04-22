const pageOrder = ["gallery", "reel", "casting", "personality"];

const pages = {
  gallery: {
    number: "01",
    eyebrow: "Chad Woods / Gallery Cards",
    title: "Gallery",
    summary: "A glimpse into my personality, expressions, and character range.",
    primaryText: "View gallery",
    primaryHref: "#gallery",
    secondaryText: "Next: Reel",
    secondaryHref: "#reel",
    copy: "Editorial portraits, production stills, and social-ready image sets for quick browsing.",
    details: ["Headshots", "Editorial portraits", "Production stills"],
  },
  reel: {
    number: "02",
    eyebrow: "Chad Woods / Reel Card",
    title: "Reel",
    summary: "Watch my performance and see my range on screen.",
    cue: "Watch me in action",
    primaryText: "Watch reel",
    primaryHref: "#reel",
    secondaryText: "Next: Casting",
    secondaryHref: "#casting",
    copy: "Fast access to the lead performance cut, recent scenes, and downloadable clips.",
    details: ["Featured scene cut", "Comedy and dramatic range", "Downloadable video links"],
  },
  casting: {
    number: "03",
    eyebrow: "Chad Woods / Casting Card",
    title: "Casting",
    summary: "Quick details casting directors need\u2014ready when you are.",
    primaryText: "Casting details",
    primaryHref: "#casting",
    secondaryText: "Next: Personality",
    secondaryHref: "#personality",
    copy: "A focused resume view for casting directors, agents, and production teams.",
    details: [
      {
        heading: "Theater",
        lines: ["Cruella / William Caldwell / KIPP WAYS Academy - Atlanta, GA"],
      },
      {
        heading: "Training",
        lines: [
          "Acting Techniques / Whitney Reynolds / Barbizon USA - Online and In-Person",
          "Acting Techniques / Robert Vito / NYLA Talent - Online",
          "Acting Techniques / Conner Weil / NYLA Talent - Online",
        ],
      },
      {
        heading: "Special Skills",
        lines: [
          "Critical Thinking",
          "Music: Hip Hop, RnB, Gospel",
          "GPA: 3.8",
          "State Academic Awards: A-B Honor Roll (Kinder-6th grade), Math Award (3rd and 4th grade), Reading Award (3rd and 4th grade), Athletic Award, Scholar of the Month (5th grade)",
        ],
      },
      {
        heading: "Contact Info",
        lines: ["Email: byrddeshauna94@gmail.com", "Phone: 470-257-8335"],
      },
    ],
  },
  personality: {
    number: "04",
    eyebrow: "Chad Woods / Personality Card",
    title: "Personality",
    summary: "I love bringing characters to life and making people feel something.",
    primaryText: "View stats",
    primaryHref: "#personality",
    secondaryText: "Back to Gallery",
    secondaryHref: "#gallery",
    copy: "Quick-reference personal stats for casting, booking, and production notes.",
    details: [
      {
        heading: "Personal Stats",
        lines: ["Height: 5'2", "Weight: 118 lbs.", "Hair Color: Black", "Eye Color: Brown", "DOB: 08/13/2014"],
      },
      {
        heading: "Personality",
        lines: ["Warm and grounded", "Dry comedic timing", "Quick, direct energy"],
      },
    ],
  },
};

const cards = [...document.querySelectorAll(".portfolio-card")];
const routeLinks = [...document.querySelectorAll("[data-route]")];
const pageEyebrow = document.querySelector("#page-eyebrow");
const pageTitle = document.querySelector("#page-title");
const pageSummary = document.querySelector("#page-summary");
const pageCue = document.querySelector("#page-cue");
const primaryAction = document.querySelector("#primary-action");
const secondaryAction = document.querySelector("#secondary-action");
const detailNumber = document.querySelector("#detail-number");
const detailTitle = document.querySelector("#detail-title");
const detailCopy = document.querySelector("#detail-copy");
const detailList = document.querySelector("#detail-list");
const revealSections = [...document.querySelectorAll("[data-reveal]")];
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "");
  return pageOrder.includes(route) ? route : "gallery";
}

function updateDetailList(items) {
  detailList.replaceChildren();

  items.forEach((item) => {
    const listItem = document.createElement("li");

    if (typeof item === "string") {
      listItem.textContent = item;
    } else {
      const heading = document.createElement("h3");
      heading.textContent = item.heading;
      listItem.append(heading);

      item.lines.forEach((line) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        listItem.append(paragraph);
      });
    }

    detailList.append(listItem);
  });
}

function updateCardStack(activePage) {
  const activeIndex = pageOrder.indexOf(activePage);
  const stackedPages = pageOrder.slice(activeIndex + 1).concat(pageOrder.slice(0, activeIndex));

  cards.forEach((card) => {
    const page = card.dataset.card;
    const isActive = page === activePage;
    const stackPosition = stackedPages.indexOf(page) + 1;

    card.classList.remove("is-active", "stack-slot-1", "stack-slot-2", "stack-slot-3");
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));

    if (!isActive && stackPosition > 0) {
      card.classList.add(`stack-slot-${stackPosition}`);
    }
  });
}

function updateNavigation(activePage) {
  routeLinks.forEach((link) => {
    const isActive = link.dataset.route === activePage;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderPage(pageName) {
  const page = pages[pageName];

  document.body.dataset.page = pageName;
  document.title = `${page.title} | Chad Woods`;

  pageEyebrow.textContent = page.eyebrow;
  pageTitle.textContent = page.title;
  pageSummary.textContent = page.summary;
  pageCue.textContent = page.cue || "";
  pageCue.hidden = !page.cue;
  primaryAction.textContent = page.primaryText;
  primaryAction.href = page.primaryHref;
  secondaryAction.textContent = page.secondaryText;
  secondaryAction.href = page.secondaryHref;
  detailNumber.textContent = page.number;
  detailTitle.textContent = page.title;
  detailCopy.textContent = page.copy;

  updateDetailList(page.details);
  updateCardStack(pageName);
  updateNavigation(pageName);
}

function goToPage(pageName) {
  if (!pageOrder.includes(pageName)) {
    return;
  }

  if (window.location.hash !== `#${pageName}`) {
    window.location.hash = pageName;
    return;
  }

  renderPage(pageName);
}

cards.forEach((card) => {
  card.addEventListener("click", () => goToPage(card.dataset.card));
});

window.addEventListener("hashchange", () => renderPage(getRouteFromHash()));

function updateStoryScroll() {
  if (reducedMotionQuery.matches) {
    document.documentElement.style.setProperty("--story-scroll", "0");
    return;
  }

  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
  document.documentElement.style.setProperty("--story-scroll", progress.toFixed(3));
}

let scrollFrame = 0;

function requestStoryScrollUpdate() {
  if (scrollFrame) {
    return;
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    updateStoryScroll();
  });
}

function setupRevealSections() {
  if (!("IntersectionObserver" in window)) {
    revealSections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      rootMargin: "0px 0px -14% 0px",
      threshold: 0.18,
    },
  );

  revealSections.forEach((section) => observer.observe(section));
}

renderPage(getRouteFromHash());
setupRevealSections();
updateStoryScroll();

window.addEventListener("scroll", requestStoryScrollUpdate, { passive: true });
window.addEventListener("resize", requestStoryScrollUpdate);

if (typeof reducedMotionQuery.addEventListener === "function") {
  reducedMotionQuery.addEventListener("change", updateStoryScroll);
} else {
  reducedMotionQuery.addListener(updateStoryScroll);
}
