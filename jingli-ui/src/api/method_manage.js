import request from '@/utils/request'
import qs from 'qs'

/**
 *  后台-设备管理 API 接口
 */
// 获取所有系统方法
export function getAllFunc(data) {
  return request({
    url: '/permission/getAllFunc',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新增系统方法
export function saveFunc(data) {
  return request({
    url: '/permission/saveFunc',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除该方法
export function deleteFunc(data) {
  return request({
    url: '/permission/deleteFunc',
    method: 'post',
    data: qs.stringify(data)
  })
}
