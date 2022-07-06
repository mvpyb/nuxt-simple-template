
let localStorage = null

const isBrowser = typeof window !== 'undefined'
localStorage = isBrowser ? window.localStorage : {}

/**
 * 是否支持本地存储
 * @returns {boolean} true：支持；false：不支持
 */
function isSupport() {
  const key = '__ybtest_ls__'
  try {
    if ( localStorage ) {
      localStorage.setItem( key, key )
      localStorage.getItem( key )
      return true
    }
    return false
  } catch ( error ) {
    return false
  }
}
// 基数
const expiresRadix = 10
/**
 * LocalBridge 类
 */
class LocalBridge {
  constructor( options = {} ) {
    // 前缀
    const prefix = '__ls-'
    const expires = 0
    this.options = { prefix, expires, ...options }
    this.expiresPrefix = `expires${this.options.prefix}`
  }

  /**
   * 获取加上前缀的键
   * @param {string} key 键
   * @returns {string}
   */
  getKey( key ) {
    const { prefix } = this.options
    return `${prefix}${key}`
  }

  /**
   * 获取加上前缀的设置了过期时间的键
   * @param {string} key 键
   * @returns {string}
   */
  getExpiresKey( key ) {
    return `${this.expiresPrefix}${key}`
  }

  /**
   * 获取当前时间，单位秒
   * @returns {number}
   */
  getCurrentTime() {
    return Math.floor( new Date().getTime() / 1000 )
  }

  /**
   * 获取相当于当前时间的过期时间
   * @param {number} expires 过期时间 单位s
   * @returns {string}
   */
  getExpiresValue( expires ) {
    expires = expires || 0
    const time = this.getCurrentTime()
    return ( time + expires ).toString( expiresRadix )
  }

  /**
   * 剔除指定的存储项以及存储项对应的过期项
   * @param {string} key 键
   */
  shiftItem( key ) {
    if ( !isSupport() ) return false
    localStorage.removeItem( this.getKey( key ) )
    localStorage.removeItem( this.getExpiresKey( key ) )
  }

  /**
   * 判断是否过期
   * @param {string} key 键
   * @returns {boolean}
   */
  isExpired( key ) {
    if ( !isSupport() ) return
    const expiresValue = localStorage.getItem( this.getExpiresKey( key ) )
    if ( expiresValue ) {
      const expirationTime = parseInt( expiresValue, expiresRadix )
      const nowTime = this.getCurrentTime()
      console.log( '判断是否过期', expirationTime, nowTime )
      // 如果当前时间大于过期时间，删除对应的项
      if ( nowTime > expirationTime ) {
        this.shiftItem( key )
        return true
      }
    }
  }

  /**
   * 设置数据项
   * @param {string} key 键
   * @param {any} value 值
   * @param {number} expires 过期时间，单位秒
   */
  set( key, value, expires ) {
    const rkey = this.getKey( key )
    let valueJson = value
    if ( !isSupport() ) return false
    try {
      valueJson = JSON.stringify( value )
    } catch ( error ) {
      return false
    }
    try {
      localStorage.setItem( rkey, valueJson )
      const expiresKey = this.getExpiresKey( key )
      if ( expires ) {
        localStorage.setItem( expiresKey, this.getExpiresValue( expires ) )
      } else {
        localStorage.removeItem( expiresKey )
      }
    } catch ( error ) {
      return false
    }
    return true
  }

  /**
   * 获取指定项的值
   * @param {string} key 键
   * @returns {any}
   */
  get( key ) {
    if ( !isSupport() ) return null
    // 如果过期就直接返回 null 值
    if ( this.isExpired( key ) ) return null
    const value = localStorage.getItem( this.getKey( key ) )
    try {
      return JSON.parse( value )
    } catch ( error ) {
      return value
    }
  }

  /**
   * 删除指定项
   * @param {string} key 建
   */
  remove( key ) {
    if ( !isSupport() ) return
    this.shiftItem( key )
  }

  /**
   * 清空所有存储项
   */
  clear() {
    if ( !isSupport() ) return
    localStorage.clear()
  }
}

export { LocalBridge }
export default LocalBridge

