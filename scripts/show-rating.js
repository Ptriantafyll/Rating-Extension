if (!document.querySelector('link[href*="fontawesome"]')) {
  // Dynamically create a link element for Font Awesome stylesheet
  var fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
  // Append the link element to the head
  document.head.appendChild(fontAwesomeLink);
  console.log("added fontawsome")
}
var links = document.getElementsByTagName("a");
for (let link of links) {
  // todo: add this in the for loop for every link which has the ratings
  var randomNumber = Math.floor(Math.random() * 5) + 1;
  
  link.classList.add("hover-container");
  var iconCount = randomNumber; // Change this to your desired number of icons
  var repeatedString = "'\\f005 '".repeat(iconCount)
  console.log(repeatedString)
  link.style.setProperty('--icon-content', repeatedString); 
  console.log("modified links");
}
