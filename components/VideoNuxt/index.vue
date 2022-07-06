<template>
  <!-- referrer="no-referrer|origin|unsafe-url"-->
  <div
    v-video-player:myVideoPlayer="videoOptions"
    class="video-player-box"
    :playsinline="playsinline"
    :autoplay="playerOptions.autoplay"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @ready="playerReadied"
    @statechanged="playerStateChanged($event)"
  />
</template>

<script>
export default {
  name : 'Index',
  props : {
    options : {
      type : Object,
      default : () => {}
    },
    playsinline : {
      type : Boolean,
      default : true
    }
  },
  data() {
    return {
      playerOptions : {
        autoplay : true,
        controls : false, // 控制条
        loop : false,
        muted : true,
        preload : 'auto', // 预加载
        fluid : true,
        inactivityTimeout : 0,
        nativeControlsForTouch : false,
        notSupportedMessage : false,
        techOrder : ['html5'],

        language : 'zh',
        playbackRates : [0.7, 1.0, 1.5, 2.0]
        // sources : [
        //   {
        //     type : 'video/mp4',
        //     src : ''
        //   }
        // ],
        // poster : ''
      },
      videoOptions : {}
    }
  },
  async created() {
    this.videoOptions = Object.assign( {}, this.playerOptions, this.options )
    // console.log( this.videoOptions, 'videoOptions' )
  },
  async mounted() {
    // const player = this.myVideoPlayer
  },
  methods : {
    // listen event
    onPlayerPlay( player ) {
      // console.log('player play!', player)
      this.$emit( 'onPlayerPlay', player )
    },
    onPlayerPause( player ) {
      // console.log('player pause!', player)
      this.$emit( 'onPlayerPause', player )
    },
    onPlayerEnded( player ) {
      // console.log('player ended!', player
      this.$emit( 'onPlayerEnded', player )
    },
    onPlayerLoadeddata( player ) {
      // console.log('player Loadeddata!', player)
      this.$emit( 'onPlayerLoadeddata', player )
    },
    onPlayerWaiting( player ) {
      // console.log('player Waiting!', player)
      this.$emit( 'onPlayerWaiting', player )
    },
    onPlayerPlaying( player ) {
      // console.log('player Playing!', player)
      this.$emit( 'onPlayerPlaying', player )
    },
    onPlayerTimeupdate( player ) {
      this.$emit( 'onPlayerTimeupdate', player )
    },
    onPlayerCanplay( player ) {
      this.$emit( 'onPlayerCanplay', player )
      // player.play()
    },
    onPlayerCanplaythrough( player ) {
      this.$emit( 'onPlayerCanplaythrough', player )
    },
    // or listen state event
    playerStateChanged( playerCurrentState ) {
      this.$emit( 'playerStateChanged', playerCurrentState )
    },
    // player is ready
    playerReadied( player ) {
      this.$emit( 'playerReadied', player )
    }
  },
  head() {
    return {
      title : this.headTitle,
      meta : [
        { hid : 'keywords', name : 'jimo', content : this.headKeywords },
        { hid : 'description', name : 'jimo', content : this.headDesc }
      ]
    }
  }
}
</script>

<style scoped>

</style>
