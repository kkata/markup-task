const table = document.getElementById("table");

function createTable(array) {
  let thead = "<thead><tr>";
  for (const [key, value] of Object.entries(array[0])) {
    thead += `<th>${setHeadingText(key)}</th>`;
  }
  thead += "</tr></thead>";

  let tbody = "<tbody>";
  array.forEach((element) => {
    tbody += "<tr>";
    Object.entries(element).forEach(
      ([key, value]) => (tbody += `<td>${value}</td>`)
    );
    tbody += "</tr>";
  });
  tbody += "</tbody>";

  return thead + tbody;
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

    await table.insertAdjacentHTML("beforeend", createTable(json.userTable));
  } catch (err) {
    console.error(err);
  }
}

show();
