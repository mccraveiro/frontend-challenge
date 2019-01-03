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
    this.state.data = data.filter(dog => dog.name.startsWith(value))
  }

  render() {
    return createElement(
      'div',
      {},
      createElement(Header),
      createElement(Search, { onchange: this.handleSearchInput }),
      createElement(List, { data: this.state.data }),
    )
  }
}

module.exports = App
