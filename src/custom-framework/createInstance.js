const Component = require('./component')
const updateDom = require('./updateDom')

function createInstance(element) {
  if (typeof element === 'string') {
    return {
      element,
      dom: document.createTextNode(element),
      children: [],
    }
  }

  const { props } = element

  if (typeof element.type === 'string') {
    const dom = document.createElement(element.type)
    const children = props.children.map(createInstance)

    updateDom(dom, props, {})
    children.forEach(child => dom.appendChild(child.dom))

    return {
      element,
      dom,
      children,
    }
  }

  // eslint-disable-next-line new-cap
  const component = new element.type(props)
  const componentInstance = component instanceof Component
    ? component
    : null
  const childElement = componentInstance
    ? component.render()
    : component
  const childInstance = createInstance(childElement)
  const { dom } = childInstance

  return {
    element,
    dom,
    childInstance,
    componentInstance,
  }
}

module.exports = createInstance
