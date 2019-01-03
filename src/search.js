const { createElement } = require('./custom-framework')

function Search(props = {}) {
  return createElement(
    'input',
    {
      onchange: props.onchange,
      placeholder: 'Search by name',
    },
  )
}

module.exports = Search
