const createElement = require('./createElement')

test('createElement should return an object', () => {
  expect(typeof createElement()).toBe('object')
})

test('created object should have a type', () => {
  const element = createElement('div')
  expect(element.type).toBe('div')
})

test('created object should have props', () => {
  const element = createElement('div')
  expect(typeof element.props).toBe('object')
})

test('created object should store passed props', () => {
  const element = createElement('div', { foo: 'bar' })
  expect(element.props.foo).toBe('bar')
})

test('created object should store passed children', () => {
  const element = createElement('div', {}, 'Hello world')
  expect(element.props.children[0]).toBe('Hello world')
})
