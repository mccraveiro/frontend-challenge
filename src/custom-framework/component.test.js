const Component = require('./component')

test('Component should be a constructor', () => {
  expect(typeof Component).toBe('function')
})

test('Component should instantiate a component', () => {
  const component = new Component()
  expect(component instanceof Component).toBe(true)
})

test('component instance should have a props object', () => {
  const component = new Component()
  expect(typeof component.props).toBe('object')
})

test('component instance should store passed props', () => {
  const component = new Component({ foo: 'bar' })
  expect(component.props.foo).toBe('bar')
})

test('component instance should store a state', () => {
  const component = new Component()
  expect(typeof component.state).toBe('object')
})

test('component instance should have a setState method', () => {
  const component = new Component()
  expect(typeof component.setState).toBe('function')
})

test('the setState method should change the component state', () => {
  const component = new Component()
  component.setState({ foo: 'bar' })
  expect(component.state).toEqual({ foo: 'bar' })
})

test('the setState method should force a re-render', () => {
  const component = new Component()
  component.setState({ foo: 'bar' })
  expect(component.forceRender).toBe(true)
})
