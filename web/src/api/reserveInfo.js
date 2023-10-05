import request from '@/utils/request'
import qs from 'qs'

//获取仓库列表（下拉框）
export function getWarehouseList(data) {
  return request({
    url: '/stock/getWarehouseList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//获取产品种类
export function getInventoryType(data) {
  return request({
    url: '/stock/getInventoryType',
    method: 'post',
    data: qs.stringify(data)
  })
}

//获取仓库库存数量
export function getInventoryCount(data) {
  return request({
    url: '/stock/getInventoryCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

//获取仓库库存列表
export function getInventoryManage(data) {
  return request({
    url: '/stock/getInventoryManage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//查看-出库记录
export function getViewOutgoingRecords(data) {
  return request({
    url: '/stock/getViewOutgoingRecords',
    method: 'post',
    data: qs.stringify(data)
  })
}

//查看-产品信息
export function getViewProInfo(data) {
  return request({
    url: '/stock/getViewProInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

//入库列表数量
export function insertWarehousesCount(data) {
  return request({
    url: '/stock/insertWarehousesCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

//入库列表
export function insertWarehousesList(data) {
  return request({
    url: '/stock/insertWarehousesList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//添加入库信息
export function insertWarehousing(data) {
  return request({
    url: '/stock/insertWarehousing',
    method: 'post',
    data: qs.stringify(data)
  })
}

//出库
export function updatePlacing(data) {
  return request({
    url: '/stock/updatePlacing',
    method: 'post',
    data: qs.stringify(data)
  })
}
