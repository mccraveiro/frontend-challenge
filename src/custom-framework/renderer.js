const reconcile = require('./reconcile')

function Renderer(element, target = document.body, previousInstance) {
  const instance = reconcile(element, target, previousInstance)

  window.requestAnimationFrame(Renderer.bind(null, element, target, instance))
}

module.exports = Renderer
