import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/', // 可根据实际情况修改
  timeout: 8000
})

service.interceptors.request.use(
  config => {
    // 假设有token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code !== 200) {
      Message.error(res.message || '请求失败')
      return Promise.reject(res)
    }
    return res
  },
  error => {
    Message.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default service