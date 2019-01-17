const { createElement } = require('../custom-framework')

function Search(props = {}) {
  if (props.breedNameSearchTerm) {
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
          onkeyup: props.onkeyup,
        },
      ),
      createElement(
        'a',
        {
          href: '#',
          onclick: props.clearBreedSearch,
        },
        `x ${props.breedNameSearchTerm}`
      )
    )
  }

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
        onkeyup: props.onkeyup,
      },
    )
  )
}

module.exports = Search
