<script setup lang="ts">
const rows = [
  { label: 'Workspace name', value: 'Acme Workspace' },
  { label: 'Default assignee', value: 'Unassigned' },
  { label: 'Week start', value: 'Monday' },
  { label: 'Issue prefix', value: 'TM' },
]
</script>

<template>
  <div class="px-6 py-6">
    <header class="mb-6">
      <h1 class="text-xl font-semibold tracking-tight text-fg">Settings</h1>
      <p class="mt-1 text-sm text-fg-muted">Placeholder preferences. Nothing here is saved yet.</p>
    </header>

    <section class="max-w-xl overflow-hidden rounded-xl border border-line bg-surface">
      <div
        v-for="(row, index) in rows"
        :key="row.label"
        class="flex items-center justify-between gap-4 px-4 py-3"
        :class="index < rows.length - 1 ? 'border-b border-line' : ''"
      >
        <span class="text-sm text-fg">{{ row.label }}</span>
        <span class="text-sm text-fg-muted">{{ row.value }}</span>
      </div>
    </section>
  </div>
</template>
