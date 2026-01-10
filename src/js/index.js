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

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + item.length) % item.length;
    show(currentIndex);    
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % item.length;
    show(currentIndex);
});

