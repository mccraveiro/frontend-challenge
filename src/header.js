const createElement = require('./createElement')

function Header () {
  return createElement(
    'header',
    {
      className: 'header',
    },
    'Popular dogs names in NYC'
  )
}

module.exports = Header
