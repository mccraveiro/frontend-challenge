const { Component, createElement } = require('../custom-framework')
const Header = require('./header')
const Search = require('./search')
const List = require('./list')
const datasetPreview = require('../dataset-preview.json')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: datasetPreview,
      filteredData: datasetPreview,
      searchTerm: '',
      breedNameSearchTerm: '',
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleBreedSearchInput = this.handleBreedSearchInput.bind(this)
    this.clearBreedSearch = this.clearBreedSearch.bind(this)
    this.loadData()
  }

  filterData() {
    const searchTerm = new RegExp(this.state.searchTerm, 'i')
    const breedSearchTerm = new RegExp(this.state.breedNameSearchTerm, 'i')
    this.setState({
      ...this.state,
      filteredData: this.state.data.filter(dog => {
        const foundName = searchTerm.test(dog.name)
        const foundBreed = dog.breeds.find((breed) => breedSearchTerm.test(breed.name))

        return foundName && foundBreed
      }),
    })
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
        this.setState({
          ...this.state,
          data: dataset,
          filteredData: dataset,
        })
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
    this.setState({
      ...this.state,
      searchTerm: value,
    })
    this.filterData()
  }

  handleBreedSearchInput(breedName) {
    this.setState({
      ...this.state,
      breedNameSearchTerm: breedName,
    })
    this.filterData()
  }

  clearBreedSearch() {
    this.setState({
      ...this.state,
      breedNameSearchTerm: '',
    })
    this.filterData()
  }

  render() {
    return createElement(
      'div',
      { className: 'app' },
      createElement(Header),
      createElement(Search, {
        onkeyup: this.handleSearchInput,
        breedNameSearchTerm: this.state.breedNameSearchTerm,
        clearBreedSearch: this.clearBreedSearch,
      }),
      createElement(List, {
        data: this.state.filteredData,
        onbreedFilter: this.handleBreedSearchInput,
        breedNameSearchTerm: this.state.breedNameSearchTerm,
      }),
    )
  }
}

module.exports = App
