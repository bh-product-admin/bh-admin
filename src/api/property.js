import request from '@/utils/request'

// 资金明细列表 ?type=1&startCreatedTime=1599877776665&endCreatedTime=1599877776667
export function moneyDetailBuyerList(data) {
  return request({
    url: '/moneyDetail/list',
    method: 'post',
    data
  })
}

// 已支付订单退款 order/payCancel?id=22&content=买错了
export function payCancel(data) {
  return request({
    url: '/order/payCancel',
    method: 'post',
    data
  })
}

// 买家退款列表 title=成功&orderReturnStatus=2&merchantId=3
// &startCreatedTime=1581823428622&endCreatedTime=1581823429622
export function orderReturnBuyerList(data) {
  return request({
    url: '/orderReturn/manufacturersList',
    method: 'post',
    data
  })
}

// order/confirmPayCancel
export function orderConfirmPayCancel(data) {
  return request({
    url: '/order/confirmPayCancel',
    method: 'post',
    data
  })
}
