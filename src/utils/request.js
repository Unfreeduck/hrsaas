
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间

// create an axios instance
const service = axios.create({
  // 当执行npm run dev=>.evn.development=>/api=>跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // /dev-api  /prod-api
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config是请求信息
  // 注入token
  if (store.getters.token) {
    // 有token的情况去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认返回数据有一层data
  const { success, message, data } = response.data
  // 要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误，不能进then，应该进catch
    Message.error(message)// 提示错误信息
    return Promise.reject(new Error(message))
  }
}, error => {
  // error里面有response
  if (error.response && error.response.data && error.response.data === 10002) {
    store.dispatch('user/logout') // 登出action，删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误，让当前的执行链跳出成功 直接进入catch
})
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
