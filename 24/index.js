const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const buttonModal = document.getElementById("button-modal");
const buttonClose = document.getElementById("button-close");
const InputCheck = document.getElementById("input-check");
const buttonSubmit = document.getElementById("button-submit");

const modalBg = document.createElement("div");
modalBg.classList.add("modal-bg");

buttonSubmit.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    window.location.href = "./register-done.html";
  },
  false
);

modalBg.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    hideModal();
  },
  false
);

modal.addEventListener(
  "scroll",
  (event) => {
    event.preventDefault();
    if (
      isScrolledBottom(
        modalContent.offsetHeight,
        modal.scrollTop + modal.offsetHeight
      )
    ) {
      InputCheck.disabled = false;
      InputCheck.checked = true;
      buttonSubmit.disabled = false;
    }
  },
  false
);

buttonModal.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    showModal();
  },
  false
);
buttonClose.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    hideModal();
  },
  false
);

function hideModal() {
  modal.style.display = "none";
  document.body.removeChild(modalBg);
}

function showModal() {
  modal.style.display = "block";
  document.body.appendChild(modalBg);
}

function isScrolledBottom(contentHeight, scrollAmount) {
  return contentHeight === scrollAmount;
}
