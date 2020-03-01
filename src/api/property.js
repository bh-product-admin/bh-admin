import request from '@/utils/request'

// 资金明细列表 ?type=1&startCreatedTime=1599877776665&endCreatedTime=1599877776667
export function moneyDetailBuyerList(data) {
  return request({
    url: '/moneyDetail/list',
    method: 'post',
    data
  })
}
