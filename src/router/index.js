import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('../views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('../views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('../views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('../views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('../views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('../views/pages/account-settings/AccountSettings.vue'),
  },
  // master
  {
    path: '/master/account',
    name: 'master-account',
    component: () => import('../views/master/account/Index.vue'),
  },
  {
    path: '/master/alamat',
    name: 'master-alamat',
    component: () => import('../views/master/alamat/Index.vue'),
  },
  {
    path: '/master/asset',
    name: 'master-asset',
    component: () => import('../views/master/asset/Index.vue'),
  },
  {
    path: '/master/barcode',
    name: 'master-barcode',
    component: () => import('../views/master/barcode/Index.vue'),
  },
  {
    path: '/master/coa',
    name: 'master-coa',
    component: () => import('../views/master/coa/Index.vue'),
  },
  {
    path: '/master/item',
    name: 'master-item',
    component: () => import('../views/master/item/Index.vue'),
  },
  {
    path: '/master/item-minus',
    name: 'master-item-minus',
    component: () => import('../views/master/itemMinus/Index.vue'),
  },
  {
    path: '/master/jangka-waktu',
    name: 'master-jangka-waktu',
    component: () => import('../views/master/jangkaWaktu/Index.vue'),
  },
  {
    path: '/master/karyawan',
    name: 'master-karyawan',
    component: () => import('../views/master/karyawan/Index.vue'),
  },
  {
    path: '/master/person',
    name: 'master-person',
    component: () => import('../views/master/person/Index.vue'),
  },
  {
    path: '/master/saldo-awal',
    name: 'master-saldo-awal',
    component: () => import('../views/master/saldoAwal/Index.vue'),
  },
  {
    path: '/master/satuan',
    name: 'master-satuan',
    component: () => import('../views/master/satuan/Index.vue'),
  },
  {
    path: '/master/user',
    name: 'master-user',
    component: () => import('../views/master/user/Index.vue'),
  },
  // master
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('../views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('../views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('../views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
