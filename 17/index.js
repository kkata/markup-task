const slider = document.getElementById("slider");
let slideIndex = 1;
const buttonNext = document.getElementById("button-next");
const buttonBack = document.getElementById("button-back");

function generateImg(array) {
  let html = "";
  array.forEach((element) => {
    html += `<li><img src="${element}"></li>`;
  });
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

    await slider.insertAdjacentHTML("beforeend", generateImg(json.images));

    showSlide(slideIndex);
    handleButton();
  } catch (err) {
    console.error(err);
  }
}

show();

function showSlide(num) {
  const slides = slider.children;
  const slidesLength = slides.length;

  slideIndex =
    slidesLength < num ? 1 : num < 1 ? (slideIndex = slidesLength) : slideIndex;

  changeCounter(slideIndex, slidesLength);
  changeButtonState(slideIndex, slidesLength);

  for (let index = 0; index < slidesLength; index++) {
    slides[index].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

function handleButton() {
  const buttonBackNext = document.querySelectorAll(".button-back-next");
  buttonBackNext.forEach((element) => {
    element.addEventListener("click", changeSlide, false);
  });
}

function changeSlide(event) {
  showSlide((slideIndex += Number(event.currentTarget.value)));
}

function changeCounter(index, length) {
  document.getElementById("all").innerHTML = length;
  document.getElementById("count").innerHTML = index;
}

function changeButtonState(index, length) {
  buttonNext.disabled = !!(index === length);
  buttonBack.disabled = !!(index === 1);
}
