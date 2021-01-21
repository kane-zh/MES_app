// 引入axios
import axios from 'axios'
// 全局状态控制引入
import store from '@/store'
// axios默认配置
// 超时时间
axios.defaults.timeout = 10000
// 跨域携带cookie
axios.defaults.withCredentials = true
// 给请求头加键值对
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use((config) => {
  if (store.getters.getuserInfor.token !== '') { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `JWT ${store.getters.getuserInfor.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error.response)
})
// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      // 异常请求要做的事
    } else {
      // 正常请求要做的事
    }
    return response
  }, (error) => {
    console.log('response请求报错', error.response)
    // 返回接口返回的错误信息
    if (error.response && error.response.data) {
      if (error.response.data.detail === 'Signature has expired.') {
        alert('登录信息过期,请重新登录')
        localStorage.removeItem('loginInfor')
        this.$router.replace({name: 'login'})
      } else if (error.response.data.detail === '身份认证信息未提供。') {
        alert('请重新登录')
        localStorage.removeItem('loginInfor')
        this.$router.replace({name: 'login'})
      } else if (error.response.data.detail === 'Error decoding signature.') {
        alert('登录信息错误,请重新登录')
        localStorage.removeItem('loginInfor')
        this.$router.replace({name: 'login'})
      } else {
        alert(error.response.data.detail)
      }
    }
    if (!error.response) {
      if (error.message.includes('Network Error')) { // 判断请求异常信息中是否含有超时Network Error字符串
        alert('网络超时,请检查网络是否连接')
      } else {
        alert(error.message)
      }
    }
    return Promise.reject(error)
  }
)
export default axios
