/*
 * @Author: your name
 * @Date: 2020-01-17 10:16:16
 * @LastEditTime: 2020-01-17 13:55:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bh-admin\src\permission.js
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setRouter } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { asyncUserRoutes, asyncFactoryRoutes, asyncBuyRoutes } from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // store.dispatch('user/getRoles').then(res => {
      //   console.log(res)
      // })
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // debugger
        if (store.state.user.router.length > 0) {
          next()
        } else {
          if (store.state.user.auth && store.state.user.auth === '3') {
            router.options.routes.splice(4, router.options.routes.length - 5)
            router.options.routes.push(...asyncUserRoutes)
            store.dispatch('user/setRouter', router.options.routes)
            router.addRoutes(asyncUserRoutes)
            next(to.redirectedFrom)
          }
          if (store.state.user.auth && store.state.user.auth === '4') {
            router.options.routes.splice(4, router.options.routes.length - 5)
            router.options.routes.push(...asyncFactoryRoutes)
            store.dispatch('user/setRouter', router.options.routes)
            router.addRoutes(router.options.routes)
            next(to.redirectedFrom)
          }
          if (store.state.user.auth && (store.state.user.auth !== '4' && store.state.user.auth !== '3')) {
            router.options.routes.splice(4, router.options.routes.length - 5)
            router.options.routes.push(...asyncBuyRoutes)
            store.dispatch('user/setRouter', router.options.routes)
            router.addRoutes(router.options.routes)
            next(to.redirectedFrom)
          }
        }
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
