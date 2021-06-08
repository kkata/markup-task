const ul = document.querySelector("ul");
const loadingImg = document.createElement("img");
loadingImg.src = "../image/loading-circle-1.gif";

const array = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
];

function promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(array);
      // reject("failed");
    }, 3000);
  });
}

async function show() {
  try {
    const data = await promise();
    document.body.removeChild(loadingImg);
    data.forEach((element, index) => {
      ul.insertAdjacentHTML(
        "beforeend",
        `<li><a href="/${element.to}"><img src="${element.img}" alt="${element.alt}">${element.text}</a></li>`
      );
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log("finally");
  }
}

document.body.appendChild(loadingImg);
show();
