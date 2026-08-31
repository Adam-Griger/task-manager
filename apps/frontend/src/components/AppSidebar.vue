<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
  open: boolean
}>()

const route = useRoute()

const navItems = [
  { name: 'inbox', label: 'Inbox', to: { name: 'inbox' } },
  { name: 'issues', label: 'Issues', to: { name: 'issues' } },
  { name: 'projects', label: 'Projects', to: { name: 'projects' } },
] as const

const teams = [
  { name: 'Engineering', color: 'bg-brand' },
  { name: 'Design', color: 'bg-accent' },
  { name: 'Product', color: 'bg-positive' },
]
</script>

<template>
  <aside
    id="app-sidebar"
    class="flex h-full shrink-0 flex-col overflow-hidden border-r border-line bg-surface transition-[width] duration-200 ease-out motion-reduce:transition-none"
    :class="open ? 'w-60' : 'w-0 md:w-14'"
  >
    <div class="flex min-h-0 flex-1 flex-col py-3" :class="open ? 'px-3' : 'px-0 md:px-2'">
      <div
        class="mb-3 flex items-center rounded-md px-1"
        :class="open ? 'gap-2.5' : 'justify-center'"
      >
        <div
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-raised text-[11px] font-bold text-fg"
        >
          A
        </div>
        <div v-show="open" class="min-w-0">
          <p class="truncate text-sm font-medium text-fg">Acme Workspace</p>
          <p class="truncate text-[11px] text-fg-subtle">Free plan</p>
        </div>
      </div>

      <nav class="flex flex-col gap-0.5" aria-label="Workspace">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center rounded-md py-1.5 text-sm transition-colors"
          :class="[
            open ? 'gap-2.5 px-2' : 'justify-center px-0',
            route.name === item.name
              ? 'bg-surface-raised text-fg'
              : 'text-fg-muted hover:bg-surface-raised/70 hover:text-fg',
          ]"
          :title="open ? undefined : item.label"
        >
          <svg
            v-if="item.name === 'inbox'"
            class="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path
              d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
            />
          </svg>
          <svg
            v-else-if="item.name === 'issues'"
            class="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <svg
            v-else
            class="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span v-show="open" class="truncate">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div v-show="open" class="mt-6">
        <p class="px-2 text-[11px] font-medium tracking-wider text-fg-subtle uppercase">Teams</p>
        <ul class="mt-1 flex flex-col gap-0.5">
          <li
            v-for="team in teams"
            :key="team.name"
            class="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-fg-muted"
          >
            <span class="h-2 w-2 shrink-0 rounded-full" :class="team.color" />
            <span class="truncate">{{ team.name }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-auto pt-3">
        <RouterLink
          :to="{ name: 'settings' }"
          class="flex items-center rounded-md py-1.5 text-sm transition-colors"
          :class="[
            open ? 'gap-2.5 px-2' : 'justify-center px-0',
            route.name === 'settings'
              ? 'bg-surface-raised text-fg'
              : 'text-fg-muted hover:bg-surface-raised/70 hover:text-fg',
          ]"
          :title="open ? undefined : 'Settings'"
        >
          <svg
            class="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span v-show="open" class="truncate">Settings</span>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>
