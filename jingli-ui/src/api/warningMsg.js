import request from '@/utils/request'
import qs from 'qs'

export function getWarningCount(data) {
  return request({
    url: '/warning/getWarningCount',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getWarningList(data) {
  return request({
    url: '/warning/getWarningList',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getWarningNoReadCount(data) {
  return request({
    url: '/warning/getWarningNoReadCount',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function updatePushState(data) {
  return request({
    url: '/warning/updatePushState',
    method: 'post',
    data: qs.stringify(data)
  })
}
