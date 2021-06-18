const table = document.getElementById("table");

function createThead(array) {
  const sortButton =
    '<button id="button-sort" type="button" data-sort="normal">sort</button>';
  let thead = "<thead><tr>";
  for (const [key, value] of Object.entries(array[0])) {
    thead += `<th>${setHeadingText(key)}${key === "id" ? sortButton : ""}</th>`;
  }
  thead += "</tr></thead>";

  return thead;
}

function createTbody(array) {
  let tbody = '<tbody id="tbody">';
  array.forEach((element) => {
    tbody += "<tr>";
    Object.entries(element).forEach(
      ([key, value]) => (tbody += `<td>${value}</td>`)
    );
    tbody += "</tr>";
  });
  tbody += "</tbody>";

  return tbody;
}

function createTable(array) {
  return createThead(array) + createTbody(array);
}

function setHeadingText(key) {
  switch (key) {
    case "id":
      return "ID";
    case "name":
      return "名前";
    case "sex":
      return "性別";
    case "age":
      return "年齢";
    default:
      break;
  }
}

let userData;

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
      }, 0)
    );

    userData = json.userTable;

    await table.insertAdjacentHTML("beforeend", createTable(userData));
    document
      .getElementById("button-sort")
      .addEventListener("click", handleButton, false);
  } catch (err) {
    console.error(err);
  }
}

show();

function sortData(data, key, order) {
  return data.slice().sort((a, b) => {
    switch (order) {
      case "asc":
        return a[key] - b[key];
      case "desc":
        return b[key] - a[key];
      default:
        break;
    }
  });
}

function handleButton(event) {
  const target = event.currentTarget;
  changeButtonState(target);
  removeTbody();
  table.insertAdjacentHTML(
    "beforeend",
    createTbody(sortData(userData, "id", target.dataset.sort))
  );
}

function removeTbody() {
  const tbody = document.getElementById("tbody");
  table.removeChild(tbody);
}

function changeButtonState(target) {
  switch (target.dataset.sort) {
    case "normal":
      target.dataset.sort = "asc";
      break;
    case "asc":
      target.dataset.sort = "desc";
      break;
    case "desc":
      target.dataset.sort = "normal";
      break;
    default:
      break;
  }
}
