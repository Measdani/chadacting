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
    summary: "Booking details come to the front, with visual proof and personality still layered behind it.",
    primaryText: "Casting details",
    primaryHref: "#casting",
    secondaryText: "Next: Personality",
    secondaryHref: "#personality",
    copy: "Headshot, resume, contact, representation, and quick-reference stats in one focused view.",
    details: ["Resume and credits", "Representation", "Stats and contact"],
  },
  personality: {
    number: "04",
    eyebrow: "Chad Woods / Personality Card",
    title: "Personality",
    summary: "Tone, range, and point of view take the lead so the site feels like more than a resume.",
    primaryText: "Explore range",
    primaryHref: "#personality",
    secondaryText: "Back to Reel",
    secondaryHref: "#reel",
    copy: "Voice, range, point of view, and the texture that makes the room remember him.",
    details: ["Warm and grounded", "Dry comedic timing", "Quick, direct energy"],
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
    listItem.textContent = item;
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
