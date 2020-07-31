<template>
  <div>
    <cube-slide ref="slide" :data="banners">
      <cube-slide-item v-for="(item, index) in banners" :key="index">
        <a :href="item.url">
          <img :src="item.img" style="width:150%;margin-left: -65px;"/>
        </a>
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