/* eslint-disable no-param-reassign */
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

  if (typeof element.type === 'string') {
    const dom = document.createElement(element.type)
    const props = element.props || {}
    const children = (props.children || []).map(createInstance)

    updateDom(dom, props)
    children.forEach(child => dom.appendChild(child.dom))

    return {
      element,
      dom,
      children,
    }
  }

  const props = element.props || {}
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

function reconcile(element, parent, previousInstance) {
  if (!previousInstance) {
    const instance = createInstance(element)
    parent.appendChild(instance.dom)
    return instance
  }

  if (element == null) {
    parent.removeChild(previousInstance.dom)
    return null
  }

  if (typeof previousInstance.element === 'string' && typeof element === 'string') {
    if (previousInstance.element !== element) {
      previousInstance.dom.textContent = element
      previousInstance.element = element
    }

    return previousInstance
  }

  if (previousInstance.element.type !== element.type) {
    const instance = createInstance(element)
    parent.replaceChild(instance.dom, previousInstance.dom)
    parent.appendChild(instance.dom)
    return instance
  }

  if (typeof element.type === 'string') {
    updateDom(previousInstance.dom, element.props)
    // eslint-disable-next-line no-use-before-define
    previousInstance.children = reconcileChildren(element, previousInstance)
    previousInstance.element = element
    return previousInstance
  }

  let childElement

  if (previousInstance.componentInstance) {
    previousInstance.componentInstance.props = element.props
    childElement = previousInstance.componentInstance.render()
  } else {
    childElement = element.type(element.props)
  }

  const oldChildInstance = previousInstance.childInstance
  const childInstance = reconcile(childElement, parent, oldChildInstance)
  previousInstance.dom = childInstance.dom
  previousInstance.childInstance = childInstance
  previousInstance.element = element
  return previousInstance
}

function reconcileChildren(element, previousInstance) {
  const instanceChildren = previousInstance.children
  const elementChildren = element.props.children || []
  const reconciliatedChildren = []
  const childrenCount = Math.max(instanceChildren.length, elementChildren.length)

  for (let i = 0; i < childrenCount; i += 1) {
    const instanceChild = instanceChildren[i]
    const elementChild = elementChildren[i]
    const child = reconcile(elementChild, previousInstance.dom, instanceChild)

    if (child) {
      reconciliatedChildren.push(child)
    }
  }

  return reconciliatedChildren
}

function Renderer(element, target = document.body, previousInstance) {
  const instance = reconcile(element, target, previousInstance)

  window.requestAnimationFrame(Renderer.bind(null, element, target, instance))
}

module.exports = Renderer
