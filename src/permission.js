// 权限拦截在路由跳转  导航守卫
import router from './router'
import store from '@/store' // 引入store实例 和组件中的this.$store是一回事
import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出 只需要代码执行
// 前置守卫
const whileList = ['/login', '/404'] // 定义白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  // to and from are both route objects. must call `next`.
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 跳到主页
    } else {
      next()
    }
  } else {
    // 没有token的情况
    if (whileList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次，为了解决手动切换地址时 进度条的不关闭问题
})

// 后置守卫
router.afterEach((to, from) => {
  // to and from are both route objects.
  NProgress.done() // 关闭进度条
})
