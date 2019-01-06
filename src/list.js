const { createElement } = require('./custom-framework')
const Item = require('./item')

function List(props = {}) {
  const data = props.data || []

  if (data.length === 0) {
    return createElement('span', { className: 'no-results' }, 'Sorry, no results found')
  }

  return createElement(
    'ul',
    {
      className: 'list',
    },
    ...data.map(Item),
  )
}

module.exports = List
