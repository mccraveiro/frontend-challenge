function Renderer (component, rootElement = document.body) {
  const element = document.createElement(component.type)
  const props = component.props || {}
  const children = component.props.children || []

  if (props.className) {
    element.className = props.className
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      const textElement = document.createTextNode(child)
      element.appendChild(textElement)
    } else {
      Renderer(child, element)
    }
  })

  rootElement.appendChild(element)
}

module.exports = Renderer
