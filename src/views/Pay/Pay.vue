<template>
  <div>
    <!--视频信息-->
    <div class="info">
      <p class="info_title">商品信息</p>

      <div class="smallbox" style="margin-left: 10px;">
        <div class="imgdiv">
          <img :src="commodityInfo.home_img" />
        </div>

        <div class="textdiv" style="margin-left: 30px; ">
          <p class="title" style="margin-left: -1px;">{{commodityInfo.describe}}</p>
          <p class="price" style="margin-left: -1px;">￥{{(commodityInfo.price / 100).toFixed(2)}}</p>
        </div>
      </div>
    </div>

    <!--顶部支付-->
    <div class="footer">
      <p class="money">实付:&nbsp;&nbsp; {{(commodityInfo.price / 100).toFixed(2)}}</p>
      <p class="submit" @click="commodityOrder">立刻支付</p>
      <!-- <p class="submit">立刻支付</p> -->
    </div>
  </div>
</template>

<script>
import { getCommodityDetailApi, commodityOrderApi } from "@/api/getData.js";
export default {
  data() {
    return {
      commodityInfo: {}
    };
  },
  methods: {
    async getCommodityDetail(commodity_id) {
      try {
        const result = await getCommodityDetailApi(commodity_id);
        if (result.data.code === 0) {
          this.commodityInfo = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async commodityOrder() {
      try {
        const result = await commodityOrderApi(
          this.$store.state.token,
          this.$route.query.commodity_id
        );
        console.log(result.data.code);
        if (result.data.code === 0) {
          const toast = this.$createToast({
            txt: "购买成功",
            type: "correct",
            time: 2000,
            onTimeout: () => {
              this.$router.push({ path: "order" });
            }
          });
          toast.show();
        }
        if (result.data.code === -3) {
          const toast = this.$createToast({
            txt: "余额不足",
            type: "error",
            time: 1000
          });
          toast.show();
        }
        if (result.data.code === -1) {
          const toast = this.$createToast({
            txt: "系统异常，请联系开发者",
            type: "error",
            time: 1000
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
.info_title {
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #d9dde1;
}

.smallbox {
  //flex左右排列，两端对齐
  display: flex;
  justify-content: space-between;
  .imgdiv {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .textdiv p {
    margin-top: 10px;
    padding-left: 30px;
    float: left;
  }
}
//底部
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 16px;
  .money {
    height: 50px;
    line-height: 50px;
    flex: 2;
    text-align: center;
    background-color: #fff;
  }
  .submit {
    height: 50px;
    line-height: 50px;
    flex: 1;
    text-align: center;
    background-color: #ff2d50;
    color: #fff;
  }
}
</style>