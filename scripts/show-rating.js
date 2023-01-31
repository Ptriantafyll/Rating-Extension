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
  mode: "cors",
  body: JSON.stringify({ url: currenturl }),
})
  .then((response) => response.json())
  .then((data) => {
    for (let link of links) {
      if (Object.keys(data.ratings).includes(link.href)) {
        rating = data.ratings[link];
        link.style.color = colorMap[rating];
        link.setAttribute("data-random-number", rating);

        link.classList.add("show-number");
        link.setAttribute("link-color", rating);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
