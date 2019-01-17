function createElement(type, properties, ...children) {
  const props = {
    ...properties,
    children: children.filter(child => !!child),
  }

  return {
    type,
    props,
  }
}

module.exports = createElement
