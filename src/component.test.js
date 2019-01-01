const Component = require('./component')

test('returns a class', () => {
  expect(typeof Component).toBe('function')
})

test('instantiate a component', () => {
  const component = new Component()
  expect(component instanceof Component).toBe(true)
})

test('instance has props', () => {
  const component = new Component()
  expect(typeof component.props).toBe('object')
})

test('instance stores props', () => {
  const component = new Component({ foo: 'bar' })
  expect(component.props.foo).toBe('bar')
})
