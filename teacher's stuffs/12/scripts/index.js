const form = document.querySelector('#filter-form')
const filter = document.querySelector('#filter-form [name=filter]')
const cardsTable = document.querySelector('#cards-table')

form.addEventListener('submit', onSubmit)
async function onSubmit(e) {
  e.preventDefault();
  // 1.
  const filterText = encodeURIComponent(filter.value)
  const response = await fetch(`ajax/filter.php?filter=${filterText}`)

  // 3.
  const text = await response.text();
  cardsTable.innerHTML = text;
}