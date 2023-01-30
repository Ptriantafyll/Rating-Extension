var colorMap = {
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
};

// var links = document.getElementsByTagName("a");
// for (let link of links) {
//   var randomNumber = Math.floor(Math.random() * 5) + 1;
//   link.style.color = colorMap[randomNumber];

//   link.setAttribute("data-random-number", randomNumber);
//   link.classList.add("show-number");

//   const linkColor = window.getComputedStyle(link).color;
//   link.setAttribute("link-color", colorMap[randomNumber]);
// }

// todo: post request to backend and console log result
var links = document.getElementsByTagName("a");
var currenturl = window.location.href;
fetch("http://localhost:5000/user/ratings/639b17c82b8b317c6557989e", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ url: "https://en.wikipedia.org/wiki/FIFA_World_Cup" }),
})
  .then((response) => response.json())
  .then((jsondata) => {
    console.log(jsondata);
    for (let link of links) {
      if (link in jsondata.ratings) {
        link.style.color = colorMap[jsondata.ratings[link]];
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
