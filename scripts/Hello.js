const hello = document.createElement("h2");
const hello_text = document.createTextNode("How would you rate this website?");
hello.appendChild(hello_text);

document.getElementById("root").appendChild(hello);
