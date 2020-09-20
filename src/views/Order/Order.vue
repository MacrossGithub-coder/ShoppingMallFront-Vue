<template>
  <div>
    <div class="header">
      <span @click="$router.back(-1)">
        <i class="cubeic-back"></i>
      </span>
      <div class="title">订单信息</div>
    </div>
    <!--订单列表 -->
    <div v-cloak class="list" v-if="OrderList.length > 0">
      <div class="box" v-for="(item, index) of OrderList" :key="index">
        <div class="smallbox">
          <router-link :to="{path:'/commodityDetail', query:{ commodity_id : item.commodity_id }}">
            <div class="imgdiv">
              <img :src="item.commodity_img" />
            </div>
          </router-link>
          <div class="textdiv" style="margin-left: 30px; ">
            <p class="title" style="margin-left: -1px;">{{item.commodity_describe}}</p>
            <p class="price" style="margin-left: -1px;">￥{{(item.total_fee / 100).toFixed(2)}}</p>
            <div class="router">
              <div >
                <router-link :to="{name:'OrderDetail', params:{ order_detail : item } }">
                  <p class="title" style="margin-left: -1px;margin-top: 10px;">查看详情</p>
                </router-link>
              </div>
              <div style="float: right;">
                <router-link :to="{name:'PublicComment', params:{ order_detail : item } }">
                  <p class="title" style="margin-left: -1px; margin-top: -29px; margin-right: 40px;">商品评价</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="no_order" v-if="OrderList.length == 0" v-cloak>
      <p>暂无订单</p>
    </div>

    <!-- <common-footer></common-footer> -->
  </div>
</template>

<script>
import { getUserOrderListApi } from "@/api/getData.js";
import CommonFooter from "@/components/CommonFooter";

export default {
  components: {
    CommonFooter
  },
  data() {
    return {
      OrderList: []
    };
  },
  methods: {
    async getUserOrderList() {
      try {
        const result = await getUserOrderListApi(this.$store.state.token);
        if (result.data.code === 0) {
          this.OrderList = result.data.data || [];
          console.log(this.total_cost);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getUserOrderList();
  }
};
</script>

<style lang="scss" scoped>
.router p {
  display: inline;
}

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
      margin-top: 7px;
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