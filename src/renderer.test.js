const createElement = require('./createElement')
const Renderer = require('./renderer')

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

test('attach onchange event listener', () => {
  document.body.innerHTML = ''

  const onchange = () => console.log('Hello world')

  const element = createElement('input', { onchange })
  Renderer(element)

  expect(document.body.firstChild.onchange).toBe(onchange)
})

// Reconciliation

test('do not duplicate div on body', () => {
  document.body.innerHTML = '<div></div>'

  const element = createElement('div')
  Renderer(element)

  expect(document.body.innerHTML).toBe('<div></div>')
})

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

test('do not re-render div on body', () => {
  document.body.innerHTML = '<div></div>'
  const initialElement = document.body.firstChild

  const element = createElement('div')
  Renderer(element)
  const finalElement = document.body.firstChild

  expect(initialElement.isSameNode(finalElement)).toBe(true)
})
