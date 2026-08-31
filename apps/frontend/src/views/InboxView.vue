<script setup lang="ts">
const items = [
  {
    id: 1,
    title: 'Alex assigned TM-12 to you',
    detail: 'Fix overflow on the issues list at narrow widths',
    time: '2h ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Comment on TM-8',
    detail: 'Maya: “Can we ship this behind a flag first?”',
    time: '4h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'TM-4 moved to In progress',
    detail: 'Website redesign · Engineering',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 4,
    title: 'You were mentioned in Product',
    detail: 'Priya asked for a status update on the API cutover',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 5,
    title: 'TM-1 marked as Done',
    detail: 'Login screen polish',
    time: 'Tue',
    unread: false,
  },
]
</script>

<template>
  <div class="px-6 py-6">
    <header class="mb-6">
      <h1 class="text-xl font-semibold tracking-tight text-fg">Inbox</h1>
      <p class="mt-1 text-sm text-fg-muted">Activity and assignments across your workspace.</p>
    </header>

    <ul class="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      <li v-for="item in items" :key="item.id">
        <button
          type="button"
          class="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-raised/60"
        >
          <span
            class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            :class="item.unread ? 'bg-brand' : 'bg-transparent'"
            aria-hidden="true"
          />
          <span class="min-w-0 flex-1">
            <span class="flex items-baseline justify-between gap-3">
              <span
                class="truncate text-sm"
                :class="item.unread ? 'font-medium text-fg' : 'text-fg'"
              >
                {{ item.title }}
              </span>
              <span class="shrink-0 text-xs text-fg-subtle">{{ item.time }}</span>
            </span>
            <span class="mt-0.5 block truncate text-sm text-fg-muted">{{ item.detail }}</span>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
