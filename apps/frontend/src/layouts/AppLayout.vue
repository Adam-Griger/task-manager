<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppSidebar from '../components/AppSidebar.vue'

const sidebarOpen = ref(true)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-canvas">
    <AppNavbar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="flex min-h-0 flex-1">
      <AppSidebar :open="sidebarOpen" />
      <main class="min-w-0 flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
