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

