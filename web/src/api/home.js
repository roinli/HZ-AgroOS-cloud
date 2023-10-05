import request from '@/utils/request'
import qs from 'qs'
// 5/homePage/getWeatherInfo

export function getWeatherInfo(data) {
  return request({
    url: '/homePage/getWeatherInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /homePage/getDeviceStateStatistics
export function getDeviceStateStatistics(data) {
  return request({
    url: '/homePage/getDeviceStateStatistics',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /homePage/getAllArea
// 获取生产单元


export function getAllArea(data) {
  return request({
    url: '/homePage/getAllArea',
    method: 'post',
    data: qs.stringify(data)
  })
}

// // homePage/getDeviceStateStatistics
// export function getDeviceStateStatistics(data) {
//   return request({
//     url: '/homePage/getDeviceStateStatistics',
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }

// POST /homePage/getWarningMessage
// 获取预警信息
export function getWarningMessage(data) {
  return request({
    url: '/homePage/getWarningMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}
// /homePage/getAllControlDevice
// 获取控制器列表

export function getAllControlDevice(data) {
  return request({
    url: '/homePage/getAllControlDevice',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /homePage/getAllSensorDevice
// 获取传感器列表
export function getAllSensorDevice(data) {
  return request({
    url: '/homePage/getAllSensorDevice',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /homePage/getDeviceData
// 获取实时数据曲线
export function getDeviceData(data) {
  return request({
    url: '/homePage/getDeviceData',
    method: 'post',
    data: qs.stringify(data)
  })
}
//POST 获取视频配置信息
export function getAllCamera(data) {
  return request({
    url: '/homePage/getAllCamera',
    method: 'post',
    data: qs.stringify(data)
  })
}
