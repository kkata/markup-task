const ul = document.querySelector("ul");
const loadingImg = document.createElement("img");
loadingImg.src = "../image/loading-circle-1.gif";

const array = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" },
];

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("error");
  }, 3000);
});

document.body.appendChild(loadingImg);

promise.catch((value) => {
  console.log(value);
});
