<script setup lang="ts">
defineProps<{
  sidebarOpen: boolean
}>()

defineEmits<{
  toggleSidebar: []
}>()
</script>

<template>
  <header class="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface px-3">
    <button
      type="button"
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
      :aria-expanded="sidebarOpen"
      aria-controls="app-sidebar"
      :aria-label="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
      @click="$emit('toggleSidebar')"
    >
      <svg
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>

    <div class="flex min-w-0 items-center gap-2">
      <div
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand text-[11px] font-bold text-canvas"
      >
        TM
      </div>
      <span class="truncate text-sm font-semibold tracking-tight text-fg">Task Manager</span>
    </div>

    <div class="hidden min-w-0 flex-1 justify-center md:flex">
      <label class="relative w-full max-w-md">
        <span class="sr-only">Search</span>
        <svg
          class="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-fg-subtle"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          placeholder="Search issues, projects..."
          class="w-full rounded-md border border-line bg-canvas py-1.5 pr-14 pl-8 text-sm text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-accent/30"
        />
        <kbd
          class="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border border-line bg-surface-raised px-1.5 py-0.5 text-[10px] font-medium text-fg-subtle"
        >
          ⌘K
        </kbd>
      </label>
    </div>

    <div class="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
      <button
        type="button"
        class="hidden items-center gap-1.5 rounded-md bg-brand px-2.5 py-1.5 text-xs font-semibold text-canvas transition-colors hover:bg-brand-hover sm:inline-flex"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        New
      </button>

      <button
        type="button"
        class="relative flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
        aria-label="Notifications"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <span class="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
      </button>

      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-[11px] font-semibold text-fg ring-1 ring-line"
        aria-label="Account"
      >
        YU
      </button>
    </div>
  </header>
</template>
