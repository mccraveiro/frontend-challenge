const Search = require('./search')

test('returns an object', () => {
  const search = Search()
  expect(typeof search).toBe('object')
})

test('has type of input', () => {
  const search = Search()
  expect(search.type).toBe('input')
})

test('receive onchange event listener', () => {
  // eslint-disable-next-line no-console
  const onchange = () => console.log('Hello')
  const search = Search({
    onchange,
  })
  expect(search.props.onchange).toBe(onchange)
})
