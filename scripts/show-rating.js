var colorMap = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
};

var links = document.getElementsByTagName("a");
for (let link of links) {
  var randomNumber = Math.floor(Math.random() * 5) + 1;
  link.style.color = colorMap[randomNumber];

  link.setAttribute("data-random-number", randomNumber);
  link.classList.add("show-number");

  const linkColor = window.getComputedStyle(link).color;
  link.setAttribute("link-color", colorMap[randomNumber]);
}
