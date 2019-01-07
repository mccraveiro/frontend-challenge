const Search = require('./search')

test('component should render an object', () => {
  const search = Search()
  expect(typeof search).toBe('object')
})

test('rendered element should have a class name', () => {
  const search = Search()
  expect(search.props.className).toBe('search')
})

test('rendered element should have be a div', () => {
  const search = Search()
  expect(search.type).toBe('div')
})

test('rendered element should have a search input', () => {
  const search = Search()
  expect(search.props.children[0].type).toBe('input')
})

test('rendered search input should have a class name', () => {
  const search = Search()
  expect(search.props.children[0].props.className).toBe('search-input')
})

test('rendered search input should have an accessibility label', () => {
  const search = Search()
  expect(search.props.children[0].props['aria-label']).toBe('Search by name')
})

test('rendered search input should have an onkeyup event listener', () => {
  // eslint-disable-next-line no-console
  const onkeyup = () => console.log('Hello')
  const search = Search({
    onkeyup,
  })
  expect(search.props.children[0].props.onkeyup).toBe(onkeyup)
})
