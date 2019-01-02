const { Component, createElement } = require('./custom-framework')
const Header = require('./header')
const Search = require('./search')
const List = require('./list')

const handleSearchInput = (e) => console.log(e)

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [
        'Fluffy',
        'Honey',
      ]
    }
  }

  render () {
    return createElement(
      'div',
      {},
      createElement(Header),
      createElement(Search, { onchange: handleSearchInput }),
      createElement(List, { data: this.state.data })
    )
  }
}

module.exports = App
