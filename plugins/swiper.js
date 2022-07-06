
import Vue from 'vue'
import css from 'swiper/swiper.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
export default () => {
  console.log( 'process', process, process.client )
  if ( process.browser ) {
    Vue.use( VueAwesomeSwiper, { css } )
  }
  // Vue.use( VueAwesomeSwiper, { css } )
}
