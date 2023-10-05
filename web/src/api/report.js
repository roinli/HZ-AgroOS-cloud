import request from '@/utils/request'
import qs from 'qs'

//POST /report/getAllDataList
export function getAllDataList(data) {
    return request({
        url: '/report/getAllDataList',
        method: 'post',
        data: qs.stringify(data)
    })
}
//POST /report/getAreaList
export function getAreaList(data) {
    return request({
        url: '/report/getAreaList',
        method: 'post',
        data: qs.stringify(data)
    })
}
//POST /report/getReportDeviceList
export function getReportDeviceList(data) {
    return request({
        url: '/report/getReportDeviceList',
        method: 'post',
        data: qs.stringify(data)
    })
}//POST /report/exportExcelData
export function exportExcelData(data) {
  debugger;
  window.location.href = 'http://111.229.48.239:12005/report/exportExcelData';
  // return request({
  //   url: '/report/exportExcelData',
  //   method: 'get',
  //   params: data
  // })
}
