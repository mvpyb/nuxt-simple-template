
/**
 * 针对给出的请求实例进行本地化配置
 */
import axios from 'axios'
import { Message } from 'element-ui'
import cookies from '@/utils/cookie'
import CONFIGS from '../config'
// import Vue from 'Vue'
// import Vuex from 'Vuex'
// const app = Vue.prototype

// const isServer = !!process.server
const isClient = !!process.client

class HttpRequest {
  // #baseUrl
  constructor() {
    this.baseUrl = this.getBaseUrl()
    this.withCredentials = false
    this.timeout = CONFIGS.TIMEOUT
  }

  getBaseUrl() {
    const urlSuffix = ''
    const baseURL = `${CONFIGS.SSR_API_URL}${urlSuffix}`
    return baseURL
  }

  getConfig() {
    const config = {
      baseURL : this.baseUrl,
      timeout : this.timeout,
      withCredentials : this.withCredentials,
      headers : {
        'Content-Type' : 'application/json;charset=UTF-8'
      }
    }
    return config
  }

  getParams( payload ) {
    const { method, data } = payload
    if ( ['post', 'put', 'patch', 'delete'].indexOf( method ) >= 0 ) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  checkStatus( status ) {
    let errMessage = ''
    switch ( status ) {
      case 400:
        errMessage = '错误请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `连接错误`
    }
    return errMessage
  }

  // 拦截处理
  setInterceptors( instance ) {
    const that = this

    // 请求拦截
    instance.interceptors.request.use( config => {
      if ( isClient && !navigator.onLine ) {
        Message( {
          message : '请检查您的网络是否正常',
          type : 'error',
          duration : CONFIGS.DURATION
        } )
        return Promise.reject( '请检查您的网络是否正常' )
      }

      const token = cookies.get( CONFIGS.COOKIE_PREFIX + 'token' )
      config.headers.common['token'] = token
      // config.data = qs.stringify( config.data )

      return config
    }, ( error ) => {
      return Promise.reject( error )
    } )

    // 响应拦截
    instance.interceptors.response.use( res => {
      const result = res.data
      const type = Object.prototype.toString.call( result )

      // 如果是文件流 直接返回
      if ( type === '[object Blob]' || type === '[object ArrayBuffer]' ) {
        return result
      } else {
        const { code, message } = result
        const isErrorToken = CONFIGS.LOGIN_ERROR_CODE.find( item => item.code == code )
        const isWhiteCode = CONFIGS.WHITE_CODE_LIST.find( item => item.code == code )

        if ( isErrorToken ) {
          if ( isClient ) {
            // window.$nuxt.$router.push( '/login' )
            // window.$nuxt.$store.dispatch( 'user/LoginOut' )
            window.location.reload()
          }
        } else if ( !isWhiteCode ) {
          Message( {
            message : message || 'Error',
            type : 'error',
            duration : CONFIGS.DURATION
          } )
          return Promise.reject( message || 'Error' )
        } else {
          return result
        }
      }
    }, ( error ) => {
      if ( error && error.response ) {
        error.message = that.checkStatus( error.response.status )
      }
      const isTimeout = error.message.includes( 'timeout' )
      Message( {
        message : isTimeout ? '网络请求超时' : ( error.message || '连接到服务器失败' ),
        type : 'error',
        duration : CONFIGS.DURATION
      } )
      return Promise.reject( error.message )
    } )
  }

  request( options ) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign( {}, baseOpt, this.getParams( options ) )
    this.setInterceptors( instance )
    return instance( params )
  }
}

const http = new HttpRequest()
export default http

