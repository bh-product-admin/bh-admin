/*
 * @Author: your name
 * @Date: 2020-01-17 10:16:16
 * @LastEditTime: 2020-01-17 13:30:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bh-admin\src\utils\auth.js
 */
import Cookies from 'js-cookie'
removeId
const TokenKey = 'bh_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getId() {
  return Cookies.get('id')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setId(id) {
  return Cookies.set('id', id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeId() {
  return Cookies.remove('id')
}
