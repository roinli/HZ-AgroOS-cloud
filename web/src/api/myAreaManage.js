import request from '@/utils/request'
import qs from 'qs'

//POST /myArea/getMyAreaCount
//POST /myArea/getMyAreaList
//POST /myArea/updateDisplayName
export function getMyAreaCount(data) {
    return request({
        url: '/myArea/getMyAreaCount',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getMyAreaList(data) {
    return request({
        url: '/myArea/getMyAreaList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function updateDisplayName(data) {
    return request({
        url: '/myArea/updateDisplayName',
        method: 'post',
        data: qs.stringify(data)
    })
}