//Slider swipe 1.0
const inner = document.querySelector(".slider__inner");
const item = document.querySelectorAll(".slider__item");
const prevBtn = document.querySelector(".slider__prev");
const nextBtn = document.querySelector(".slider__next");

let currentIndex = 0;

function show(index) {
  inner.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + item.length) % item.length;
  show(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % item.length;
  show(currentIndex);
});

// Modal

const consultationBtn = document.querySelectorAll(
  '[data-modal="consultation"]'
);
const closeModal = document.querySelector(".modal__close");

consultationBtn.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").style.display = "block";
  });
});

closeModal.addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").style.display = "none";
});

// Mailer 

