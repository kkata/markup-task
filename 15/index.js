const ul = document.querySelector("ul");
const loadingImg = document.createElement("img");
loadingImg.src = "../image/loading-circle-1.gif";
const buttonShow = document.getElementById("button-show");
const modal = document.getElementById("modal");
const modalInner = document.getElementById("modal-inner");
const buttonModal = document.getElementById("button-modal");
const buttonClose = document.getElementById("button-close");
const inputNumber = document.getElementById("input-number");
const inputName = document.getElementById("input-name");
const form = document.getElementById("form");

function show() {
  form.appendChild(loadingImg);
  console.log(inputNumber.value);
  console.log(inputName.value);
  fetch("https://my-json-server.typicode.com/kkata/demo/db")
    .then((response) => {
      if (!response.ok) {
        throw Error(err.message);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      form.removeChild(loadingImg);
      modalInner.removeChild(form);
      data.data.forEach((element, index) => {
        ul.insertAdjacentHTML(
          "beforeend",
          `<li><a href="/${element.to}"><img src="${element.img}" alt="${element.alt}">${element.text}</a></li>`
        );
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    show();
  },
  false
);

buttonModal.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    modal.style.display = "block";
  },
  false
);
buttonClose.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    modal.style.display = "none";
  },
  false
);
