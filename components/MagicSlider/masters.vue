
<template>
  <div class="master-slider-section">
    <div :id="sliderContainerId" class="master-slider ms-skin-default">
      <div
        v-for="item in sliderList"
        :key="item.id"
        class="ms-slide master-slider-item"
        :data-fill-mode="item.dataFillMode"
        :data-delay="item.dataDelay"
      >
        <img
          class="slider-item-img"
          :src="item.img.src"
          :data-src="item.img.dataSrc"
          :alt="item.img.alt"
        >
        <img
          v-if="item.thumb"
          class="ms-thumb slider-item-img--thumb"
          :src="item.img.thumb"
          :alt="item.img.thumbAlt"
        >
        <!--<slot name="captions" />-->
        <!--<a v-if="item.link" :href="item.link.href" :target="item.link.target" v-html="item.link.content" />

        <a
          v-if="item.video"
          :href="item.video.href"
          :data-autoplay="item.video.dataAutoplay"
          data-type="video"
          v-html="item.video.content"
        />

        <video
          v-if="item.videoBackground"
          :data-autopause="item.videoBackground.dataAutopause"
          :data-mute="item.videoBackground.dataMute"
          :data-loop="item.videoBackground.dataLoop"
          :data-fill-mode="item.videoBackground.dataFillMode"
        >
          <source
            v-for="( vItem, vIndex ) in item.videoBackground"
            :id="vItem.id"
            :key="vItem.id + '_' + vIndex"
            :src="vItem.src"
            :type="vItem.type"
          >
        </video>-->
      </div>
    </div>
  </div>
</template>

<script>
// http://www.masterslider.com/doc/#slider-options
export default {
  name : 'Cute',
  props : {
    sliderContainerId : {
      type : String,
      default : 'masterSlider'
    },

    width : {
      type : String,
      default : '610'
    },
    height : {
      type : String,
      default : '400'
    },
    sliderWrapperId : {
      type : String,
      default : 'my-cute-slider'
    },

    // 表示幻灯片是否以随机顺序显示幻灯片，默认值“false”
    shuffle : {
      type : Boolean,
      default : false
    },
    // 表示幻灯片是否会在鼠标悬停在幻灯片上时暂停，默认值“true”
    overpause : {
      type : Boolean,
      default : true
    },
    // 通过这个参数，你可以强制滑块使用指定的方法来渲染过渡。它可以是以下值之一：
    // "2d" 2d 过渡动效
    // "canvas" 确定用于渲染 3D 过渡的画布方法 [注意：在旧浏览器中不起作用]
    // "css3d" 确定用于渲染 3D 过渡的 CSS3 3D 变换方法 [注意：在旧浏览器中不起作用]
    force : {
      type : String,
      default : 'css3d'
    },

    list : {
      type : Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading : false,
      slider : null,
      sliderList : []
    }
  },
  computed : {

  },
  async created() {
    await this.getList()
  },
  async mounted() {
    this.$nextTick( () => {
      if ( process.client ) {
        // eslint-disable-next-line no-undef
        const MasterSliders = window.MasterSlider || MasterSlider
        var slider = new MasterSliders()
        const options = {
          width : 800, // 幻灯片的基本宽度。它有助于滑块以正确的比例调整大小
          height : 350, // 幻灯片的基本高度，它有助于滑块以正确的比例调整大小。

          start : 1, // 滑块起始幻灯片编号。
          space : 5, // 幻灯片之间的间距值（以像素为单位）。
          grabCursor : true, // 滑块是否使用抓取鼠标光标。
          swipe : true, // 是否启用拖动/滑动导航。
          mouse : true, // 用户是否可以使用鼠标拖动导航。
          wheel : false, // 启用鼠标滚轮导航。
          keyboard : true, // 启用键盘导航。
          autoplay : false, // 启用自动播放幻灯片。
          loop : true, // 启用连续滑动模式。
          shuffle : false, // 启用随机滑动顺序。
          preload : 0, // 指定由滑块加载的幻灯片数量。0 值表示滑块将按顺序加载幻灯片，“全部”值表示滑块将在开始时加载所有幻灯片。此选项仅对具有“data-src”属性的图像有效

          // boxed：滑块的默认布局，滑块的大小不超过滑块选项中指定的宽度和高度。
          // fullwidth：强制滑块使宽度适应浏览器宽度。
          // 全屏：强制滑块使宽度和高度适应浏览器窗口尺寸。
          // fillwidth：使滑块能够适应其父元素的宽度。
          // 自动填充：使滑块能够适应其父元素的宽度和高度。
          // partialview：就像盒装布局一样，但附近的幻灯片始终可见。
          layout : 'boxed',
          fullscreenMargin : 0, // 指定滑块底部的边距空间，它只影响“全屏”布局。
          heightLimit : false, // 它强制幻灯片使用最大高度值作为其基础指定的高度值。
          autoHeight : true, // 滑块是否使其高度适应每个幻灯片的高度。它覆盖 heightLimit 选项。
          smoothHeight : true, // 滑块在其高度变化时是否使用平滑动画。
          endPause : false, // 滑块是否在到达最后一张幻灯片时暂停幻灯片放映。
          overPause : false, // 滑块是否在悬停时暂停幻灯片放映。
          fillMode : 'fill', // 指定幻灯片背景缩放方法。其可接受的值为“fill”、“fit”、“stretch”、“center”和“tile”。
          centerControls : true, // 滑块是否将 UI 控件居中对齐。此选项仅在全宽模式下有效。
          layersMode : 'center', // 它接受两个值“center”和“full”。“center”值表示滑块将图层与中心对齐。此选项仅在全宽模式下有效。
          instantStartLayers : false, // 是否在幻灯片过渡完成之前开始显示图层的过渡。

          // 由于 v1.7.0
          // 指定层视差移动的类型，它接受以下值：
          // “mouse”：鼠标移动时移动图层
          // “swipe”：它在滑块滑动或滑动时移动图层。
          // "mouse:x-only"：当鼠标移动（水平移动）时，它只在 X 轴上移动图层。
          // "mouse:y-only"：当鼠标移动（垂直移动）时，它只在 Y 轴上移动图层。
          parallaxMode : 'mouse', //

          hideLayers : true, // 滑块是否在更改幻灯片前隐藏所有图层。
          speed : 17, // 指定幻灯片更改速度。它接受 0 到 100 之间的浮点值。
          dir : 'h', // 指定幻灯片更改方向。它接受两个值“h”（水平）和“v”（垂直）。

          // view:'basic', // 幻灯片更改过渡。更多信息 http://www.masterslider.com/doc/#views
          // view:'fade',
          // view:'mask',
          // view:'wave',
          view : 'flow',
          // view:'stack',
          // view:'scale',
          // view:'focus',
          // view:'parallaxMask',
          // view:'partialWave',
          // view:'fadeBasic',
          // view:'fadeWave',
          // view:'scaleFlow',

          // filters:null, // 将 CSS3 过滤器应用于幻灯片过渡视图。有关更多信息，请查看 https://developer.mozilla.org/en-US/docs/Web/CSS/filter
          filters : {
            grayscale : 1,
            opacity : 0.5,
            brightness : 2
          },

          deepLink : null, // 将在浏览器地址栏中使用的滑块的唯一名称，您可以输入自己的名称，否则滑块会生成唯一名称。
          deepLinkType : 'path', // 指定在地址栏中显示滑块深层链接永久链接的类型。可接受的值：“path”和“query”
          startOnAppear : false, // 当滚动时滑块进入浏览器窗口时，它会初始化滑块。

          fullwidth : true //

          // more slider options goes here...
          // check slider options section in documentation for more options.
        }

        slider.setup( this.sliderContainerId, options )
        // adds Arrows navigation control to the slider.
        slider.control( 'arrows' )
        this.slider = slider
      }
    } )
  },
  methods : {
    getList() {
      const list = []
      const baseUrl = 'https://resources-uat.shadowcreator.com/www/cute-slide/'
      for ( let i = 1; i < 10; i++ ) {
        const obj = {
          id : i,
          dataDelay : '2', // 单位 : 秒
          dataFillMode : 'fit', // 填充模式 : fill fit stretch center tile
          img : {
            // 渲染时 第一个img 为slider图片 如果想要显示缩略图,添加第二个img标签,class=ms-thumb
            src : `${baseUrl}cute-theme/blank.jpg`, //
            dataSrc : `${baseUrl}images/${i}.jpg`, // 图片的URL
            alt : `${i}_slider`,

            thumb : `${baseUrl}images/thumbs/${i}.jpg`, // 缩略图
            thumbAlt : `${i}_thumb_slider`
          }

          // link : {
          //   href : '',
          //   target : '_blank',
          //   content : `${i}__我是一个链接`
          // },
          //
          // // slider 添加 点击播放视频
          // video : {
          //   href : 'http://media.w3.org/2010/05/bunny/trailer.mp4',
          //   content : `${i}__我是一个video呀`,
          //   dataAutoplay : true
          // },

          // // 标题字幕 更多参数 : http://www.masterslider.com/doc/#slide-layers
          // captions : {
          //   content : `我是一个弹幕弹幕${i}`,
          //   effect : 'fade', // fade || slide
          //   delay : '1500' // 显示字幕的延迟时间（毫秒）
          // },
          //
          // // video 背景
          // videoBackground : {
          //   dataMute : true,
          //   dataLoop : true,
          //   dataAutopause : false,
          //   dataFillMode : 'fill', // fill fit none
          //   // 视频资源列表
          //   source : [
          //     {
          //       id : i + '_mp4',
          //       src : 'http://media.w3.org/2010/05/bunny/trailer.mp4',
          //       type : 'video/mp4'
          //     },
          //     {
          //       id : i + '_ogv',
          //       src : 'http://media.w3.org/2010/05/bunny/trailer.ogv',
          //       type : 'video/ogg'
          //     }
          //   ]
          // }

        }
        list.push( obj )
      }
      this.sliderList = list
    }

  },
  head() {
    return {
      // ssr 部署时可以使用此方式,spa 则使用全局注入
      script : [
        // { src : '/js/master/jquery-1.8.2.js', type : 'text/javascript', charset : 'utf-8' },
        // { src : '/js/master/masterslider.js', type : 'text/javascript', charset : 'utf-8' }
      ]
    }
  }
}
</script>

<style>
  @import "./masterslider.main.css";
</style>
<style scoped lang="scss">
  /*::v-deep .master-slider-section{*/
  .master-slider-section{
    position:relative;
    min-width:300px;
    min-height:196px;
    max-width: 610px;
    max-height: 400px;
    margin: 50px auto;

    .ms-caption {
      caret-color: #fff !important;
      line-height : 50px;
      font-size : 20px;
    }
  }
</style>
