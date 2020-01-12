import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '选品策略', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/chooseGoods/industryIndex'),
        meta: { title: '行业策略', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/chooseGoods/industryNew'),
        meta: { title: '平台上新', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name: 'Example',
    meta: { title: '我的订单', icon: 'example' },
    children: [
      {
        path: 'purchase',
        name: 'purchase',
        component: () => import('@/views/form/index'),
        meta: { title: '已采购订单', icon: 'form' }
      },
      {
        path: 'wait',
        name: 'wait',
        component: () => import('@/views/form/index'),
        meta: { title: '等待上架确认', icon: 'form' }
      },
      {
        path: 'refund',
        name: 'refund',
        component: () => import('@/views/form/index'),
        meta: { title: '退款订单管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/logistics',
    component: Layout,
    redirect: '/logistics/menu1',
    name: 'logistics',
    meta: {
      title: '商品物流',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '物流信息', icon: 'form' }
          }
        ]
      }
      // {
      //   path: 'menu2',
      //   component: () => import('@/views/nested/menu2/index'),
      //   meta: { title: 'menu2' }
      // }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '我的商品', icon: 'form' }
          }
        ]
      }
      // {
      //   path: 'menu2',
      //   component: () => import('@/views/nested/menu2/index'),
      //   meta: { title: 'menu2' }
      // }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    meta: {
      title: '资产管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '资金管理', icon: 'table' }
      },
      {
        path: 'profit',
        name: 'profit',
        component: () => import('@/views/tree/index'),
        meta: { title: '收益管理', icon: 'form' }
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/tree/index'),
        meta: { title: '我的账户', icon: 'form' }
      }
    ]
  },
  {
    path: '/platformManage',
    component: Layout,
    meta: {
      title: '平台管理',
      icon: 'nested'
    },
    redirect: '/platformManage/user',
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/platformManage/user/index'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/platformManage/role/index'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/platformManage/category/index'),
        meta: { title: '类目管理', icon: 'tree' }
      },
      {
        path: 'authUser',
        name: 'authUser',
        component: () => import('@/views/platformManage/authUser/index'),
        meta: { title: '认证用户管理', icon: 'table' }
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: () => import('@/views/platformManage/withdraw/index'),
        meta: { title: '提现管理', icon: 'form' }
      },
      {
        path: 'refund',
        name: 'refund',
        component: () => import('@/views/platformManage/refund/index'),
        meta: { title: '退款管理', icon: 'form' }
      },
      {
        path: 'examine',
        name: 'examine',
        component: () => import('@/views/platformManage/examine/index'),
        meta: { title: '厂家审核', icon: 'form' }
      }
    ]
  },

  // 厂家版，选品策略模块
  {
    path: '/choose-goods',
    component: Layout,
    redirect: '/choose-goods/industry',
    meta: {
      title: '选品策略',
      icon: 'nested'
    },
    children: [
      {
        path: 'industry',
        component: () => import('@/views/chooseGoods/industryIndex'),
        meta: { title: '行业策略' }
      }, {
        path: 'industryNew',
        component: () => import('@/views/chooseGoods/industryNew'),
        meta: { title: '平台上新' }
      }
    ]
  },
  // 厂家版，订单模块
  {
    path: '/order-module',
    component: Layout,
    redirect: '/order-module/orderList',
    meta: {
      title: '订单模块',
      icon: 'nested'
    },
    children: [
      {
        path: 'orderList',
        component: () => import('@/views/orderModule/orderList'),
        meta: { title: '订单页面' }
      }, {
        path: 'quitManage',
        component: () => import('@/views/orderModule/quitManage'),
        meta: { title: '退款单管理' }
      }
    ]
  },
  // 厂家版，物流模块
  {
    path: '/logistics-module',
    component: Layout,
    redirect: '/logistics-module/logisticsList',
    meta: {
      title: '物流模块',
      icon: 'nested'
    },
    children: [
      {
        path: 'logisticsList',
        component: () => import('@/views/logisticsModule/logisticsList'),
        meta: { title: '物流信息' }
      }
    ]
  },
  // 厂家版，商品管理
  {
    path: '/goods-module',
    component: Layout,
    redirect: '/goods-module/goodsList',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'goodsList',
        component: () => import('@/views/goodsModule/goodsList'),
        meta: { title: '我的商品' }
      }
    ]
  },
  // 厂家版，资产模块
  {
    path: '/property-manage',
    component: Layout,
    redirect: '/property-manage/propertyList',
    meta: {
      title: '资产模块',
      icon: 'nested'
    },
    children: [
      {
        path: 'propertyList',
        component: () => import('@/views/propertyManage/propertyList'),
        meta: { title: '资金流水' }
      }, {
        path: 'incomeManage',
        component: () => import('@/views/propertyManage/incomeManage'),
        meta: { title: '收益管理' }
      }, {
        path: 'myAccount',
        component: () => import('@/views/propertyManage/myAccount'),
        meta: { title: '我的账户' }
      }
    ]
  },
  // 厂家版，论坛模块
  {
    path: '/bbs-module',
    component: Layout,
    redirect: 'bbs-module/bbsMain',
    meta: {
      title: '论坛模块',
      icon: 'nested'
    },
    children: [
      {
        path: 'bbsMain',
        component: () => import('@/views/bbsModule/bbsMain'),
        meta: { title: '论坛主页' }
      }, {
        path: 'postDetail',
        component: () => import('@/views/bbsModule/postDetail'),
        meta: { title: '帖子详情' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
