const Item = require('./item')

const example = {
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

const item = Item(example)

test('returns an object', () => {
  expect(typeof item).toBe('object')
})

test('returns a list item', () => {
  expect(item.type).toBe('li')
})

test('returns item class', () => {
  expect(item.props.className).toBe('item')
})

test('returns item header', () => {
  expect(item.props.children[0].type).toBe('header')
})

test('returns dog position', () => {
  const header = item.props.children[0]
  expect(header.props.children[0].type).toBe('span')
  expect(header.props.children[0].props.children[0]).toBe('1')
  expect(header.props.children[0].props.className).toBe('item-position')
})

test('returns dog name', () => {
  const header = item.props.children[0]
  expect(header.props.children[1].type).toBe('h2')
  expect(header.props.children[1].props.children[0]).toBe('Fluffy')
  expect(header.props.children[1].props.className).toBe('item-name')
})

test('returns dog count', () => {
  const header = item.props.children[0]
  expect(header.props.children[2].type).toBe('span')
  expect(header.props.children[2].props.children[0]).toBe('7652 dogs')
  expect(header.props.children[2].props.className).toBe('item-count')
})

test('returns male count', () => {
  const header = item.props.children[0]
  expect(header.props.children[3].type).toBe('span')
  expect(header.props.children[3].props.children[0]).toBe('Male 36%')
  expect(header.props.children[3].props.className).toBe('item-male')
})

test('returns female count', () => {
  const header = item.props.children[0]
  expect(header.props.children[4].type).toBe('span')
  expect(header.props.children[4].props.children[0]).toBe('Female 55%')
  expect(header.props.children[4].props.className).toBe('item-female')
})

test('returns unknown count', () => {
  const header = item.props.children[0]
  expect(header.props.children[5].type).toBe('span')
  expect(header.props.children[5].props.children[0]).toBe('Unknown 9%')
  expect(header.props.children[5].props.className).toBe('item-unknown')
})

test('returns top breeds table', () => {
  expect(item.props.children[1].type).toBe('table')
})

test('returns top breeds caption', () => {
  const table = item.props.children[1]
  expect(table.props.children[0].type).toBe('caption')
  expect(table.props.children[0].props.children[0]).toBe('Top breeds')
})

test('returns Golden Retriever breed', () => {
  const table = item.props.children[1]
  const firstRow = table.props.children[1]
  const { children } = firstRow.props
  expect(firstRow.type).toBe('tr')
  expect(children[0].type).toBe('th')
  expect(children[0].props.children[0]).toBe('Golden Retriever')
  expect(children[1].type).toBe('td')
  expect(children[1].props.children[0].type).toBe('span')
  expect(children[1].props.children[0].props.className).toBe('histogram')
  expect(children[1].props.children[0].props.style).toBe('width: 100%')
  expect(children[2].type).toBe('td')
  expect(children[2].props.children[0]).toBe('3432')
})

test('returns Unknown breed', () => {
  const table = item.props.children[1]
  const secondRow = table.props.children[2]
  const { children } = secondRow.props
  expect(secondRow.type).toBe('tr')
  expect(children[0].type).toBe('th')
  expect(children[0].props.children[0]).toBe('Unknown')
  expect(children[1].type).toBe('td')
  expect(children[1].props.children[0].type).toBe('span')
  expect(children[1].props.children[0].props.className).toBe('histogram')
  expect(children[1].props.children[0].props.style).toBe('width: 66%')
  expect(children[2].type).toBe('td')
  expect(children[2].props.children[0]).toBe('2298')
})

test('returns Pug breed', () => {
  const table = item.props.children[1]
  const thirdRow = table.props.children[3]
  const { children } = thirdRow.props
  expect(thirdRow.type).toBe('tr')
  expect(children[0].type).toBe('th')
  expect(children[0].props.children[0]).toBe('Pug')
  expect(children[1].type).toBe('td')
  expect(children[1].props.children[0].type).toBe('span')
  expect(children[1].props.children[0].props.className).toBe('histogram')
  expect(children[1].props.children[0].props.style).toBe('width: 33%')
  expect(children[2].type).toBe('td')
  expect(children[2].props.children[0]).toBe('1103')
})

test('returns Cocker Spaniel breed', () => {
  const table = item.props.children[1]
  const fourthRow = table.props.children[4]
  const { children } = fourthRow.props
  expect(fourthRow.type).toBe('tr')
  expect(children[0].type).toBe('th')
  expect(children[0].props.children[0]).toBe('Cocker Spaniel')
  expect(children[1].type).toBe('td')
  expect(children[1].props.children[0].type).toBe('span')
  expect(children[1].props.children[0].props.className).toBe('histogram')
  expect(children[1].props.children[0].props.style).toBe('width: 25%')
  expect(children[2].type).toBe('td')
  expect(children[2].props.children[0]).toBe('819')
})
