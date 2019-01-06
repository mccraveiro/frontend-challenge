const { createElement } = require('../custom-framework')

function renderBreed(breed) {
  return createElement(
    'tr',
    {},
    createElement(
      'th',
      {},
      breed.name,
    ),
    createElement(
      'td',
      {},
      createElement(
        'span',
        {
          className: 'histogram',
          style: `width: ${breed.histogram}%`,
        },
      ),
    ),
    createElement(
      'td',
      {},
      breed.count.toString(),
    ),
  )
}

function Item(props = {}) {
  return createElement(
    'li',
    {
      className: 'item',
    },
    createElement(
      'header',
      {},
      createElement('span', { className: 'item-position' }, props.position.toString()),
      createElement('h2', { className: 'item-name' }, props.name),
      createElement('span', { className: 'item-count' }, `${props.count} dogs`),
      createElement('span', { className: 'item-male' }, `Male ${props.gender.male}%`),
      createElement('span', { className: 'item-female' }, `Female ${props.gender.female}%`),
      createElement('span', { className: 'item-unknown' }, `Unknown ${props.gender.unknown}%`),
    ),
    createElement(
      'table',
      {},
      createElement('caption', {}, 'Top breeds'),
      ...props.breeds.map(renderBreed),
    ),
  )
}

module.exports = Item
