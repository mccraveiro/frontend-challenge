const { Component } = require('../custom-framework')
const App = require('./app')
const dataset = require('../dataset.json')

function mockFetch() {
  const responseMock = {
    status: 200,
    json: () => Promise.resolve(dataset),
  }
  const fetchMock = () => Promise.resolve(responseMock)

  global.fetch = jest.fn(fetchMock)
}

beforeAll(() => {
  mockFetch()
})

test('instance of Component', () => {
  const app = new App()
  expect(app instanceof Component).toBe(true)
})

test('renders an object', () => {
  const app = new App()
  expect(typeof app.render()).toBe('object')
})

test('returns class name', () => {
  const app = new App()
  expect(app.render().props.className).toBe('app')
})

test('renders three children', () => {
  const app = new App()
  expect(app.render().props.children.length).toBe(3)
})

test('handleSearchInput updates the state', () => {
  const app = new App()
  app.state.data = dataset
  app.handleSearchInput({ target: { value: 'He' } })
  expect(app.state.filteredData[0].name).toBe('Henry')
})

test('retry when failed fetch', (done) => {
  const originalConsoleError = console.error
  const originalFetch = window.fetch
  const failedResponse = Promise.resolve({ status: 500 })
  const successResponse = Promise.resolve({
    status: 200,
    json: () => Promise.resolve(dataset),
  })

  // suppress console messages
  console.error = jest.fn()

  window.fetch = jest.fn()
    .mockImplementationOnce(() => failedResponse)
    .mockImplementationOnce(() => {
      console.error = originalConsoleError
      window.fetch = originalFetch
      done()
      return successResponse
    })

  const app = new App()
})
