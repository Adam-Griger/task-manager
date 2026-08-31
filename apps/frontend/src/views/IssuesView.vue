<script setup lang="ts">
import { computed, ref } from 'vue'

type IssueStatus = 'todo' | 'in-progress' | 'done'

const activeFilter = ref<'all' | IssueStatus>('all')

const issues = [
  {
    id: 'TM-12',
    title: 'Fix overflow on the issues list at narrow widths',
    status: 'in-progress' as IssueStatus,
    priority: 'High',
    project: 'Website',
    assignee: 'YU',
  },
  {
    id: 'TM-11',
    title: 'Add empty state for projects with no issues',
    status: 'todo' as IssueStatus,
    priority: 'Medium',
    project: 'Website',
    assignee: 'AL',
  },
  {
    id: 'TM-8',
    title: 'Ship feature flag for the new composer',
    status: 'in-progress' as IssueStatus,
    priority: 'High',
    project: 'API v2',
    assignee: 'MY',
  },
  {
    id: 'TM-6',
    title: 'Document workspace invite flow',
    status: 'todo' as IssueStatus,
    priority: 'Low',
    project: 'Product',
    assignee: 'PR',
  },
  {
    id: 'TM-4',
    title: 'Redesign project overview cards',
    status: 'done' as IssueStatus,
    priority: 'Medium',
    project: 'Website',
    assignee: 'YU',
  },
  {
    id: 'TM-1',
    title: 'Login screen polish',
    status: 'done' as IssueStatus,
    priority: 'Low',
    project: 'Website',
    assignee: 'YU',
  },
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'Todo' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
] as const

const visibleIssues = computed(() => {
  if (activeFilter.value === 'all') return issues
  return issues.filter((issue) => issue.status === activeFilter.value)
})

const statusLabel: Record<IssueStatus, string> = {
  todo: 'Todo',
  'in-progress': 'In progress',
  done: 'Done',
}

const statusClass: Record<IssueStatus, string> = {
  todo: 'border-line bg-canvas text-fg-muted',
  'in-progress': 'border-accent/30 bg-accent/10 text-accent',
  done: 'border-positive/30 bg-positive/10 text-positive',
}
</script>

<template>
  <div class="px-6 py-6">
    <header class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-fg">Issues</h1>
        <p class="mt-1 text-sm text-fg-muted">{{ visibleIssues.length }} in this view</p>
      </div>
      <div
        class="flex rounded-full border border-line bg-canvas p-1"
        role="tablist"
        aria-label="Issue status"
      >
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          role="tab"
          :aria-selected="activeFilter === filter.id"
          class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
          :class="
            activeFilter === filter.id ? 'bg-brand text-canvas' : 'text-fg-muted hover:text-fg'
          "
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>
    </header>

    <div class="overflow-hidden rounded-xl border border-line bg-surface">
      <div
        class="hidden grid-cols-[5.5rem_1fr_8rem_7rem_3rem] gap-3 border-b border-line px-4 py-2 text-[11px] font-medium tracking-wide text-fg-subtle uppercase sm:grid"
      >
        <span>Id</span>
        <span>Title</span>
        <span>Status</span>
        <span>Project</span>
        <span class="text-right">You</span>
      </div>
      <ul class="divide-y divide-line">
        <li v-for="issue in visibleIssues" :key="issue.id">
          <button
            type="button"
            class="grid w-full grid-cols-1 items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-surface-raised/60 sm:grid-cols-[5.5rem_1fr_8rem_7rem_3rem] sm:gap-3"
          >
            <span class="font-mono text-xs text-fg-subtle">{{ issue.id }}</span>
            <span class="min-w-0">
              <span class="block truncate text-sm text-fg">{{ issue.title }}</span>
              <span class="mt-0.5 block text-xs text-fg-subtle sm:hidden">
                {{ issue.priority }} · {{ issue.project }}
              </span>
            </span>
            <span
              class="inline-flex w-fit rounded-full border px-2 py-0.5 text-[11px] font-medium"
              :class="statusClass[issue.status]"
            >
              {{ statusLabel[issue.status] }}
            </span>
            <span class="hidden truncate text-sm text-fg-muted sm:block">{{ issue.project }}</span>
            <span
              class="hidden h-7 w-7 items-center justify-center justify-self-end rounded-full bg-surface-raised text-[10px] font-semibold text-fg ring-1 ring-line sm:inline-flex"
            >
              {{ issue.assignee }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
