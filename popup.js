const stars = document.getElementsByClassName("fa-star");

for (let star of stars) {
  star.addEventListener("click", () => onStarClick(star.getAttribute("id")));
}

function onStarClick(id) {
  // todo: send a put request with the url and the rating of the current website
  console.log(id + " was clicked");
  getCurrentTab().then((currenturl) => {
    chrome.storage.local.get(["user"], (result) => {
      newrating = {
        user: result.user,
        link: { url: currenturl, rating: Number(id[4]) },
      };
      fetch("http://localhost:5000/user/newrating", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newrating),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  if (!tab || ["chrome://", "about://"].some((p) => tab.url.startsWith(p)))
    return;

  return tab.url;
}
