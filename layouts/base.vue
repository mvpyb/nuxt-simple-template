<template>
  <div class="global">
    <NavBarHorizontal />
    <div class="app-container">
      <loading v-show="loading" />
      <Nuxt class="my-main" />
    </div>
    <Footer />
    <BackTop />

  </div>
</template>

<script>
export default {
  name : 'BaseLayouts',
  data() {
    return {
      loading : true
    }
  },
  computed : {

  },
  watch : {
    '$route' : {
      handler() {
        this.renderLoading()
      },
      immediate : true,
      deep : true
    }
  },
  created() {
    this.renderLoading()
  },
  methods : {
    renderLoading() {
      this.loading = true
      const timer = setTimeout( () => {
        this.loading = false
      }, 1500 )

      this.$once( 'hook:beforeDestroy', () => {
        clearInterval( timer )
        this.loading = true
      } )
    }
  },
  head() {
    return {
      link : [
        {
          rel : 'icon',
          type : 'image/x-icon',
          href : ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    .content{
      background: #000;
      div{
        height: 40px;
        background-color: aquamarine;
        margin-bottom:10px;
      }
    }
</style>
