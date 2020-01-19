import request from '@/utils/request'

// 订单确认 id=1
export function handleOrderConfirm(data) {
  return request({
    url: '/order/confirm',
    method: 'post',
    data
  })
}

// 商家订单列表
export function orderMerchantList(data) {
  return request({
    url: '/order/merchantList',
    method: 'post',
    data
  })
}

// 厂家确认订单
export function bbsOrderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data
  })
}

// order/add?waresId=1&number=1&note=我要最好的袜子，发货速度要快
export function bbsOrderAdd(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}

