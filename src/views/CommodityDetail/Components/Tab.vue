<template>
  <div>
    <cube-tab-bar v-model="selectedLabel" show-slider>
      <cube-tab v-for="item in tabs" :label="item.label" :key="item.label"></cube-tab>
    </cube-tab-bar>

    <component
      :commodityInfo="commodityInfo"
      :is='selectedLabel==="商品介绍"?"Summary":"Point" '
    ></component>
  </div>
  
</template>

<script>
import Point from "./Point";
import Summary from "./Summary";
export default {
  components: {
    Point,
    Summary
  },

  props: {
    commodityInfo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedLabel: "商品介绍",
      tabs: [
        {
          label: "商品介绍"
        },
        {
          label: "评价"
        }
      ]
    };
  }
};
</script>

