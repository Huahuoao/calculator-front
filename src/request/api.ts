// 导入axios实例
import request from "./request.ts"

// 定义接口的传参
interface UploadHistoryInfoParam {
    data: string,
    result: string
}

// 获取用户信息
export function upload(param: UploadHistoryInfoParam) {
    return request({
        url: '/history/upload',
        method: 'post',
        params: param,
    })
}

export function list() {
    return request({
        url: '/history/list',
        method: 'get',
    })
}

export function clearHistory() {
    return request({
        url: '/history/clear',
        method: 'get',
    })
}

export function getRateBorrow() {
    return request({
        url: '/rate/getRatesBorrow',
        method: 'post',
    })
}

export function getRateSave() {
    return request({
        url: '/rate/getRatesSave',
        method: 'post',
    })
}

export function updateRate(data) {
    return request({
        url: '/rate/update',
        method: 'post',
        data: data
    })
}

export function getSaveResult(num, principal) {
    return request({
        url: '/rate/result/save',
        method: 'post',
        params: {
            num: num,
            principal: principal
        }
    })
}

export function getBorrowResult(num, principal) {
    return request({
        url: '/rate/result/borrow',
        method: 'post',
        params: {
            num: num,
            principal: principal
        }
    })
}
