const updateDom = require('./updateDom')

test('add className', () => {
  const dom = document.createElement('div')
  const props = { className: 'foo' }

  updateDom(dom, props)

  expect(dom.className).toBe('foo')
})

test('remove className', () => {
  const dom = document.createElement('div')
  const removeAttribute = jest.fn()
  dom.removeAttribute = removeAttribute
  const props = {}
  const prevProps = {
    className: 'foo',
  }

  updateDom(dom, props, prevProps)

  expect(removeAttribute).toHaveBeenCalledWith('class')
})

test('add multiple attributes', () => {
  const dom = document.createElement('input')
  const props = {
    id: 'abc',
    className: 'foo',
    type: 'password',
  }

  updateDom(dom, props)

  expect(dom.id).toBe('abc')
  expect(dom.className).toBe('foo')
  expect(dom.type).toBe('password')
})

test('add onchange listener', () => {
  const onchange = () => {}
  const dom = document.createElement('input')
  const addEventListener = jest.fn()
  dom.addEventListener = addEventListener
  const props = { onchange }

  updateDom(dom, props)

  expect(dom.addEventListener).toHaveBeenCalledWith('change', onchange)
})

test('remove existing listeners', () => {
  const onchange = () => {}
  const dom = document.createElement('input')
  dom.removeEventListener = jest.fn()
  const props = {}
  const prevProps = { onchange }

  updateDom(dom, props, prevProps)

  expect(dom.removeEventListener).toHaveBeenCalledWith('change', onchange)
})
