import request from '@/utils/request'
import qs from 'qs'

/**
 *  仓库管理部分 API 接口
 */

// 获取仓库列表
export function getWarehoseList(data) {
  return request({
    url: '/warehouseManage/getWarehoseList',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取仓库数量
export function getWarehoseCount(data) {
  return request({
    url: '/warehouseManage/getWarehoseCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新增仓库
export function addWarehose(data) {
  return request({
    url: '/warehouseManage/addWarehose',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除仓库
export function deleteWarehouse(data) {
  return request({
    url: '/warehouseManage/deleteWarehouse',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 修改仓库
export function updateWarehouse(data) {
  return request({
    url: '/warehouseManage/updateWarehouse',
    method: 'post',
    data: qs.stringify(data)
  })
}
