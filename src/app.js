const { Component, createElement } = require('./custom-framework')
const Header = require('./header')
const Search = require('./search')
const List = require('./list')

const rawData = [
  'Fluffy',
  'Honey',
]

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: rawData,
    }
  }

  handleSearchInput (event) {
    const value = event.target.value
    this.state.data = rawData.filter(name => name.startsWith(value))
  }

  render () {
    return createElement(
      'div',
      {},
      createElement(Header),
      createElement(Search, { onchange: this.handleSearchInput.bind(this) }),
      createElement(List, { data: this.state.data })
    )
  }
}

module.exports = App
