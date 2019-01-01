const Header = require('./header')

function App () {
  return {
    type: 'div',
    props: {
      children: [
        Header(),
      ]
    },
  }
}

module.exports = App
