const Search = require('./search')

test('returns an object', () => {
  const search = Search()
  expect(typeof search).toBe('object')
})

test('returns class name', () => {
  const search = Search()
  expect(search.props.className).toBe('search')
})

test('returns type', () => {
  const search = Search()
  expect(search.type).toBe('div')
})

test('returns input as child', () => {
  const search = Search()
  expect(search.props.children[0].type).toBe('input')
})

test('returns input with class', () => {
  const search = Search()
  expect(search.props.children[0].props.className).toBe('search-input')
})

test('returns input with onchange event listener', () => {
  // eslint-disable-next-line no-console
  const onchange = () => console.log('Hello')
  const search = Search({
    onchange,
  })
  expect(search.props.children[0].props.onchange).toBe(onchange)
})
