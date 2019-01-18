const { createElement } = require('../custom-framework')

function renderBreed({
  name,
  histogram,
  count,
  onBreedClick,
  breedNameFilter,
}) {
  if (breedNameFilter !== '' && breedNameFilter !== name) return null

  return createElement(
    'tr',
    {},
    createElement(
      'th',
      {},
      createElement(
        'a',
        {
          href: '#',
          onclick: () => onBreedClick(name),
        },
        name,
      ),
    ),
    createElement(
      'td',
      {},
      createElement(
        'span',
        {
          className: 'histogram',
          style: `width: ${histogram}%`,
        },
      ),
    ),
    createElement(
      'td',
      {},
      count.toString(),
    ),
  )
}

function Item({
  position,
  name,
  count,
  gender,
  breeds,
  onBreedClick,
  breedNameFilter,
}) {
  return createElement(
    'li',
    {
      className: 'item',
    },
    createElement(
      'header',
      {},
      createElement('span', { className: 'item-position' }, position.toString()),
      createElement('h2', { className: 'item-name' }, name),
      createElement('span', { className: 'item-count' }, `${count} dogs`),
      createElement('span', { className: 'item-male' }, `Male ${gender.male}%`),
      createElement('span', { className: 'item-female' }, `Female ${gender.female}%`),
      createElement('span', { className: 'item-unknown' }, `Unknown ${gender.unknown}%`),
    ),
    createElement(
      'table',
      {},
      createElement('caption', {}, 'Top breeds'),
      ...breeds.map(breed => renderBreed({
        ...breed,
        onBreedClick,
        breedNameFilter,
      })),
    ),
  )
}

module.exports = Item
