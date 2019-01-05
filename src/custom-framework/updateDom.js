function parseAttributes(props) {
  const eventListenersAndChildren = name => !name.startsWith('on') && name !== 'children'

  const attributes = Object
    .keys(props)
    .filter(eventListenersAndChildren)

  return new Set(attributes)
}

function parseEventListeners(props) {
  const isEventListener = name => name.startsWith('on')

  const eventListeners = Object
    .keys(props)
    .filter(isEventListener)

  return new Set(eventListeners)
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
  const prevEventListeners = parseEventListeners(prevProps)
  const eventListeners = parseEventListeners(props)
  const prevAttributes = parseAttributes(prevProps)
  const attributes = parseAttributes(props)

  prevAttributes.forEach((name) => {
    if (props[name] === prevProps[name]) {
      attributes.delete(name)
      return
    }

    if (attributes.has(name)) {
      setAttribute(dom, name, props[name])
      attributes.delete(name)
      return
    }

    removeAttribute(dom, name)
  })

  attributes.forEach(name => setAttribute(dom, name, props[name]))

  prevEventListeners.forEach((name) => {
    if (props[name] === prevProps[name]) {
      eventListeners.delete(name)
      return
    }

    if (eventListeners.has(name)) {
      dom.removeEventListener(name.slice(2), prevProps[name])
      dom.addEventListener(name.slice(2), props[name])
      eventListeners.delete(name)
      return
    }

    dom.removeEventListener(name.slice(2), prevProps[name])
  })

  eventListeners.forEach(name => dom.addEventListener(name.slice(2), props[name]))
}

module.exports = updateDom
