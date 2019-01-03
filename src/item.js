const { createElement } = require('./custom-framework')

function Item(props = {}) {
  return createElement(
    'li',
    {
      className: 'item',
    },
    createElement('span', { className: 'item-position' }, props.position.toString()),
    createElement('h2', { className: 'item-name' }, props.name),
    createElement('span', { className: 'item-count' }, `${props.count} dogs`),
    createElement('span', {}, `Male ${props.gender.male}%`),
    createElement('span', {}, `Female ${props.gender.female}%`),
    createElement('span', {}, `Unknown ${props.gender.unknown}%`),
  )
}

module.exports = Item
