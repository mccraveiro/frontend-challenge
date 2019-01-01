function Search (props = {}) {
  return {
    type: 'input',
    props: {
      onchange: props.onchange,
    }
  }
}

module.exports = Search
