// Gets called every time the extension is installed
// This function should create a random id for a user (maybe in mongodb)
chrome.runtime.onInstalled.addListener(() => {
  console.log("Hi, I was installed");
  fetch("http://localhost:5000");
});

// "content_security_policy": {
//   "extension_pages": "script-src http://localhost;  object-src http://localhost;"
// },
