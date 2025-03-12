import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CategoryList from '@/components/categories/CategoryList.vue'
import TransactionList from '@/components/transactions/TransactionList.vue'

const routes = [
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
        component: TransactionList
      },
      {
        path: 'categories',
        name: 'categories',
        component: CategoryList
      }
    ]
  },
  {
    path: '/',
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 