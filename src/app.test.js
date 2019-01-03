const { Component } = require('./custom-framework')
const App = require('./app')

test('instance of Component', () => {
  const app = new App()
  expect(app instanceof Component).toBe(true)
})

test('renders an object', () => {
  const app = new App()
  expect(typeof app.render()).toBe('object')
})

test('renders three children', () => {
  const app = new App()
  expect(app.render().props.children.length).toBe(3)
})

test('handleSearchInput updates the state', () => {
  const app = new App()
  app.handleSearchInput({ target: { value: 'H' } })
  expect(app.state.data[0].name).toBe('Henry')
})
