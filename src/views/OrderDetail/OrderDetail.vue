<template>
  <div>
    <div class="header">
      <span @click="$router.back(-1)">
        <i class="cubeic-back"></i>
      </span>
      <div class="title">订单详情</div>
    </div>
    <div class="p_top">
      <div>
        <img :src="$route.params.order_detail.commodity_img" />
        <div>
          <p style="font-size: 23px;">{{$route.params.order_detail.commodity_describe}}</p>
          <p>订单状态：{{$route.params.order_detail.state}}</p>
          <p>(1表示已支付，0表示未支付)</p>
          <p>总金额：￥{{($route.params.order_detail.total_fee/100).toFixed(2)}}元</p>
          <p>商品序号：{{$route.params.order_detail.commodity_id}}</p>
          <p>配送地址：</p>
          <p>{{$route.params.order_detail.address}}</p>
          <p>订单编号：</p>
          <p>{{$route.params.order_detail.out_trade_no}}</p>
          <p>下单时间：{{$route.params.order_detail.create_time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
.p_top {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  //   background-color: #2c3f54;
  div {
    text-align: center;
    img {
      width: 200px;
      height: 200px;
      //   border-radius: 50px;
    }
    p {
      font-size: 16px;
      //   color: #fff;
      margin-top: 15px;
    }
  }
}
</style>
