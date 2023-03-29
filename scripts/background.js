// Gets called every time the extension is installed
browser.runtime.onInstalled.addListener(() => {
  fetch("http://150.140.193.86:2500/user/newuser", {
    method: "POST",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((response) => {
      browser.storage.local.set({ user: response.userid }, () => {
        console.log("Username saved on install");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// todo: this cannot be executed as of now (needs HTTPS)
// todo: either get https certificate or ignore it and do it localy over http later
// chrome.tabs.onActivated.addListener((activeInfo) => {
//   getCurrentTab()
//     .then((currenturl) => {
//       if (currenturl) {
//         let tabId = activeInfo.tabId;

//         chrome.scripting
//           .executeScript({
//             target: { tabId: tabId },
//             files: ["scripts/show-rating.js"],
//           })
//           .then(() => console.log("script injected"))
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// async function getCurrentTab() {
//   return browser.tabs.query({active: true, currentWindow: true}).then(tabs => tabs[0]);
// }
