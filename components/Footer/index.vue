<template>
  <div class="section foot-section">
    <div class="foot-links">
      <el-link :underline="false" href="https://nuxtjs.org/docs/" target="_blank">Nuxt</el-link>
      <el-link :underline="false" href="https://element.eleme.cn/#/zh-CN/" target="_blank">Element UI</el-link>
      <el-link :underline="false" href="https://github.com/mvpyb" target="_blank">@mvpyb</el-link>
    </div>

    <div class="foot-copyright">
      <el-link type="primary" :underline="false" href="https://github.com/mvpyb" target="_blank">mvpyb homepage</el-link>
    </div>
  </div>
</template>

<script>

export default {
  name : 'Footer',
  props : {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods : {

  }
}
</script>

<style lang="scss" scoped>
  .foot-section {
    margin: 48px 0;
  }
  .foot-links {
    display: flex;
    flex-direction : row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 25px;
    .el-link {
      margin: 0 20px;
    }
  }
  .foot-copyright {
    height: 25px;
    margin-top: 15px;
    text-align: center;
  }
</style>
