const { Component, createElement } = require('./custom-framework')
const Header = require('./header')
const Search = require('./search')
const List = require('./list')
const data = require('./dataset.json')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data,
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
  }

  handleSearchInput(event) {
    const { value } = event.target
    const searchTerm = new RegExp(value, 'i')
    this.state.data = data.filter(dog => searchTerm.test(dog.name))
  }

  render() {
    return createElement(
      'div',
      { className: 'app' },
      createElement(Header),
      createElement(Search, { onkeyup: this.handleSearchInput }),
      createElement(List, { data: this.state.data }),
    )
  }
}

module.exports = App
