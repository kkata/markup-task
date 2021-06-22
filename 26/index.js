const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalBg = document.createElement("div");
modalBg.classList.add("modal-bg");
const buttonModal = document.getElementById("button-modal");
const buttonClose = document.getElementById("button-close");

const form = document.getElementsByTagName("form")[0];
const user = document.getElementById("user");
const email = document.getElementById("email");
const pw = document.getElementById("pw");
const InputCheck = document.getElementById("input-check");
const buttonSubmit = document.getElementById("button-submit");

const validationMessage = {
  username: "ユーザー名は15文字以下にしてください。",
  email: "メールアドレスの形式になっていません。",
  password: "8文字以上の大小の英数字を交ぜたものにしてください。",
  check: "利用規約を読みチェックしてください。",
};

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
      changeSubmitButtonState();
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

user.addEventListener("input", handleValidation, false);
email.addEventListener("input", handleValidation, false);
pw.addEventListener("input", handleValidation, false);
InputCheck.addEventListener("change", handleValidation, false);
buttonSubmit.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    window.location.href = "./register-done.html";
  },
  false
);

function handleValidation(event) {
  showValidationMessage(event.currentTarget);
  changeSubmitButtonState();
}

function showValidationMessage(element) {
  let message = "";

  switch (element.id) {
    case "user":
      message = validationMessage.username;
      break;
    case "email":
      message = validationMessage.email;
      break;
    case "pw":
      message = validationMessage.password;
      break;
    case "input-check":
      message = validationMessage.check;
      break;
    default:
      break;
  }

  validateItem(element, message);
}

function validateItem(element, text) {
  const currentNextElement = element.nextElementSibling;
  if (element.validity.valid) {
    if (currentNextElement) {
      currentNextElement.remove();
    }
  } else {
    if (!currentNextElement) {
      const errorElement = document.createElement("p");
      errorElement.className = "error";
      element.after(errorElement);
      errorElement.innerHTML = text;
    }
  }
}

function changeSubmitButtonState() {
  const items = document.querySelectorAll(":required");
  buttonSubmit.disabled = !Array.from(items)
    .map((element) => {
      return element.validity.valid;
    })
    .every((element) => !!element);
}

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
