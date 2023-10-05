import request from '@/utils/request'
import qs from 'qs'

/**
 *  后台-主控ID管理 API 接口
 */

 // 获取主控ID列表
 export function getMainControlList(data) {
   return request({
     url: '/mainControlManage/getMainControlList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取主控ID数量
 export function getMainControlCount(data) {
   return request({
     url: '/mainControlManage/getMainControlCount',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增主控ID
 export function addMainControl(data) {
   return request({
     url: '/mainControlManage/addMainControl',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 删除主控ID
 export function deleteMainControl(data) {
   return request({
     url: '/mainControlManage/deleteMainControl',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改主控ID
 export function updateMainControl(data) {
   return request({
     url: '/mainControlManage/updateMainControl',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 复制主控
 export function copyMainControl(data) {
   return request({
     url: '/mainControlManage/copyMainControl',
     method: 'post',
     data: qs.stringify(data)
   })
 }
