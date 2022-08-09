// 全局自定义组件的注册
import PageTools from './PageTools'
export default {
  install(Vue) {
    // 注册组件
    Vue.component('PageTools', PageTools)
  }
}
