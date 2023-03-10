// Gets called every time the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  fetch("http://150.140.193.86:2500/user/newuser", {
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

// chrome.storage.local.get(["username"], (result) => {
//   console.log("Username: " + result.username);
// });
