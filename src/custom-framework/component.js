class Component {
  constructor(props = {}) {
    this.forceRender = false
    this.props = props
    this.state = {}
  }

  setState(state) {
    this.state = state
    this.forceRender = true
  }
}

module.exports = Component
