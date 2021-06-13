const tab = document.getElementById("tab");

const data = [
  {
    category: "news",
    selected: true,
    article: [
      { title: "newstest1", new: true, comment: 10 },
      { title: "newstest2", new: true, comment: 1 },
      { title: "newstest3", new: false, comment: 1 },
      { title: "newstest4", new: true, comment: 0 },
      { title: "newstest5", new: true, comment: 2 },
    ],
  },
  {
    category: "economy",
    selected: false,
    article: [
      { title: "economytest21", new: true, comment: 210 },
      { title: "economytest22", new: true, comment: 21 },
      { title: "economytest23", new: false, comment: 21 },
      { title: "economytest24", new: true, comment: 0 },
      { title: "economytest25", new: true, comment: 2 },
    ],
  },
];

function generateTab(data) {
  data.forEach((element, index) => {
    tab.insertAdjacentHTML(
      "beforeend",
      `<li><button type="button" role="tab" aria-controls="${element.category}" aria-selected="${element.selected}">${element.category}</button></li>`
    );
    tab.insertAdjacentHTML(
      "afterend",
      `<div class="tab-content" id="${
        element.category
      }" role="tabpanel" aria-hidden="${!element.selected}"><ul></ul></div>`
    );
    let html = "";
    for (let index = 0; index < 4; index++) {
      const item = element.article[index];
      const newIcon = item.new ? "<i>NEW</i>" : "";
      const comment = item.comment
        ? `<i>COMMENT</i><span>${item.comment}</span>`
        : "";
      html += `<li>${item.title}${newIcon}${comment}</li>`;
    }
    document
      .getElementById(element.category)
      .insertAdjacentHTML("beforeend", html);
  });
}

function handleTab() {
  const button = document.querySelectorAll("button");
  const tabContent = document.querySelectorAll(".tab-content");
  button.forEach((element) => {
    element.addEventListener("click", listener, false);
  });
  function listener(event) {
    changeButtonSate(event.currentTarget);
    changeTabPanel(event.currentTarget);
  }

  function changeButtonSate(target) {
    button.forEach((element) => {
      element.ariaSelected = false;
    });
    target.ariaSelected = true;
  }

  function changeTabPanel(target) {
    tabContent.forEach((element) => {
      element.ariaHidden = true;
    });
    document.getElementById(
      target.getAttribute("aria-controls")
    ).ariaHidden = false;
  }
}

function promise() {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    resolve(data);
    // reject("failed");
    // }, 3000);
  });
}

async function show() {
  try {
    const data = await promise();
    generateTab(data);
    handleTab();
  } catch (error) {
    console.error(error);
    tab.insertAdjacentHTML(
      "afterend",
      "サーバーのエラーにより、接続と読み込みが妨げられている可能性があります。"
    );
  }
}

show();
