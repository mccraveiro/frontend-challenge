const updateDom = require('./updateDom')

test('add className', () => {
  const dom = document.createElement('div')
  const props = { className: 'foo' }

  updateDom(dom, props)

  expect(dom.className).toBe('foo')
})

test('remove className', () => {
  const dom = document.createElement('div')
  dom.removeAttribute = jest.fn()
  const props = {}
  const prevProps = {
    className: 'foo',
  }

  updateDom(dom, props, prevProps)

  expect(dom.removeAttribute).toHaveBeenCalledWith('class')
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

test('update className', () => {
  const dom = document.createElement('div')
  const props = { className: 'bar' }
  const prevProps = { className: 'foo' }

  updateDom(dom, props, prevProps)

  expect(dom.className).toBe('bar')
})

test('remove placeholder', () => {
  const dom = document.createElement('input')
  dom.removeAttribute = jest.fn()
  const props = {}
  const prevProps = {
    placeholder: 'Search',
  }

  updateDom(dom, props, prevProps)

  expect(dom.removeAttribute).toHaveBeenCalledWith('placeholder')
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

test('keep existing listeners', () => {
  const onchange = () => {}
  const dom = document.createElement('input')
  dom.addEventListener = jest.fn()
  dom.removeEventListener = jest.fn()
  const props = { onchange }
  const prevProps = { onchange }

  updateDom(dom, props, prevProps)

  expect(dom.addEventListener).not.toHaveBeenCalled()
  expect(dom.removeEventListener).not.toHaveBeenCalled()
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

test('update existing listeners', () => {
  const onchange = () => {}
  const prevOnchange = () => {}
  const dom = document.createElement('input')
  dom.removeEventListener = jest.fn()
  dom.addEventListener = jest.fn()
  const props = { onchange }
  const prevProps = { onchange: prevOnchange }

  updateDom(dom, props, prevProps)

  expect(dom.removeEventListener).toHaveBeenCalledWith('change', prevOnchange)
  expect(dom.addEventListener).toHaveBeenCalledWith('change', onchange)
})
