const { createElement } = require('./custom-framework')

function Search(props = {}) {
  return createElement(
    'input',
    {
      onchange: props.onchange,
    },
  )
}

module.exports = Search
