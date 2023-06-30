const stars = document.getElementsByClassName("fa-star");

for (let star of stars) {
  star.addEventListener("click", () => onStarClick(star.getAttribute("id")));
}

const numberElement = document.getElementById("ratingscounter");
var currentuser;

if (numberElement.textContent === "") {
  chrome.storage.local.get(["user"], (result) => {
    console.log(result);
    currentuser = result.user;
    fetch("http://150.140.193.86:2500/user/numofratings/" + currentuser, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((num_of_rated_links) => {
        console.log(num_of_rated_links);
        if (num_of_rated_links > 99) {
          document.getElementById("ratingscounter").textContent =
            "Thank you for rating 100 websites!";
        } else {
          document.getElementById("ratingscounter").textContent =
            "Number of websites you have rated: " +
            num_of_rated_links.num_of_rated_links;
        }
      })
      .catch((err) => {
        console.log(err);
        showFailureMessage(
          "The server is not running, we cannot receive your ratings. Please wait until everything is back up."
        );
      });
  });
}

function onStarClick(id) {
  console.log(id + " was clicked");
  getCurrentTab().then((currenturl) => {
    if (currenturl) {
      chrome.storage.local.get(["user"], (result) => {
        newrating = {
          user: result.user,
          link: { url: currenturl, rating: Number(id[4]) },
        };
        fetch("http://150.140.193.86:2500/user/newrating", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(newrating),
        })
          .then((response) => response.json())
          .then((num_of_rated_links) => {
            showSuccessMessage();
            console.log(num_of_rated_links);
            document.getElementById("ratingscounter").textContent =
              "Number of websites you have rated: " +
              num_of_rated_links.num_of_rated_links;
          })
          .catch((err) => {
            console.log(err);
            showFailureMessage(
              "The server is not running, we cannot receive your ratings. Please wait until everything is back up."
            );
          });
      });
    } else {
      showFailureMessage("Sorry, this website cannot be rated");
    }
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  if (!tab || ["chrome://", "about:"].some((p) => tab.url.startsWith(p)))
    return;

  return tab.url;
}

function showSuccessMessage(message) {
  // Create the success message element
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.innerText = message; //"Your rating was successful!";

  // Append it to the DOM
  document.body.appendChild(successMessage);

  // Show the element
  successMessage.style.display = "block";

  // Set a timeout to remove the element after 2 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

function showFailureMessage(message) {
  // Create the failure message element
  const failureMessage = document.createElement("div");
  failureMessage.classList.add("failure-message");
  failureMessage.innerText = message;

  // Append it to the DOM
  document.body.appendChild(failureMessage);

  // Show the element
  failureMessage.style.display = "block";

  // Set a timeout to remove the element after 2 seconds
  setTimeout(() => {
    failureMessage.remove();
  }, 2000);
}
