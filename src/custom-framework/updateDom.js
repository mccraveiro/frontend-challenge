/* eslint-disable no-param-reassign */

function updateDom(dom, props) {
  if (props.className) {
    dom.className = props.className
  } else {
    dom.removeAttribute('className')
  }

  dom.onchange = props.onchange
}

module.exports = updateDom
