<template>
  <div class="global">
    我是一个错误的页面
    <Nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {}
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
  .global {
    width: 100vw;
    height: 100vh;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
