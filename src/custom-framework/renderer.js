const Component = require('./component')

function createInstance (element) {
  let el = element

  if (typeof el === 'string') {
    return {
      element,
      dom: document.createTextNode(el),
      children: []
    }
  }

  if (typeof el.type === 'function') {
    const props = el.props || {}
    el = new el.type(props)

    if (el instanceof Component) {
      el = el.render()
    }
  }

  const dom = document.createElement(el.type)
  const props = el.props || {}
  let children = props.children || []

  if (props.className) {
    dom.className = props.className
  }

  if (props.onchange) {
    dom.onchange = props.onchange
  }

  children = children.map(createInstance)
  children.forEach(child => dom.appendChild(child.dom))

  return {
    element,
    dom,
    children,
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
