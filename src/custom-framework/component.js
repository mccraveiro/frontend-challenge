class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }

  setState(state) {
    this.state = state
  }
}

module.exports = Component
