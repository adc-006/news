/**
 * 封装 axios 请求模块
 * BaseURL:http://ttapi.research.itcast.cn/
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request
