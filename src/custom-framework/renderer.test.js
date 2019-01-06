const createElement = require('./createElement')
const Component = require('./component')
const Renderer = require('./renderer')

beforeAll(() => {
  window.requestIdleCallback = (callback) => {
    setTimeout(callback, 100)
  }
})

test('write div to body', () => {
  document.body.innerHTML = ''

  Renderer(createElement('div'))

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('write text to body', () => {
  document.body.innerHTML = ''

  const element = createElement('div', {}, 'Hello world')
  Renderer(element)

  expect(document.body.innerHTML).toBe('<div>Hello world</div>')
})

test('set className to div', () => {
  document.body.innerHTML = ''

  const element = createElement('div', { className: 'styled' })
  Renderer(element)

  expect(document.body.innerHTML).toBe('<div class="styled"></div>')
})

test('render to custom element', () => {
  document.body.innerHTML = '<div id="root"></div>'

  const element = createElement('span', {}, 'Hello world')
  Renderer(element, document.getElementById('root'))

  expect(document.body.innerHTML).toBe('<div id="root"><span>Hello world</span></div>')
})

test('write elements recursively', () => {
  document.body.innerHTML = ''

  const anchor = createElement('a', {}, 'Hello world')
  const li = createElement('li', {}, anchor)
  const element = createElement('ul', {}, li)
  Renderer(element)

  expect(document.body.innerHTML).toBe('<ul><li><a>Hello world</a></li></ul>')
})

test('render custom element', () => {
  document.body.innerHTML = ''

  function customElement() {
    return createElement('div')
  }

  Renderer(createElement(customElement))

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('render custom element with props', () => {
  document.body.innerHTML = ''

  function customElement(props) {
    return createElement(props.tag)
  }

  Renderer(createElement(customElement, { tag: 'span' }))

  expect(document.body.innerHTML).toBe('<span></span>')
})

test('render custom element with text children', () => {
  document.body.innerHTML = ''

  function customElement(props) {
    return createElement(props.tag, {}, ...props.children)
  }

  Renderer(createElement(customElement, { tag: 'span' }, 'Hello world'))

  expect(document.body.innerHTML).toBe('<span>Hello world</span>')
})

test('render custom element with custom children', () => {
  document.body.innerHTML = ''

  function customChild(props) {
    return createElement('li', {}, ...props.children)
  }

  function customElement() {
    return createElement(
      'ul',
      {},
      createElement(customChild, {}, 'Foo'),
      createElement(customChild, {}, 'Bar'),
    )
  }

  Renderer(createElement(customElement))

  expect(document.body.innerHTML).toBe('<ul><li>Foo</li><li>Bar</li></ul>')
})

test('render custom component', () => {
  document.body.innerHTML = ''

  class customComponent extends Component {
    // eslint-disable-next-line class-methods-use-this
    render() {
      return createElement('div')
    }
  }

  Renderer(createElement(customComponent))

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('schedule next frame re-render', () => {
  document.body.innerHTML = ''
  const spy = jest.spyOn(window, 'requestIdleCallback')

  Renderer(createElement('div'))

  expect(spy).toBeCalled()
})


test('render component state change', (done) => {
  document.body.innerHTML = ''

  class customComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        text: 'Hello world',
      }
    }

    render() {
      const element = createElement('div', {}, this.state.text)

      // For testing purpose
      this.setState({
        text: 'Foo',
      })

      return element
    }
  }

  jest.spyOn(window, 'requestIdleCallback')
    .mockImplementation((callback) => {
      window.requestIdleCallback.mockRestore()
      callback()
      expect(document.body.innerHTML).toBe('<div>Foo</div>')
      done()
    })

  Renderer(createElement(customComponent))
})

// Reconciliation
test('do not remove siblings', () => {
  document.body.innerHTML = ''

  const anchorA = createElement('a', {}, 'Hello world')
  const anchorB = createElement('a', {}, 'Hello world')
  const liA = createElement('li', {}, anchorA)
  const liB = createElement('li', {}, anchorB)
  const element = createElement('ul', {}, liA, liB)
  Renderer(element)

  expect(document.body.innerHTML).toBe('<ul><li><a>Hello world</a></li><li><a>Hello world</a></li></ul>')
})

test('do not re-render div', () => {
  const initialDOM = document.createElement('div')
  const element = createElement('div')

  document.body.innerHTML = ''
  document.body.appendChild(initialDOM)

  Renderer(element, document.body, {
    element,
    dom: initialDOM,
    children: [],
  })

  const finalDOM = document.body.firstChild

  expect(initialDOM.isSameNode(finalDOM)).toBe(true)
})

test('do not re-render div but update text', () => {
  const initialDOM = document.createElement('div')
  const child = document.createTextNode('Hello world')
  initialDOM.appendChild(child)
  const element = createElement('div', {}, 'Foo')

  document.body.innerHTML = ''
  document.body.appendChild(initialDOM)

  Renderer(element, document.body, {
    element,
    dom: initialDOM,
    children: [{
      element: 'Hello world',
      dom: child,
      children: [],
    }],
  })

  const finalDOM = document.body.firstChild

  expect(initialDOM.isSameNode(finalDOM)).toBe(true)
  expect(document.body.innerHTML).toBe('<div>Foo</div>')
})

test('do not re-render div but replace children', () => {
  const initialDOM = document.createElement('div')
  const child = document.createElement('a')
  initialDOM.appendChild(child)

  const element = createElement('div', {}, createElement('span'))

  document.body.innerHTML = ''
  document.body.appendChild(initialDOM)

  Renderer(element, document.body, {
    element,
    dom: initialDOM,
    children: [{
      element: createElement('a'),
      dom: child,
      children: [],
    }],
  })

  const finalDOM = document.body.firstChild

  expect(initialDOM.isSameNode(finalDOM)).toBe(true)
  expect(document.body.innerHTML).toBe('<div><span></span></div>')
})

test('do not re-render div but remove children', () => {
  const initialDOM = document.createElement('div')
  const child = document.createElement('a')
  initialDOM.appendChild(child)

  const element = createElement('div')

  document.body.innerHTML = ''
  document.body.appendChild(initialDOM)

  Renderer(element, document.body, {
    element,
    dom: initialDOM,
    children: [{
      element: createElement('a'),
      dom: child,
      children: [],
    }],
  })

  const finalDOM = document.body.firstChild

  expect(initialDOM.isSameNode(finalDOM)).toBe(true)
  expect(document.body.innerHTML).toBe('<div></div>')
})

test('do not re-render text', () => {
  const initialDOM = document.createElement('div')
  const child = document.createTextNode('Hello world')
  const textContentSetter = jest.fn()

  Object.defineProperty(child, 'textContent', {
    set: textContentSetter,
  })

  initialDOM.appendChild(child)
  const element = createElement('div', {}, 'Hello world')

  document.body.innerHTML = ''
  document.body.appendChild(initialDOM)

  Renderer(element, document.body, {
    element,
    dom: initialDOM,
    children: [{
      element: 'Hello world',
      dom: child,
      children: [],
    }],
  })

  expect(textContentSetter).not.toHaveBeenCalled()
  expect(document.body.innerHTML).toBe('<div>Hello world</div>')
})
