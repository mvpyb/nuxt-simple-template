/* eslint-disable */

export default ( { app, store } ) => {
  // if (process.env.NODE_ENV === 'development') return

  const options = store.state.option.data
  //查看是否设置id
  if ( !options || !options.baidu_analyze || options.baidu_analyze === '' ) return

  const baidu_analyze = options.baidu_analyze

  /*
   ** baidu 统计分析脚本
   */
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script")
    hm.src = "https://hm.baidu.com/hm.js?" + baidu_analyze
    var s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore(hm, s);
  })();


  app.router.afterEach((to, from) => {
    var _hmt = _hmt || [];
    (function () {
      document.getElementById('bdtj') && document.getElementById('bdtj').remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?" + baidu_analyze;
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  })
}
