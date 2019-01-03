const { createElement } = require('./custom-framework')
const Item = require('./item')

function List(props = {}) {
  const data = props.data || []

  return createElement(
    'ul',
    {
      className: 'list',
    },
    ...data.map(Item),
  )
}

module.exports = List
