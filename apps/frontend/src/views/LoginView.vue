<script setup lang="ts">
import { computed, ref } from 'vue'

type AuthMode = 'login' | 'register'

const authMode = ref<AuthMode>('login')
const isRegister = computed(() => authMode.value === 'register')

function setAuthMode(mode: AuthMode) {
  authMode.value = mode
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center px-4 py-12">
    <form
      class="w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-xl"
      autocomplete="on"
      @submit.prevent
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
            :aria-hidden="isRegister"
          >
            Welcome back
          </span>
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-100' : 'pointer-events-none opacity-0'"
            :aria-hidden="!isRegister"
          >
            Create an account
          </span>
        </h1>
        <p class="mt-1 grid text-sm text-fg-muted">
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'pointer-events-none opacity-0' : 'opacity-100'"
            :aria-hidden="isRegister"
          >
            Sign in to continue to Task Manager
          </span>
          <span
            class="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            :class="isRegister ? 'opacity-100' : 'pointer-events-none opacity-0'"
            :aria-hidden="!isRegister"
          >
            Join Task Manager in a few seconds
          </span>
        </p>
      </div>

      <div
        class="mb-6 rounded-full border border-line bg-canvas p-1"
        role="tablist"
        aria-label="Authentication mode"
      >
        <div class="relative grid grid-cols-2">
          <span
            class="pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-full bg-brand transition-transform duration-300 ease-out motion-reduce:transition-none"
            :class="isRegister ? 'translate-x-full' : 'translate-x-0'"
            aria-hidden="true"
          />
          <button
            type="button"
            role="tab"
            :aria-selected="!isRegister"
            class="relative z-10 rounded-full px-3 py-2 text-center text-sm font-medium transition-colors duration-300"
            :class="isRegister ? 'text-fg-muted hover:text-fg' : 'text-canvas'"
            @click="setAuthMode('login')"
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="isRegister"
            class="relative z-10 rounded-full px-3 py-2 text-center text-sm font-medium transition-colors duration-300"
            :class="isRegister ? 'text-canvas' : 'text-fg-muted hover:text-fg'"
            @click="setAuthMode('register')"
          >
            Register
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="username" class="text-sm font-medium text-fg">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            placeholder="Enter your username"
            class="rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div class="flex flex-col">
          <div class="flex flex-col gap-1.5">
            <label for="password" class="text-sm font-medium text-fg">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              :autocomplete="isRegister ? 'new-password' : 'current-password'"
              required
              placeholder="Enter your password"
              class="rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div
            class="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
            :class="isRegister ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                class="flex flex-col gap-1.5 pt-4 transition-opacity duration-300 ease-out"
                :class="isRegister ? 'opacity-100' : 'opacity-0'"
              >
                <label for="confirmPassword" class="text-sm font-medium text-fg">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="new-password"
                  :required="isRegister"
                  :disabled="!isRegister"
                  :tabindex="isRegister ? 0 : -1"
                  placeholder="Repeat your password"
                  class="rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-accent/30 disabled:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="mt-6 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-hover"
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
