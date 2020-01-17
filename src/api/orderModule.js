import request from '@/utils/request'

// 根据帖子ID，查询评论列表 comments/getByBlogId?id=1
export function getByBlogIdById(data) {
  return request({
    url: '/comments/getByBlogId',
    method: 'post',
    data
  })
}

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

