const { createElement } = require('../custom-framework')

function Search(props = {}) {
  const {
    onkeyup,
    breedNameFilter,
    clearBreedNameFilter,
  } = props

  return createElement(
    'form',
    {
      className: 'search',
      role: 'search',
    },
    createElement(
      'input',
      {
        type: 'search',
        className: 'search-input',
        placeholder: 'Search by name',
        'aria-label': 'Search by name',
        onkeyup,
      },
    ),
    breedNameFilter && createElement(
      'a',
      {
        href: '#',
        onclick: clearBreedNameFilter,
      },
      `x ${breedNameFilter}`,
    ),
  )
}

module.exports = Search
