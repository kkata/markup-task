const form = document.getElementById("form");
const user = document.getElementById("user");
const pw = document.getElementById("pw");
const buttonSubmit = document.getElementById("button-submit");

const validationMessage = {
  username: "ユーザー名は15文字以下にしてください。",
  password: "8文字以上の大小の英数字を交ぜたものにしてください。",
};

const token = localStorage.getItem("token");
if (token !== null) {
  window.location.href = "./index.html";
}

user.addEventListener("input", handleValidation, false);
pw.addEventListener("input", handleValidation, false);

const sampleUser = {
  name: "aaa",
  password: "aaaAAA111",
};

function checkData(props) {
  return new Promise((resolve, reject) => {
    if (
      props.name === sampleUser.name &&
      props.password === sampleUser.password
    ) {
      resolve({ token: "fafae92rfjafa03", ok: true, code: 200 });
    } else {
      reject({ ok: false, code: 401 });
    }
  });
}

async function getToken(props) {
  try {
    return await checkData(props);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault;
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);

    getToken(formProps)
      .then((obj) => {
        window.location.href = `./index.html?token=${obj.token}`;
      })
      .catch((obj) => {
        window.location.href = "./failed.html";
      });
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
