<template>
  <div class="global">
    <Header :key="this.$route.path" />
    <div class="app-container">
      <div class="app-cont">
        <Nuxt />
      </div>
    </div>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed : {},
  // 设置head信息
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
.app-container {
  width: 1005px;
  background: #f4f5f6;
  margin: 15px auto 0;
  @media screen and (max-width: 1005px) {
    width: 100%;
    min-width: 768px;
    padding: 0 14px;
  }
  .app-cont {
    width: 100%;
    min-height: calc(100vh - 65px - 80px - 15px);
    display: flex;
    justify-content: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
  }
}
</style>
