function Header () {
  return {
    type: 'header',
    props: {
      className: 'header',
      children: ['Popular dogs names in NYC'],
    },
  }
}

module.exports = Header
