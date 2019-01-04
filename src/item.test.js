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
  breeds: [
    {
      name: 'Golden Retriever',
      count: 3432,
      histogram: 100,
    },
    {
      name: 'Unknown',
      count: 2298,
      histogram: 66,
    },
    {
      name: 'Pug',
      count: 1103,
      histogram: 33,
    },
    {
      name: 'Cocker Spaniel',
      count: 819,
      histogram: 25,
    },
  ],
}

test('returns an object', () => {
  const item = Item(fakeDog)
  expect(typeof item).toBe('object')
})

test('returns a list item', () => {
  const item = Item(fakeDog)
  expect(item.type).toBe('li')
})

test('returns item class', () => {
  const item = Item(fakeDog)
  expect(item.props.className).toBe('item')
})

test('returns dog position', () => {
  const item = Item(fakeDog)
  expect(item.props.children[0].type).toBe('span')
  expect(item.props.children[0].props.children[0]).toBe('1')
  expect(item.props.children[0].props.className).toBe('item-position')
})

test('returns dog name', () => {
  const item = Item(fakeDog)
  expect(item.props.children[1].type).toBe('h2')
  expect(item.props.children[1].props.children[0]).toBe('Fluffy')
  expect(item.props.children[1].props.className).toBe('item-name')
})

test('returns dog count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[2].type).toBe('span')
  expect(item.props.children[2].props.children[0]).toBe('7652 dogs')
  expect(item.props.children[2].props.className).toBe('item-count')
})

test('returns male count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[3].type).toBe('span')
  expect(item.props.children[3].props.children[0]).toBe('Male 36%')
  expect(item.props.children[3].props.className).toBe('item-male')
})

test('returns female count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[4].type).toBe('span')
  expect(item.props.children[4].props.children[0]).toBe('Female 55%')
  expect(item.props.children[4].props.className).toBe('item-female')
})

test('returns unknown count', () => {
  const item = Item(fakeDog)
  expect(item.props.children[5].type).toBe('span')
  expect(item.props.children[5].props.children[0]).toBe('Unknown 9%')
  expect(item.props.children[5].props.className).toBe('item-unknown')
})

test('returns hr', () => {
  const item = Item(fakeDog)
  expect(item.props.children[6].type).toBe('hr')
})

test('returns top breeds title', () => {
  const item = Item(fakeDog)
  expect(item.props.children[7].type).toBe('h3')
  expect(item.props.children[7].props.children[0]).toBe('Top breeds')
  expect(item.props.children[7].props.className).toBe('item-top-breeds-title')
})

test('returns Golden Retriever breed', () => {
  const item = Item(fakeDog)
  expect(item.props.children[8].type).toBe('h4')
  expect(item.props.children[8].props.children[0]).toBe('Golden Retriever')
  expect(item.props.children[8].props.className).toBe('item-breed-name')
})

test('returns Unknown breed', () => {
  const item = Item(fakeDog)
  expect(item.props.children[9].type).toBe('h4')
  expect(item.props.children[9].props.children[0]).toBe('Unknown')
  expect(item.props.children[9].props.className).toBe('item-breed-name')
})

test('returns Pug breed', () => {
  const item = Item(fakeDog)
  expect(item.props.children[10].type).toBe('h4')
  expect(item.props.children[10].props.children[0]).toBe('Pug')
  expect(item.props.children[10].props.className).toBe('item-breed-name')
})

test('returns Cocker Spaniel breed', () => {
  const item = Item(fakeDog)
  expect(item.props.children[11].type).toBe('h4')
  expect(item.props.children[11].props.children[0]).toBe('Cocker Spaniel')
  expect(item.props.children[11].props.className).toBe('item-breed-name')
})
