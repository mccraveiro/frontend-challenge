const List = require('./list')

test('returns an object', () => {
  const list = List()
  expect(typeof list).toBe('object')
})

test('has type ul', () => {
  const list = List()
  expect(list.type).toBe('ul')
})

test('return 2 children', () => {
  const list = List({
    data: [
      'foo',
      'bar',
    ],
  })
  expect(list.props.children.length).toBe(2)
})

test('return "foo" as item', () => {
  const list = List({
    data: [
      'foo',
      'bar',
    ],
  })
  expect(list.props.children[0].props.children[0]).toBe('foo')
})
