const createElement = require('./createElement')

function List (props = {}) {
  const data = props.data || []

  return createElement(
    'ul',
    {},
    ...data.map(child => createElement('li', {}, child))
  )
}

module.exports = List
