const updateDom = require('./updateDom')

test('add className', () => {
  const dom = document.createElement('div')
  const props = { className: 'foo' }

  updateDom(dom, props)

  expect(dom.className).toBe('foo')
})

test('remove className', () => {
  const dom = document.createElement('div')
  dom.className = 'foo'
  const props = {}

  updateDom(dom, props)

  expect(dom.className).toBe('')
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

  expect(dom.addEventListener).toHaveBeenCalledWith('onchange', onchange)
})
