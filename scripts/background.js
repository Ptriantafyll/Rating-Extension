// Gets called every time the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  fetch("http://127.0.0.1:5000/user/newuser", {
    method: "POST",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((response) => {
      chrome.storage.local.set({ user: response.userid }, () => {
        console.log("Username saved on install");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// todo: this cannot be executed as of now (needs HTTPS)
// todo: either get https certificate or ignore it and do it localy over http later
chrome.tabs.onActivated.addListener((activeInfo) => {
  getCurrentTab()
    .then((currenturl) => {
      if (currenturl) {
        let tabId = activeInfo.tabId;

        chrome.scripting
          .executeScript({
            target: { tabId: tabId },
            files: ["scripts/show-rating.js"],
          })
          .then(() => console.log("script injected"))
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  // url is likely to be empty, and filter chrome:// and about:// URLs
  if (!tab.url || ["chrome://", "about://"].some((p) => tab.url.startsWith(p)))
    return;

  return tab.url;
}
