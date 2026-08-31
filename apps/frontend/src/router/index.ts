import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AppLayout from '../layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/app',
      component: AppLayout,
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

export default router
