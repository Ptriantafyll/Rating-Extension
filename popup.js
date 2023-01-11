const stars = document.getElementsByClassName("fa-star");

for (let star of stars) {
  star.addEventListener("click", () => onStarClick(star.getAttribute("id")));
}

function onStarClick(id) {
  // todo: send a put request with the url and the rating of the current website
  console.log(id + " was clicked");
  getCurrentTab()
    .then((result) => {
      console.log(result);
      // ? result has the current url
      if (result) console.log(result);
    })
    .then(() => {
      fetch("http://localhost:5000", {
        method: "PUT",
        // todo: get correct values for the body
        body: {
          user: "username",
          link: { url: "currenturl", rating: "rating" },
        },
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .catch((err) => {
          console.log(err);
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
