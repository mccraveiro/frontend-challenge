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

beforeAll(mockFetch)

test('app should extends Component', () => {
  const app = new App()
  expect(app instanceof Component).toBe(true)
})

test('render method should return an object', () => {
  const app = new App()
  expect(typeof app.render()).toBe('object')
})

test('rendered element should have a class name', () => {
  const app = new App()
  expect(app.render().props.className).toBe('app')
})

test('rendered element should have three children', () => {
  const app = new App()
  expect(app.render().props.children.length).toBe(3)
})

test('handleSearchInput method should update the component state', () => {
  const app = new App()
  app.state.data = dataset
  app.handleSearchInput({ target: { value: 'He' } })
  expect(app.state.filteredData[0].name).toBe('Henry')
})

test('loadData method should retry when network fails', (done) => {
  // eslint-disable-next-line no-console
  const originalConsoleError = console.error
  const originalFetch = window.fetch
  const failedResponse = Promise.resolve({ status: 500 })
  const successResponse = Promise.resolve({
    status: 200,
    json: () => Promise.resolve(dataset),
  })

  // suppress console messages
  // eslint-disable-next-line no-console
  console.error = jest.fn()

  window.fetch = jest.fn()
    .mockImplementationOnce(() => failedResponse)
    .mockImplementationOnce(() => {
      // eslint-disable-next-line no-console
      console.error = originalConsoleError
      window.fetch = originalFetch
      done()
      return successResponse
    })

  // eslint-disable-next-line no-new
  new App()
})
