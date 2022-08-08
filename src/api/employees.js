import request from '@/utils/request'
// 获取员工的简单列表
// 只需要名字
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
