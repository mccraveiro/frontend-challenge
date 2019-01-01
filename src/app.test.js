const App = require('./app')

test('returns an object', () => {
  const app = App()
  expect(typeof app).toBe('object')
})

test('returns header as child', () => {
  const app = App()
  expect(app.props.children[0].type).toBe('header')
})
