const Renderer = require('./renderer')
const createElement = require('./createElement')
const App = require('./app')

Renderer(createElement(App), document.getElementById('root'))
