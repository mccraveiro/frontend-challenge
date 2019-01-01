function createElement (type, properties, ...children) {
  const props = {
    ...properties,
    children,
  }

  return {
    type,
    props,
  }
}

module.exports = createElement
