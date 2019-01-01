const { createElement, Renderer } = require('./custom-framework')
const App = require('./app')

Renderer(createElement(App), document.getElementById('root'))
