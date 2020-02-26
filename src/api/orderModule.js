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

// order/useList?title=子&firstId=7&secondId=99&thirdId=2156&startCreatedTime=1559009011232&endCreatedTime=1579009011232&sortField=complete&orderBy=desc
export function orderBuy(data) {
  return request({
    url: '/order/useList',
    method: 'post',
    data
  })
}

// 支付 /pay/alipayOrder?orderId=2&successUrl=http://api.2lei.cn/pay/alipayReturn
export function alipay(data) {
  return request({
    url: '/pay/alipayOrder',
    method: 'post',
    data
  })
}

// 订单催付款 /order/pushPay?id=2
export function pushPay(data) {
  return request({
    url: '/order/pushPay',
    method: 'post',
    data
  })
}

// 买家订单催确认 /order/rushOrderAffirm?id=2
export function rushOrderAffirm(data) {
  return request({
    url: '/order/rushOrderAffirm',
    method: 'post',
    data
  })
}
