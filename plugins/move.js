
// https://www.npmjs.com/package/move-js
// http://visionmedia.github.io/move.js/
import Vue from 'vue'
import Move from 'move-js'

export default () => {
  // Vue.use( Move )
  Vue.prototype.$move = Move
}
