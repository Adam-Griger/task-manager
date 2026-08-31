<script setup lang="ts">
const projects = [
  {
    name: 'Website redesign',
    team: 'Design',
    progress: 72,
    openIssues: 8,
    color: 'bg-accent',
  },
  {
    name: 'API v2',
    team: 'Engineering',
    progress: 41,
    openIssues: 14,
    color: 'bg-brand',
  },
  {
    name: 'Mobile app',
    team: 'Product',
    progress: 18,
    openIssues: 21,
    color: 'bg-positive',
  },
  {
    name: 'Onboarding',
    team: 'Product',
    progress: 90,
    openIssues: 2,
    color: 'bg-fg-muted',
  },
]
</script>

<template>
  <div class="px-6 py-6">
    <header class="mb-6">
      <h1 class="text-xl font-semibold tracking-tight text-fg">Projects</h1>
      <p class="mt-1 text-sm text-fg-muted">Placeholder boards for the workspace.</p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="project in projects"
        :key="project.name"
        class="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/40"
      >
        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="mb-2 flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full" :class="project.color" />
              <h2 class="truncate text-sm font-semibold text-fg">{{ project.name }}</h2>
            </div>
            <p class="text-xs text-fg-muted">{{ project.team }}</p>
          </div>
          <span class="shrink-0 text-xs text-fg-subtle">{{ project.openIssues }} open</span>
        </div>
        <div>
          <div class="mb-1.5 flex items-center justify-between text-xs text-fg-muted">
            <span>Progress</span>
            <span>{{ project.progress }}%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-canvas">
            <div class="h-full rounded-full bg-brand" :style="{ width: `${project.progress}%` }" />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
