
/* eslint-disable */
(function () {
  toSize();
  window.onresize = function () {
    toSize(); //屏幕大小改变的时候，重新计算一下 rem的基准值
  };
  function toSize() {
    var html = document.documentElement; //获取html
    var width = html.clientWidth; //获取到html的宽度
    var nub = 14; //把rem的基准值(也就是html的字体大小)，设置成屏幕宽度的多少分之一
    html.style.fontSize = width / nub + "px"; //设置html的字体大小
  }
})();

