<template>
  <div>
    <cube-slide ref="slide" :data="banners">
      <cube-slide-item v-for="(item, index) in banners" :key="index">
          <img :src="item.img" style="width:400px;height =400px;"/>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>