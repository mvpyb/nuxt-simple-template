
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure( { showSpinner : false } )

// import http from '@/utils/request'
import cookies from '@/utils/cookie'
import CONFIGS from '../config'
const whiteList = [
  '/login', '/', '/hardware/jimo', '/hardware/actionone', '/hardware/jimo2'
]

const isClient = process.client

// // minimum 设置开始时最低百分比，默认是0.08
// NProgress.configure( { minimum : 0.1 } )
// // template改变进度条的HTML结构。为了保证进度条正常工作，需要一个包含role='bar' 属性的元素
// NProgress.configure( {
//   template : "<div class='....'>...</div>"
// } )
// // ease和speed ease可传递CSS3缓冲动画字符串（如ease、linear、ease-in、ease-out、ease-in-out、cubic-bezier）。speed为动画速度（默认200，单位ms）
// NProgress.configure( { easing : 'ease', speed : 500 } )
// // trickle 是否显示进度条，默认：true
// NProgress.configure( { trickle : false } )
// // trickleSpeed设置每次进度条步进速度(ms)
// NProgress.configure( { trickleSpeed : 200 } )
// // showSpinner是否显示环形进度动画，默认true
// NProgress.configure( { showSpinner : false } )
// // parent 指定改变的父容器，默认body
// NProgress.configure( { parent : '#container' } )

export default ( { app, store } ) => {
  app.router.beforeEach( async( to, from, next ) => {
    isClient && NProgress.start()
    if ( isClient ) {
      const hasToken = cookies.get( CONFIGS.COOKIE_PREFIX + 'token' )
      if ( hasToken ) {
        if ( to.path === '/login' ) {
          next( { path : '/' } )
          NProgress.done()
        } else {
          const hasRoles = store.getters.roles && store.getters.roles.length > 0
          if ( hasRoles ) {
            next()
          } else {
            try {
              // const params = {
              //   token : hasToken
              // }
              // const { roles } = await store.dispatch( 'user/getUserInfo', tokenData )
              // next( { ...to, replace : true } )
            } catch ( error ) {
              // await store.dispatch( 'user/loginOut' )
              // next( `/login` )
              // NProgress.done()
            }
          }
        }
      } else {
        if ( whiteList.indexOf( to.path ) !== -1 ) {
          next()
        } else {
          next( `/login` )
          NProgress.done()
        }
      }
    }
    next()
    isClient && NProgress.done()
  } )

  app.router.afterEach( () => {
    isClient && NProgress.done()
  } )
}
