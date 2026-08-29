<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log(email.value, password.value)
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <button type="submit" @click="login">Login</button>
  </div>
</template>

<style scoped></style>
