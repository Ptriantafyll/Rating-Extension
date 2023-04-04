const stars = document.getElementsByClassName("fa-star");

for (let star of stars) {
  star.addEventListener("click", () => onStarClick(star.getAttribute("id")));
}

function onStarClick(id) {
  console.log(id + " was clicked");
  getCurrentTab().then((currenturl) => {
    showSuccessMessage();
    chrome.storage.local.get(["user"], (result) => {
      newrating = {
        user: result.user,
        link: { url: currenturl, rating: Number(id[4]) },
      };
      fetch("http://150.140.193.86:2500/user/newrating", {
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

function showSuccessMessage() {
  // Create the success message element
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.innerText = "Your rating was successful!";

  // Append it to the DOM
  document.body.appendChild(successMessage);

  // Show the element
  successMessage.style.display = "block";

  // Set a timeout to remove the element after 2 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}
