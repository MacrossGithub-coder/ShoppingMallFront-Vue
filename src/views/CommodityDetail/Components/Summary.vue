<template>
  <div>
    <img class="summary" :src="commodityInfo.detail_img" /> 
  </div>
</template>

<script>
export default {
  props: {
    commodityInfo: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.summary {
  width: 100%;
  padding-bottom: 50px;
  // margin: 15px 0;
}
</style>