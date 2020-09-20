<template>
  <div>
    <search-bar :onChange="onChange" :onSearch="onSearch"></search-bar>
    <home-banner :banners="banners" ></home-banner>
    <commodity-list :commodityList="commodityList"></commodity-list>
    <common-footer></common-footer>
  </div>
</template>

<script>
import HomeBanner from "./Component/Banner";
import CommodityList from "./Component/Home_Commodity";
import CommonFooter from "@/components/CommonFooter";
import { getBannerApi, getCommodityListApi } from "@/api/getData.js";

export default {
  components: {
    HomeBanner,
    CommodityList,
    CommonFooter
  },

  //声明数据源
  data() {
    return {
      banners: [],
      commodityList: []
    };
  },

  methods: {
    async getBanner() {
      try {
        const result = await getBannerApi();
        console.log(result.data);
        if (result.data.code == 0) {
          this.banners = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCommodityList() {
      try {
        const result = await getCommodityListApi();
        if (result.data.code == 0) {
          console.log(result);
          this.commodityList = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    //页面渲染完成调用方法获取数据
    this.getBanner();
    this.getCommodityList();
  }
};
</script>
<style scoped>
</style>