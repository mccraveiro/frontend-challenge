const objectify = (object, [key, value]) => ({ ...object, [key]: value })

function parseAttributes(props, shouldObjectify = true) {
  const eventListenersAndChildren = ([name, value]) => typeof value !== 'function'
    && name !== 'children'

  const attributes = Object
    .entries(props)
    .filter(eventListenersAndChildren)

  return shouldObjectify
    ? attributes.reduce(objectify, {})
    : attributes
}

function parseEventListeners(props, shouldObjectify = true) {
  const eventListeners = Object
    .entries(props)
    .filter(([, value]) => typeof value === 'function')
    .map(([key, value]) => [key.slice(2), value])

  return shouldObjectify
    ? eventListeners.reduce(objectify, {})
    : eventListeners
}

function setAttribute(dom, name, value) {
  const key = name === 'className'
    ? 'class'
    : name

  dom.setAttribute(key, value)
}

function removeAttribute(dom, name) {
  const key = name === 'className'
    ? 'class'
    : name

  dom.removeAttribute(key)
}

function updateDom(dom, props, prevProps = {}) {
  const prevEventListeners = parseEventListeners(prevProps, false)
  const eventListeners = parseEventListeners(props)
  const prevAttributes = parseAttributes(prevProps, false)
  const attributes = parseAttributes(props)

  prevAttributes.forEach(([attributeName, attributeValue]) => {
    if (attributes[attributeName] && attributes[attributeName] === attributeValue) {
      delete attributes[attributeName]
      return
    }

    if (attributes[attributeName]) {
      setAttribute(dom, attributeName, attributes[attributeName])
      delete attributes[attributeName]
      return
    }

    removeAttribute(dom, attributeName)
  })

  Object
    .entries(attributes)
    .forEach(([attributeName, attributeValue]) => {
      setAttribute(dom, attributeName, attributeValue)
    })

  prevEventListeners.forEach(([eventName, eventListener]) => {
    if (eventListeners[eventName] && eventListeners[eventName] === eventListener) {
      delete eventListeners[eventName]
      return
    }

    if (eventListeners[eventName]) {
      dom.removeEventListener(eventName, eventListener)
      dom.addEventListener(eventName, eventListeners[eventName])
      delete eventListeners[eventName]
      return
    }

    dom.removeEventListener(eventName, eventListener)
  })

  Object
    .entries(eventListeners)
    .forEach(([eventName, eventListener]) => {
      dom.addEventListener(eventName, eventListener)
    })
}

module.exports = updateDom
