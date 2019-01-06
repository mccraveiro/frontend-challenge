const reconcile = require('./reconcile')
require('./requestIdleCallbackPolyfill')

function Renderer(element, target = document.body, previousInstance) {
  const instance = reconcile(element, target, previousInstance)
  window.requestIdleCallback(Renderer.bind(null, element, target, instance))
}

module.exports = Renderer
