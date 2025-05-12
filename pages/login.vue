<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#18171c]">
    <img src="/téléchargement.jpeg" alt="App Logo" class="mb-8 w-32">
    <h1 class="text-3xl font-extrabold text-white mb-4">Sign in</h1>
    <form @submit.prevent="login" class="bg-[#23222a] p-8 rounded-lg shadow-lg w-80 flex flex-col gap-4">
      <input v-model="email" type="email" placeholder="Email" class="p-3 rounded bg-[#18171c] text-white" required />
      <input v-model="password" type="password" placeholder="Password" class="p-3 rounded bg-[#18171c] text-white" required />
      <button type="submit" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded">Login</button>
      <div v-if="error" class="text-red-400 text-sm mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function login() {
  if (!email.value || !password.value) {
    error.value = 'Please enter both email and password.'
    return
  }
  localStorage.setItem('userEmail', email.value)
  localStorage.setItem('loggedIn', 'true')
  router.push('/')
}
</script> 