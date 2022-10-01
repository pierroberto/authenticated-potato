const tryLogin = () => {
  const maybeUsername = document.getElementById('username')
  const maybePassword = document.getElementById('password')

  if (maybeUsername === null || maybePassword === null) return

  const baseUrl = window.location.href

  fetch(`${baseUrl}graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                query Query($username: String!, $password: String!) {
                  user(username: $username, password: $password) {
                    username
                  }
                }
              `,
      variables: {
        username: 'admin',
        password: 'admin',
      },
    }),
  })
    .then((response) => response.json())
    .then((response) => response)
}

const submitLoginForm = (event: Event) => {
  console.log(event)
  event.preventDefault()

  if (event.target === null) return

  //console.log(event.target['username'].value)
  //console.log(event.target['password'].value)
}

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('login')

  if (button !== null) {
    button.addEventListener('click', () => {
      tryLogin()
    })
  }
})
