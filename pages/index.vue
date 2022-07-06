<template>
  <div class="section main-section">
    <div class="main-body">

      <!--cute -slider-->
      <MagicSliderCute />

      <!--masters -slider-->
      <MagicSliderMasters>
        <template v-slot:captions>
          <div class="ms-layer ms-caption master-slider-item--caption">我是一个图层文字</div>
        </template>
      </MagicSliderMasters>

      <!--tween max -->
      <!--<div style="width: 60%;height: 50px;margin: 0 auto;  ">
        <el-slider v-model="currentSlider" @input="inputSlider" />
      </div>
      <el-button @click="play"> play </el-button>-->

      <!--测试鼠标跟随-->
      <!-- <div v-if="showBall" ref="ball" class="ball" />
      <div class="tween-max-section">
        <div ref="tween-max-item1" class="tween-max-item tween-max-item1" />
      </div>-->

      <!-- aos animate test -->
      <div class="aos-all clearfix">
        <div data-id="1" class="aos-item" data-aos="fade-up" />
        <div data-id="2" class="aos-item" data-aos="fade-down" />
        <div data-id="3" class="aos-item" data-aos="zoom-out-down" />
        <div data-id="4" class="aos-item" data-aos="flip-down" />
        <div data-id="5" class="aos-item" data-aos="flip-up" />
        <div data-id="6" class="aos-item" data-aos="fade-down" />
        <div data-id="7" class="aos-item" data-aos="fade-in" />
        <div data-id="8" class="aos-item" data-aos="fade-down" />
        <div data-id="9" class="aos-item" data-aos="fade-in" />
        <div data-id="10" class="aos-item" data-aos="fade-down" data-aos-id="super-duper" />
        <div data-id="11" class="aos-item" data-aos="fade-up" />
        <div data-id="12" class="aos-item" data-aos="fade-down" />
        <div data-id="13" class="aos-item" data-aos="fade-in" />
        <div data-id="14" class="aos-item" data-aos="fade-up" />
        <div data-id="15" class="aos-item" data-aos="fade-in" />
        <div data-id="16" class="aos-item" data-aos="fade-up" />
        <div data-id="17" class="aos-item" data-aos="fade-down" />
        <div data-id="18" class="aos-item" data-aos="fade-up" />
        <div data-id="19" class="aos-item" data-aos="zoom-out" />
        <div data-id="20" class="aos-item" data-aos="fade-up" />
        <div data-id="21" class="aos-item" data-aos="zoom-out" />
        <div data-id="22" class="aos-item" data-aos="fade-in" />
        <div data-id="23" class="aos-item" data-aos="zoom-out-up" />
        <div data-id="24" class="aos-item" data-aos="zoom-out-down" />
      </div>
    </div>
  </div>

</template>

<script>
import device from '@/utils/device'
import MagicSliderCute from '@/components/MagicSlider/cute'
import MagicSliderMasters from '@/components/MagicSlider/masters'

export default {
  name : 'Index',
  layout : 'base',
  components : { MagicSliderCute, MagicSliderMasters },
  // 异步数据用法
  async asyncData( context ) {},
  data() {
    return {
      isSpider : device.isSpider,
      loading : false,
      headTitle : '',
      headKeywords : '',
      headDesc : '',

      tween : null, // 实例
      currentSlider : 0,
      showBall : false
    }
  },
  async mounted() {
    if ( !this.headTitle ) {
      this.getInfo()
    }

    // GSAP 动画测试组件 TODO
    this.animate1()
    this.initBall()
  },
  methods : {
    async getInfo() {
      const params = {
        headTitle : '2_不是爬虫',
        headKeywords : '2_不是爬虫',
        headDesc : '2_不是爬虫'
      }
      const { headTitle, headKeywords, headDesc } = await this.$store.dispatch( 'test/getTestInfo', params )
      this.headTitle = headTitle
      this.headKeywords = headKeywords
      this.headDesc = headDesc
    },
    /** *******tween max animation**********/
    play() {
      this.tween.play()

      // setTimeout( () => {
      //   this.$gsap.killTweensOf( this.$refs['tween-max-item1'], 'opacity,y' )
      // }, 2000 )
    },
    inputSlider( val ) {
      // console.log( 'inputSlider', val )
      this.tween.pause()
      this.tween.progress( val * 0.01 )

      // // 干掉指定得动画,多个用都好分割
      // this.$gsap.killTweensOf( this.$refs['tween-max-item1'], 'opacity' )

      // // 暂停/完成/未开始 返回false
      // console.log( 'isTweening', this.$gsap.isTweening( this.$refs['tween-max-item1'] ) )

      // this.getTweensOf( this.$refs['tween-max-item1'] )
      // this.getProperty()
    },
    animate1() {
      const gsap = this.$gsap

      console.log( 'gsap', gsap )

      const el = this.$refs['tween-max-item1']
      if ( !gsap || !el ) return

      // 透明度动画

      // const tween = gsap.fromTo(
      //   el,
      //   {
      //     opacity : 1
      //   },
      //   {
      //     opacity : 0
      //     // duration : 1,
      //     // ease : 'elastic'
      //   }
      // )

      const tween = gsap.from( el, {
        id : 'toAnimate',
        opacity : 0,
        y : 400,
        duration : 6
      } )

      // const tween = gsap.set( el, { y : 400, opacity : 0 } )

      tween.pause()

      console.log( 'tween', tween )
      this.tween = tween
    },
    initBall() {
      this.showBall = true
      this.$nextTick( () => {
        const gsap = this.$gsap
        const el = this.$refs['ball']
        if ( !gsap || !el ) return
        gsap.set( el, { xPercent : -50, yPercent : -50 } )

        const pos = { x : window.innerWidth / 2, y : window.innerHeight / 2 }
        const mouse = { x : pos.x, y : pos.y }
        const speed = 0.35

        const xSet = gsap.quickSetter( el, 'x', 'px' )
        const ySet = gsap.quickSetter( el, 'y', 'px' )

        window.addEventListener( 'mousemove', e => {
          mouse.x = e.x
          mouse.y = e.y
        } )

        gsap.ticker.add( () => {
          // adjust speed for higher refresh monitors
          const dt = 1.0 - Math.pow( 1.0 - speed, gsap.ticker.deltaRatio() )
          pos.x += ( mouse.x - pos.x ) * dt
          pos.y += ( mouse.y - pos.y ) * dt
          xSet( pos.x )
          ySet( pos.y )
        } )
      } )
    },
    // 获取元素属性
    getProperty() {
      const gsap = this.$gsap
      const el = this.$refs['tween-max-item1']
      const res = gsap.getProperty( el, 'width', 'px' )
      console.log( 'getProperty res', res )
    },
    //
    getTweensOf( target ) {
      var res = this.$gsap.getTweensOf( target )
      console.log( 'getTweensOf', res )
    }
  },
  head() {
    return {
      title : this.headTitle,
      meta : [
        { hid : 'keywords', name : 'keywords', content : this.headKeywords },
        { hid : 'description', name : 'description', content : this.headDesc }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-body {

  }
  .tween-max-section {
    position: relative;
  }
  .tween-max-item {
    display: block;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 10px;
    left: 10px;
    background: #1D3F49;
    /*opacity: 1;*/
  }
  .ball {
    width: 50px;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    border: 3px solid dodgerblue;
    border-radius: 50%;
  }
</style>

<!-- aos test -->
<style lang="scss" scoped>
  .aos-all {
    width: 1000px;
    max-width: 98%;
    margin: 50px auto;
  }
  .aos-item {
    display: inline-block;
    float: left;
    width: 100%;
    height: 300px;
    padding: 20px;
  }
  .aos-item::before {
    content: attr(data-id);
    position: relative;
    width: 100%;
    height: 100%;
    float: left;
    background: #1da4e2;
    line-height: 260px;
    text-align: center;
    color: #fff;
  }
  @media screen and (min-width: 420px) {
    .aos-item {
      width: 50%;
    }
  }
  @media screen and (min-width: 1024px) {
    .aos-item {
      width: 33%;
    }
  }
  .aos-anchors__lines {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 2px solid blue;
    border-bottom: 2px solid red;
  }
  .aos-anchors__lines::before {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: green;
  }
  .aos-anchors__sidebar {
    position: fixed;
    left: 0;
    top: 0;
  }
  .aos-anchors__sidebar > div {
    padding: 5px 10px;
    background: #f1f1f1;
  }
  .aos-anchors__content {
    width: 400px;
    margin: 50px auto;
  }
  .aos-anchors__content > div {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 50px;
    background: #f1f1f1;
    line-height: 300px;
    text-align: center;
    color: #333;
  }
  .aos-anchors__content > div::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
  }
  .aos-anchors__content > div::after {
    content: attr(data-anchor-id);
    position: relative;
    background-color: #f1f1f1;
  }
  .aos-anchors__content > div[data-placement$="-bottom"]::before {
    background-color: red;
  }
  .aos-anchors__content > div[data-placement$="-center"]::before {
    background-color: green;
  }
  .aos-anchors__content > div[data-placement$="-top"]::before {
    background-color: blue;
  }
  .aos-anchors__content > div[data-placement^="top-"]::before {
    top: 0;
  }
  .aos-anchors__content > div[data-placement^="center-"]::before {
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .aos-anchors__content > div[data-placement^="bottom-"]::before {
    bottom: 0;
  }
</style>
