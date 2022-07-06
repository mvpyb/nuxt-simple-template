
// http://michalsnik.github.io/aos/
import Vue from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default () => {
  Vue.use( AOS )
  AOS.init( {
    easing : 'ease-out-back',
    duration : 1000
  } )
}
