const reconcile = require('./reconcile')

function Renderer(element, target = document.body, previousInstance) {
  const instance = reconcile(element, target, previousInstance)
  setTimeout(Renderer.bind(null, element, target, instance), 100)
}

module.exports = Renderer
