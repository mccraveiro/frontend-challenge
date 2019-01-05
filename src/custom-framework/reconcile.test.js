const reconcile = require('./reconcile')
const createElement = require('./createElement')
const createInstance = require('./createInstance')

test('should not re-run function component if props not changed', () => {
  const component = function App(props) {
    return createElement('div', props)
  }
  const element = createElement(component, { className: 'app' })
  const instance = createInstance(element)
  const parent = document.createElement('div')
  element.type = jest.fn()

  reconcile(element, parent, instance)

  expect(element.type).not.toBeCalled()
})
