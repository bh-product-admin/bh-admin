import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/loginOut',
    method: 'post'
  })
}
export function sendCode(data) {
  return request({
    url: '/sms/sendCode',
    method: 'post',
    data
  })
}
export function configRemove(data) {
  return request({
    url: '/config/remove',
    method: 'post',
    data
  })
}

export function getByKeyword(data) {
  return request({
    url: '/config/getByKeyword',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function getManufacturerCertifiedIng(data) {
  return request({
    url: '/user/getManufacturerCertifiedIng',
    method: 'post',
    data
  })
}

export function addBlack(data) {
  return request({
    url: '/user/addBlack',
    method: 'post',
    data
  })
}

export function getCertificationIng(data) {
  return request({
    url: '/user/getCertificationIng',
    method: 'post',
    data
  })
}

export function getActionByRoleId(data) {
  return request({
    url: '/role/getActionByRoleId',
    method: 'post',
    data
  })
}

/** 图片上传 */

export function upload(data) {
  return request({
    url: '/oss/upload',
    method: 'post',
    data
  })
}

/** 申请成为厂家 */

export function manufacturer(data) {
  return request({
    url: '/login/manufacturer',
    method: 'post',
    data
  })
}

/** 修改用户认证状态 */

export function certification(data) {
  return request({
    url: '/user/certification',
    method: 'post',
    data
  })
}

/** 一件代发 */

export function waresList(data) {
  return request({
    url: '/wares/list',
    method: 'post',
    data
  })
}

/** 类目 */

export function classify(data) {
  return request({
    url: '/classify/list',
    method: 'post',
    data
  })
}

// 厂家认证接口
export function manufacturerCertification(data) {
  return request({
    url: '/user/manufacturerCertification',
    method: 'post',
    data
  })
}
