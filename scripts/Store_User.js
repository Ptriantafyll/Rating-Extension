// Gets called every time the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Hi, I was installed");
  fetch("http://localhost:5000");
});
