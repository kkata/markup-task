const form = document.getElementsByTagName("form")[0];
const user = document.getElementById("user");
const pw = document.getElementById("pw");
const buttonSubmit = document.getElementById("button-submit");

const validationMessage = {
  username: "ユーザー名は15文字以下にしてください。",
  password: "8文字以上の大小の英数字を交ぜたものにしてください。",
};

user.addEventListener("input", handleValidation, false);
pw.addEventListener("input", handleValidation, false);

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
    case "pw":
      message = validationMessage.password;
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
