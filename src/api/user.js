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
    url: '/user/logout',
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
