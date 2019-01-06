const fallback = callback => setTimeout(callback, 1)
window.requestIdleCallback = window.requestIdleCallback || window.requestAnimationframe || fallback
