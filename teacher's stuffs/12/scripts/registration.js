const username = document.querySelector('[name=username]')
const button = document.querySelector('button[type=submit]')
const spanExists = document.createElement('span')
spanExists.classList.add('error')
spanExists.hidden = true
spanExists.innerHTML = 'Username already exists'
username.insertAdjacentElement('afterend', spanExists)


username.addEventListener('change', onChange);
async function onChange(e) {
  // 1
  const response = await fetch(`ajax/check_username.php?username=${encodeURIComponent(this.value)}`)

  // 3
  const json = await response.json()
  const exists = json.exists
  spanExists.hidden = !exists
  button.disabled = exists
}
username.dispatchEvent(new Event('change'))