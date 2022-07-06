
<template>
  <div class="horizontal-section clearfix">
    <div class="logo-section fl">
      <nuxt-link to="/" class="location">
        <img :src="require('@/assets/imgs/logo.png')" alt="logo">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Horizontal',
  props : {},
  data() {
    return {
      activeIndex : '2'

    }
  }
}
</script>

<style lang="scss" scoped>
  .horizontal-section{}
</style>
