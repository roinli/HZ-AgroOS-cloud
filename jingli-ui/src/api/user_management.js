import request from '@/utils/request'
import qs from 'qs'


export function query(data) {
    return request({
        url: '/employee/query',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function add(data) {
    return request({
        url: '/employee/add',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function deleteUser(data) {
    return request({
        url: '/employee/delete',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function queryList(data) {
    return request({
        url: '/employee/queryList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function queryListCount(data) {
    return request({
        url: '/employee/queryListCount',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function update(data) {
    return request({
        url: '/employee/update',
        method: 'post',
        data: qs.stringify(data)
    })
}