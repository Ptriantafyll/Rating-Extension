if (!document.querySelector('link[href*="fontawesome"]')) {
  // Dynamically create a link element for Font Awesome stylesheet
  var fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  // Append the link element to the head
  document.head.appendChild(fontAwesomeLink);
}
var links = document.getElementsByTagName("a");

fetch("http://127.0.0.1:5000/user/newuser", {
  method: "POST",
  mode: "cors",
})
  .then((response) => response.json)
  .then((response) => {
    for (let link of links) {
      // todo: add this in the for loop for every link which has the ratings
      rating = response.ratings[link.href]
    
      // Add stars to urls
      link.classList.add("hover-container");
      var iconCount = rating; 
      var repeatedString = "'\\f005 '".repeat(iconCount);
      link.style.setProperty("--icon-content", repeatedString);
    }
  })
  .catch((err) => {
    console.log(err);
  });
