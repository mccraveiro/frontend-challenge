const { createElement } = require('./custom-framework')

function Search(props = {}) {
  return createElement(
    'div',
    { className: 'search' },
    createElement(
      'input',
      {
        className: 'search-input',
        placeholder: 'Search by name',
        onkeyup: props.onkeyup,
      },
    ),
  )
}

module.exports = Search
