// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/permission', // 路由地址
  name: 'permission', // 后面做权限使用
  component: Layout,
  children: [{
    path: '', // 这里不用写
    component: () => import('@/views/permission'),
    // 路由元信息，放任何内容
    meta: {
      title: '权限管理', // 左侧导航读取使用
      icon: 'lock'
    }
  }]
}
