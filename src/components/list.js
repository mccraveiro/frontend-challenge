const { createElement } = require('../custom-framework')
const Item = require('./item')

function List({ data, onBreedClick, breedNameFilter }) {
  if (data.length === 0) {
    return createElement('span', { className: 'no-results' }, 'Sorry, no results found')
  }

  return createElement(
    'ul',
    {
      className: 'list',
    },
    ...data.map(props => Item({ ...props, onBreedClick, breedNameFilter })),
  )
}

module.exports = List
