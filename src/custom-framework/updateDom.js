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

function updateDom(dom, props) {
  const eventListeners = { onchange: props.onchange }
  const attributes = { ...props }
  delete attributes.children
  delete attributes.onchange

  Array
    .from(dom.attributes)
    .forEach((attribute) => {
      if (attributes[attribute.name] && attributes[attribute.name] === attribute.value) {
        delete attributes[attribute.name]
        return
      }

      if (attributes[attribute.name]) {
        setAttribute(dom, attribute.name, attributes[attribute.name])
        delete attributes[attribute.name]
        return
      }

      removeAttribute(dom, attribute.name)
    })

  Object
    .entries(attributes)
    .forEach(([attributeName, attributeValue]) => {
      setAttribute(dom, attributeName, attributeValue)
    })

  Object
    .entries(eventListeners)
    .forEach(([name, fn]) => {
      dom.addEventListener(name, fn)
    })
}

module.exports = updateDom
