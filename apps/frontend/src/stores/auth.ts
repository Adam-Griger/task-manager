import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCurrentUser, login as loginRequest, register as registerRequest } from '../api/auth'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  async function login(email: string, password: string) {
    user.value = await loginRequest(email, password)
  }

  async function register(firstName: string, lastName: string, password: string, email: string) {
    await registerRequest(firstName, lastName, password, email)
  }

  async function fetchMe() {
    try {
      user.value = await getCurrentUser()
    } catch {
      user.value = null
    }
  }

  return { user, isAuthenticated, login, register, fetchMe }
})
