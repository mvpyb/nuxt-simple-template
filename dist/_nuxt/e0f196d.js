(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{549:function(e,n,t){"use strict";t.r(n);var o=t(9),r=(t(50),{name:"Index",props:{options:{type:Object,default:function(){}},playsinline:{type:Boolean,default:!0}},data:function(){return{playerOptions:{autoplay:!0,controls:!1,loop:!1,muted:!0,preload:"auto",fluid:!0,inactivityTimeout:0,nativeControlsForTouch:!1,notSupportedMessage:!1,techOrder:["html5"],language:"zh",playbackRates:[.7,1,1.5,2]},videoOptions:{}}},created:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.videoOptions=Object.assign({},e.playerOptions,e.options);case 1:case"end":return n.stop()}}),n)})))()},mounted:function(){return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:{onPlayerPlay:function(e){this.$emit("onPlayerPlay",e)},onPlayerPause:function(e){this.$emit("onPlayerPause",e)},onPlayerEnded:function(e){this.$emit("onPlayerEnded",e)},onPlayerLoadeddata:function(e){this.$emit("onPlayerLoadeddata",e)},onPlayerWaiting:function(e){this.$emit("onPlayerWaiting",e)},onPlayerPlaying:function(e){this.$emit("onPlayerPlaying",e)},onPlayerTimeupdate:function(e){this.$emit("onPlayerTimeupdate",e)},onPlayerCanplay:function(e){this.$emit("onPlayerCanplay",e)},onPlayerCanplaythrough:function(e){this.$emit("onPlayerCanplaythrough",e)},playerStateChanged:function(e){this.$emit("playerStateChanged",e)},playerReadied:function(e){this.$emit("playerReadied",e)}},head:function(){return{title:this.headTitle,meta:[{hid:"keywords",name:"jimo",content:this.headKeywords},{hid:"description",name:"jimo",content:this.headDesc}]}}}),l=t(17),component=Object(l.a)(r,(function(){var e=this;return(0,e._self._c)("div",{directives:[{name:"video-player",rawName:"v-video-player:myVideoPlayer",value:e.videoOptions,expression:"videoOptions",arg:"myVideoPlayer"}],staticClass:"video-player-box",attrs:{playsinline:e.playsinline,autoplay:e.playerOptions.autoplay},on:{play:function(n){return e.onPlayerPlay(n)},pause:function(n){return e.onPlayerPause(n)},ended:function(n){return e.onPlayerEnded(n)},loadeddata:function(n){return e.onPlayerLoadeddata(n)},waiting:function(n){return e.onPlayerWaiting(n)},playing:function(n){return e.onPlayerPlaying(n)},timeupdate:function(n){return e.onPlayerTimeupdate(n)},canplay:function(n){return e.onPlayerCanplay(n)},canplaythrough:function(n){return e.onPlayerCanplaythrough(n)},ready:e.playerReadied,statechanged:function(n){return e.playerStateChanged(n)}}})}),[],!1,null,"0f7aee5a",null);n.default=component.exports}}]);
//# sourceMappingURL=e0f196d.js.map