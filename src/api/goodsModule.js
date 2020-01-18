import request from '@/utils/request'

// 我的商品列表 userId=2&orderBy=desc&sortField=threeSale
export function getWaresListByUser(data) {
  return request({
    url: '/wares/listByUser',
    method: 'post',
    data
  })
}

// 我的商品。上下架功能 id=1&showStatus=1 上架 2 下架
export function setWaresStatus(data) {
  return request({
    url: '/wares/showStatus',
    method: 'post',
    data
  })
}

// 我的商品。删除功能
export function deleteWares(data) {
  return request({
    url: 'wares/remove',
    method: 'post',
    data
  })
}

// 添加我的商品（非平台商品） goodsId=1&skuType=1&price=99&
// 库存 inventory=1000& 日生产量 dayProductionNum=189& 日发货： daySendNum=169&
// returnNum=20&maxSaleCycle=60
export function waresGoodsAdd(data) {
  return request({
    url: '/wares/add',
    method: 'post',
    data
  })
}

// 修改我的商品 id=1&inventory=190&dayProductionNum=123&returnNum=456
export function waresGoodsEdit(data) {
  return request({
    url: '/wares/edit',
    method: 'post',
    data
  })
}
