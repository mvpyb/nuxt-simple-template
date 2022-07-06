import axios from 'axios'
import device from '../utils/device'

/**
 * 中间件 判断是不是爬虫
 */
export default function( context ) {
  if ( context && context.req && context.req.headers ) {
    // https://yq.aliyun.com/articles/655062
    const list = [
      // “Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)”
      // “AdsBot-Google-Mobile (+http://www.google.com/mobile/adsbot.html)
      // Mozilla (iPhone; U; CPU iPhone OS 3 0 like Mac OS X) AppleWebKit (KHTML, like Gecko) Mobile Safari”
      'Googlebot', // Google
      // “Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)”
      // Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)
      'Baiduspider', // baidu
      // 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
      // http://stool.chinaz.com/tools/robot.aspx
      // 360spider (http://webscan.360.cn)
      '360spider', // 360
      // Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)”
      'bingbot', // bingying
      // “Sosospider+(+http://help.soso.com/webspider.htm)”
      // “Sosoimagespider+(+http://help.soso.com/soso-image-spider.htm)”
      'Sosospider', // 腾讯soso
      'Sosoimagespider', // soso图片
      // “Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)”
      // “Mozilla/5.0 (compatible; Yahoo! Slurp China; http://misc.yahoo.com.cn/help.html)”
      'Yahoo', // 雅虎英文 雅虎中国
      // “http://pic.sogou.com” “Sogou Pic Spider/3.0(+http://www.sogou.com/docs/help/webmasters.htm#07)
      // “Sogou web spider/4.0(+http://www.sogou.com/docs/help/webmasters.htm#07)”
      'Sogou', // 搜狗
      // “Mozilla/5.0 (compatible; YoudaoBot/1.0; http://www.youdao.com/help/webmaster/spider/; )
      'YoudaoBot', // 网易有道
      'spider'
    ]
    const ua = context.req.headers['user-agent']
    if ( ua ) {
      const isSpider = !!list.find( item => ua.toLocaleLowerCase().indexOf( item.toLocaleLowerCase() ) >= 0 )
      device.isSpider = isSpider
      device.isSpider = true
    }
    axios.defaults.headers['authorization'] = ''
  }
}
