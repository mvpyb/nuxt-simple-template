
import cheerio from 'cheerio'
import config from './config.js'
import zhLocale from './plugins/lang/zh.js'
import enLocale from './plugins/lang/en.js'
// import fs from 'fs'

const path = require( 'path' )

function resolve( dir ) {
  return path.join( __dirname, dir )
}

const port = 9529
const { DEV_API_URL, SSR_API_URL } = config
const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  ['component',
    {
      libraryName : 'element-ui',
      styleLibraryName : 'theme-chalk'
    }
  ]
  // ['@babel/plugin-proposal-private-methods', { loose: true }]
]
//  生产环境清除log
if ( isProduction ) {
  plugins.push( 'transform-remove-console' )
}

export default {
  alias : {
    '@img' : resolve( './assets/imgs' ),
    '@styles' : resolve( './assets/styles' ),
    '@icons' : resolve( './assets/icons' )
  },
  axios : {
    // proxyHeaders: false
    proxy : !isProduction
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build : {
    base : process.env.NODE_ENV === 'production' ? '/nuxt-simple-template/dist/' : '',
    analyze : false,
    corejs : 'auto',
    // 生产环境抽离css
    extractCSS : isProduction,
    optimization : {
      splitChunks : {
        chunks : 'all',
        minSize : 100 * 100,
        maxSize : 10000 * 100,
        cacheGroups : {}
      }
    },
    transpile : [/^element-ui/],
    // element 按需加载
    // publicPath : 'https://cdn.nuxtjs.org', // 允许您将dist文件上传到 CDN 来获得最快渲染性能
    // svg处理
    extend( config, context ) {
      const { isClient, isDev } = context

      // Run ESLint on save
      if ( isDev && isClient ) {
        config.devtool = 'eval-source-map'
        config.module.rules.push( {
          enforce : 'pre',
          test : /\.(js|vue)$/,
          loader : 'eslint-loader',
          exclude : /(node_modules)/
        } )
      }

      if ( isClient ) {
        config.devtool = '#source-map'
      }

      // // 条件编译
      // config.module.rules.push( {
      //   enforce : 'pre',
      //   test : /\.(js|vue|css|scss)$/,
      //   loader : {
      //     loader : 'js-conditional-compile-loader',
      //     options : {
      //       isDebug : process.env.NODE_ENV === 'development',
      //       isPro : process.env.NODE_ENV === 'pro',
      //       default : process.env.default === 'default',
      //       others : process.env.default === 'others'
      //     }
      //   },
      //   exclude : /(node_modules)/
      // } )

      const svgRule = config.module.rules.find( rule => rule.test.test( '.svg' ) )
      svgRule.exclude = [resolve( 'assets/icons/svg' )]

      config.module.rules.push( {
        test : /\.svg$/,
        include : [resolve( 'assets/icons/svg' )],
        use : [
          {
            loader : 'svg-sprite-loader',
            options : {
              symbolId : 'icon-[name]'
            }
          }
        ]
      } )
    },
    ssr : true

    // postcss : {
    //   // // 添加插件名称作为键，参数作为值
    //   // // 使用npm或yarn安装它们
    //   // plugins : {
    //   //   // 通过传递 false 来禁用插件
    //   //   'postcss-url' : false,
    //   //   'postcss-nested' : {},
    //   //   'postcss-responsive-type' : {},
    //   //   'postcss-hexrgba' : {}
    //   // },
    //   preset : {
    //     // 更改postcss-preset-env 设置
    //     autoprefixer : {
    //       grid : true
    //     }
    //   }
    // }
  },

  cli : {
    badgeMessages : ['您使用的是小灰灰构建的nuxt-simple-template'],
    bannerColor : 'green'
  },

  // Global CSS
  css : [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/reset.scss',
    'video.js/dist/video-js.css'
  ],
  components : true,

  dev : process.env.NODE_ENV !== 'production',

  env : {
    domain : SSR_API_URL || DEV_API_URL,
    baseUrl : process.env.BASE_URL || '/',
    NODE_ENV : 'dev'
  },

  // 全局headers配置: https://go.nuxtjs.dev/config-head
  head : {
    title : 'nuxt simple template',
    htmlAttrs : {
      lang : 'zh'
    },
    meta : [
      { charset : 'utf-8' },
      { 'http-equiv' : 'expires', content : '0' },
      { 'http-equiv' : 'pragma', content : 'no-cache' },
      { 'http-equiv' : 'Cache-Control', content : 'no-cache, must-revalidate' },
      { 'http-equiv' : 'X-UA-Compatible', content : 'IE=edge,chrome=1' },
      { name : 'renderer', content : 'webkit|ie-comp|ie-stand' },
      { name : 'referrer', content : 'no-referrer' },
      { name : 'HandheldFriendly', content : 'true' },
      { hid : 'keywords', name : 'nuxt nuxt-simple-template element mvpyb 灰是小灰灰的灰', content : '' },
      { hid : 'description', name : '极简的 nuxt + element UI 的模板。它只包含了 Nuxt & Element & axios & iconfont & EsLint，这些搭建nuxt项目时必要的东西', content : '' }
    ],
    link : [
      { rel : 'icon', type : 'image/x-icon', href : '/favicon.ico' }
    ],
    noscript : [
      { innerHTML : 'This website requires JavaScript.' }
    ],
    script : [
      { src : '/js/jquery-1.8.2.js', type : 'text/javascript', charset : 'utf-8' },
      { src : '/js/modernizr.js', type : 'text/javascript', charset : 'utf-8' },
      { src : '/js/cute/cute.slider.js', type : 'text/javascript', charset : 'utf-8' },
      { src : '/js/cute/cute.transitions.all.js', type : 'text/javascript', charset : 'utf-8' },
      { src : '/js/respond.min.js', type : 'text/javascript', charset : 'utf-8' },
      { src : '/script/skroller.min.js', type : 'text/javascript', charset : 'utf-8' },
      { src : '/js/master/masterslider.js', type : 'text/javascript', charset : 'utf-8' }
      // { src : '/script/flexible.js', type : 'text/javascript', charset : 'utf-8' }
      // { src : '/script/rem.js', type : 'text/javascript', charset : 'utf-8' }
    ]
  },
  // https://www.nuxtjs.cn/api/configuration-hooks
  hooks : {
    'render:route' : ( url, result ) => {
      const $ = cheerio.load( result.html, { decodeEntities : false } )
      $( `meta` ).removeAttr( 'data-n-head' )
      result.html = $.html()
    }
  },

  // https://i18n.nuxtjs.org/options-reference
  i18n : {
    locales : ['zh', 'en'],
    defaultLocale : 'zh',
    vueI18n : {
      fallbackLocale : 'zh',
      messages : {
        en : {
          ...enLocale
        },
        zh : {
          ...zhLocale
        }
      }
    }
  },
  general : {
    dir : 'dist',
    devtools : true,
    // 在将生成的站点部署到静态主机时，可以使用此文件。它将回退到模式：mode:'spa'。
    fallback : true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules : [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/proxy'
  ],

  // https://go.nuxtjs.dev/config-plugins
  plugins : [
    '@/plugins/axios',
    '@/plugins/element-ui',
    '@/plugins/svg-icon',
    '@/plugins/route',
    // 添加自动收录等埋点
    '@/plugins/included.js',
    { src : '@/plugins/gsap', ssr : false },
    { src : '@/plugins/video-player.js', ssr : false },
    { src : '@/plugins/move.js', ssr : false },
    { src : '@/plugins/swiper.js', ssr : false },
    { src : '@/plugins/aos.js', ssr : false },
    { src : '@/plugins/cropper', ssr : false }
  ],

  proxy : isProduction ? {} : {
    '/v1' : {
      target : DEV_API_URL,
      changeOrigin : true,
      pathRewrite : {
        '^/v1' : ''
      }
    }
  },

  router : {
    middleware : 'header'
  },

  server : {
    port
    // https : {
    //   key : fs.readFileSync( resolve( 'cert.key' ) ),
    //   cert : fs.readFileSync( resolve( 'cert.crt' ) )
    // }
  },

  target : 'server',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules : []

}
