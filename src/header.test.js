const Header = require('./header')

test('returns an object', () => {
  const header = Header()
  expect(typeof header).toBe('object')
})

test('returns a header element', () => {
  const header = Header()
  expect(header.type).toBe('header')
})

test('returns children property', () => {
  const header = Header()
  expect(Array.isArray(header.props.children)).toBe(true)
})

test('returns text node as child', () => {
  const header = Header()
  expect(typeof header.props.children[0]).toBe('string')
})

test('returns className property', () => {
  const header = Header()
  expect(header.props.className).toBe('header')
})
