// import request from '@/utils/request'
import axios from 'axios'

// 登录
// export const login = data => {
//   return request({
//     method: 'POST',
//     url: '/app/v1_0/authorizations',
//     data
//   })
// }
export const login = () => {
  return axios({
    method: 'GET',
    url: '/mock.json'
  })
}

// sms
export const sms = () => {
  return axios({
    method: 'GET',
    url: '/mock.json'
  })
}
