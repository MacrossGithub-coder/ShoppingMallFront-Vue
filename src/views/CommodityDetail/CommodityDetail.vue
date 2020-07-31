<template>
  <div>
    <header-info :commodityInfo="commodityInfo"></header-info>
    <banner-info :banners="banners"></banner-info>
    <div style="background: aliceblue;">
      <div style="padding-top: 10px;margin-left: 10px;">
        <span class="price1">￥{{commodityInfo.price/100}}</span>
        <span class="price2">.00</span>
      </div>
      <div style="margin-top: 5px;margin-left: 10px;">
        <div class="title">{{commodityInfo.describe}}</div>
        <span class="point">好评率</span>
        <span class="point" style="margin-left:15px;">{{commodityInfo.point}}%</span>
      </div>
    </div>
    <tab-info :commodityInfo="commodityInfo"></tab-info>
    <footer>
      <div style="margin-left: 20px;margin-right: 20px;">
        <div align="left" style="float:left" @click="addToCart">
          <button style="background-color: rgb(232,69,38);" class="button1">加入购物车</button>
        </div>
        <router-link :to="{path:'/pay',query:{commodity_id:this.$route.query.commodity_id}}">
          <div align="right" style="float:right">
            <button style="background-color: rgb(245,187,64);" class="button2">立刻购买</button>
          </div>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import HeaderInfo from "./Components/Header";
import BannerInfo from "./Components/Banner";
import CommodityInfo from "./Components/Commodity";
import TabInfo from "./Components/Tab";

import { getCommodityDetailApi, addToCartApi } from "@/api/getData.js";
export default {
  components: {
    HeaderInfo,
    BannerInfo,
    CommodityInfo,
    TabInfo
  },

  data() {
    return {
      commodityInfo: {},
      banners: []
    };
  },

  methods: {
    async getCommodityDetail(commodity_id) {
      try {
        const result = await getCommodityDetailApi(commodity_id);
        if (result.data.code == 0) {
          this.commodityInfo = result.data.data;
          this.banners = result.data.data.commodityBannerList;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart() {
      try {
        const result = await addToCartApi(
          this.$store.state.token,
          this.$route.query.commodity_id
        );
        if (result.data.code === 0) {
          const toast = this.$createToast({
            txt: "加入购物车成功",
            type: "correct",
            time: 2000
          });
          toast.show();
        }
        if (result.data.code === -1) {
          const toast = this.$createToast({
            txt: "系统异常",
            type: "error",
            time: 1000
          });
          toast.show();
        }
        if (result.data.code === -5) {
          const toast = this.$createToast({
            txt: "请先登录",
            type: "error",
            time: 1000,
            onTimeout: () => {
              this.$router.push({ path: "login" });
            }
          });
          toast.show();
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getCommodityDetail(this.$route.query.commodity_id);
  }
};
</script>

<style lang="scss" scoped>
//底部
footer {
  // fixed固定在底部
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.05);
}
//设置购买按钮样式
.button1 {
  // display: block;
  color: #fff;
  // margin: 0 auto;
  height: 34px;
  line-height: 34px;
  border-radius: 17px;
  // width: 46%;
  width: 165px;
  border: none;
  font-size: 15px;
  text-align: center;
}
.button2 {
  display: block;
  color: #fff;
  // margin: 0 auto;
  height: 34px;
  line-height: 34px;
  border-radius: 17px;
  // width: 46%;
  width: 165px;
  border: none;
  font-size: 15px;
  text-align: center;
}
.title {
  // font-size: 20px;
  font: 700 20px Arial, "microsoft yahei";
  // padding-top: 5px;
  line-height: 28px;
  margin-bottom: 5px;
  // color: #666;
  color: rgba(0, 0, 0, 0.801);
}
.point {
  // font-size: 20px;
  font: 700 16px Arial, "microsoft yahei";
  padding-top: 10px;
  line-height: 28px;
  margin-bottom: 5px;
  color: #666;
}
.price1 {
  margin-top: 0px;
  font-size: 28px;
  color: #d93f30;
}
.price2 {
  margin-top: 0px;
  font-size: 20px;
  color: #d93f30;
}
</style>