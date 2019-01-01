const Renderer = require('./renderer')
const Header = require('./header')

const header = Header()

Renderer(header, document.getElementById('root'))
