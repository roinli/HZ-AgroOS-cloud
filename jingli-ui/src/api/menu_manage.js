import request from '@/utils/request'
import qs from 'qs'

/**
 *  后台-设备管理 API 接口
 */

 // 获取系统所有菜单
 export function getAllMenu(data) {
   return request({
     url: '/permission/getAllMenu',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增系统菜单
 export function saveMenu(data) {
   return request({
     url: '/permission/saveMenu',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取系统所有父级菜单 /permission/getAllParent
 export function getAllParent(data) {
   return request({
     url: '/permission/getAllParent',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改系统菜单 /permission/updateMenu
 export function updateMenu(data) {
   return request({
     url: '/permission/updateMenu',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 删除系统菜单 /permission/deleteMenu
 export function deleteMenu(data) {
   return request({
     url: '/permission/deleteMenu',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改系统菜单是否可见 /permission/updateVisible
 export function updateVisible(data) {
   return request({
     url: '/permission/updateVisible',
     method: 'post',
     data: qs.stringify(data)
   })
 }
