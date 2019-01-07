const createElement = require('./createElement')
const Component = require('./component')
const Renderer = require('./renderer')

beforeEach(() => {
  document.body.innerHTML = ''
})

test('renderer should write div to body', () => {
  Renderer(createElement('div'))

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('renderer should write text to body', () => {
  const element = createElement('div', {}, 'Hello world')
  Renderer(element)

  expect(document.body.innerHTML).toBe('<div>Hello world</div>')
})

test('renderer should set a className to a div', () => {
  const element = createElement('div', { className: 'styled' })
  Renderer(element)

  expect(document.body.innerHTML).toBe('<div class="styled"></div>')
})

test('renderer should write a custom element', () => {
  document.body.innerHTML = '<div id="root"></div>'

  const element = createElement('span', {}, 'Hello world')
  Renderer(element, document.getElementById('root'))

  expect(document.body.innerHTML).toBe('<div id="root"><span>Hello world</span></div>')
})

test('renderer should write elements recursively', () => {
  const anchor = createElement('a', {}, 'Hello world')
  const li = createElement('li', {}, anchor)
  const element = createElement('ul', {}, li)
  Renderer(element)

  expect(document.body.innerHTML).toBe('<ul><li><a>Hello world</a></li></ul>')
})

test('rendered should write a custom element', () => {
  function customElement() {
    return createElement('div')
  }

  Renderer(createElement(customElement))

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('renderer should write a custom element with props', () => {
  function customElement(props) {
    return createElement(props.tag)
  }

  Renderer(createElement(customElement, { tag: 'span' }))

  expect(document.body.innerHTML).toBe('<span></span>')
})

test('renderer should write a custom element with text children', () => {
  function customElement(props) {
    return createElement(props.tag, {}, ...props.children)
  }

  Renderer(createElement(customElement, { tag: 'span' }, 'Hello world'))

  expect(document.body.innerHTML).toBe('<span>Hello world</span>')
})

test('renderer should write a custom element with a custom children', () => {
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

test('renderer should write a custom component', () => {
  class customComponent extends Component {
    // eslint-disable-next-line class-methods-use-this
    render() {
      return createElement('div')
    }
  }

  Renderer(createElement(customComponent))

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('renderer should schedule next frame re-render', () => {
  const spy = jest.spyOn(window, 'setTimeout')

  Renderer(createElement('div'))

  expect(spy).toBeCalled()
})

test('renderer should write component state changes', (done) => {
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

  jest.spyOn(window, 'setTimeout')
    .mockImplementation((callback) => {
      window.setTimeout.mockRestore()
      callback()
      expect(document.body.innerHTML).toBe('<div>Foo</div>')
      done()
    })

  Renderer(createElement(customComponent))
})
