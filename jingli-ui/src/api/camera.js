import request from '@/utils/request'
import qs from 'qs'
//POST /cameraList/getAllArea
//POST /cameraList/getCameraList
export function getAllArea(data) {
    return request({
        url: '/cameraList/getAllArea',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getCameraList(data) {
    return request({
        url: '/cameraList/getCameraList',
        method: 'post',
        data: qs.stringify(data)
    })
}