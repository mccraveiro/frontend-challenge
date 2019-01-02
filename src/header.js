const { createElement } = require('./custom-framework')

function Header() {
  return createElement(
    'header',
    {
      className: 'header',
    },
    'Popular dogs names in NYC',
  )
}

module.exports = Header
