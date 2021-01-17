<template>
  <div>
    <!-- <search-bar :onChange="onChange" :onSearch="onSearch"></search-bar> -->
    <form>
      <input type="search" name="search" style="outline:none" placeholder="零食" class="searchbox" />
      <!-- <img src="1.png" class="img" /> -->
      <input type="submit" class="button" style="outline:none" value="搜索" />
    </form>
    <home-banner :banners="banners"></home-banner>
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
<style ang="scss" scoped>
 .searchbox{
  margin-top: 10px; 
  margin-left: 10px;
  width: 100px;
  box-sizing: border-box;
  border: 1px solid rgba(60,64,67,0.15);
  border-radius: 40px;
  font-size: 10px;
  background-color: white;
  background-position: 10px 10px; 
  background-repeat: no-repeat;
  padding: 10px 5px 10px 10px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}

/* .searchbox:focus {
  width: 80%;
} */
.img{

			max-height: 80px;
			position: absolute;
			left: 202px;
			top: 98px;
		}

.button{
  font-size: 10px;
  border-radius: 40px;
  background-color:#C0C0C0;;
  border: none;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
} 
</style>