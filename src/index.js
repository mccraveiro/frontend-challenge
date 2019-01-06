const { createElement, Renderer } = require('./custom-framework')
const App = require('./components/app')

Renderer(createElement(App), document.getElementById('root'))
