import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/soft',
    component: Layout,
    alwaysShow: true,
    name: 'Soft',
    meta: { title: '软件管理', icon: 'example' },
    children: [
      {
        path: 'soft_list',
        name: 'SoftList',
        component: () => import('@/views/soft/soft_list'),
        meta: { title: '软件列表', icon: 'table' }
      },
      {
        path: 'soft_form',
        name: 'SoftForm',
        hidden: true,
        component: () => import('@/views/soft/soft_form'),
        meta: { title: '软件操作', icon: 'tree' }
      },
      {
        path: 'soft_versions_list',
        name: 'SoftVersionsList',
        component: () => import('@/views/soft/soft_versions_list'),
        meta: { title: '软件版本', icon: 'tree' }
      },
      {
        path: 'soft_leave_list',
        name: 'SoftLeaveForm',
        component: () => import('@/views/soft/soft_leave_list'),
        meta: { title: '反馈列表', icon: 'tree' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})