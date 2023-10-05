import request from '@/utils/request'
import qs from 'qs'

// 获取企业列表集合
export function getBusiList(data) {
  return request({
    url: '/login/getUserList',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取企业列表 总条数
export function getUserCount(data) {
  return request({
    url: '/login/getUserCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 企业修改
export function updateUserInfo(data) {
  return request({
    url: '/login/updateUserInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 企业禁用  /login/updateUserState
export function updateUserState(data) {
  return request({
    url: '/login/updateUserState',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 企业删除 /login/deleteUser
export function deleteUser(data) {
  return request({
    url: '/login/deleteUser',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新增企业 /login/saveUser
export function saveUser(data) {
  return request({
    url: '/login/saveUser',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 *  大棚管理部分 API 接口
 */
 // 获取大棚列表
 export function getAreaListr(data) {
   return request({
     url: '/areaManage/getAreaList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取大棚数量 /areaManage/getAreaCount
 export function getAreaCount(data) {
   return request({
     url: '/areaManage/getAreaCount',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增大棚 /areaManage/addArea
 export function addArea(data) {
   return request({
     url: '/areaManage/addArea',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 复制大棚 /areaManage/copyArea
 export function copyArea(data) {
   return request({
     url: '/areaManage/copyArea',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 删除大棚 /areaManage/deleteArea
 export function deleteArea(data) {
   return request({
     url: '/areaManage/deleteArea',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改大棚 /areaManage/updateArea
 export function updateArea(data) {
   return request({
     url: '/areaManage/updateArea',
     method: 'post',
     data: qs.stringify(data)
   })
 }
