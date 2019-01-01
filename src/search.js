const createElement = require('./createElement')

function Search (props = {}) {
  return createElement(
    'input',
    {
      onchange: props.onchange,
    }
  )
}

module.exports = Search
