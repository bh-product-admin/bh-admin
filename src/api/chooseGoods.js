import request from '@/utils/request'

// 根据商品ID，查询商品信息 goods/getById?id=1
export function getGoodsDetail(data) {
  return request({
    url: '/goods/goods',
    method: 'post',
    data
  })
}

// 删除平台商品 goods/remove?id=1
export function handleGoodsDelete(data) {
  return request({
    url: '/goods/remove',
    method: 'post',
    data
  })
}

// 行业策略列表数据 goods/list?type=2 类型：1.平台自营，2.鲁班
export function getGoodsList(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data
  })
}

// 修改平台商品 id=1&title=新袜子&price=2990&yesterdaySale=12&threeSale=100&sevenSale=200&totalSale=1000
export function chooseGoodsEdit(data) {
  return request({
    url: '/goods/edit',
    method: 'post',
    data
  })
}

// 平台商品上下架 id=1&showStatus=1
export function setGoodsStatus(data) {
  return request({
    url: '/goods/showStatus',
    method: 'post',
    data
  })
}

// 添加平台商品 img=imgIcon&title=袜子&firstId=1&secondId=2&thirdId=3&price=78.98&inventory=100&daySendNum=1000&note=我是最优秀的商品",
export function handleGoodsAdd(data) {
  return request({
    url: '/goods/add',
    method: 'post',
    data
  })
}

// 查询平台上新商品列表 sortField=totalSale&orderBy=desc&type=1
export function getGoodsList2(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data
  })
}

