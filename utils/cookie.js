import CONFIG from '@/config'
import Cookies from 'js-cookie'
const { DOMAIN, ENV_PREFIX } = CONFIG

class CookieProxy {
  constructor() {
    this.prefix = this.getPrefix()
    this.baseParams = {
      expires : 7,
      path : '/',
      domain : DOMAIN || undefined
      // Secure : true,
      // SameSite : 'none',
    }
  }

  // TODO : 此处也是按照我司开发习惯添加的，主要是为了区分 fat uat pro 三个环境的cookie，可以根据自己需要修改或删除
  getPrefix() {
    let cookiePreFix
    if ( ENV_PREFIX === 'dev' ) {
      cookiePreFix = 'fat_'
    } else if ( ENV_PREFIX === 'fat' ) {
      cookiePreFix = 'fat_'
    } else if ( ENV_PREFIX === 'uat' ) {
      cookiePreFix = 'uat_'
    } else {
      cookiePreFix = ''
    }
    return cookiePreFix
  }

  getAll() {
    return Cookies.get()
  }

  clearAll() {
    const keys = Object.keys( this.getAll() )
    keys.forEach( key => {
      this.remove( key, false )
    } )
  }

  get( key, hasPrefix = true ) {
    const keyStr = hasPrefix ? this.prefix + '' + key : key
    return Cookies.get( keyStr )
  }

  set( key, value, params ) {
    const options = params === undefined ? this.baseParams : params
    const keyStr = this.prefix + '' + key
    return Cookies.set( keyStr, value, options )
  }

  remove( key, hasPrefix = true ) {
    const keyStr = !hasPrefix ? key : this.prefix + '' + key
    return Cookies.remove( keyStr, {
      path : '/',
      domain : DOMAIN
    } )
  }
}
const cookies = new CookieProxy()
export default cookies

