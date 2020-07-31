<template>
  <div class="list-content">
    <div class="list">
      <div v-for="(category,index) in commodityList" :key="category.id" >
        <h4 class="category">{{category.describe}}</h4>
        <div class="list">
          <router-link
            v-for="item in commodityList[index].commodityList"
            :to="{path:'/commodityDetail',query:{commodity_id:item.id}}"
            :key="item.id"
            class="commodity"
          >
            <div class="item_img">
              <img :src="item.home_img" />
            </div>
            <div class="commodity_info">
              <div class="c_title">{{item.describe}}</div>
              <div class="price">￥{{item.price /100}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commodityList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
//列表包裹层边距
.list-content {
  margin-top: 20px;
  padding: 0 13px;
}

.list {
  display: flex; //设置flex布局
  flex-wrap: wrap; //换行排列
  justify-content: space-between; //两端对齐
  // padding-bottom: 55px;
  margin-top: 0px;
}

.commodity {
  width: 48%;
  margin-bottom: 17px;
}
//商品图片
.item_img {
  font-size: 0; //消除图片元素产生的间隙
  box-shadow: 0 4px 11px 0 rgba(43, 51, 59, 0.6); //设置图片阴影，rgba前三个参数是颜色编码，最后一个是透明度
  border-radius: 8px; //设置图片圆角
  img {
    width: 100%;
    border-radius: 8px;
    height: 167px;
  }
}
.c_title {
  //设置超过两行隐藏 start
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  //设置超过两行隐藏 end
  font-size: 12px;
  height: 26px;
  line-height: 13px;
  margin-top: 10px;
  color: #666;
}
.category {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #666;
    margin-top: -5px;
}
//价格
.price {
  margin-top: 0px;
  font-size: 13px;
  color: #d93f30;
}
</style>