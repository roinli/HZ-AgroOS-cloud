import request from '@/utils/request'
import qs from 'qs'

export function getDeviceInfoList(data) {
  return request({
    url: '/deviceInfo/getDeviceInfoList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//POST /deviceInfo/getDeviceInfoCount

export function getDeviceInfoCount(data) {
  return request({
    url: '/deviceInfo/getDeviceInfoCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateDeviceSensorSet(data) {
  return request({
    url: '/deviceInfo/updateDeviceSensorSet',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 获取传感器设置列表
// POST /deviceInfo/getDeviceSensorSet
export function getDeviceSensorSet(data) {
  return request({
    url: '/deviceInfo/getDeviceSensorSet',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /deviceInfo/updateDeviceName
export function updateDeviceName(data) {
  return request({
    url: '/deviceInfo/updateDeviceName',
    method: 'post',
    data: qs.stringify(data)
  })
}


// POST /deviceInfo/updateControlDeviceState
export function updateControlDeviceState(data) {
  return request({
    url: '/deviceInfo/updateControlDeviceState',
    method: 'post',
    data: qs.stringify(data)
  })
}


export function updateControlSet(data) {
  return request({
    url: '/deviceInfo/updateControlSet',
    method: 'post',
    data: qs.stringify(data)
  })
}
// POST /deviceInfo/getAutoSensorList
export function getAutoSensorList(data) {
  return request({
    url: '/deviceInfo/getAutoSensorList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// POST /deviceInfo/getControlSetList
export function getControlSetList(data) {
  return request({
    url: '/deviceInfo/getControlSetList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// /deviceInfo/saveControlSet
export function saveControlSet(data) {
  return request({
    url: '/deviceInfo/saveControlSet',
    method: 'post',
    data: qs.stringify(data)
  })
}

// /deviceInfo/deleteControlSet
export function deleteControlSet(data) {
  return request({
    url: '/deviceInfo/deleteControlSet',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /deviceInfo/saveDeviceSensorSet
export function saveDeviceSensorSet(data) {
  return request({
    url: '/deviceInfo/saveDeviceSensorSet',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /deviceInfo/deleteSensorSet
export function deleteSensorSet(data) {
  return request({
    url: '/deviceInfo/deleteSensorSet',
    method: 'post',
    data: qs.stringify(data)
  })
}
