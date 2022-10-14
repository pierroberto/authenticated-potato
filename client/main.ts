const tryLogin = (e: SubmitEvent) => {
  e.preventDefault()

  if (e.target === null) return

  const maybeForm = document.getElementById('login-form') as HTMLFormElement
  if (maybeForm === null) return

  const username = (maybeForm.elements[0] as HTMLInputElement).value
  const password = (maybeForm.elements[1] as HTMLInputElement).value

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
        username,
        password,
      },
    }),
  })
    .then((response) => response.json())
    .then((response) => response)
}

const submitLoginForm = (event: Event) => {
  event.preventDefault()

  if (event.target === null) return
}

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('login-form')

  if (button !== null) {
    button.addEventListener('submit', (e: SubmitEvent) => {
      tryLogin(e)
    })
  }
})
