// Gets called every time the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // This function should create a random id for a user (maybe in mongodb)
  console.log("Hi, I was installed");
  fetch("http://localhost:5000");
});

// "content_security_policy": {
//   "extension_pages": "script-src http://localhost;  object-src http://localhost;"
// },

// triggered when the user clicks on a tab
chrome.tabs.onActivated.addListener(() => {
  // console.log("activated");
  getCurrentTab().then((result) => {
    if (result) console.log(result);
  });
});

// triggered when the user updates the url of the tab
chrome.tabs.onUpdated.addListener(() => {
  // console.log("updated");
  getCurrentTab().then((result) => {
    if (result) console.log(result);
  });
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  // url is likely to be empty, and filter chrome:// and about:// URLs
  if (!tab.url || ["chrome://", "about://"].some((p) => tab.url.startsWith(p)))
    return;

  return tab.url;
}
