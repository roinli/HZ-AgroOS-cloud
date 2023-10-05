import request from '@/utils/request'
import qs from 'qs'

export function getMyWarehouseCount(data) {
    return request({
        url: '/myWarehouse/getMyWarehouseCount',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getMyWarehouseList(data) {
    return request({
        url: '/myWarehouse/getMyWarehouseList',
        method: 'post',
        data: qs.stringify(data)
    })
}