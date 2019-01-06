/* eslint-disable no-param-reassign */
const updateDom = require('./updateDom')
const createInstance = require('./createInstance')

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
    if (previousInstance.element.props !== element.props) {
      updateDom(previousInstance.dom, element.props, previousInstance.element.props)
    }

    // eslint-disable-next-line no-use-before-define
    previousInstance.children = reconcileChildren(element, previousInstance)
    previousInstance.element = element
    return previousInstance
  }

  let childElement

  if (previousInstance.componentInstance) {
    const shouldRender = previousInstance.componentInstance.forceRender
      || previousInstance.componentInstance.props !== element.props

    if (shouldRender) {
      previousInstance.componentInstance.props = element.props
      previousInstance.componentInstance.forceRender = false
      childElement = previousInstance.componentInstance.render()
    } else {
      childElement = previousInstance.childInstance.element
    }
  } else if (previousInstance.element.props === element.props) {
    childElement = previousInstance.childInstance.element
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

module.exports = reconcile
