const cards = [...document.querySelectorAll(".portfolio-card")];

function activateCard(card) {
  cards.forEach((item) => item.classList.toggle("is-active", item === card));
}

cards.forEach((card) => {
  card.addEventListener("click", () => activateCard(card));
  card.addEventListener("pointerenter", () => activateCard(card));
});
