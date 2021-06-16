const slider = document.getElementById("slider");
let slideIndex = 1;
const buttonNext = document.getElementById("button-next");
const buttonBack = document.getElementById("button-back");
const buttonBackNext = document.querySelectorAll(".button-back-next");
const buttonAuto = document.getElementById("button-auto");
const buttonStop = document.getElementById("button-stop");
const countAll = document.getElementById("all");
const count = document.getElementById("count");
const dotsWrap = document.getElementById("dots-wrap");
let intervalId = 0;

function createImg(array) {
  let html = "";
  array.forEach((element) => {
    html += `<li><img src="${element}"></li>`;
  });
  return html;
}

function createDots(num) {
  let html = "";
  for (let index = 0; index < num; index++) {
    html += `<div class="dot" data-index="${index + 1}"></div>`;
  }
  return html;
}

async function show() {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/kkata/demo/db"
    );
    const json = await response.json();

    await new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(json);
        // reject("failed");
      }, 3000)
    );

    await slider.insertAdjacentHTML("beforeend", createImg(json.images));
    await dotsWrap.insertAdjacentHTML(
      "beforeend",
      createDots(json.images.length)
    );

    showSlide(slideIndex);
    handleButton();
    handleDots();
  } catch (err) {
    console.error(err);
  }
}

show();

function showSlide(num) {
  const slides = slider.children;
  const slidesLength = slides.length;
  const dots = dotsWrap.children;
  const dotsLength = dots.length;

  slideIndex =
    slidesLength < num ? 1 : num < 1 ? (slideIndex = slidesLength) : slideIndex;

  changeCounter(slideIndex, slidesLength);
  // changeButtonState(slideIndex, slidesLength);

  for (let index = 0; index < slidesLength; index++) {
    slides[index].style.display = "none";
  }
  for (let index = 0; index < dotsLength; index++) {
    dots[index].classList.remove("current");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("current");
}

function handleButton() {
  buttonBackNext.forEach((element) => {
    element.addEventListener("click", changeSlide, false);
  });
  buttonAuto.addEventListener("click", playAuto, false);
  buttonStop.addEventListener("click", stopAuto, false);
}

function handleDots() {
  Array.from(dotsWrap.children).forEach((element) => {
    element.addEventListener("click", changeSlideByDots, false);
  });
}

function changeSlide(event) {
  showSlide((slideIndex += Number(event.currentTarget.value)));
}

function changeSlideByDots(event) {
  showSlide((slideIndex = Number(event.currentTarget.dataset.index)));
}

function changeCounter(index, length) {
  countAll.innerHTML = length;
  count.innerHTML = index;
}

function changeButtonState(index, length) {
  buttonNext.disabled = !!(index === length);
  buttonBack.disabled = !!(index === 1);
}

function playAuto() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    showSlide((slideIndex += 1));
  }, 3000);
}

function stopAuto() {
  clearInterval(intervalId);
  intervalId = 0;
}
