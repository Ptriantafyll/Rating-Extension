const stars = document.getElementsByClassName("fa-star");

for (let star of stars) {
  star.addEventListener("click", () => onStarClick(star.getAttribute("id")));
}

function onStarClick(id) {
  console.log(id + " was clicked");
  getCurrentTab().then((currenturl) => {
    browser.storage.local.get(["user"]).then((result) => {
      newrating = {
        user: result.user,
        link: { url: currenturl, rating: Number(id[4]) },
      };
      fetch("http://150.140.193.86:2500/user/newrating", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        mode: "cors",
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
  return browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => tabs[0].url);
}
