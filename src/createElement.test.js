const createElement = require('./createElement')

test('returns an object', () => {
  expect(typeof createElement()).toBe('object')
})

test('returns an object with type "div"', () => {
  const element = createElement('div')
  expect(element.type).toBe('div')
})

test('returns an object with props', () => {
  const element = createElement('div', { foo: 'bar' })
  expect(element.props.foo).toBe('bar')
})

test('returns an object with children', () => {
  const element = createElement('div', {}, 'Hello world')
  expect(element.props.children[0]).toBe('Hello world')
})
