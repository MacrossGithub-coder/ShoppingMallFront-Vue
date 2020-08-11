import axios from '../request'

//注册接口
export const registerApi = (name, phone, pwd,) => axios.post("/api/v1/pri/user/register", {
    "name": name,
    "phone": phone,
    "pwd": pwd
})

//登录接口
export const loginApi = (phone, pwd) => axios.post("/api/v1/pri/user/login", {
    "phone": phone,
    "pwd": pwd
})

//注销接口
export const logoutApi = (token) => axios.get("/api/v1/pri/user/logout", {
    params: {
        "token": token
    }
})

//查询用户信息接口
export const getUserInfoApi = (token) => axios.get("/api/v1/pri/user/find_by_token", {
    params: {
        "token": token
    }
})


//首页轮播图接口
export const getBannerApi = () => axios.get("/api/v1/pub/list/home_banner")

//首页商品信息接口
export const getCommodityListApi = () => axios.get("/api/v1/pub/list/home_Commodity")


//查看商品详情接口
export const getCommodityDetailApi = (commodity_id) => axios.get("/api/v1/pub/list/find_commodity_detail", {
    params: {
        "commodity_id": commodity_id
    }
})

//加入购物车
export const addToCartApi = (token, commodity_id) => axios.get("/api/v1/pri/cart/add_to_cart", {
    params: {
        "commodity_id": commodity_id,
        "token": token
    }
})

//查看购物车
export const getUserCartListApi = (token) => axios.get("/api/v1/pri/cart/find_user_cart_info",{
    params:{
        "token":token
    }
})

//清空购物车
export const emptyCartApi = (token) => axios.get("/api/v1/pri/cart/empty_cart",{
    params:{
        "token":token
    }
})


//下单接口
export const commodityOrderApi = (token, commodity_id) => axios.get("/api/v1/pri/order/commodity_order", {

    params: {
        "commodity_id": commodity_id,
        "token": token
    }
})

//用户订单列表
export const getUserOrderListApi = (token) => axios.get("/api/v1/pri/order/find_user_order", {
    params: {
        "token": token
    }
})

