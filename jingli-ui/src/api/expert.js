
import request from '@/utils/request'
import qs from 'qs'


export function deleteExpert(data) {
    return request({
        url: '/expert/deleteExpert',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function queryList(data) {
    return request({
        url: '/expert/queryList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function queryListCount(data) {
    return request({
        url: '/expert/queryListCount',
        method: 'post',
        data: qs.stringify(data)
    })
}


export function saveExpert(data) {
    return request({
        url: '/expert/saveExpert',
        method: 'post',
        data: qs.stringify(data)
    })
}
