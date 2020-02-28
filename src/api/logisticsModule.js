import request from '@/utils/request'

// 发货明细记录添加物流单号 id=1&expressNo=JD0008889074490
export function logisticsAddExpressNo(data) {
  return request({
    url: '/orderSendDetail/addExpressNo',
    method: 'post',
    data
  })
}

// 买家物流列表 orderSend/buyerList
export function logisticsBuyerList(data) {
  return request({
    url: '/orderSend/buyerList',
    method: 'post',
    data
  })
}

// 卖家物流列表
export function logisticsManufacturersList(data) {
  return request({
    url: '/orderSend/manufacturersList',
    method: 'post',
    data
  })
}

// 添加发货单（通知厂家发货）
// number=1&orderId=20&fileName=%E4%BA%AC%E4%B8%9C%E6%A8%A1%E6%9D%BF-%E6%9C%89%E6%95%B0%E6%8D%AE.xls&salePrice=199&expressType=jd&channelCost=120&note=尽快发货，速度，理解，马上
export function logisticsAddOrderSend(data) {
  return request({
    url: '/orderSend/add',
    method: 'post',
    data
  })
}

// 买家取消发货单 ?id=2
export function logisticsBuyerCancel(data) {
  return request({
    url: '/orderSend/buyerCancel',
    method: 'post',
    data
  })
}

// 卖家取消发货单 id=2&content=暂时无货
export function logisticsManufacturersCancel(data) {
  return request({
    url: '/orderSend/manufacturersCancel',
    method: 'post',
    data
  })
}
