(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{526:function(t,e,d){},527:function(t,e,d){},540:function(t,e,d){"use strict";d(526)},541:function(t,e,d){"use strict";d(527)},546:function(t,e,d){"use strict";d.r(e);var o=d(9),n=(d(50),d(211)),r=d(531),c=d(532),l={name:"Index",layout:"base",components:{MagicSliderCute:r.default,MagicSliderMasters:c.default},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},data:function(){return{isSpider:n.a.isSpider,loading:!1,headTitle:"",headKeywords:"",headDesc:"",tween:null,currentSlider:0,showBall:!1}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.headTitle||t.getInfo(),t.animate1(),t.initBall();case 3:case"end":return e.stop()}}),e)})))()},methods:{getInfo:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var d,o,n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d={headTitle:"2_不是爬虫",headKeywords:"2_不是爬虫",headDesc:"2_不是爬虫"},e.next=3,t.$store.dispatch("test/getTestInfo",d);case 3:o=e.sent,n=o.headTitle,r=o.headKeywords,c=o.headDesc,t.headTitle=n,t.headKeywords=r,t.headDesc=c;case 10:case"end":return e.stop()}}),e)})))()},play:function(){this.tween.play()},inputSlider:function(t){this.tween.pause(),this.tween.progress(.01*t)},animate1:function(){var t=this.$gsap;console.log("gsap",t);var e=this.$refs["tween-max-item1"];if(t&&e){var d=t.from(e,{id:"toAnimate",opacity:0,y:400,duration:6});d.pause(),console.log("tween",d),this.tween=d}},initBall:function(){var t=this;this.showBall=!0,this.$nextTick((function(){var e=t.$gsap,d=t.$refs.ball;if(e&&d){e.set(d,{xPercent:-50,yPercent:-50});var o={x:window.innerWidth/2,y:window.innerHeight/2},n={x:o.x,y:o.y},r=e.quickSetter(d,"x","px"),c=e.quickSetter(d,"y","px");window.addEventListener("mousemove",(function(t){n.x=t.x,n.y=t.y})),e.ticker.add((function(){var dt=1-Math.pow(.65,e.ticker.deltaRatio());o.x+=(n.x-o.x)*dt,o.y+=(n.y-o.y)*dt,r(o.x),c(o.y)}))}}))},getProperty:function(){var t=this.$gsap,e=this.$refs["tween-max-item1"],d=t.getProperty(e,"width","px");console.log("getProperty res",d)},getTweensOf:function(t){var e=this.$gsap.getTweensOf(t);console.log("getTweensOf",e)}},head:function(){return{title:this.headTitle,meta:[{hid:"keywords",name:"keywords",content:this.headKeywords},{hid:"description",name:"description",content:this.headDesc}]}}},v=(d(540),d(541),d(17)),component=Object(v.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"section main-section"},[e("div",{staticClass:"main-body"},[e("MagicSliderCute"),t._v(" "),e("MagicSliderMasters",{scopedSlots:t._u([{key:"captions",fn:function(){return[e("div",{staticClass:"ms-layer ms-caption master-slider-item--caption"},[t._v("我是一个图层文字")])]},proxy:!0}])}),t._v(" "),t._m(0)],1)])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"aos-all clearfix"},[e("div",{staticClass:"aos-item",attrs:{"data-id":"1","data-aos":"fade-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"2","data-aos":"fade-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"3","data-aos":"zoom-out-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"4","data-aos":"flip-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"5","data-aos":"flip-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"6","data-aos":"fade-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"7","data-aos":"fade-in"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"8","data-aos":"fade-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"9","data-aos":"fade-in"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"10","data-aos":"fade-down","data-aos-id":"super-duper"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"11","data-aos":"fade-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"12","data-aos":"fade-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"13","data-aos":"fade-in"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"14","data-aos":"fade-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"15","data-aos":"fade-in"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"16","data-aos":"fade-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"17","data-aos":"fade-down"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"18","data-aos":"fade-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"19","data-aos":"zoom-out"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"20","data-aos":"fade-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"21","data-aos":"zoom-out"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"22","data-aos":"fade-in"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"23","data-aos":"zoom-out-up"}}),t._v(" "),e("div",{staticClass:"aos-item",attrs:{"data-id":"24","data-aos":"zoom-out-down"}})])}],!1,null,"5ecc7d1b",null);e.default=component.exports;installComponents(component,{MagicSliderCute:d(531).default,MagicSliderMasters:d(532).default})}}]);
//# sourceMappingURL=42bffd9.js.map