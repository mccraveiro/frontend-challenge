const Search = require('./search')

test('returns an object', () => {
  const search = Search()
  expect(typeof search).toBe('object')
})

test('has type of input', () => {
  const search = Search()
  expect(search.type).toBe('input')
})
