import request from '@/utils/request'

export function getDemoData() {
  return request({
    url: 'https://jsonplaceholder.typicode.com/todos/1', // 示例接口
    method: 'get'
  })
}