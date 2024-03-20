import Vue from 'vue'
import Router from 'vue-router'
import BaiduMap from 'vue-baidu-map'
import echarts from 'echarts'
import Vant from 'vant';
Vue.use(BaiduMap, {
  ak: 'D2GNHfCueDThG6phyCeg7dU0vvfSuH3U'
});
Vue.prototype.$echarts = echarts;
Vue.use(Router);

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
export const constantRoutes = [{
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
    path: '/',
    component: Layout,
    redirect: '/',
    meta: {
      title: '监控',
      icon: 'dashboard'
    },
    children: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {
        title: '首页'
      },
    }, {
      path: 'myGreenhouse',
      name: 'myGreenhouse',
      component: () => import('@/views/monitor/myGreenhouse'),
      meta: {
        title: '单元'
      },
    }, {
      path: 'monitor/myWarehouse',
      name: 'myWarehouse',
      component: () => import('@/views/monitor/myWarehouse'),
      meta: {
        title: '我的仓库'
      }
    }]
  },

  {
    path: '/myGreenhouse',
    component: Layout,
    hidden: true,
    redirect: '/myGreenhouse/myGreenhouse/ementManage',
    meta: {
      title: '监控',
      icon: 'dashboard'
    },
    children: [{
      path: '/myGreenhouse',
      name: 'myGreenhouse',
      redirect: '/myGreenhouse',
      // redirect: 'noRedirect',
      component: () => import('@/views/monitor/index'),
      meta: {
        title: '单元'
      },
      children: [{

          path: 'ementManage',
          name: 'ementManage',
          hidden: true,
          component: () => import('@/views/monitor/ementManage'),
          meta: {
            title: '单元监控',
            activeMenu: '/myGreenhouse'
          }

        }, {
          path: 'greenhouseReport',
          name: 'greenhouseReport',
          hidden: true,
          component: () => import('@/views/monitor/greenhouseReport'),
          meta: {
            title: '单元报表',
            activeMenu: '/myGreenhouse'
          }
        }, {
          path: 'greenhouseVideo',
          name: 'greenhouseVideo',
          hidden: true,
          component: () => import('@/views/monitor/video'),
          meta: {
            title: '视频查看',
            activeMenu: '/myGreenhouse'
          }
        },
        {
          path: 'setting',
          name: 'setting',
          hidden: true,
          component: () => import('@/views/monitor/setting'),
          meta: {
            title: '控制器设置列表',
            activeMenu: '/myGreenhouse/ementManage'
          }
          // sensorSet.vue
        },
        {
          path: 'sensorSet',
          name: 'sensorSet',
          hidden: true,
          component: () => import('@/views/monitor/sensorSet'),
          meta: {
            title: '传感器设置列表',
            activeMenu: '/myGreenhouse/ementManage'
          }
        }
      ]
    }, {
      path: '/myWarehouse',
      name: 'myWarehouse',
      redirect: '/monitor/myWarehouse',
      // redirect: 'noRedirect',
      component: () => import('@/views/monitor/index'),
      meta: {
        title: '我的仓库'
      },
      children: [{

          path: 'wareEmentManage',
          name: 'wareEmentManage',
          hidden: true,
          component: () => import('@/views/monitor/ementManage'),
          meta: {
            title: '仓库监控',
            activeMenu: '/monitor/myWarehouse'
          }

        }, {
          path: 'warehouseReport',
          name: 'warehouseReport',
          hidden: true,
          component: () => import('@/views/monitor/greenhouseReport'),
          meta: {
            title: '仓库报表',
            activeMenu: '/monitor/myWarehouse'
          }
        }, {
          path: 'warehouseVideo',
          name: 'warehouseVideo',
          hidden: true,
          component: () => import('@/views/monitor/video'),
          meta: {
            title: '视频查看',
            activeMenu: '/monitor/myWarehouse'
          }
        }, {
          path: 'setting',
          name: 'setting',
          hidden: true,
          component: () => import('@/views/monitor/setting'),
          meta: {
            title: '控制器设置列表',
            activeMenu: '/monitor/myWarehouse'
          }
          // sensorSet.vue
        },
        {
          path: 'sensorSet',
          name: 'sensorSet',
          hidden: true,
          component: () => import('@/views/monitor/sensorSet'),
          meta: {
            title: '传感器设置列表',
            activeMenu: '/monitor/myWarehouse'
          }
          // sensorSet.vue
        }
      ]
    }]
  },


  {
    path: '/reserveManagement',
    component: Layout,
    name: 'reserveManagement',
    // redirect: 'reserveManagement/reserveInfo',
    redirect: 'noRedirect',
    meta: {
      title: '库存管理',
      icon: 'nested'
    },
    children: [{
      path: 'reserveInfo',
      name: 'reserveInfo',
      component: () => import('@/views/reserveManagement/reserveInfo'),
      meta: {
        title: '库存信息'
      }
    }, {
      path: 'inReserve',
      name: 'inReserve',
      component: () => import('@/views/reserveManagement/inReserve'),
      meta: {
        title: '入库信息'
      }
    }, {
      path: 'outReserve',
      name: 'outReserve',
      component: () => import('@/views/reserveManagement/outReserve'),
      meta: {
        title: '出库信息'
      }
    }, {
      path: 'reserveDetail',
      name: 'reserveDetail',
      hidden: true,
      component: () => import('@/views/reserveManagement/reserveDetail'),
      meta: {
        title: '库存详情',
        activeMenu: '/reserveManagement/reserveInfo'
      }
    }]
  },

  {
    path: '/productSourceManagement',
    component: Layout,
    children: [{
        path: 'productSource',
        component: () => import('@/views/productSource/productSource'),
        meta: {
          title: '产品溯源',
          icon: 'table'
        }
      },
      // archive
      {
        path: 'batchInfo',
        name: 'batchInfo',
        component: () => import('@/views/productSource/batchInfo'),
        hidden: true,
        meta: {
          title: '批次信息',
          activeMenu: 'productSourceManagement/productSource'
        }
      },
      {
        path: 'batchInfoView',
        name: 'batchInfoView',
        component: () => import('@/views/productSource/batchInfoView'),
        hidden: true,
        meta: {
          title: '批次信息',
          activeMenu: 'productSourceManagement/productSource'
        }
      },
      {
        path: 'archive',
        name: 'archive',
        component: () => import('@/views/productSource/archive'),
        hidden: true,
        meta: {
          title: '维护档案',
          activeMenu: 'productSourceManagement/productSource'
        }
      },
      {
        path: 'archiveView',
          name: 'archiveView',
        component: () => import('@/views/productSource/archiveView'),
        hidden: true,
        meta: {
          title: '档案信息',
            activeMenu: 'productSourceManagement/productSource'
        }
      }
    ]
  },
  {
    path: '/expertManagement',
    component: Layout,
    redirect: '/expertManagement',
    children: [{
      path: 'expert',
      component: () => import('@/views/expertManagement/expert'),
      meta: {
        title: '专家交流',
        icon: 'table'
      }
    }]
  },
  {
    path: '/warningMsgManagement',
    component: Layout,
    redirect: '/warningMsgManagement',
    children: [{
      path: 'warningMsg',
      component: () => import('@/views/warningMsgManagement/warningMsg'),
      meta: {
        title: '消息通知',
        icon: 'table'
      }
    }]
  },
  {
    path: '/userSourceManagement',
      component: Layout,
    children: [{
      path: 'userSource',
      component: () => import('@/views/userSource/userSource'),
      meta: {
        title: '员工管理',
          icon: 'table'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
