import { useAuthStore } from '@/stores/auth.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/product',
      component: () => import('../layout/DefaultLayout.vue'),
      meta: {
        isAuth: true
      },
      children: [
        { path: '/product', name: 'product', component: () => import('../views/ProductsView.vue') },
        {
          path: '/product/create',
          name: 'create product',
          component: () => import('../views/CreateProductView.vue')
        },
        {
          path: '/product/:id',
          name: 'product detail',
          component: () => import('../views/ProductView.vue')
        },
        {
          path: '/product-category',
          name: 'product category',
          component: () => import('../views/ProductCategoryView.vue')
        },
        {
          path: '/product-category/create',
          name: 'create product category',
          component: () => import('../views/CreateProductCategoryView.vue')
        },
        {
          path: '/product-category/:id',
          name: 'product category detail',
          component: () => import('../views/ProductCategoryDetailView.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../layout/AuthLayout.vue'),
      meta: { isAuth: false },

      children: [
        { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegisterView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    const { token } = useAuthStore()
    if (!token) {
      next('/login')
    }
  }
  next()
})

export default router
