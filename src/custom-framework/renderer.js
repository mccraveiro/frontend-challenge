const Component = require('./component')

function createElement (component) {
  if (typeof component.type === 'function') {
    const props = component.props || {}
    component = new component.type(props)

    if (component instanceof Component) {
      component = component.render()
    }
  }

  const element = document.createElement(component.type)
  const props = component.props || {}
  const children = props.children || []

  if (props.className) {
    element.className = props.className
  }

  if (props.onchange) {
    element.onchange = props.onchange
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      const textElement = document.createTextNode(child)
      element.appendChild(textElement)
    } else {
      const childElement = createElement(child)
      element.appendChild(childElement)
    }
  })

  return element
}

function Renderer (component, rootElement = document.body) {
  const element = createElement(component)
  let rendered = false

  Array
    .from(rootElement.children)
    .forEach((child) => {
      if (child.isEqualNode(element)) {
        rendered = true
      } else {
        rootElement.removeChild(child)
      }
    })

  if (!rendered) {
    rootElement.appendChild(element)
  }
}

module.exports = Renderer