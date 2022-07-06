
// https://www.tweenmax.com.cn/api/tweenmax/
// import { TweenMax, TweenLite } from 'gsap'

import { gsap } from 'gsap'
import Vue from 'vue'
export default () => {
  Vue.prototype.$gsap = gsap
}
