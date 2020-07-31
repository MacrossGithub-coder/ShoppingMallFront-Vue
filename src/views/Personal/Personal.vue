<template>
  <div>
    <div class="container">
      <div class="p_top">
        <div>
          <!-- <img :src='info.head_img || HeadImg' alt="头像"/> -->
          <img v-if="state === 1" :src="info.head_img " alt="头像" />
          <!-- <img v-if="state === 0" :src="HeadImg" alt="头像" /> -->
          <router-link to="/login" v-if="getToken === ''">
            <p>立刻登录</p>
          </router-link>
          <div v-else>
            <p style="font-size: 23px;">{{info.name}}</p>
            <p>账户余额：{{info.account/100}}元</p>
            <p>配送地址：{{info.address}}</p>
          </div>
        </div>
      </div>
      <router-link :to="{path:'/order'}">
        <button v-if="getToken !== ''" class="green1" >查看订单</button>
      </router-link>
      <button v-if="getToken !== ''" class="green2" @click="signOut">退出登录</button>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from "@/components/CommonFooter";
import { getUserInfoApi } from "@/api/getData.js";
import headImg from "@/assets/logo.png";
export default {
  components: {
    CommonFooter
  },
  data() {
    return {
      info: {},
      HeadImg: headImg,
      state: 0
    };
  },

  computed: {
    getToken() {
      return this.$store.state.token;
    }
  },

  methods: {
    async getInfo() {
      try {
        const result = await getUserInfoApi(this.getToken);
        if (result.data.code === 0) {
          this.info = result.data.data;
          this.state = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async signOut() {
      await this.$store.dispatch("clearToken");
      localStorage.removeItem("token");
      this.state = 0;

      location.reload();
    }
  },

  mounted() {
    if (this.getToken) {
      this.getInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // 顶部头像区域
  .p_top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    background-color: #2c3f54;
    div {
      text-align: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50px;
      }
      p {
        font-size: 16px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }
}

.green1 {
  display: block;
  background-color: #3bb149;
  border: none;
  outline: none;
  width: 80%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;
}
.green2 {
  display: block;
  background-color: rgb(232, 69, 38);
  border: none;
  outline: none;
  width: 80%;
  height: 40px;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 20px;
}
</style>