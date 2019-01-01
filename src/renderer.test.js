const Renderer = require('./renderer')

test('write div to body', () => {
  document.body.innerHTML = ''

  const component = {
    type: 'div',
    props: {},
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('write text to body', () => {
  document.body.innerHTML = ''

  const component = {
    type: 'div',
    props: {
      children: ['Hello world']
    },
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<div>Hello world</div>')
})

test('set className to div', () => {
  document.body.innerHTML = ''

  const component = {
    type: 'div',
    props: {
      className: 'styled',
    },
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<div class="styled"></div>')
})

test('render to custom element', () => {
  document.body.innerHTML = '<div id="root"></div>'

  const component = {
    type: 'span',
    props: {
      children: ['Hello world']
    },
  }
  Renderer(component, document.getElementById('root'))

  expect(document.body.innerHTML).toBe('<div id="root"><span>Hello world</span></div>')
})

test('write elements recursively', () => {
  document.body.innerHTML = ''

  const component = {
    type: 'ul',
    props: {
      children: [{
        type: 'li',
        props: {
          children: [{
            type: 'a',
            props: {
              children: ['Hello world']
            },
          }]
        },
      }]
    },
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<ul><li><a>Hello world</a></li></ul>')
})

test('allow undefined props', () => {
  document.body.innerHTML = ''

  const component = {
    type: 'div',
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<div></div>')
})

// Reconciliation

test('do not duplicate div on body', () => {
  document.body.innerHTML = '<div></div>'

  const component = {
    type: 'div',
    props: {},
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<div></div>')
})

test('do not remove siblings', () => {
  document.body.innerHTML = ''

  const component = {
    type: 'ul',
    props: {
      children: [
        {
          type: 'li',
          props: {
            children: [{
              type: 'a',
              props: {
                children: ['Hello world']
              },
            }]
          },
        },
        {
          type: 'li',
          props: {
            children: [{
              type: 'a',
              props: {
                children: ['Hello world']
              },
            }]
          },
        },
      ]
    },
  }
  Renderer(component)

  expect(document.body.innerHTML).toBe('<ul><li><a>Hello world</a></li><li><a>Hello world</a></li></ul>')
})

test('do not re-render div on body', () => {
  document.body.innerHTML = '<div></div>'
  const initialElement = document.body.firstChild

  const component = {
    type: 'div',
    props: {},
  }
  Renderer(component)
  const finalElement = document.body.firstChild

  expect(initialElement.isSameNode(finalElement)).toBe(true)
})
