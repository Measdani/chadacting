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
    summary: "Quick details casting directors need, ready when you are.",
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

const LOCAL_KEYS = {
  passcodeHash: "cw-admin-passcode-hash-v1",
  adminSession: "cw-admin-session-v1",
};

const MEDIA_DB_NAME = "cw-portfolio-media";
const MEDIA_STORE_NAME = "media-items";
const DEFAULT_REEL = {
  id: "default-reel",
  type: "reel",
  title: "Featured Reel",
  caption: "The main performance reel is ready to play.",
  createdAt: "2026-04-22T00:00:00.000Z",
  featured: true,
  isDefault: true,
  src: "assets/videos/April 26, 2026 (1).mp4",
  name: "April 26, 2026 (1).mp4",
};

const DEFAULT_IMAGES = [
  {
    id: "default-image-img-0175",
    type: "image",
    title: "Gallery Portrait",
    caption: "A polished portfolio portrait for casting and quick browsing.",
    createdAt: "2026-05-04T16:22:00.000Z",
    published: true,
    src: "assets/Pictures/IMG_0175.jpeg",
    name: "IMG_0175.jpeg",
    size: 2107895,
    isDefault: true,
  },
  {
    id: "default-image-img-0171",
    type: "image",
    title: "Character Portrait",
    caption: "A warm expression-focused image for the live gallery.",
    createdAt: "2026-05-04T16:21:00.000Z",
    published: true,
    src: "assets/Pictures/IMG_0171.jpeg",
    name: "IMG_0171.jpeg",
    size: 1094564,
    isDefault: true,
  },
  {
    id: "default-image-img-0170",
    type: "image",
    title: "Portfolio Still",
    caption: "A clean still for browsing Chad's visual range.",
    createdAt: "2026-05-04T16:20:00.000Z",
    published: true,
    src: "assets/Pictures/IMG_0170.jpeg",
    name: "IMG_0170.jpeg",
    size: 2659681,
    isDefault: true,
  },
  {
    id: "default-image-img-0169",
    type: "image",
    title: "Headshot",
    caption: "A direct, casting-ready image for the portfolio gallery.",
    createdAt: "2026-05-04T16:19:00.000Z",
    published: true,
    src: "assets/Pictures/IMG_0169.jpeg",
    name: "IMG_0169.jpeg",
    size: 2111015,
    isDefault: true,
  },
];

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
const reelVideo = document.querySelector("#reel-video");
const videoModal = document.querySelector("#video-modal");
const videoClose = document.querySelector("#video-close");
const videoClosers = [...document.querySelectorAll("[data-close-video]")];
const photoModal = document.querySelector("#photo-modal");
const photoModalImage = document.querySelector("#photo-modal-image");
const photoClose = document.querySelector("#photo-close");
const photoClosers = [...document.querySelectorAll("[data-close-photo]")];
const revealSections = [...document.querySelectorAll("[data-reveal]")];
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const reelCountBadge = document.querySelector("#reel-count-badge");
const galleryCountBadge = document.querySelector("#gallery-count-badge");
const galleryPreviewSlots = [...document.querySelectorAll("[data-gallery-preview]")];
const mediaStatus = document.querySelector("#media-status");
const pictureCountPill = document.querySelector("#picture-count-pill");
const reelCountPill = document.querySelector("#reel-count-pill");
const galleryFeed = document.querySelector("#gallery-feed");
const reelFeed = document.querySelector("#reel-feed");
const featuredReelPlayer = document.querySelector("#featured-reel-player");
const featuredReelLabel = document.querySelector("#featured-reel-label");
const featuredReelTitle = document.querySelector("#featured-reel-title");
const featuredReelCaption = document.querySelector("#featured-reel-caption");
const featuredReelModalTrigger = document.querySelector("#featured-reel-modal-trigger");
const heroReelTrigger = document.querySelector("[data-featured-reel-trigger]");

const adminTrigger = document.querySelector("#admin-trigger");
const adminShell = document.querySelector("#admin-shell");
const adminAuth = document.querySelector("#admin-auth");
const adminDashboard = document.querySelector("#admin-dashboard");
const adminClosers = [...document.querySelectorAll("[data-close-admin]")];
const adminLock = document.querySelector("#admin-lock");
const imageForm = document.querySelector("#image-form");
const reelForm = document.querySelector("#reel-form");
const imageFormStatus = document.querySelector("#image-form-status");
const reelFormStatus = document.querySelector("#reel-form-status");
const adminImageList = document.querySelector("#admin-image-list");
const adminReelList = document.querySelector("#admin-reel-list");
const adminPictureCount = document.querySelector("#admin-picture-count");
const adminReelCount = document.querySelector("#admin-reel-count");

const state = {
  media: {
    images: [],
    reels: [],
    featuredReel: DEFAULT_REEL,
  },
  objectUrls: new Map(),
  isAdminOpen: false,
  isAdminUnlocked: sessionStorage.getItem(LOCAL_KEYS.adminSession) === "unlocked",
};

let lastVideoTrigger = null;
let lastPhotoTrigger = null;
let scrollFrame = 0;

function getRouteFromHash() {
  const route = window.location.hash.replace("#", "");
  return pageOrder.includes(route) ? route : "gallery";
}

function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function formatCountBadge(count) {
  return String(count).padStart(2, "0");
}

function formatCountLabel(count, singular, plural) {
  return `${count} ${pluralize(count, singular, plural)}`;
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently added";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "";
  }

  if (bytes >= 1_000_000_000) {
    return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
  }

  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1_000))} KB`;
}

function generateId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sortByNewest(left, right) {
  return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
}

function getPublishedImages() {
  return [...DEFAULT_IMAGES, ...state.media.images.filter((item) => item.published === true)];
}

function getPublishedReels() {
  return state.media.reels.filter((item) => item.published === true);
}

function getPublicReelLibrary() {
  const publishedReels = getPublishedReels();
  return publishedReels.length ? publishedReels : [DEFAULT_REEL];
}

function getPageContent(pageName) {
  const page = {
    ...pages[pageName],
    details: [...pages[pageName].details],
  };

  if (pageName === "gallery") {
    const pictureCount = getPublishedImages().length;

    page.copy = pictureCount
      ? `${formatCountLabel(pictureCount, "picture")} published and ready for casting, social, and portfolio browsing.`
      : "No pictures are published yet. Upload them in the admin panel, then publish the ones you want live.";
    page.details = [
      pictureCount ? `${formatCountLabel(pictureCount, "picture")} published in the gallery` : "Upload pictures in admin, then publish them",
      "Headshots, portraits, and production stills",
      "Draft uploads stay private until you publish them",
    ];
  }

  if (pageName === "reel") {
    const publishedReels = getPublishedReels();
    const reelLibrary = getPublicReelLibrary();
    const reelCount = reelLibrary.length;
    const featuredTitle = state.media.featuredReel.title || "Featured Reel";

    page.copy = publishedReels.length
      ? `${formatCountLabel(reelCount, "reel")} published, with ${featuredTitle} set as the featured player.`
      : "The default reel is live. Upload reels in the admin panel, then publish the ones you want on the site.";
    page.details = [
      publishedReels.length ? `${formatCountLabel(reelCount, "reel")} published and ready to play` : "No custom reels are published yet",
      `Featured reel: ${featuredTitle}`,
      "Open the featured reel from the reel card",
    ];
  }

  return page;
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
  const page = getPageContent(pageName);

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

  if (pageName !== "reel") {
    closeVideoModal();
  }

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

function bindVideoTrigger(trigger) {
  if (!trigger || trigger.dataset.videoBound === "true") {
    return;
  }

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    openVideoModal(trigger.dataset.videoSrc, trigger);
  });

  trigger.dataset.videoBound = "true";
}

function openVideoModal(source, trigger) {
  lastVideoTrigger = trigger;

  if (reelVideo.getAttribute("src") !== source) {
    reelVideo.setAttribute("src", source);
    reelVideo.load();
  }

  videoModal.hidden = false;
  videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-video-open");
  reelVideo.currentTime = 0;
  videoClose.focus();

  const playAttempt = reelVideo.play();

  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {});
  }
}

function closeVideoModal() {
  if (videoModal.hidden) {
    return;
  }

  reelVideo.pause();
  videoModal.hidden = true;
  videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-video-open");

  if (lastVideoTrigger) {
    lastVideoTrigger.focus();
  }
}

function openPhotoModal(image, trigger) {
  lastPhotoTrigger = trigger;
  photoModalImage.src = image.src;
  photoModalImage.alt = image.title ? `${image.title} picture` : "Chad Woods portfolio picture";
  photoModal.hidden = false;
  photoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-photo-open");
  photoClose.focus();
}

function closePhotoModal() {
  if (photoModal.hidden) {
    return;
  }

  photoModal.hidden = true;
  photoModal.setAttribute("aria-hidden", "true");
  photoModalImage.removeAttribute("src");
  photoModalImage.alt = "";
  document.body.classList.remove("is-photo-open");

  if (lastPhotoTrigger) {
    lastPhotoTrigger.focus();
  }
}

function updateStoryScroll() {
  if (reducedMotionQuery.matches) {
    document.documentElement.style.setProperty("--story-scroll", "0");
    return;
  }

  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
  document.documentElement.style.setProperty("--story-scroll", progress.toFixed(3));
}

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

function updateMediaSummary() {
  const pictureCount = getPublishedImages().length;
  const reelCount = getPublicReelLibrary().length;

  galleryCountBadge.textContent = formatCountBadge(pictureCount);
  reelCountBadge.textContent = formatCountBadge(reelCount);
  if (pictureCountPill) {
    pictureCountPill.textContent = formatCountLabel(pictureCount, "Picture");
  }

  if (reelCountPill) {
    reelCountPill.textContent = formatCountLabel(reelCount, "Reel");
  }

  if (!mediaStatus) {
    return;
  }

  if (!pictureCount && reelCount === 1 && !getPublishedReels().length) {
    mediaStatus.textContent = "The default reel is live. Publish pictures and reels from the admin panel when you are ready.";
    return;
  }

  mediaStatus.textContent = `${formatCountLabel(reelCount, "reel")} and ${formatCountLabel(pictureCount, "picture")} are currently published.`;
}

function updateGalleryPreview() {
  const publishedImages = getPublishedImages();

  galleryPreviewSlots.forEach((slot, index) => {
    const image = publishedImages[index];
    slot.replaceChildren();

    if (!image) {
      slot.classList.remove("has-upload");
      slot.style.removeProperty("background-image");
      slot.style.removeProperty("background-size");
      slot.style.removeProperty("background-position");
      slot.style.removeProperty("background-repeat");
      slot.removeAttribute("role");
      slot.removeAttribute("tabindex");
      slot.removeAttribute("aria-label");
      return;
    }

    slot.classList.add("has-upload");
    slot.setAttribute("role", "button");
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-label", `Open ${image.title || image.name || "portfolio picture"}`);
    slot.style.backgroundImage = `linear-gradient(180deg, rgba(12, 24, 33, 0.1), rgba(12, 24, 33, 0.32)), url("${image.src}")`;
    slot.style.backgroundSize = "cover";
    slot.style.backgroundPosition = "center";
    slot.style.backgroundRepeat = "no-repeat";
  });
}

function bindGalleryPreviewSlots() {
  galleryPreviewSlots.forEach((slot, index) => {
    slot.addEventListener("click", (event) => {
      const image = getPublishedImages()[index];

      if (!image) {
        return;
      }

      event.stopPropagation();
      openPhotoModal(image, slot);
    });

    slot.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const image = getPublishedImages()[index];

      if (!image) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      openPhotoModal(image, slot);
    });
  });
}

function createEmptyState(title, copy) {
  const empty = document.createElement("div");
  empty.className = "media-empty";

  const heading = document.createElement("h4");
  heading.textContent = title;
  empty.append(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = copy;
  empty.append(paragraph);

  return empty;
}

function renderGalleryFeed() {
  if (!galleryFeed) {
    return;
  }

  const publishedImages = getPublishedImages();
  galleryFeed.replaceChildren();

  if (!publishedImages.length) {
    galleryFeed.append(createEmptyState("No pictures yet", "Open the admin panel to upload headshots, portraits, and stills."));
    return;
  }

  publishedImages.forEach((image) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";

    const imageButton = document.createElement("button");
    imageButton.className = "gallery-image-button";
    imageButton.type = "button";
    imageButton.setAttribute("aria-label", `Open ${image.title || image.name || "portfolio picture"}`);

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.title ? `${image.title} picture` : "Chad Woods portfolio picture";
    imageButton.append(img);
    imageButton.addEventListener("click", () => openPhotoModal(image, imageButton));
    figure.append(imageButton);

    const caption = document.createElement("figcaption");
    const title = document.createElement("h4");
    title.textContent = image.title || image.name || "Portfolio picture";
    caption.append(title);

    if (image.caption) {
      const text = document.createElement("p");
      text.textContent = image.caption;
      caption.append(text);
    }

    const meta = document.createElement("span");
    meta.className = "media-meta";
    meta.textContent = formatDate(image.createdAt);
    caption.append(meta);

    figure.append(caption);
    galleryFeed.append(figure);
  });
}

function renderFeaturedReel() {
  const featured = state.media.featuredReel;

  if (!featuredReelPlayer) {
    heroReelTrigger.dataset.videoSrc = featured.src;
    return;
  }

  featuredReelPlayer.pause();

  if (featuredReelPlayer.getAttribute("src") !== featured.src) {
    featuredReelPlayer.setAttribute("src", featured.src);
    featuredReelPlayer.load();
  }

  if (featuredReelLabel) {
    featuredReelLabel.textContent = featured.isDefault ? "Default featured reel" : "Current featured reel";
  }

  if (featuredReelTitle) {
    featuredReelTitle.textContent = featured.title || "Featured Reel";
  }

  if (featuredReelCaption) {
    featuredReelCaption.textContent = featured.caption || "Ready to play.";
  }

  if (featuredReelModalTrigger) {
    featuredReelModalTrigger.dataset.videoSrc = featured.src;
  }

  heroReelTrigger.dataset.videoSrc = featured.src;
}

function renderReelFeed() {
  if (!reelFeed) {
    return;
  }

  reelFeed.replaceChildren();

  getPublicReelLibrary().forEach((reel) => {
    const card = document.createElement("article");
    card.className = "reel-item";

    if (reel.id === state.media.featuredReel.id) {
      card.classList.add("is-featured");
    }

    const copy = document.createElement("div");
    copy.className = "reel-item-copy";

    const eyebrow = document.createElement("p");
    eyebrow.className = "featured-reel-label";
    eyebrow.textContent = reel.id === state.media.featuredReel.id ? "Featured reel" : "Saved reel";
    copy.append(eyebrow);

    const title = document.createElement("h4");
    title.textContent = reel.title || reel.name || "Untitled reel";
    copy.append(title);

    const paragraph = document.createElement("p");
    paragraph.textContent = reel.caption || "Ready to play in the full player.";
    copy.append(paragraph);

    const meta = document.createElement("span");
    meta.className = "media-meta";
    meta.textContent = [formatDate(reel.createdAt), formatFileSize(reel.size)].filter(Boolean).join(" • ");
    copy.append(meta);

    const actions = document.createElement("div");
    actions.className = "reel-item-actions";

    const openButton = document.createElement("button");
    openButton.className = "secondary-button";
    openButton.type = "button";
    openButton.textContent = "Open reel";
    openButton.dataset.videoSrc = reel.src;
    bindVideoTrigger(openButton);
    actions.append(openButton);

    card.append(copy, actions);
    reelFeed.append(card);
  });
}

function setFormStatus(node, message, isError = false) {
  node.textContent = message || "";
  node.hidden = !message;
  node.classList.toggle("is-error", Boolean(message && isError));
}

function revokeObjectUrls() {
  state.objectUrls.forEach((objectUrl) => {
    URL.revokeObjectURL(objectUrl);
  });

  state.objectUrls.clear();
}

function normalizeMediaRecords(records) {
  const images = [];
  const reels = [];

  revokeObjectUrls();

  records
    .slice()
    .sort(sortByNewest)
    .forEach((record) => {
      const normalized = {
        ...record,
        src: record.blob ? URL.createObjectURL(record.blob) : record.src,
      };

      if (record.blob) {
        state.objectUrls.set(record.id, normalized.src);
      }

      if (record.type === "image") {
        images.push(normalized);
      }

      if (record.type === "reel") {
        reels.push(normalized);
      }
    });

  state.media.images = images;
  state.media.reels = reels;
  state.media.featuredReel = getPublishedReels().find((item) => item.featured) || getPublishedReels()[0] || DEFAULT_REEL;
}

function renderMediaExperience() {
  updateMediaSummary();
  updateGalleryPreview();
  renderGalleryFeed();
  renderFeaturedReel();
  renderReelFeed();
  bindVideoTrigger(featuredReelModalTrigger);
  bindVideoTrigger(heroReelTrigger);
  renderPage(getRouteFromHash());

  if (state.isAdminOpen && state.isAdminUnlocked) {
    renderAdminLibrary();
  }
}

function openMediaDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available in this browser."));
      return;
    }

    const request = window.indexedDB.open(MEDIA_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(MEDIA_STORE_NAME)) {
        const store = db.createObjectStore(MEDIA_STORE_NAME, { keyPath: "id" });
        store.createIndex("type", "type", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("featured", "featured", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to open media storage."));
  });
}

async function getAllMediaRecords() {
  const db = await openMediaDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readonly");
    const request = transaction.objectStore(MEDIA_STORE_NAME).getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error || new Error("Unable to load media records."));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to finish reading media records."));
    };
  });
}

async function putMediaRecord(record) {
  const db = await openMediaDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readwrite");
    transaction.objectStore(MEDIA_STORE_NAME).put(record);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to save media record."));
    };
  });
}

async function putMediaRecords(records) {
  if (!records.length) {
    return;
  }

  const db = await openMediaDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readwrite");
    const store = transaction.objectStore(MEDIA_STORE_NAME);

    records.forEach((record) => store.put(record));

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to save media records."));
    };
  });
}

async function deleteMediaRecord(id) {
  const db = await openMediaDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readwrite");
    transaction.objectStore(MEDIA_STORE_NAME).delete(id);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error || new Error("Unable to delete media record."));
    };
  });
}

async function setMediaPublished(mediaId, shouldPublish) {
  const records = await getAllMediaRecords();
  const target = records.find((record) => record.id === mediaId);

  if (!target) {
    return;
  }

  let nextRecords = records.map((record) => {
    if (record.id !== mediaId) {
      return record;
    }

    if (record.type === "reel") {
      return {
        ...record,
        published: shouldPublish,
        featured: false,
      };
    }

    return {
      ...record,
      published: shouldPublish,
    };
  });

  if (target.type === "reel") {
    const publishedReels = nextRecords.filter((record) => record.type === "reel" && record.published === true);

    if (!publishedReels.length) {
      nextRecords = nextRecords.map((record) => {
        if (record.type !== "reel") {
          return record;
        }

        return {
          ...record,
          featured: false,
        };
      });
    } else {
      const existingFeatured = publishedReels.find((record) => record.featured === true);
      const fallbackFeaturedId = existingFeatured ? existingFeatured.id : shouldPublish ? mediaId : publishedReels.slice().sort(sortByNewest)[0].id;

      nextRecords = nextRecords.map((record) => {
        if (record.type !== "reel") {
          return record;
        }

        return {
          ...record,
          featured: record.id === fallbackFeaturedId,
        };
      });
    }
  }

  await putMediaRecords(nextRecords);
}

async function setFeaturedReel(reelId) {
  const records = await getAllMediaRecords();
  const target = records.find((record) => record.id === reelId);

  if (!target || target.type !== "reel" || target.published !== true) {
    throw new Error("Only published reels can be featured.");
  }

  const nextRecords = records.map((record) => {
    if (record.type !== "reel") {
      return record;
    }

    return {
      ...record,
      featured: record.id === reelId,
    };
  });

  await putMediaRecords(nextRecords);
}

async function deleteMediaEntry(id) {
  const records = await getAllMediaRecords();
  const target = records.find((record) => record.id === id);

  await deleteMediaRecord(id);

  if (!target || target.type !== "reel" || !target.featured || target.published !== true) {
    return;
  }

  const remainingReels = records
    .filter((record) => record.type === "reel" && record.id !== id && record.published === true)
    .sort(sortByNewest);

  if (remainingReels[0]) {
    await setFeaturedReel(remainingReels[0].id);
  }
}

async function loadMediaLibrary() {
  try {
    closeVideoModal();
    if (featuredReelPlayer) {
      featuredReelPlayer.pause();
    }
    const records = await getAllMediaRecords();
    normalizeMediaRecords(records);
    renderMediaExperience();
  } catch (error) {
    console.error(error);
    if (mediaStatus) {
      mediaStatus.textContent = "Saved media could not be loaded in this browser.";
    }
    setFormStatus(imageFormStatus, "This browser blocked local media storage.", true);
    setFormStatus(reelFormStatus, "This browser blocked local media storage.", true);
  }
}

function createAdminEmptyState(title, copy) {
  const empty = document.createElement("div");
  empty.className = "admin-empty";

  const heading = document.createElement("h4");
  heading.textContent = title;
  empty.append(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = copy;
  empty.append(paragraph);

  return empty;
}

function createAdminStatusBadge(label, variant) {
  const badge = document.createElement("span");
  badge.className = "admin-badge";

  if (variant) {
    badge.classList.add(variant);
  }

  badge.textContent = label;
  return badge;
}

function createAdminLibraryItem(item, type) {
  const article = document.createElement("article");
  article.className = "admin-library-item";

  const thumb = document.createElement("div");
  thumb.className = "admin-library-thumb";

  if (type === "image") {
    thumb.style.backgroundImage = `url("${item.src}")`;
  } else {
    thumb.classList.add("is-reel");
    thumb.textContent = "REEL";
  }

  article.append(thumb);

  const copy = document.createElement("div");
  copy.className = "admin-library-copy";

  const title = document.createElement("h4");
  title.textContent = item.title || item.name || "Untitled media";
  copy.append(title);

  if (item.caption) {
    const caption = document.createElement("p");
    caption.textContent = item.caption;
    copy.append(caption);
  }

  const meta = document.createElement("span");
  meta.className = "media-meta";
  meta.textContent = [formatDate(item.createdAt), formatFileSize(item.size)].filter(Boolean).join(" • ");
  copy.append(meta);

  article.append(copy);

  const actions = document.createElement("div");
  actions.className = "admin-library-actions";

  actions.append(createAdminStatusBadge(item.published ? "Published" : "Draft", item.published ? "is-live" : "is-draft"));

  if (type === "reel" && item.published && item.featured) {
    actions.append(createAdminStatusBadge("Featured", "is-featured"));
  }

  const publishButton = document.createElement("button");
  publishButton.className = "ghost-button";
  publishButton.type = "button";
  publishButton.dataset.togglePublish = item.id;
  publishButton.dataset.nextPublished = item.published ? "false" : "true";
  publishButton.dataset.mediaType = type;
  publishButton.textContent = item.published ? "Unpublish" : "Publish";
  actions.append(publishButton);

  if (type === "reel" && item.published && !item.featured) {
    const featureButton = document.createElement("button");
    featureButton.className = "ghost-button";
    featureButton.type = "button";
    featureButton.dataset.setFeatured = item.id;
    featureButton.textContent = "Make featured";
    actions.append(featureButton);
  }

  const deleteButton = document.createElement("button");
  deleteButton.className = "ghost-button danger";
  deleteButton.type = "button";
  deleteButton.dataset.deleteMedia = item.id;
  deleteButton.dataset.mediaType = type;
  deleteButton.textContent = "Delete";
  actions.append(deleteButton);

  article.append(actions);

  return article;
}

function renderAdminLibrary() {
  adminPictureCount.textContent = formatCountLabel(state.media.images.length, "Picture");
  adminReelCount.textContent = formatCountLabel(state.media.reels.length, "Reel");

  adminImageList.replaceChildren();
  adminReelList.replaceChildren();

  if (!state.media.images.length) {
    adminImageList.append(createAdminEmptyState("No saved pictures", "Upload pictures here, then publish the ones you want live on the site."));
  } else {
    state.media.images.forEach((image) => adminImageList.append(createAdminLibraryItem(image, "image")));
  }

  if (!state.media.reels.length) {
    adminReelList.append(createAdminEmptyState("No saved reels", "Upload reels here as drafts, then publish the ones you want live on the site."));
  } else {
    state.media.reels.forEach((reel) => adminReelList.append(createAdminLibraryItem(reel, "reel")));
  }
}

async function hashPasscode(passcode) {
  const normalized = passcode.trim();
  const encoder = new TextEncoder();

  if (window.crypto && window.crypto.subtle) {
    const digest = await window.crypto.subtle.digest("SHA-256", encoder.encode(normalized));
    const bytes = [...new Uint8Array(digest)];
    return `sha256:${bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  }

  return `plain:${window.btoa(normalized)}`;
}

function getStoredPasscodeHash() {
  return window.localStorage.getItem(LOCAL_KEYS.passcodeHash);
}

function renderAdminAuth(message = "", isError = false) {
  const hasPasscode = Boolean(getStoredPasscodeHash());

  adminAuth.hidden = false;
  adminDashboard.hidden = true;
  adminAuth.innerHTML = hasPasscode
    ? `
      <form class="admin-auth-card" id="admin-auth-form">
        <span class="surface-kicker">Secure access</span>
        <h3>Unlock the admin panel</h3>
        <label class="field-group">
          <span>Passcode</span>
          <input name="passcode" type="password" minlength="6" autocomplete="current-password" required />
        </label>
        <button class="primary-button" type="submit">Unlock admin</button>
        <p class="form-status" id="admin-auth-status" hidden></p>
      </form>
    `
    : `
      <form class="admin-auth-card" id="admin-auth-form">
        <span class="surface-kicker">First-time setup</span>
        <h3>Create a local admin passcode</h3>
        <label class="field-group">
          <span>New passcode</span>
          <input name="passcode" type="password" minlength="6" autocomplete="new-password" required />
        </label>
        <label class="field-group">
          <span>Confirm passcode</span>
          <input name="confirmPasscode" type="password" minlength="6" autocomplete="new-password" required />
        </label>
        <button class="primary-button" type="submit">Save and open admin</button>
        <p class="form-status" id="admin-auth-status" hidden></p>
      </form>
    `;

  const authForm = document.querySelector("#admin-auth-form");
  const authStatus = document.querySelector("#admin-auth-status");

  setFormStatus(authStatus, message, isError);

  authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(authForm);
    const passcode = String(formData.get("passcode") || "").trim();

    if (passcode.length < 6) {
      setFormStatus(authStatus, "Use a passcode with at least 6 characters.", true);
      return;
    }

    if (!hasPasscode) {
      const confirmation = String(formData.get("confirmPasscode") || "").trim();

      if (passcode !== confirmation) {
        setFormStatus(authStatus, "The passcodes do not match yet.", true);
        return;
      }

      const newHash = await hashPasscode(passcode);
      window.localStorage.setItem(LOCAL_KEYS.passcodeHash, newHash);
      state.isAdminUnlocked = true;
      sessionStorage.setItem(LOCAL_KEYS.adminSession, "unlocked");
      renderAdminPanel();
      return;
    }

    const candidateHash = await hashPasscode(passcode);

    if (candidateHash !== getStoredPasscodeHash()) {
      setFormStatus(authStatus, "That passcode does not match.", true);
      return;
    }

    state.isAdminUnlocked = true;
    sessionStorage.setItem(LOCAL_KEYS.adminSession, "unlocked");
    renderAdminPanel();
  });

  const firstInput = authForm.querySelector("input");

  if (firstInput) {
    window.requestAnimationFrame(() => firstInput.focus());
  }
}

function renderAdminPanel() {
  adminTrigger.setAttribute("aria-expanded", String(state.isAdminOpen));

  if (!state.isAdminOpen) {
    return;
  }

  if (!state.isAdminUnlocked) {
    renderAdminAuth();
    return;
  }

  adminAuth.hidden = true;
  adminDashboard.hidden = false;
  renderAdminLibrary();

  const firstField = imageForm.querySelector('input[name="title"]');

  if (firstField) {
    window.requestAnimationFrame(() => firstField.focus());
  }
}

function openAdminPanel() {
  state.isAdminOpen = true;
  adminShell.hidden = false;
  adminShell.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-admin-open");
  renderAdminPanel();
}

function closeAdminPanel() {
  if (!state.isAdminOpen) {
    return;
  }

  state.isAdminOpen = false;
  adminShell.hidden = true;
  adminShell.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-admin-open");
  adminTrigger.setAttribute("aria-expanded", "false");
  adminTrigger.focus();
}

function lockAdminPanel() {
  state.isAdminUnlocked = false;
  sessionStorage.removeItem(LOCAL_KEYS.adminSession);
  renderAdminPanel();
}

async function handleImageSubmit(event) {
  event.preventDefault();

  const formData = new FormData(imageForm);
  const file = formData.get("file");

  if (!(file instanceof File) || !file.size || !file.type.startsWith("image/")) {
    setFormStatus(imageFormStatus, "Choose an image file before saving.", true);
    return;
  }

  const record = {
    id: generateId("image"),
    type: "image",
    title: String(formData.get("title") || "").trim(),
    caption: String(formData.get("caption") || "").trim(),
    name: file.name,
    size: file.size,
    createdAt: new Date().toISOString(),
    published: false,
    blob: file,
  };

  try {
    setFormStatus(imageFormStatus, "Saving picture...");
    await putMediaRecord(record);
    imageForm.reset();
    await loadMediaLibrary();
    setFormStatus(imageFormStatus, "Picture saved as a draft inside the admin panel.");
  } catch (error) {
    console.error(error);
    setFormStatus(imageFormStatus, "The picture could not be saved in this browser.", true);
  }
}

async function handleReelSubmit(event) {
  event.preventDefault();

  const formData = new FormData(reelForm);
  const file = formData.get("file");

  if (!(file instanceof File) || !file.size || !file.type.startsWith("video/")) {
    setFormStatus(reelFormStatus, "Choose a video file before saving.", true);
    return;
  }

  const record = {
    id: generateId("reel"),
    type: "reel",
    title: String(formData.get("title") || "").trim(),
    caption: String(formData.get("caption") || "").trim(),
    name: file.name,
    size: file.size,
    createdAt: new Date().toISOString(),
    published: false,
    featured: false,
    blob: file,
  };

  try {
    setFormStatus(reelFormStatus, "Saving reel...");
    await putMediaRecord(record);

    reelForm.reset();
    await loadMediaLibrary();
    setFormStatus(reelFormStatus, "Reel saved as a draft inside the admin panel.");
  } catch (error) {
    console.error(error);
    setFormStatus(reelFormStatus, "The reel could not be saved in this browser.", true);
  }
}

async function handleAdminListClick(event) {
  const actionButton = event.target.closest("button");

  if (!actionButton) {
    return;
  }

  const deleteId = actionButton.dataset.deleteMedia;
  const featureId = actionButton.dataset.setFeatured;
  const togglePublishId = actionButton.dataset.togglePublish;

  if (featureId) {
    try {
      await setFeaturedReel(featureId);
      await loadMediaLibrary();
    } catch (error) {
      console.error(error);
      setFormStatus(reelFormStatus, "The featured reel could not be updated.", true);
    }

    return;
  }

  if (togglePublishId) {
    const shouldPublish = actionButton.dataset.nextPublished === "true";
    const mediaType = actionButton.dataset.mediaType === "reel" ? "reel" : "picture";

    try {
      await setMediaPublished(togglePublishId, shouldPublish);
      await loadMediaLibrary();
      const statusNode = mediaType === "reel" ? reelFormStatus : imageFormStatus;
      setFormStatus(statusNode, shouldPublish ? `${mediaType === "reel" ? "Reel" : "Picture"} published to the site.` : `${mediaType === "reel" ? "Reel" : "Picture"} moved back to drafts.`);
    } catch (error) {
      console.error(error);
      const statusNode = mediaType === "reel" ? reelFormStatus : imageFormStatus;
      setFormStatus(statusNode, `The ${mediaType} could not be updated.`, true);
    }

    return;
  }

  if (!deleteId) {
    return;
  }

  const mediaType = actionButton.dataset.mediaType === "reel" ? "reel" : "picture";
  const confirmed = window.confirm(`Delete this ${mediaType}?`);

  if (!confirmed) {
    return;
  }

  try {
    await deleteMediaEntry(deleteId);
    await loadMediaLibrary();
  } catch (error) {
    console.error(error);
    const statusNode = mediaType === "reel" ? reelFormStatus : imageFormStatus;
    setFormStatus(statusNode, `The ${mediaType} could not be deleted.`, true);
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => goToPage(card.dataset.card));

  if (card.tagName !== "BUTTON") {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToPage(card.dataset.card);
      }
    });
  }
});

window.addEventListener("hashchange", () => renderPage(getRouteFromHash()));

videoClosers.forEach((closer) => {
  closer.addEventListener("click", closeVideoModal);
});

videoClose.addEventListener("click", closeVideoModal);
photoClosers.forEach((closer) => {
  closer.addEventListener("click", closePhotoModal);
});

photoClose.addEventListener("click", closePhotoModal);
adminTrigger.addEventListener("click", openAdminPanel);
adminClosers.forEach((closer) => closer.addEventListener("click", closeAdminPanel));
adminLock.addEventListener("click", lockAdminPanel);
imageForm.addEventListener("submit", handleImageSubmit);
reelForm.addEventListener("submit", handleReelSubmit);
adminImageList.addEventListener("click", handleAdminListClick);
adminReelList.addEventListener("click", handleAdminListClick);

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (state.isAdminOpen) {
    closeAdminPanel();
    return;
  }

  if (!photoModal.hidden) {
    closePhotoModal();
    return;
  }

  closeVideoModal();
});

window.addEventListener("scroll", requestStoryScrollUpdate, { passive: true });
window.addEventListener("resize", requestStoryScrollUpdate);
window.addEventListener("beforeunload", revokeObjectUrls);

if (typeof reducedMotionQuery.addEventListener === "function") {
  reducedMotionQuery.addEventListener("change", updateStoryScroll);
} else {
  reducedMotionQuery.addListener(updateStoryScroll);
}

bindVideoTrigger(featuredReelModalTrigger);
bindVideoTrigger(heroReelTrigger);
bindGalleryPreviewSlots();
renderPage(getRouteFromHash());
setupRevealSections();
updateStoryScroll();
loadMediaLibrary();
