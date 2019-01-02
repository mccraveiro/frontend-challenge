const updateDom = require('./updateDom')

function buildFakeDom() {
  return {
    removeAttribute: jest.fn(),
  }
}

test('add className', () => {
  const dom = buildFakeDom()
  const props = { className: 'foo' }

  updateDom(dom, props)

  expect(dom.className).toBe('foo')
})

test('remove className', () => {
  const dom = buildFakeDom()
  dom.className = 'foo'
  const props = {}

  updateDom(dom, props)

  expect(dom.removeAttribute).toBeCalledWith('className')
})

test('add onchange listener', () => {
  const onchange = () => {}
  const dom = buildFakeDom()
  const props = { onchange }

  updateDom(dom, props)

  expect(dom.onchange).toBe(onchange)
})
