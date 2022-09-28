import * as dotenv from "dotenv";

dotenv.config();

const tryLogin = () => {
  const maybeUsername = document.getElementById("username");
  const maybePassword = document.getElementById("password");

  if (maybeUsername === null || maybePassword === null) return;

  const baseUrl = process.env.BASE_URL;

  if (baseUrl === undefined) {
    throw new Error("no env found");
  }

  fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{ 
        user: { username } 
      }`,
    }),
  })
    .then((response) => response.json())
    .then((response) => response);
};

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("login");

  if (button !== null) {
    button.addEventListener("click", () => {
      tryLogin();
    });
  }
});
