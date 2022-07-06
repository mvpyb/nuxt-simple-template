
export default {

  // 请求超时时间 默认30s
  TIMEOUT : 30 * 1000,
  // message notify 的默认显示时间
  DURATION : 2000,
  // cookie 前缀
  COOKIE_PREFIX : 'portal_',
  // code 白名单
  WHITE_CODE_LIST : [
    {
      code : 200,
      msg : 'success'
    }
  ],
  // token 错误
  LOGIN_ERROR_CODE : [
    {
      code : 5004,
      msg : '无效token'
    }
  ],
  REQUEST_BASE_URL : '',
  DOMAIN : '.shadowcreator.com',

  // 开发环境接口域名
  ENV_PREFIX : 'dev',
  DEV_API_URL : 'http://webapi-fat.shadowcreator.com/100061',
  SSR_API_URL : 'http://webapi-fat.shadowcreator.com/100061'

  // // 开发环境接口域名
  // ENV_PREFIX : 'fat',
  // DEV_API_URL : 'https://api-fat.qulivr.com/100050',
  // SSR_API_URL : 'https://api-fat.qulivr.com/100050'

  // // UAT
  // ENV_PREFIX : 'uat',
  // DEV_API_URL : 'https://api-uat.qulivr.com/100050',
  // SSR_API_URL : 'https://api-uat.qulivr.com/100050'

  // // PRO
  // ENV_PREFIX : 'pro',
  // DEV_API_URL : 'https://api.qulivr.com/100050',
  // SSR_API_URL : 'https://api.qulivr.com/100050'
}
