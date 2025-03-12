import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/IndexPage.vue')
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import('../pages/TransactionsPage.vue')
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../pages/CategoriesPage.vue')
      }
    ]
  },
  {
    path: '',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../pages/RegisterPage.vue')
      }
    ]
  }
]

export default routes 