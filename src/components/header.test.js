const Header = require('./header')

const header = Header()

test('component should render an object', () => {
  expect(typeof header).toBe('object')
})

test('rendered element type should be header', () => {
  expect(header.type).toBe('header')
})

test('rendered element should have text node as child', () => {
  expect(typeof header.props.children[0]).toBe('string')
})

test('rendered element should have a class name', () => {
  expect(header.props.className).toBe('header')
})
