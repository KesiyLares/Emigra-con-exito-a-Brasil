const radios = document.querySelectorAll('input[name="book"]');
const cards = document.querySelectorAll(".card");
let startX;

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    resetClasses();
    const cardIndex = index % cards.length;
    const nextCardIndex = (cardIndex + 1) % cards.length;
    const prevCardIndex = (cardIndex - 1 + cards.length) % cards.length;

    cards[cardIndex].classList.add("card--center");
    cards[nextCardIndex].classList.add("card--right");
    cards[prevCardIndex].classList.add("card--left");
  });
});

function resetClasses() {
  cards.forEach((card) => {
    card.classList.remove("card--left", "card--right", "card--center");
  });
}

resetClasses();
cards[0].classList.add("card--center");
cards[1].classList.add("card--right");
cards[cards.length - 1].classList.add("card--left");

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  if (!startX) return;

  const currentX = event.touches[0].clientX;
  const deltaX = startX - currentX;

  if (deltaX > 6) {
    showNextCard();
  } else if (deltaX < -6) {
    showPrevCard();
  }

  startX = null;
}

function showNextCard() {
  const checkedRadio = document.querySelector('input[name="book"]:checked');
  const currentIndex = Array.from(radios).indexOf(checkedRadio);
  const nextIndex = (currentIndex + 1) % radios.length;

  radios[nextIndex].checked = true;
  radios[nextIndex].dispatchEvent(new Event("change"));
}

function showPrevCard() {
  const checkedRadio = document.querySelector('input[name="book"]:checked');
  const currentIndex = Array.from(radios).indexOf(checkedRadio);
  const prevIndex = (currentIndex - 1 + radios.length) % radios.length;

  radios[prevIndex].checked = true;
  radios[prevIndex].dispatchEvent(new Event("change"));
}
