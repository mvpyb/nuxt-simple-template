
<template>
  <div class="cute-slider-section">
    <div :id="sliderContainerId">
      <div
        :id="sliderWrapperId"
        class="my-cute-slider"
        :data-width="width"
        :data-height="height"
        :data-force="force"
        :data-shuffle="shuffle"
        :data-overpause="overpause"
      >
        <ul data-type="slides">
          <li
            v-for="(item, index) in sliderList"
            :key="item.id"
            :data-delay="item.dataDelay"
            :data-trans3d="item.dataTrans3d"
            :data-trans2d="item.dataTrans2d"
          >
            <img
              v-if="index == 0"
              class="img-item"
              :src="item.img.src"
              :data-thumb="item.img.dataThumb"
            >
            <img
              v-else
              class="img-item"
              :src="item.img.src"
              :data-src="item.img.dataSrc"
              :data-thumb="item.img.dataThumb"
            >
            <ul v-if="item.captions" data-type="captions">
              <li class="caption-item" :data-effect="item.captions.effect" :data-delay="item.captions.delay" v-html="item.captions.content" />
            </ul>
            <div v-if="item.info" data-type="info" class="info-section" :data-align="item.info.align" v-html="item.info.content" />
            <a v-if="item.video" data-type="video" :href="item.video.href" :width="item.video.width" :height="item.video.height" />
            <a v-if="item.link" data-type="link" :href="item.link.href" :target="item.link.target" v-html="item.link.content" />
          </li>
        </ul>

        <ul v-if="sliderControls" data-type="controls">
          <li
            v-if="sliderControls.captions && sliderControls.captions.enable"
            :class="sliderControls.captions.className"
            data-type="captions"
          />
          <li
            v-if="sliderControls.video && sliderControls.video.enable"
            :class="sliderControls.video.className"
            data-type="video"
          />
          <li
            v-if="sliderControls.link && sliderControls.link.enable"
            :class="sliderControls.link.className"
            data-type="link"
          />
          <li
            v-if="sliderControls.slideInfo && sliderControls.slideInfo.enable"
            :class="sliderControls.slideInfo.className"
            data-type="slideinfo"
          />
          <li
            v-if="sliderControls.next && sliderControls.next.enable"
            :class="sliderControls.next.className"
            data-type="next"
          />
          <li
            v-if="sliderControls.previous && sliderControls.previous.enable"
            :class="sliderControls.previous.className"
            data-type="previous"
          />
          <li
            v-if="sliderControls.slideControl && sliderControls.slideControl.enable"
            :class="sliderControls.slideControl.className"
            data-type="slidecontrol"
            :data-thumb="sliderControls.slideControl.dataThumb"
            :data-thumbaling="sliderControls.slideControl.dataThumbaling"
          />

          <li
            v-if="sliderControls.barTimer && sliderControls.barTimer.enable"
            :class="sliderControls.barTimer.className"
            data-type="bartimer"
          />
          <li
            v-if="sliderControls.circleTimer && sliderControls.circleTimer.enable"
            data-type="circletimer"
            :class="sliderControls.circleTimer.className"
            :data-color="sliderControls.circleTimer.dataColor"
            :data-stroke="sliderControls.circleTimer.dataStroke"
            :data-radius="sliderControls.circleTimer.dataRadius"
          />
          <li
            v-if="sliderControls.infoList && sliderControls.infoList.enable"
            data-type="infolist"
            :class="sliderControls.infoList.className"
            :data-dir="sliderControls.infoList.dataDir"
            :data-autohide="sliderControls.infoList.dataAutohide"
          />
        </ul>

        <div class="br-shadow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Cute',
  props : {
    width : {
      type : String,
      default : '610'
    },
    height : {
      type : String,
      default : '400'
    },
    sliderContainerId : {
      type : String,
      default : 'slider-wrapper'
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

      // 动画效果集合 data-trans2d ： tr1 - tr41
      // data-trans3d ： tr1 - tr64
      list2d : [],
      list3d : [],
      sliders : {
        list : [],
        controls : []
      }
    }
  },
  computed : {
    sliderList() {
      return this.sliders.list
    },
    sliderControls() {
      return this.sliders.controls
    }
  },
  async created() {
    await this.initTransation()
    await this.getList()
  },
  async mounted() {
    this.$nextTick( () => {
      console.log( 'client', process.client )
      if ( process.client ) {
        const Cute = window.Cute || Cute
        console.log( 'Cute', Cute )
        var myslider = new Cute.Slider()
        myslider.setup( this.sliderWrapperId, this.sliderContainerId )
        this.slider = myslider

        // // eslint-disable-next-line no-undef
        // // eslint-disable-next-line no-undef
        // var slider = new Cute.Slider()
        // slider.setup( 'slider', 'slider_wrapper' )
        // slider.pause()
        //
        // // slider.api.
        // // next() ：转到下一张幻灯片。
        // // previous() ：转到上一张幻灯片。
        // // pause() ：停止滑块计时器。
        // // play() ：启动滑块计时器。
        // // getNextIndex() ：返回下一张幻灯片的索引。
        // // getPreviousIndex() ：返回上一张幻灯片的索引。
        // // gotoSlide(index , skipDelay) ：确定下一张幻灯片。
        // // 参数：
        // // index：下一张幻灯片的索引。
        // // skipDelay：如果skipDelay 为true，滑块会跳过显示延迟的幻灯片并立即显示下一张幻灯片。
        // // getSlideList() ：返回所有幻灯片的数组。
        // // getNextSlide() ：返回滑块中下一个确定的幻灯片。
        // // getCurrentSlide() ：返回滑块的当前幻灯片。
        // // getCurrentSlideIndex() ：返回滑块的当前幻灯片索引。
        // // delayProgress() ：返回一个值，该值指示显示延迟过去了多长时间。
        //
        // const change = function( event ) {
        //   console.log( 'change started', event.target )
        //   console.log( 'getPreviousIndex', slider.api.getPreviousIndex() )
        //   console.log( 'getNextIndex', slider.api.getNextIndex() )
        // }
        // // eslint-disable-next-line no-undef
        // slider.api.addEventListener( Cute.SliderEvent.CHANGE_START, change, this )
      }
    } )
  },
  methods : {
    getList() {
      const sliders = {
        list : [],
        // slider 控制条, true : 开启, Boolean || Object
        controls : {
          captions : {
            enable : true,
            className : '' // 自定义class 推荐使用 默认 br-captions
          },
          video : {
            enable : false,
            className : '' // 自定义class 推荐使用 默认 br-video
          },
          link : {
            enable : false,
            className : '' // 自定义class 推荐使用 默认 br-link
          },
          slideInfo : {
            enable : true,
            className : '' // 自定义class 推荐使用 默认 br-slideinfo 根据幻灯片内容中的 align 参数确定此控件的 .right、.left、.top 或 .bottom 。
          },
          next : {
            enable : true,
            className : '' // 自定义class 推荐使用 默认 br-next
          },
          previous : {
            enable : true,
            className : '' // 自定义class 推荐使用 默认 br-previous
          },
          slideControl : {
            enable : true,
            className : '', // 自定义class 推荐使用 默认 br-slidecontrols
            dataThumb : true, // 表示鼠标滑过控制点时是否显示拇指，默认值“true”
            dataThumbaling : true // 指定拇指对齐到顶部或底部
          },

          // 进度条
          barTimer : {
            enable : true,
            className : '' // 自定义class 推荐使用 默认 br-bar-timer
          },

          // 注意：此控件仅适用于支持 canvas 元素的浏览器
          circleTimer : {
            enable : false,
            className : '', // 自定义class 推荐使用 默认 br-circle-timer
            dataColor : '#333', // 指定圆形笔触颜色
            dataStroke : '13', // 定圆形描边
            dataRadius : '5' // 指定圆半径

          },
          infoList : {
            enable : false,
            className : '', // 自定义class 推荐使用 默认 br-infolist
            dataDir : 'vertical',
            dataAutohide : true
          }
        }
      }
      const baseUrl = 'https://resources-uat.shadowcreator.com/www/cute-slide/'
      for ( let i = 1; i < 10; i++ ) {
        const list = {
          id : i,
          dataDelay : '2', // 确定幻灯片将显示多长时间（以秒为单位）
          // 2D ：tr1 - tr41，多个的话以逗号分割 所有动画效果 ： cuteSlider/transition gallery/transition gallery.html
          dataTrans2d : this.getRandomTransation( 1 ).transaction2d,
          // 3D ：tr1 - tr64，多个的话以逗号分割
          dataTrans3d : this.getRandomTransation( 1 ).transaction3d,
          img : {
            // important 第一张图片只用用src 不能用data-src
            src : `${baseUrl}images/${i}.jpg`, // 图片的URL
            // dataSrc : `${baseUrl}blank.jpg`, // 图片的URL
            dataThumb : `${baseUrl}images/thumbs/${i}.jpg` // 缩略图
          },
          // 信息
          info : {
            align : 'right', // data-align[可选]：确定幻灯片信息容器的对齐方式，默认值为 bottom, top right bottom left
            content : `${i}__我是一个信息` // HTML | String
          },
          // 标题字幕
          captions : {
            content : `我是一个弹幕弹幕${i}`,
            effect : 'fade', // fade || slide
            delay : '1500' // 显示字幕的延迟时间（毫秒）
          },
          video : {
            href : '', // 视频地址
            width : '100',
            height : '100'
          },
          link : {
            href : '',
            target : '_blank',
            content : `${i}__我是一个链接`
          }
        }

        if ( i != 1 ) {
          list.img.src = `${baseUrl}cute-theme/blank.jpg`
          list.img.dataSrc = `${baseUrl}images/${i}.jpg`
        }
        sliders.list.push( list )
      }
      this.sliders = sliders
    },

    initTransation() {
      const list2d = []
      const list3d = []
      for ( let i = 1; i < 65; i++ ) {
        list3d.push( `tr${i}` )
        if ( i <= 41 ) {
          list2d.push( `tr${i}` )
        }
      }
      this.list2d = list2d
      this.list3d = list3d
    },
    // 随机获取动画效果
    getRandomTransation( num = 1 ) {
      function getRandomArrayElements( arr, count ) {
        var shuffled = arr.slice( 0 )
        var i = arr.length
        var min = i - count
        var temp
        var index
        while ( i-- > min ) {
          index = Math.floor( ( i + 1 ) * Math.random() )
          temp = shuffled[index]
          shuffled[index] = shuffled[i]
          shuffled[i] = temp
        }
        return shuffled.slice( min )
      }
      const result = {
        transaction2d : getRandomArrayElements( this.list2d, num ).join( ',' ),
        transaction3d : getRandomArrayElements( this.list3d, num ).join( ',' )
      }
      return result
    },

    /**
     * CHANGE_START：在幻灯片更改开始时调度
     * CHANGE_END：在幻灯片更改结束时调度
     * WATING：只要滑块位于一张幻灯片中就调度
     * CHANGE_NEXT_SLIDE：将在滑块的下一张幻灯片更改时调度
     * WATING_FOR_NEXT：调度直到滑块等待下一张幻灯片加载
     * */
    // 在幻灯片更改开始时调度。
    changeStart() {
      const that = this
      if ( process.client ) {
        const Cute = window.Cute || Cute
        that.slider.api.addEventListener( Cute.SliderEvent.CHANGE_START, that.changeCB, this )
      }
    },
    changeCB() {
      console.log( 'changeCB' )
    },
    next() {
      this.slider && this.slider.next()
    },
    pause() {
      this.slider && this.slider.pause()
    },

    nextSlider() {
      this.slider && this.slider.api.next()
    },
    previousSlider() {
      this.slider && this.slider.api.previous()
    },
    pauseSlider() {
      this.slider && this.slider.api.pause()
    },
    playSlider() {
      this.slider && this.slider.api.play()
    },
    // 返回下一张幻灯片的索引。
    getNextIndex() {
      this.slider && this.slider.api.getNextIndex()
    },
    // 返回上一张幻灯片的索引。
    getPreviousIndex() {
      this.slider && this.slider.api.getPreviousIndex()
    },
    /**
     * @params index：下一张幻灯片的索引。
     * @params skipDelay：如果skipDelay 为true，滑块会跳过显示延迟的幻灯片并立即显示下一张幻灯片。
     * */
    gotoSlide( index, skipDelay ) {
      this.slider && this.slider.api.gotoSlide( index, skipDelay )
    },
    // 返回所有幻灯片的数组。
    getSlideList() {
      this.slider && this.slider.api.getSlideList()
    },

    // 返回滑块中下一个确定的幻灯片。
    getNextSlide() {
      this.slider && this.slider.api.getNextSlide()
    },
    // 返回滑块的当前幻灯片。
    getCurrentSlide() {
      this.slider && this.slider.api.getCurrentSlide()
    },
    // 返回滑块的当前幻灯片索引。
    getCurrentSlideIndex() {
      this.slider && this.slider.api.getCurrentSlideIndex()
    },
    // 返回一个值，该值指示显示延迟过去了多长时间。
    delayProgress() {
      this.slider && this.slider.api.delayProgress()
    }
  },
  head() {
    return {
      // ssr 部署时可以使用此方式,spa 则使用全局注入
      script : [
        // { src : '/js/modernizr.js', type : 'text/javascript', charset : 'utf-8' },
        // { src : '/js/cute/cute.slider.js', type : 'text/javascript', charset : 'utf-8' },
        // { src : '/js/cute/cute.transitions.all.js', type : 'text/javascript', charset : 'utf-8' },
        // { src : '/js/respond.min.js', type : 'text/javascript', charset : 'utf-8' }
      ]
    }
  }
}
</script>

<style>
  @import "./slider-style.css";
</style>
<style scoped lang="scss">
  .cute-slider-section{
    position:relative;
    min-width:300px;
    max-width:527px;
    margin: 50px auto;
  }
  :deep(.my-cute-slider){
    position:relative;
    color: #fff;
    .br-captions {
      .br-caption-content {
        background-color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        padding:8px;
      }
      .caption-item {
        position:absolute;
        color: blue;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
      .caption2 {
        top:20px;
        left:300px;
        position:absolute;
        color: yellow;
      }
    }
  }
</style>
