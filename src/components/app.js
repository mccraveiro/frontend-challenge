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
      breedNameFilter: '',
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.onBreedClick = this.onBreedClick.bind(this)
    this.clearBreedNameFilter = this.clearBreedNameFilter.bind(this)
    this.loadData()
  }

  filterData() {
    const searchTerm = new RegExp(this.state.searchTerm, 'i')
    const breedSearchTerm = new RegExp(this.state.breedNameFilter, 'i')
    this.setState({
      ...this.state,
      filteredData: this.state.data.filter((dog) => {
        const foundName = searchTerm.test(dog.name)
        const foundBreed = dog.breeds.find(breed => breedSearchTerm.test(breed.name))
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

  onBreedClick(breedName) {
    this.setState({
      ...this.state,
      breedNameFilter: breedName,
    })
    this.filterData()
  }

  clearBreedNameFilter() {
    this.onBreedClick('')
  }

  render() {
    return createElement(
      'div',
      { className: 'app' },
      createElement(Header),
      createElement(Search, {
        onkeyup: this.handleSearchInput,
        breedNameFilter: this.state.breedNameFilter,
        clearBreedNameFilter: this.clearBreedNameFilter,
      }),
      createElement(List, {
        data: this.state.filteredData,
        onBreedClick: this.onBreedClick,
        breedNameFilter: this.state.breedNameFilter,
      }),
    )
  }
}

module.exports = App
