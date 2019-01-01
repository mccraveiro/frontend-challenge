const Component = require('./component')

function updateDOMProperties(dom, props) {
  if (props.className) {
    dom.className = props.className
  } else {
    dom.removeAttribute('class')
  }

  dom.onchange = props.onchange
}

function createInstance (element) {
  if (typeof element === 'string') {
    return {
      element,
      dom: document.createTextNode(element),
      children: []
    }
  } else if (typeof element.type === 'string') {
    const dom = document.createElement(element.type)
    const props = element.props || {}
    let children = props.children || []

    updateDOMProperties(dom, props)
    children.forEach(child => dom.appendChild(child.dom))

    return {
      element,
      dom,
      children,
    }
  }

  const props = element.props || {}
  const children = props.children || []
  const component = new element.type(props)
  const componentInstance = component instanceof Component
    ? component
    : null
  const childElement = componentInstance
    ? component.render()
    : component
  const dom = createInstance(childElement).dom

  return {
    element,
    dom,
    children,
    componentInstance,
  }
}

function Renderer (element, target = document.body, previousInstance) {
  const instance = createInstance(element)

  if (!previousInstance) {
    target.appendChild(instance.dom)
  } else if (previousInstance && !instance.dom.isEqualNode(previousInstance.dom)) {
    target.replaceChild(instance.dom, previousInstance.dom)
  }

  window.requestAnimationFrame(Renderer.bind(null, element, target, instance))
}

module.exports = Renderer
