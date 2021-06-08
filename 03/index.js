const ul = document.querySelector("ul");
const li =
  '<li><a href="a1.html"><img src="/img/bookmark.png">1</a></li><li><a href="a2.html"><img src="/img/bookmark.png">2</a></li>';
ul.insertAdjacentHTML("beforeend", li);
