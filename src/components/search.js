const { createElement } = require('../custom-framework')

function Search(props = {}) {
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
  )
}

module.exports = Search
