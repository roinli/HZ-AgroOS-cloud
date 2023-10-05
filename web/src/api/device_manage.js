import request from '@/utils/request'
import qs from 'qs'

/**
 *  后台-设备管理 API 接口
 */

 // 删除设备关联
 export function deleteDeviceRelation(data) {
   return request({
     url: '/deviceUseManage/deleteDeviceRelation',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取设备数量
 export function getDeviceUseCount(data) {
   return request({
     url: '/deviceUseManage/getDeviceUseCount',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取设备关联列表
 export function getDeviceUseList(data) {
   return request({
     url: '/deviceUseManage/getDeviceUseList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增设备关联
 export function saveDeviceRelation(data) {
   return request({
     url: '/deviceUseManage/saveDeviceRelation',
     method: 'post',
     data: qs.stringify(data)
   })
 }
