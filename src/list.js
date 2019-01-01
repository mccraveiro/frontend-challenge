function List (props = {}) {
  const data = props.data || []

  return {
    type: 'ul',
    props: {
      children: data.map((child) => ({
        type: 'li',
        props: {
          children: [child],
        }
      }))
    }
  }
}

module.exports = List
