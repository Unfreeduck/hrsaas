// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/social', // 路由地址
  name: 'social', // 后面做权限使用
  component: Layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/social'),
    // 路由元信息，放任何内容
    meta: {
      title: '社保' // 左侧导航读取使用
    }
  }]
}
