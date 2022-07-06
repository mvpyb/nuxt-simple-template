
/**
 * 自动收录埋点，也可做百度统计等埋点
 * https://www.sousuoyinqingtijiao.com/toutiao/
 *
 * 必应 ： https://www.bing.com/webmasters/sitescan?siteUrl=https://bbstest.qulivr.com/
 * f8b48cfd7c2c4b7e9d5433294d42bd2d
 *
 * */

const spiderList = [
  // {
  //   id : 'sozz',
  //   src : 'https://test.js',
  //   des : '360',
  //   doc : 'http://zhanzhang.so.com/sitetool/auto_include'
  // },
]

export default ( { app : { router }, store } ) => {
  /* 每次路由变更时进行pv统计 */
  router.afterEach( ( to, from, next ) => {
    try {
      spiderList.forEach( item => {
        const params = {
          ...item,
          des : `${item.des}_${to.fullPath}`
        }
        writeCode( params )
      } )
    } catch ( e ) {
      console.log( e )
    }
  } )
}

function writeCode( params ) {
  // eslint-disable-next-line no-var
  var _hmt = _hmt || [];
  ( function() {
    if ( process.client ) {
      document.getElementById( params.id ) && document.getElementById( params.id ).remove()
      const hm = document.createElement( 'script' )
      hm.src = params.src
      hm.id = params.id
      hm.setAttribute( 'des', params.des )
      const s = document.getElementsByTagName( 'script' )[0]
      s.parentNode.insertBefore( hm, s )
    }
  } )()
}
