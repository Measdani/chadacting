const pageOrder = ["reel", "gallery", "casting", "personality"];

const pages = {
  reel: {
    number: "01",
    eyebrow: "Chad Woods / Reel Card",
    title: "Reel",
    summary: "Featured scenes sit on top, with gallery, casting, and personality tucked underneath.",
    primaryText: "Watch reel",
    primaryHref: "#reel",
    secondaryText: "Next: Gallery",
    secondaryHref: "#gallery",
    copy: "Fast access to the lead performance cut, recent scenes, and downloadable clips.",
    details: ["Featured scene cut", "Comedy and dramatic range", "Downloadable video links"],
  },
  gallery: {
    number: "02",
    eyebrow: "Chad Woods / Gallery Cards",
    title: "Gallery",
    summary: "Portraits and production stills move forward while the reel stays close in the stack.",
    primaryText: "View gallery",
    primaryHref: "#gallery",
    secondaryText: "Next: Casting",
    secondaryHref: "#casting",
    copy: "Editorial portraits, production stills, and social-ready image sets for quick browsing.",
    details: ["Headshots", "Editorial portraits", "Production stills"],
  },
  casting: {
    number: "03",
    eyebrow: "Chad Woods / Casting Card",
    title: "Casting",
    summary: "Theater credit, training, and special skills come to the front of the stack.",
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
    ],
  },
  personality: {
    number: "04",
    eyebrow: "Chad Woods / Personality Card",
    title: "Personality",
    summary: "Personal stats sit up front with range and personality close behind.",
    primaryText: "View stats",
    primaryHref: "#personality",
    secondaryText: "Back to Reel",
    secondaryHref: "#reel",
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
const primaryAction = document.querySelector("#primary-action");
const secondaryAction = document.querySelector("#secondary-action");
const detailNumber = document.querySelector("#detail-number");
const detailTitle = document.querySelector("#detail-title");
const detailCopy = document.querySelector("#detail-copy");
const detailList = document.querySelector("#detail-list");

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "");
  return pageOrder.includes(route) ? route : "reel";
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

renderPage(getRouteFromHash());
