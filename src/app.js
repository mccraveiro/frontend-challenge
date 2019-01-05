const { Component, createElement } = require('./custom-framework')
const Header = require('./header')
const Search = require('./search')
const List = require('./list')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      filteredData: [],
      searchTerm: '',
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.loadData()
  }

  filterData() {
    const searchTerm = new RegExp(this.state.searchTerm, 'i')
    this.state.filteredData = this.state.data.filter(dog => searchTerm.test(dog.name))
  }

  loadData() {
    fetch('./dataset.json')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Failed loading dataset. Status: ${response.status}`)
        }
        return response.json()
      })
      .then((dataset) => {
        this.state.data = dataset
        this.state.filteredData = dataset
        this.filterData()
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        this.loadData()
      })
  }

  handleSearchInput(event) {
    const { value } = event.target
    this.state.searchTerm = value
    this.filterData()
  }

  render() {
    return createElement(
      'div',
      { className: 'app' },
      createElement(Header),
      createElement(Search, { onkeyup: this.handleSearchInput }),
      createElement(List, { data: this.state.filteredData }),
    )
  }
}

module.exports = App
