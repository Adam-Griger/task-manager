<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

type AuthMode = 'login' | 'register'

const router = useRouter()
const auth = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const password = ref('')
const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const authMode = ref<AuthMode>('login')
const isRegister = computed(() => authMode.value === 'register')
const feedback = computed(() => {
  if (error.value) {
    return { text: error.value, tone: 'error' as const }
  }
  if (success.value) {
    return { text: success.value, tone: 'success' as const }
  }
  return null
})

const inputClass =
  'peer w-full rounded-lg border border-line bg-surface-raised px-3 pt-5 pb-1.5 text-fg placeholder-transparent outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-accent/30 disabled:opacity-100'
const labelClass =
  'pointer-events-none absolute left-3 top-1/2 origin-left -translate-y-1/2 text-sm text-fg-subtle transition-all duration-200 ease-out peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-brand peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs'

function showError(message: string) {
  success.value = ''
  error.value = message
}

function setAuthMode(mode: AuthMode) {
  authMode.value = mode
  error.value = ''
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]{3,}@[^\s@]{3,}\.[^\s@]+$/.test(value)
}

function getNameValidationError(value: string, label: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return `${label} is required`
  }

  if (trimmed.length < 3 || trimmed.length > 32) {
    return `${label} must be between 3 and 32 characters`
  }

  return null
}

function getValidationError(): string | null {
  if (!isRegister.value) {
    if (!email.value.trim() || !password.value) {
      return 'Email and password are required'
    }

    if (!isValidEmail(email.value)) {
      return 'Invalid email address'
    }

    return null
  }

  const firstNameError = getNameValidationError(firstName.value, 'First name')
  if (firstNameError) {
    return firstNameError
  }

  const lastNameError = getNameValidationError(lastName.value, 'Last name')
  if (lastNameError) {
    return lastNameError
  }

  if (!password.value) {
    return 'Password is required'
  }

  if (password.value.length < 5 || password.value.length > 72) {
    return 'Password must be between 5 and 72 characters'
  }

  if (!isValidEmail(email.value)) {
    return 'Invalid email address'
  }

  return null
}

function handleSubmit() {
  if (loading.value) {
    return
  }

  const validationError = getValidationError()
  if (validationError) {
    showError(validationError)
    return
  }

  error.value = ''

  if (isRegister.value) {
    void handleRegister()
  } else {
    success.value = ''
    void handleLogin()
  }
}

async function handleLogin() {
  loading.value = true
  try {
    await auth.login(email.value.trim(), password.value)
    await router.push({ name: 'inbox' })
  } catch (err) {
    showError(err instanceof Error ? err.message : 'Invalid credentials')
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  loading.value = true
  try {
    await auth.register(
      firstName.value.trim(),
      lastName.value.trim(),
      password.value,
      email.value.trim(),
    )
    error.value = ''
    success.value = 'Account created. You can log in now.'
    setAuthMode('login')
  } catch (err) {
    showError(err instanceof Error ? err.message : 'Could not create account')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center px-4 py-12">
    <form
      class="w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-xl"
      autocomplete="on"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-canvas"
        >
          TM
        </div>
        <h1 class="grid text-2xl font-semibold tracking-tight text-fg">
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'pointer-events-none opacity-0' : 'opacity-100'"
          >
            Welcome back
          </span>
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            Create an account
          </span>
        </h1>
        <p class="mt-1 grid text-sm text-fg-muted">
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'pointer-events-none opacity-0' : 'opacity-100'"
          >
            Sign in to continue to Task Manager
          </span>
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            Join Task Manager in a few seconds
          </span>
        </p>
      </div>

      <div class="mb-6 rounded-full border border-line bg-canvas p-1">
        <div class="relative grid grid-cols-2">
          <span
            class="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-full bg-brand transition-transform duration-300 ease-out motion-reduce:transition-none"
            :class="isRegister ? 'translate-x-full' : 'translate-x-0'"
          />
          <button
            type="button"
            class="relative z-10 rounded-full px-3 py-2 text-center text-sm font-medium transition-colors duration-300"
            :class="isRegister ? 'text-fg-muted hover:text-fg' : 'text-canvas'"
            @click="setAuthMode('login')"
          >
            Log in
          </button>
          <button
            type="button"
            class="relative z-10 rounded-full px-3 py-2 text-center text-sm font-medium transition-colors duration-300"
            :class="isRegister ? 'text-canvas' : 'text-fg-muted hover:text-fg'"
            @click="setAuthMode('register')"
          >
            Register
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="grid">
          <div
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'pointer-events-none opacity-0' : 'opacity-100'"
          >
            <div class="relative">
              <input
                id="login-email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                :disabled="isRegister"
                :tabindex="isRegister ? -1 : 0"
                placeholder=" "
                :class="inputClass"
              />
              <label for="login-email" :class="labelClass">Email</label>
            </div>
          </div>

          <div
            class="col-start-1 row-start-1 grid grid-cols-2 gap-4 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            <div class="relative">
              <input
                id="first-name"
                v-model="firstName"
                name="firstName"
                type="text"
                autocomplete="given-name"
                :disabled="!isRegister"
                :tabindex="isRegister ? 0 : -1"
                placeholder=" "
                :class="[inputClass, 'uppercase']"
              />
              <label for="first-name" :class="labelClass">First name</label>
            </div>
            <div class="relative">
              <input
                id="last-name"
                v-model="lastName"
                name="lastName"
                type="text"
                autocomplete="family-name"
                :disabled="!isRegister"
                :tabindex="isRegister ? 0 : -1"
                placeholder=" "
                :class="[inputClass, 'uppercase']"
              />
              <label for="last-name" :class="labelClass">Last name</label>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="relative">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              :autocomplete="isRegister ? 'new-password' : 'current-password'"
              placeholder=" "
              :class="inputClass"
            />
            <label for="password" :class="labelClass">Password</label>
          </div>

          <div
            class="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
            :class="isRegister ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                class="pt-4 transition-opacity duration-300 ease-out"
                :class="isRegister ? 'opacity-100' : 'opacity-0'"
              >
                <div class="relative">
                  <input
                    id="register-email"
                    v-model="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    :disabled="!isRegister"
                    :tabindex="isRegister ? 0 : -1"
                    placeholder=" "
                    :class="inputClass"
                  />
                  <label for="register-email" :class="labelClass">Email</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        :class="feedback ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="min-h-0 overflow-hidden">
          <p
            class="pt-4 text-sm transition-opacity duration-300 ease-out"
            :class="[
              feedback ? 'opacity-100' : 'opacity-0',
              feedback?.tone === 'success' ? 'text-positive' : 'text-danger',
            ]"
          >
            {{ feedback?.text ?? '' }}
          </p>
        </div>
      </div>

      <button
        type="submit"
        class="mt-6 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="loading"
      >
        <span class="grid">
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-0' : 'opacity-100'"
          >
            Log in
          </span>
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-100' : 'opacity-0'"
          >
            Create account
          </span>
        </span>
      </button>
    </form>
  </main>
</template>

<style scoped></style>
