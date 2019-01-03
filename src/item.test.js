const Item = require('./item')

const fakeDog = {
  position: 1,
  name: 'Fluffy',
  count: 7652,
  gender: {
    male: 36,
    female: 55,
    unknown: 9,
  },
}

test('returns an object', () => {
  const item = Item(fakeDog)
  expect(typeof item).toBe('object')
})

test('returns a list item', () => {
  const item = Item(fakeDog)
  expect(item.type).toBe('li')
})

test('returns dog position', () => {
  const item = Item(fakeDog)
  expect(item.props.children[0].type).toBe('span')
  expect(item.props.children[0].props.children[0]).toBe('1')
})

test('returns dog name', () => {
  const item = Item(fakeDog)
  expect(item.props.children[1].type).toBe('h2')
  expect(item.props.children[1].props.children[0]).toBe('Fluffy')
})

test('returns dog count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[2].type).toBe('span')
  expect(item.props.children[2].props.children[0]).toBe('7652 dogs')
})

test('returns male count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[3].type).toBe('span')
  expect(item.props.children[3].props.children[0]).toBe('Male 36%')
})

test('returns female count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[4].type).toBe('span')
  expect(item.props.children[4].props.children[0]).toBe('Female 55%')
})

test('returns unknown count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[5].type).toBe('span')
  expect(item.props.children[5].props.children[0]).toBe('Unknown 9%')
})
