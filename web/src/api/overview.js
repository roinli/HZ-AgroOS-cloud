import request from '@/utils/request'
import qs from 'qs'

/**
 *  后台-设备概览 API 接口
 */

 // 获取传感器列表
 export function getSensorDeviceList(data) {
   return request({
     url: '/deviceManage/getSensorDeviceList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改传感器
 export function updateSensorDevice(data) {
   return request({
     url: '/deviceManage/updateSensorDevice',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增传感器
 export function addSensorDevice(data) {
   return request({
     url: '/deviceManage/addSensorDevice',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取设备图片 /deviceManage/getIconList
 export function getIconList(data) {
   return request({
     url: '/deviceManage/getIconList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

// 获取设备数量
export function getDeviceCount(data) {
  return request({
    url: '/deviceManage/getDeviceCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

 // 删除设备
 export function deleteDeviceById(data) {
   return request({
     url: '/deviceManage/deleteDeviceById',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取控制器列表 /deviceManage/getControllerDeviceList
 export function getControllerDeviceList(data) {
   return request({
     url: '/deviceManage/getControllerDeviceList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增控制器 /deviceManage/addControllerDevice
 export function addControllerDevice(data) {
   return request({
     url: '/deviceManage/addControllerDevice',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取摄像头列表 /deviceManage/getCameraDeviceList
 export function getCameraDeviceList(data) {
   return request({
     url: '/deviceManage/getCameraDeviceList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增摄像头 /deviceManage/addCameraDevice
 export function addCameraDevice(data) {
   return request({
     url: '/deviceManage/addCameraDevice',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改摄像头 /deviceManage/updateCaneraDevice
 export function updateCaneraDevice(data) {
   return request({
     url: '/deviceManage/updateCaneraDevice',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取控制器详情 /deviceManage/getControllerDeviceDetail
 export function getControllerDeviceDetail(data) {
   return request({
     url: '/deviceManage/getControllerDeviceDetail',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取控制器详情 /deviceManage/updateControllerDevice
 export function updateControllerDevice(data) {
   return request({
     url: '/deviceManage/updateControllerDevice',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 新增控制器通道 /deviceManage/addControllerChannel
 export function addControllerChannel(data) {
   return request({
     url: '/deviceManage/addControllerChannel',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 修改控制器通道开关数 /deviceManage/updateControllerChannelSwitch
 export function updateControllerChannelSwitch(data) {
   return request({
     url: '/deviceManage/updateControllerChannelSwitch',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 删除控制器通道 /deviceManage/deleteControllerChannel
 export function deleteControllerChannel(data) {
   return request({
     url: '/deviceManage/deleteControllerChannel',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取某层级的通道列表 /deviceManage/getControllerChannelSwitch
 export function getControllerChannelSwitch(data) {
   return request({
     url: '/deviceManage/getControllerChannelSwitch',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 /**
  *  后台-设备管理 API 接口   2
  */
 // 获取使用该设备的主控ID列表
 export function getUseDeviceMainControlList(data) {
   return request({
     url: '/deviceManage/getUseDeviceMainControlList',
     method: 'post',
     data: qs.stringify(data)
   })
 }

 // 获取使用该设备的主控ID数量
 export function getUseDeviceMainControlCount(data) {
   return request({
     url: '/deviceManage/getUseDeviceMainControlCount',
     method: 'post',
     data: qs.stringify(data)
   })
 }
