import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AppLayout from '../layouts/AppLayout.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/app',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'inbox' },
        },
        {
          path: 'inbox',
          name: 'inbox',
          component: () => import('../views/InboxView.vue'),
        },
        {
          path: 'issues',
          name: 'issues',
          component: () => import('../views/IssuesView.vue'),
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('../views/ProjectsView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/SettingsView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  if (requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if (guestOnly && auth.isAuthenticated) {
    return { name: 'inbox' }
  }
})

export default router
