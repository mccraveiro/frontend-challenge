const { Component, createElement } = require('./custom-framework')
const Header = require('./header')
const Search = require('./search')
const List = require('./list')

const handleSearchInput = (e) => console.log(e)
const data = [
  'Fluffy',
  'Honey',
]

class App extends Component {
  render () {
    return createElement(
      'div',
      {},
      createElement(Header),
      createElement(Search, { onchange: handleSearchInput }),
      createElement(List, { data })
    )
  }
}

module.exports = App
