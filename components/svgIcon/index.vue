
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  name : 'SvgIcon',
  props : {
    iconClass : {
      type : String,
      required : true
    },
    className : {
      type : String,
      default : ''
    }
  },
  computed : {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if ( this.className ) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask : `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask' : `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: all ease 0.3s;
  }
  @keyframes rotating{
    from{transform:rotate(0)}
    to{transform:rotate(360deg)}
  }

  .rotate {
    animation:rotating 1.2s linear infinite
  }
</style>
