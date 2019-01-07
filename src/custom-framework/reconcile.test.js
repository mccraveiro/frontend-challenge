const reconcile = require('./reconcile')
const createElement = require('./createElement')
const createInstance = require('./createInstance')
const Component = require('./component')

test('should not re-run function component if props not changed', () => {
  const component = function App(props) {
    return createElement('div', props)
  }
  const element = createElement(component, { className: 'app' })
  const instance = createInstance(element)
  const parent = document.createElement('div')
  jest.spyOn(element, 'type')

  reconcile(element, parent, instance)

  expect(element.type).not.toBeCalled()
})

test('should not re-render class component if props not changed', () => {
  class App extends Component {
    render() {
      return createElement('div', this.props)
    }
  }
  const element = createElement(App, { className: 'app' })
  const instance = createInstance(element)
  const parent = document.createElement('div')
  jest.spyOn(instance.componentInstance, 'render')

  reconcile(element, parent, instance)

  expect(instance.componentInstance.render).not.toBeCalled()
})

test('should re-render class component if state has changed', () => {
  class App extends Component {
    render() {
      return createElement('div', this.props)
    }
  }
  const element = createElement(App, { className: 'app' })
  const instance = createInstance(element)
  const parent = document.createElement('div')
  instance.componentInstance.setState({ foo: 'bar' })
  const spy = jest.spyOn(instance.componentInstance, 'render')

  reconcile(element, parent, instance)

  expect(spy).toBeCalled()
})

test('should re-render function component if props changed', () => {
  function Search(props) {
    return createElement('input', props)
  }
  const prevElement = createElement(Search, { className: 'search' })
  const element = createElement(Search, { className: 'search', type: 'text' })
  const instance = createInstance(prevElement)
  const parent = document.createElement('div')
  jest.spyOn(element, 'type')

  reconcile(element, parent, instance)

  expect(element.type).toHaveBeenCalledWith({ children: [], className: 'search', type: 'text' })
})
