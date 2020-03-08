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

//  换绑手机号码 phone=18668415200&code=4471
export function userEditPhone(data) {
  return request({
    url: '/user/editPhone',
    method: 'post',
    data
  })
}

// 用户换绑手机号码，发送验证码? phone=18668415200&type=2
export function smsSendCode(data) {
  return request({
    url: '/sms/sendCode',
    method: 'post',
    data
  })
}

// 修改账户信息 ?id=15&account=1233333&openBank=滨江支行
export function bankMoneyEdit(data) {
  return request({
    url: '/money/edit',
    method: 'post',
    data
  })
}

// 根据用户ID查询账户信息 money/getById?id=15
export function moneyById(data) {
  return request({
    url: '/money/getById',
    method: 'post',
    data
  })
}
