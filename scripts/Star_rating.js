let parent = document.createElement("div");
parent.setAttribute("id", "star-parent");
parent.setAttribute("class", "parent");
document.getElementById("root").appendChild(parent);

for (let i = 0; i < 5; i++) {
  let mystar = document.createElement("span");
  mystar.setAttribute("id", "star" + i);
  mystar.setAttribute("class", "fa fa-star unchecked");
  document.getElementById("star-parent").appendChild(mystar);
}

/* todo: add on click rating -> 1-5 */
