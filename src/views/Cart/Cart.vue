<template>
  <div>
    <div class="header">
      <span @click="$router.back(-1)">
        <i class="cubeic-back"></i>
      </span>
      <div class="title">购物车信息</div>
    </div>
    <!-- <p class="info_title">购物车信息</p> -->
    <!--订单列表-->
    <div v-cloak class="list" v-if="CartOrderList.length > 0">
      <div class="box" v-for="(item, index) of CartOrderList" :key="index">
        <router-link :to="{path:'/commodityDetail', query:{ commodity_id : item.commodity_id }}">
          <div class="smallbox">
            <div class="imgdiv">
              <img :src="item.commodity_img" />
            </div>

            <div class="textdiv" style="margin-left: 30px; ">
              <p class="title" style="margin-left: -1px;">{{item.commodity_describe}}</p>
              <p class="price" style="margin-left: -1px;">￥{{(item.total_fee / 100).toFixed(2)}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="no_order" v-if="CartOrderList.length == 0" v-cloak>
      <p>购物车为空</p>
    </div>
    <!--顶部支付-->
    <div class="footer">
      <p class="money">总金额:&nbsp;&nbsp;&nbsp;{{(total_cost/ 100).toFixed(2)}}元</p>
      <!-- <p class="submit" @click="videoOrder">立刻支付</p> -->
      <p class="submit" @click="emptyCart">清空购物车</p>
    </div>
    <!--底部导航-->
    <!-- <common-footer></common-footer> -->
  </div>
</template>

<script>
import { getUserCartListApi, emptyCartApi } from "@/api/getData.js";
import CommonFooter from "@/components/CommonFooter";
export default {
  components: {
    CommonFooter
  },
  data() {
    return {
      CartOrderList: [],
      total_cost: 0
    };
  },
  methods: {
    async getUserCartList() {
      try {
        const result = await getUserCartListApi(this.$store.state.token);
        if (result.data.code === 0) {
          this.CartOrderList = result.data.data || [];
          var length = result.data.data.length;
          for (var i = 1; i <= length; i++) {
            this.total_cost =
              this.total_cost + result.data.data[i - 1].total_fee;
          }
          console.log(this.total_cost);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async emptyCart() {
      try {
        const result = await emptyCartApi(this.$store.state.token);
        if (result.data.code === 0) {
          const toast = this.$createToast({
            txt: "清空购物车成功",
            type: "correct",
            time: 1000,
            onTimeout: () => {
              location.reload();
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
            txt: "系统异常",
            type: "error",
            time: 1000
          });
          toast.show();
        }
      } catch (erro) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getUserCartList();
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex; //flex左右布局
  background-color: #07111b;
  padding: 10px 20px;
  color: #fff;
}
// 返回箭头
.cubeic-back {
  color: #fff;
  margin-right: 5px;
}
.title {
  font-size: 16px;
  width: 80%;
  //超出省略
  // text-overflow: ellipsis;
  // overflow: hidden;
  white-space: nowrap;
}
.info_title {
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #d9dde1;
}
.list {
  padding: 0 20px;
}

// 视频个体
.box {
  padding: 20px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  // 标题
  .title {
    font-size: 14px;
    margin-bottom: 15px;
  }
  // 订单详情
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
      padding-left: 10px;
      float: left;
    }
  }
}

.no_order {
  margin-top: 50px;
  text-align: center;
}

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