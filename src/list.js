const { createElement } = require('./custom-framework')
const Item = require('./item')

function List(props = {}) {
  const data = props.data || []

  return createElement(
    'ul',
    {},
    ...data.map(Item),
  )
}

module.exports = List
