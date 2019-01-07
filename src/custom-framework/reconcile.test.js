const reconcile = require('./reconcile')
const createElement = require('./createElement')
const createInstance = require('./createInstance')
const Component = require('./component')

test('reconcile should not re-run function component if props not changed', () => {
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

test('reconcile should not re-render class component if props have not changed', () => {
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

test('reconcile should re-render class component if state has changed', () => {
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

test('reconcile should re-render function component if props have changed', () => {
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

test('reconcile should not re-render div', () => {
  const element = createElement('div')
  const parent = document.createElement('div')
  const instance = createInstance(element)
  const { dom } = instance

  const newInstance = reconcile(element, parent, instance)

  expect(dom.isSameNode(newInstance.dom)).toBe(true)
})

test('reconcile should not re-render div but it should update its text', () => {
  const element = createElement('div', {}, 'Hello world')
  const instance = createInstance(element)
  const parent = document.createElement('div')
  const { dom } = instance
  element.props.children = ['Foo']

  const newInstance = reconcile(element, parent, instance)

  expect(dom.isSameNode(newInstance.dom)).toBe(true)
  expect(newInstance.dom.innerHTML).toBe('Foo')
})

test('reconcile should not re-render div but it should replace its children', () => {
  const element = createElement('div', {}, createElement('a'))
  const instance = createInstance(element)
  const parent = document.createElement('div')
  const { dom } = instance
  element.props.children = [createElement('span')]

  const newInstance = reconcile(element, parent, instance)

  expect(dom.isSameNode(newInstance.dom)).toBe(true)
  expect(newInstance.dom.innerHTML).toBe('<span></span>')
})

test('reconcile should not re-render div but it should remove its children', () => {
  const element = createElement('div', {}, createElement('a'))
  const instance = createInstance(element)
  const parent = document.createElement('div')
  const { dom } = instance
  element.props.children = []

  const newInstance = reconcile(element, parent, instance)

  expect(dom.isSameNode(newInstance.dom)).toBe(true)
  expect(newInstance.dom.innerHTML).toBe('')
})

test('reconcile should not re-render div and it should not update its text', () => {
  const element = createElement('div', {}, 'Hello world')
  const instance = createInstance(element)
  const parent = document.createElement('div')
  const { dom } = instance.children[0]
  const newInstance = reconcile(element, parent, instance)

  expect(dom.isSameNode(newInstance.children[0].dom)).toBe(true)
})
