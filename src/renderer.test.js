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
