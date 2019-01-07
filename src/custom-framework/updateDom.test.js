const updateDom = require('./updateDom')

test('updateDom should add a class name', () => {
  const dom = document.createElement('div')
  const props = { className: 'foo' }

  updateDom(dom, props)

  expect(dom.className).toBe('foo')
})

test('updateDom should remove a class name', () => {
  const dom = document.createElement('div')
  const props = {}
  const prevProps = {
    className: 'foo',
  }

  jest.spyOn(dom, 'removeAttribute')

  updateDom(dom, props, prevProps)

  expect(dom.removeAttribute).toHaveBeenCalledWith('class')
})

test('updateDom should add multiple attributes', () => {
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

test('updateDom should update a class name', () => {
  const dom = document.createElement('div')
  const props = { className: 'bar' }
  const prevProps = { className: 'foo' }

  updateDom(dom, props, prevProps)

  expect(dom.className).toBe('bar')
})

test('updateDom should remove a placeholder', () => {
  const dom = document.createElement('input')
  const props = {}
  const prevProps = {
    placeholder: 'Search',
  }

  jest.spyOn(dom, 'removeAttribute')

  updateDom(dom, props, prevProps)

  expect(dom.removeAttribute).toHaveBeenCalledWith('placeholder')
})

test('updateDom should add a onchange listener', () => {
  const onchange = () => {}
  const dom = document.createElement('input')
  const props = { onchange }

  jest.spyOn(dom, 'addEventListener')

  updateDom(dom, props)

  expect(dom.addEventListener).toHaveBeenCalledWith('change', onchange)
})

test('updateDom should keep any existing listeners', () => {
  const onchange = () => {}
  const dom = document.createElement('input')
  const props = { onchange }
  const prevProps = { onchange }

  jest.spyOn(dom, 'addEventListener')
  jest.spyOn(dom, 'removeEventListener')

  updateDom(dom, props, prevProps)

  expect(dom.addEventListener).not.toHaveBeenCalled()
  expect(dom.removeEventListener).not.toHaveBeenCalled()
})

test('updateDom should remove existing listeners', () => {
  const onchange = () => {}
  const dom = document.createElement('input')
  const props = {}
  const prevProps = { onchange }

  jest.spyOn(dom, 'removeEventListener')

  updateDom(dom, props, prevProps)

  expect(dom.removeEventListener).toHaveBeenCalledWith('change', onchange)
})

test('updateDom should update existing listeners', () => {
  const onchange = () => {}
  const prevOnchange = () => {}
  const dom = document.createElement('input')
  const props = { onchange }
  const prevProps = { onchange: prevOnchange }

  jest.spyOn(dom, 'addEventListener')
  jest.spyOn(dom, 'removeEventListener')

  updateDom(dom, props, prevProps)

  expect(dom.removeEventListener).toHaveBeenCalledWith('change', prevOnchange)
  expect(dom.addEventListener).toHaveBeenCalledWith('change', onchange)
})
