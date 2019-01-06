!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){const r=n(1),o=n(4),s=n(5);e.exports={Component:r,createElement:o,Renderer:s}},function(e,t){e.exports=class{constructor(e={}){this.forceRender=!1,this.props=e,this.state={}}setState(e){this.state=e,this.forceRender=!0}}},function(e,t){function n(e){const t=Object.keys(e).filter(e=>!e.startsWith("on")&&"children"!==e);return new Set(t)}function r(e){const t=Object.keys(e).filter(e=>e.startsWith("on"));return new Set(t)}function o(e,t,n){const r="className"===t?"class":t;e.setAttribute(r,n)}e.exports=function(e,t,s={}){const a=r(s),c=r(t),i=n(s),l=n(t);i.forEach(n=>{if(t[n]!==s[n])return l.has(n)?(o(e,n,t[n]),void l.delete(n)):void function(e,t){const n="className"===t?"class":t;e.removeAttribute(n)}(e,n);l.delete(n)}),l.forEach(n=>o(e,n,t[n])),a.forEach(n=>{if(t[n]!==s[n])return c.has(n)?(e.removeEventListener(n.slice(2),s[n]),e.addEventListener(n.slice(2),t[n]),void c.delete(n)):void e.removeEventListener(n.slice(2),s[n]);c.delete(n)}),c.forEach(n=>e.addEventListener(n.slice(2),t[n]))}},function(e,t,n){const{createElement:r,Renderer:o}=n(0);o(r(n(9)),document.getElementById("root"))},function(e,t){e.exports=function(e,t,...n){return{type:e,props:{...t,children:n}}}},function(e,t,n){const r=n(6);n(8),e.exports=function e(t,n=document.body,o){const s=r(t,n,o);window.requestIdleCallback(e.bind(null,t,n,s))}},function(e,t,n){const r=n(2),o=n(7);function s(e,t,n){if(!n){const n=o(e);return t.appendChild(n.dom),n}if(null==e)return t.removeChild(n.dom),null;if("string"==typeof n.element&&"string"==typeof e)return n.element!==e&&(n.dom.textContent=e,n.element=e),n;if(n.element.type!==e.type){const r=o(e);return t.replaceChild(r.dom,n.dom),t.appendChild(r.dom),r}if("string"==typeof e.type)return r(n.dom,e.props,n.element.props),n.children=function(e,t){const n=t.children,r=e.props.children||[],o=[],a=Math.max(n.length,r.length);for(let e=0;e<a;e+=1){const a=n[e],c=r[e],i=s(c,t.dom,a);i&&o.push(i)}return o}(e,n),n.element=e,n;let a;if(n.componentInstance){n.componentInstance.forceRender||n.componentInstance.props!==e.props?(n.componentInstance.props=e.props,n.componentInstance.forceRender=!1,a=n.componentInstance.render()):a=n.childInstance.element}else a=n.element.props===e.props?n.childInstance.element:e.type(e.props);const c=s(a,t,n.childInstance);return n.dom=c.dom,n.childInstance=c,n.element=e,n}e.exports=s},function(e,t,n){const r=n(1),o=n(2);e.exports=function e(t){if("string"==typeof t)return{element:t,dom:document.createTextNode(t),children:[]};if("string"==typeof t.type){const n=document.createElement(t.type),r=t.props||{},s=(r.children||[]).map(e);return o(n,r,{}),s.forEach(e=>n.appendChild(e.dom)),{element:t,dom:n,children:s}}const n=t.props||{},s=new t.type(n),a=s instanceof r?s:null,c=e(a?s.render():s),{dom:i}=c;return{element:t,dom:i,childInstance:c,componentInstance:a}}},function(e,t){window.requestIdleCallback=window.requestIdleCallback||window.requestAnimationframe||(e=>setTimeout(e,1))},function(e,t,n){const{Component:r,createElement:o}=n(0),s=n(10),a=n(11),c=n(12);e.exports=class extends r{constructor(e){super(e),this.state={data:[],filteredData:[],searchTerm:""},this.handleSearchInput=this.handleSearchInput.bind(this),this.loadData()}filterData(){const e=new RegExp(this.state.searchTerm,"i");this.setState({...this.state,filteredData:this.state.data.filter(t=>e.test(t.name))})}loadData(){fetch("./dataset.json").then(e=>{if(200!==e.status)throw new Error(`Failed loading dataset. Status: ${e.status}`);return e.json()}).then(e=>{this.setState({...this.state,data:e,filteredData:e}),this.filterData()}).catch(e=>{console.error(e),this.loadData()})}handleSearchInput(e){const{value:t}=e.target;this.setState({...this.state,searchTerm:t}),this.filterData()}render(){return o("div",{className:"app"},o(s),o(a,{onkeyup:this.handleSearchInput}),o(c,{data:this.state.filteredData}))}}},function(e,t,n){const{createElement:r}=n(0);e.exports=function(){return r("header",{className:"header"},"Popular dog names in NYC")}},function(e,t,n){const{createElement:r}=n(0);e.exports=function(e={}){return r("div",{className:"search"},r("input",{className:"search-input",placeholder:"Search by name",onkeyup:e.onkeyup}))}},function(e,t,n){const{createElement:r}=n(0),o=n(13);e.exports=function(e={}){const t=e.data||[];return listResults=0===t.length?r("span",{className:"no-results"},"Sorry, no results found"):r("ul",{className:"list"},...t.map(o))}},function(e,t,n){const{createElement:r}=n(0);function o(e){return r("tr",{},r("th",{},e.name),r("td",{},r("span",{className:"histogram",style:`width: ${e.histogram}%`})),r("td",{},e.count.toString()))}e.exports=function(e={}){return r("li",{className:"item"},r("header",{},r("span",{className:"item-position"},e.position.toString()),r("h2",{className:"item-name"},e.name),r("span",{className:"item-count"},`${e.count} dogs`),r("span",{className:"item-male"},`Male ${e.gender.male}%`),r("span",{className:"item-female"},`Female ${e.gender.female}%`),r("span",{className:"item-unknown"},`Unknown ${e.gender.unknown}%`)),r("table",{},r("caption",{},"Top breeds"),...e.breeds.map(o)))}}]);