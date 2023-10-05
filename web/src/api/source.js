import request from '@/utils/request'
import qs from 'qs'
// POST /source/getSourceList
export function getSourceList(data) {
  return request({
    url: '/source/getSourceList',
    method: 'post',
    data: qs.stringify(data)
  })
}

// /source/getSourceCount
export function getSourceCount(data) {
  return request({
    url: '/source/getSourceCount',
    method: 'post',
    data: qs.stringify(data)
  })
}
// POST /source/addBatch

export function addBatch(data) {
  return request({
    url: '/source/addBatch',
    method: 'post',
    data: qs.stringify(data)
  })
}

// /source/delProduct
export function delProduct(data) {
  return request({
    url: '/source/delProduct',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /source/addProduct
export function addProduct(data) {
  return request({
    url: '/source/addProduct',
    method: 'post',
    data: qs.stringify(data)
  })
}
// /source/getBatchByList
export function getBatchByList(data) {
  return request({
    url: '/source/getBatchByList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// /source/updateArchiveFinish
export function updateArchiveFinish(data) {
  return request({
    url: '/source/updateArchiveFinish',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateBatch(data) {
  return request({
    url: '/source/updateBatch',
    method: 'post',
    data: qs.stringify(data)
  })
}


// POST /source/delBatch
export function delBatch(data) {
  return request({
    url: '/source/delBatch',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /source/updateShelves
export function updateShelves(data) {
  return request({
    url: '/source/updateShelves',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /source/getArchive
export function getArchive(data) {
  return request({
    url: '/source/getArchive',
    method: 'post',
    data: qs.stringify(data)
  })
}

// POST /source/updateArchive
export function updateArchive(data) {
  return request({
    url: '/source/updateArchive',
    method: 'post',
    data: qs.stringify(data)
  })
}

// /source/upoadBaseImgData
export function upoadBaseImgData(data) {
  return request({
    url: '/source/upoadBaseImgData',
    method: 'post',
    data: qs.stringify(data)
  })
}

// /source/getScanArea
export function getScanArea(data) {
  return request({
    url: '/source/getScanArea',
    method: 'post',
    data: qs.stringify(data)
  })
}
// /source/getScanCount
export function getScanCount(data) {
  return request({
    url: '/source/getScanCount',
    method: 'post',
    data: qs.stringify(data)
  })
}
