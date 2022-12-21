let parent = document.createElement("div");
parent.setAttribute("id", "star-parent");
parent.setAttribute("class", "parent");
document.getElementById("root").appendChild(parent);

function onStarClick(id) {
  // todo: send a put request with the url and the rating of the current website
  console.log(id + " was clicked");
}

for (let i = 1; i < 6; i++) {
  let mystar = document.createElement("span");
  mystar.setAttribute("id", "star" + i);
  mystar.setAttribute("class", "fa fa-star unchecked");
  mystar.addEventListener("click", () => {
    onStarClick(mystar.getAttribute("id"));
  });
  document.getElementById("star-parent").appendChild(mystar);
}
