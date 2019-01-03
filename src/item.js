const { createElement } = require('./custom-framework')

function Item(props = {}) {
  return createElement(
    'li',
    {},
    createElement('span', {}, props.position.toString()),
    createElement('h2', {}, props.name),
    createElement('span', {}, `${props.count} dogs`),
    createElement('span', {}, `Male ${props.gender.male}%`),
    createElement('span', {}, `Female ${props.gender.female}%`),
    createElement('span', {}, `Unknown ${props.gender.unknown}%`),
  )
}

module.exports = Item
