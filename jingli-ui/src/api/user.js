import request from '@/utils/request'
import qs from 'qs'
// 登录
export function login(data) {
  return request({
    url: '/login/userLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// employee/queryList
export function queryList(data) {
  return request({
    url: '/employee/queryList',
    method: 'post',
    data: qs.stringify(data)
  })
}


// POST /login/getUserMenu
export function getUserMenu(data) {
  return request({
    url: '/login/getUserMenu',
    method: 'post',
    data: qs.stringify(data)
  })
}
