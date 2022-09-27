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
    body: "{ user: { username } }",
  })
    .then((response) => response.json())
    .then((response) => response);
};
