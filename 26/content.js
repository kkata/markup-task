const logoutButton = document.getElementById("button-logout");

const params = new URL(document.location).searchParams;
const token = params.get("token");

if (token !== null) {
  localStorage.setItem("token", token);
}

logoutButton.addEventListener(
  "click",
  (event) => {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  },
  false
);
