const List = require('./list')

const data = [
  {
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
  },
  {
    position: 2,
    name: 'Honey',
    count: 6725,
    gender: {
      male: 10,
      female: 80,
      unknown: 10,
    },
    breeds: [
      {
        name: 'Golden Retriever',
        count: 2376,
        histogram: 100,
      },
      {
        name: 'Yorkshire Terrier',
        count: 2032,
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
  },
]

test('returns an object', () => {
  const list = List()
  expect(typeof list).toBe('object')
})

test('has type ul', () => {
  const list = List()
  expect(list.type).toBe('ul')
})

test('has class name', () => {
  const list = List()
  expect(list.props.className).toBe('list')
})

test('return 2 children', () => {
  const list = List({ data })
  expect(list.props.children.length).toBe(2)
})

test('return "Fluffy" as item', () => {
  const list = List({ data })
  expect(JSON.stringify(list.props.children[0])).toEqual(
    expect.stringContaining('Fluffy'),
  )
})
