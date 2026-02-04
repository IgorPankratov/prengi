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
  '[data-modal="consultation"]',
);
const closeModal = document.querySelectorAll(".modal__close");

consultationBtn.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").style.display = "block";
  });
});

closeModal.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".modal").style.display = "none";
  });
});

// Mailer

const contactsForm = document.querySelector(".modal__form");

contactsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  //validation

  const name = this.querySelector('[name="name"]').value;
  const phone = this.querySelector('[name="phone"]').value;
  const email = this.querySelector('[name="email"]').value;

  if (!name || !phone || !email) {
    console.log("Заполните все поля");
    return;
  }

  // Sent query

  fetch("../mailer/smart.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Сообщение отправлено");
      } else {
        console.log(`Сообщение не отправлено ${data.error}`);
      }
    })
    .catch((error) => {
      console.log(`Ошибка сети. ${error.message}`);
    });

  // Close modal

  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").style.display = "none";
});

// Humburger menu

const humburger = document.querySelector(".humburger");
const modalNavigation = document.querySelector("#navigation");

humburger.addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector("#navigation").style.display = "block";
});
